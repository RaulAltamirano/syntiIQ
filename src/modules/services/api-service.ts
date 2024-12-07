import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';
import { ApiResponse } from './interfaces/api.interfaces';
import { TokenPayload } from '../auth/interfaces/auth.types';
import { useTokenStorage } from './composables/useTokenStorage';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;
  private tokenStorage = useTokenStorage(); 

  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }> = [];

  private constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.loadTokensFromStorage();
    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private loadTokensFromStorage(): void {
    const storedTokens = this.tokenStorage.getStoredTokens();
    if (storedTokens) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${storedTokens.accessToken}`;
    }
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    const newTokens = { accessToken, refreshToken };
    this.tokenStorage.setTokens(newTokens);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  public clearTokens(): void {
    this.tokenStorage.clearTokens();
    delete this.api.defaults.headers.common['Authorization'];
  }

  private async refreshAuthToken(): Promise<string> {
    try {
      const storedTokens = this.tokenStorage.getStoredTokens();
      if (!storedTokens || !storedTokens.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post<TokenPayload>(
        `${this.api.defaults.baseURL}/auth/refresh-token`,
        { refreshToken: storedTokens.refreshToken }
      );

      const { accessToken, refreshToken } = response.data;
      this.setTokens(accessToken, refreshToken);
      return accessToken;
    } catch (error) {
      this.clearTokens();
      const event = new CustomEvent('auth:logout');
      window.dispatchEvent(event);
      throw error;
    }
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const storedTokens = this.tokenStorage.getStoredTokens();
        if (storedTokens?.accessToken) {
          config.headers['Authorization'] = `Bearer ${storedTokens.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return this.api(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAuthToken();
            this.processQueue(null, newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.clearTokens();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any = null, token: string | null = null): void {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else if (token) {
        promise.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  // HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.get<T>(url, config);
    return this.transformResponse(response);
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.post<T>(url, data, config);
    return this.transformResponse(response);
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.put<T>(url, data, config);
    return this.transformResponse(response);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.delete<T>(url, config);
    return this.transformResponse(response);
  }

  private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  }
}

export const apiService = ApiService.getInstance();
