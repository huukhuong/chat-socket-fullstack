import { HttpException, HttpStatus } from '@nestjs/common';

export default class BaseException extends HttpException {
  constructor({
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    message = 'Error occurred',
  }: {
    statusCode: HttpStatus;
    message: string;
  }) {
    super(
      {
        statusCode,
        isSuccess: false,
        data: null,
        message,
      },
      statusCode,
    );
  }
}
