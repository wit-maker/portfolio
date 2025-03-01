export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface ApiResponseWrapper<T> {
  status: 'success' | 'error';
  data: {
    apps: T[];
  };
}

export interface ApiError {
  status: string;
  message: string;
  code?: string;
}

export interface ApiRequestConfig {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export class ApiResponseError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }
}