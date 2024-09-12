import { HttpStatus } from '@nestjs/common';

interface IResponse<T> {
  statusCode?: HttpStatus;
  isSuccess?: boolean;
  data?: T;
  message?: string | Array<string>;
  pagination?: Pagination;
}

interface Pagination {
  totalCount: number;
  totalPages: number;
  recordsPerPage: number;
  currentPage: number;
}

export default class BaseResponse<T> implements IResponse<T> {
  statusCode: HttpStatus;
  isSuccess: boolean;
  data: T | null;
  message: string | string[];
  pagination?: Pagination;

  constructor(params: IResponse<T>) {
    this.statusCode = params.statusCode || 200;
    this.isSuccess = params.isSuccess || true;
    this.data = params.data || null;
    this.message = params.message || '';
    this.pagination = params.pagination || null;
    return this;
  }
}
