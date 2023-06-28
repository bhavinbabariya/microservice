import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('exception : ', exception);
    return of(exception['response']);
  }
}
