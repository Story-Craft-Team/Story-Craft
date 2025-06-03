import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserAuthService } from 'src/modules/users/services/user-auth.service';
import { UserAuthHelperService } from '../../helpers/services/user-auth.helpers.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userAuthHelperService: UserAuthHelperService) {
    super();
  }

  handleRequest<TUser = User>(
    err: any,
    user: TUser,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }

    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    const token = this.getTokenFromRequest(context);
    
    const isRevoked = await this.userAuthHelperService.isTokenRevoked(token);
    if (isRevoked || !token) {
      throw new ForbiddenException('Token has been revoked');
    }

    return true;
  }

  private getTokenFromRequest(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    return request?.headers?.authorization?.split(' ')[1] || '';
  }
}