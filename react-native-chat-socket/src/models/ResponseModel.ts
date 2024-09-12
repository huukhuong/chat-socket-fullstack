export interface ResponseModel<T> {
  statusCode?: number;
  isSuccess?: boolean;
  data?: T;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  recordsPerPage: number;
  currentPage: number;
}
