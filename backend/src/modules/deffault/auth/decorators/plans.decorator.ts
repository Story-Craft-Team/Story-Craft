import { SetMetadata } from '@nestjs/common';
import { Plan } from '@prisma/client';

export const PLANS_KEY = 'plans';
export const Plans = (...plans: Plan[]) => SetMetadata(PLANS_KEY, plans);