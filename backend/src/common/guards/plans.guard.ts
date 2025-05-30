import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Plan } from '@prisma/client';
import { PLANS_KEY } from 'src/modules/deffault/auth/decorators/plans.decorator';

@Injectable()
export class PlansGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPlans = this.reflector.getAllAndOverride<Plan[]>(
      PLANS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPlans) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!requiredPlans.includes(user.plan)) {
      throw new ForbiddenException(
        `Access denied: required plan(s): ${requiredPlans.join(', ')}, but current plan is: ${user.plan}`,
      );
    }

    return true;
  }
}