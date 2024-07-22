// src/interceptors/timezone.interceptor.ts
// This modification ensures that the interceptor always converts dates to formatted strings,
// which is typically what you want for API responses.
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateConverter } from '../utils/date-converter.util';

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => DateConverter.convertDates(data, false)));
  }
}
