import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONSTANTS, AUTH_CONSTANTS } from "./constants/constants-api";
import { CSRFService } from "./CSRF-service";
import { TokenPayload } from "./interfaces/token-payload";
export class ApiService {
  private static instance: ApiService;
  public api: AxiosInstance;
  private csrfService: CSRFService;
  private refreshing: boolean = false;
  private refreshPromise: Promise<TokenPayload> | null = null;
  private refreshSubscribers: Array<(tokens: TokenPayload) => void> = [];

  private constructor() {
    this.api = axios.create({
      baseURL: API_CONSTANTS.BASE_URL,
      withCredentials: true,
      timeout: 30000,
    });
    
    this.csrfService = new CSRFService();
    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public getAuthHeader(token: string): string {
    return `${AUTH_CONSTANTS.TOKEN_PREFIX}${token}`;
  }

  public setTokens(tokens: TokenPayload): void {
    this.api.defaults.headers.common[AUTH_CONSTANTS.AUTH_HEADER] = 
      this.getAuthHeader(tokens.accessToken);
    
    // Establecer CSRF token para solicitudes no GET
    if (this.csrfService.getToken()) {
      this.api.defaults.headers.common[AUTH_CONSTANTS.CSRF_HEADER] = 
        this.csrfService.getToken();
    } else {
      const newToken = this.csrfService.generateToken();
      this.api.defaults.headers.common[AUTH_CONSTANTS.CSRF_HEADER] = newToken;
    }
  }

  public clearTokens(): void {
    delete this.api.defaults.headers.common[AUTH_CONSTANTS.AUTH_HEADER];
    delete this.api.defaults.headers.common[AUTH_CONSTANTS.CSRF_HEADER];
  }

  private setupInterceptors(): void {
    // Interceptor de solicitud
    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Añadir CSRF token para métodos no seguros
        if (config.method && ['post', 'put', 'delete', 'patch'].includes(config.method)) {
          const token = this.csrfService.getToken();
          if (token && config.headers) {
            config.headers[AUTH_CONSTANTS.CSRF_HEADER] = token;
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Interceptor de respuesta para manejar errores 401 y refrescar el token
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // Si la solicitud ya fue retintentada o no hay config, rechazar directamente
        if (!originalRequest || originalRequest._retry) {
          return Promise.reject(error);
        }

        // Si es error 401 (no autorizado), intentar refrescar el token
        if (error.response?.status === 401) {
          if (this.refreshing) {
            // Si ya está refrescando, añadir esta solicitud a la cola
            return new Promise((resolve) => {
              this.refreshSubscribers.push((tokens: TokenPayload) => {
                // Reintento con el nuevo token
                if (originalRequest.headers) {
                  originalRequest.headers[AUTH_CONSTANTS.AUTH_HEADER] = 
                    this.getAuthHeader(tokens.accessToken);
                }
                originalRequest._retry = true;
                resolve(this.api(originalRequest));
              });
            });
          }

          // Iniciar proceso de refresh
          this.refreshing = true;
          try {
            if (!this.refreshPromise) {
              this.refreshPromise = this.refreshAccessToken();
            }
            
            const tokens = await this.refreshPromise;
            
            // Notificar a todos los suscriptores
            this.refreshSubscribers.forEach(callback => callback(tokens));
            this.refreshSubscribers = [];
            
            // Reintento con el nuevo token
            if (originalRequest.headers) {
              originalRequest.headers[AUTH_CONSTANTS.AUTH_HEADER] = 
                this.getAuthHeader(tokens.accessToken);
            }
            originalRequest._retry = true;
            return this.api(originalRequest);
          } catch (err) {
            // Si falla el refresh, disparar evento para cerrar sesión
            window.dispatchEvent(new CustomEvent('auth:session-expired'));
            return Promise.reject(error);
          } finally {
            this.refreshing = false;
            this.refreshPromise = null;
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<TokenPayload> {
    const response = await this.api.post<TokenPayload>('/auth/refresh');
    return response.data;
  }
}


