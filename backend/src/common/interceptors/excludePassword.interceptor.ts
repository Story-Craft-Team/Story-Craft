import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { KEEP_PASSWORD_KEY } from 'src/modules/deffault/auth/decorators/keepPassword.decorator';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const keepPassword = this.reflector.get<boolean>(
      KEEP_PASSWORD_KEY,
      context.getHandler()
    )

    return next.handle().pipe(
      map(data => {
        if (keepPassword || !data || !data.user) return data;
        
        const { password, ...user } = data.user
        return {
            ...data,
            user
        }
      }),
    );
  }
}