import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse, QueueItem } from "./interfaces/api.interfaces";
import { TokenPayload } from "../auth/interfaces/auth.types";
import { ApiError } from "./api-error";
import { useTokenStorage } from "./composables/useTokenStorage";
import { API_CONSTANTS } from "./constants/constants-api";
import { ENDPOINTS } from "./constants/constants-endpoints";
export class ApiService {
  private static instance: ApiService;
  private readonly api: AxiosInstance;
  private readonly tokenStorage = useTokenStorage();
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  private constructor() {
    // this.setTokens();
    this.api = this.createAxiosInstance();
    this.setupInterceptors();
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: API_CONSTANTS.BASE_URL,
      timeout: API_CONSTANTS.TIMEOUT,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {};
        }

        const tokens = this.tokenStorage.getStoredTokens();
        if (tokens?.accessToken) {
          config.headers[API_CONSTANTS.AUTH_HEADER] = this.getAuthHeader(tokens.accessToken);
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
          originalRequest._retry = true;

          if (this.isRefreshing) {
            try {
              return await this.enqueueFailedRequest(originalRequest);
            } catch (queueError) {
              return Promise.reject(queueError);
            }
          }

          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAuthToken();
            this.processQueue(null, newToken);

            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers[API_CONSTANTS.AUTH_HEADER] = this.getAuthHeader(newToken);
            return this.api(originalRequest);
          } catch (refreshError) {
            this.handleRefreshError(refreshError);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthHeader(token: string): string {
    return `${API_CONSTANTS.BEARER} ${token}`;
  }

  private async enqueueFailedRequest(request: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({
        resolve: (token: string) => {
          if (!request.headers) {
            request.headers = {};
          }
          request.headers[API_CONSTANTS.AUTH_HEADER] = this.getAuthHeader(token);
          resolve(this.api(request));
        },
        reject
      });
    });
  }

  private async refreshAuthToken(): Promise<string> {
    const tokens = this.tokenStorage.getStoredTokens();
    if (!tokens?.refreshToken) {
      throw new ApiError(401, 'No refresh token available');
    }

    try {
      const response = await axios.post<TokenPayload>(
        `${API_CONSTANTS.BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
        { refreshToken: tokens.refreshToken }
      );

      this.setTokens(response.data);
      return response.data.accessToken;
    } catch (error) {
      throw new ApiError(
        axios.isAxiosError(error) ? error.response?.status ?? 500 : 500,
        'Failed to refresh token'
      );
    }
  }

  private handleRefreshError(error: unknown): void {
    this.processQueue(error);
    this.clearTokens();
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  private processQueue(error: unknown = null, token: string | null = null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else if (token) resolve(token);
    });
    this.failedQueue = [];
  }

  // Public methods
  setTokens({ accessToken, refreshToken }: TokenPayload): void {
    this.tokenStorage.setTokens({ accessToken, refreshToken });
    this.api.defaults.headers.common[API_CONSTANTS.AUTH_HEADER] = this.getAuthHeader(accessToken);
  }

  clearTokens(): void {
    this.tokenStorage.clearTokens();
    delete this.api.defaults.headers.common[API_CONSTANTS.AUTH_HEADER];
  }

  async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.request<T>(config);
      return this.transformResponse(response);
    } catch (error) {
      return this.handleRequestError(error);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  }

  private handleRequestError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status ?? 500,
        error.response?.statusText ?? 'Unknown error',
        error.response?.data
      );
    }
    throw error;
  }
}

export const apiService = ApiService.getInstance();