export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data?: T;
  meta?: Meta;
}
