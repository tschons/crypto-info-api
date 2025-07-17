import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DuplicateKeyException } from '../exceptions/duplicate-key.exception';

@Catch(DuplicateKeyException)
export class DuplicateKeyFilter implements ExceptionFilter {
  catch(exception: DuplicateKeyException, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
    });
  }
}
