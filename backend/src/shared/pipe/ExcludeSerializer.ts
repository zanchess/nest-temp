import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
export interface Response<T> {
    data: T;
}
@Injectable()
export class ExcludeSerializer<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): any {
        return next.handle().pipe(map((data) => classToPlain(data)));
    }
}
