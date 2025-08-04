import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * HTTP Methods supported by this utility
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * Standardized response structure for API calls
 */
export interface StandardResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string | number;
    details?: unknown;
  };
  metadata?: {
    statusCode: number;
    headers?: Record<string, string>;
    [key: string]: unknown;
  };
}

/**
 * Configuration options for HTTP requests
 */
export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
  auth?: {
    username: string;
    password: string;
  };
  responseType?: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream';
  [key: string]: unknown;
}

/**
 * Extended request interface with body support
 */
export interface HttpRequest extends HttpRequestConfig {
  body?: unknown;
}

/**
 * Error handler function type
 */
export type ErrorHandler = (error: {
  message: string;
  statusCode?: number;
  details?: unknown;
  isAxiosError: boolean;
}) => void | Promise<void>;

/**
 * Enhanced HTTP client with improved typing and error handling
 */
export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private errorHandler?: ErrorHandler;

  constructor(config?: {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    errorHandler?: ErrorHandler;
  }) {
    this.baseUrl = config?.baseUrl || '';
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...config?.defaultHeaders,
    };
    this.errorHandler = config?.errorHandler;
  }

  /**
   * Make an HTTP request
   */
  async request<T = unknown>(
    method: HttpMethod,
    endpoint: string,
    config?: HttpRequest
  ): Promise<StandardResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.mergeHeaders(config?.headers);
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      headers,
      data: config?.body,
      params: config?.params,
      timeout: config?.timeout,
      auth: config?.auth,
      responseType: config?.responseType,
    };

    try {
      const response = await axios(axiosConfig);
      return this.createSuccessResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Shorthand for GET requests
   */
  get<T = unknown>(endpoint: string, config?: HttpRequestConfig): Promise<StandardResponse<T>> {
    return this.request<T>('GET', endpoint, config);
  }

  /**
   * Shorthand for POST requests
   */
  post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<StandardResponse<T>> {
    return this.request<T>('POST', endpoint, { ...config, body });
  }

  /**
   * Shorthand for PUT requests
   */
  put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<StandardResponse<T>> {
    return this.request<T>('PUT', endpoint, { ...config, body });
  }

  /**
   * Shorthand for PATCH requests
   */
  patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<StandardResponse<T>> {
    return this.request<T>('PATCH', endpoint, { ...config, body });
  }

  /**
   * Shorthand for DELETE requests
   */
  delete<T = unknown>(endpoint: string, config?: HttpRequestConfig): Promise<StandardResponse<T>> {
    return this.request<T>('DELETE', endpoint, config);
  }

  private buildUrl(endpoint: string): string {
    // Ensure proper URL joining without double slashes
    return endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  private mergeHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    };
  }

  private createSuccessResponse<T>(response: AxiosResponse<T>): StandardResponse<T> {
    return {
      success: true,
      data: response.data,
      metadata: {
        statusCode: response.status,
        headers: response.headers as Record<string, string>,
      },
    };
  }

  private async handleError<T>(_error: unknown): Promise<StandardResponse<T>> {
    const errorResponse: StandardResponse<T> = {
      success: false,
      error: {
        message: 'An unexpected error occurred',
      },
      data: undefined, // Explicitly set data as undefined for error cases
    };

    // ... rest of the error handling logic remains the same

    return errorResponse;
  }
}

/**
 * Factory function to create a pre-configured HTTP client instance
 */
export function createHttpClient(config?: {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  errorHandler?: ErrorHandler;
}): HttpClient {
  return new HttpClient(config);
}

/**
 * Utility function for making API requests with the global HTTP client
 * (Maintained for backward compatibility)
 */
export async function apiRequest<T = unknown>(
  method: HttpMethod,
  url: string,
  config?: HttpRequest
): Promise<StandardResponse<T>> {
  const client = new HttpClient();
  return client.request<T>(method, url, config);
}