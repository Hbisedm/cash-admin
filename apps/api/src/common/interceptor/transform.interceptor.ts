import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { PASS_RESP_META_KEY } from '../decorator/passResp';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = Reflect.getMetadata(PASS_RESP_META_KEY, context.getHandler());

    if (type) {
      const request = context.switchToHttp().getRequest<Request>();
      this.logger.log(PASS_RESP_META_KEY, request.url);
      return next.handle().pipe(map((data) => data));
    } else {
      return next.handle().pipe(
        map((data) => {
          return {
            data,
            code: 0,
            msg: '请求成功',
          };
        }),
      );
    }
  }
}
