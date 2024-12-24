import { describe, it, expect, vi, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { API_CONSTANTS } from './constants/constants-api';
import { ApiError } from './api-error';
import { apiService } from './api-service';

const mock = new MockAdapter(axios);

describe('ApiService', () => {
  const mockResponse = { message: 'success' };
  const endpoint = '/test-endpoint';
  const fullUrl = `${API_CONSTANTS.BASE_URL}${endpoint}`;

  beforeEach(() => {
    mock.reset();
  });

  describe('GET Requests', () => {
    it('should perform a GET request successfully', async () => {
      mock.onGet(fullUrl).reply(200, mockResponse);

      const response = await apiService.get(endpoint);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle GET request errors', async () => {
      mock.onGet(fullUrl).reply(500);

      await expect(apiService.get(endpoint)).rejects.toThrow(ApiError);
    });
  });

  describe('Token Refresh', () => {
    it('should refresh token on 401 response and retry request', async () => {
      const newAccessToken = 'new-access-token';
      const refreshResponse = {
        accessToken: newAccessToken,
        refreshToken: 'new-refresh-token',
      };

      const tokenStorageMock = {
        getStoredTokens: vi.fn(() => ({
          accessToken: 'expired-token',
          refreshToken: 'valid-refresh-token',
        })),
        setTokens: vi.fn(),
        clearTokens: vi.fn(),
      };

      // Mock para las solicitudes
      mock
        .onGet(fullUrl)
        .replyOnce(401) // Primera solicitud falla con 401
        .onPost(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.REFRESH_TOKEN}`)
        .reply(200, refreshResponse) // La renovación del token tiene éxito
        .onGet(fullUrl)
        .reply(200, mockResponse); // La solicitud se reintenta con éxito

      // Sobrescribir el almacenamiento de tokens
      (apiService as any).tokenStorage = tokenStorageMock;

      const response = await apiService.get(endpoint);

      // Validaciones
      expect(tokenStorageMock.setTokens).toHaveBeenCalledWith(refreshResponse);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockResponse);
    });

    it('should clear tokens and notify on token refresh failure', async () => {
      mock
        .onGet(fullUrl)
        .replyOnce(401) // Primera solicitud falla con 401
        .onPost(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.REFRESH_TOKEN}`)
        .reply(401); // Fallo al renovar el token

      const tokenStorageMock = {
        getStoredTokens: vi.fn(() => ({
          accessToken: 'expired-token',
          refreshToken: 'invalid-refresh-token',
        })),
        setTokens: vi.fn(),
        clearTokens: vi.fn(),
      };

      (apiService as any).tokenStorage = tokenStorageMock;

      // Verifica que el evento `auth:logout` sea emitido
      const logoutEventSpy = vi.spyOn(window, 'dispatchEvent');

      await expect(apiService.get(endpoint)).rejects.toThrow(ApiError);

      expect(tokenStorageMock.clearTokens).toHaveBeenCalled();
      expect(logoutEventSpy).toHaveBeenCalledWith(new CustomEvent('auth:logout'));
    });
  });

  describe('Error Handling', () => {
    it('should throw a custom ApiError for Axios errors', async () => {
      mock.onGet(fullUrl).reply(404, { error: 'Not found' });

      await expect(apiService.get(endpoint)).rejects.toThrow(ApiError);
      await expect(apiService.get(endpoint)).rejects.toMatchObject({
        statusCode: 404,
        message: 'Not found',
      });
    });

    it('should throw a generic error for non-Axios errors', async () => {
      const faultyService = {
        request: () => {
          throw new Error('Unexpected error');
        },
      };

      await expect(() => faultyService.request()).toThrow('Unexpected error');
    });
  });

  describe('Request Methods', () => {
    it('should perform a POST request', async () => {
      const postData = { key: 'value' };
      mock.onPost(fullUrl).reply(201, mockResponse);

      const response = await apiService.post(endpoint, postData);

      expect(response.status).toBe(201);
      expect(response.data).toEqual(mockResponse);
    });

    it('should perform a DELETE request', async () => {
      mock.onDelete(fullUrl).reply(204);

      const response = await apiService.delete(endpoint);

      expect(response.status).toBe(204);
    });
  });
});
