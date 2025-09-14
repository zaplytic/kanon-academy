export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: T | string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
