import { Injectable } from "@nestjs/common";
import { Plan, User } from "@prisma/client";
import { HelpersService } from "src/modules/deffault/helpers/services/helpers.service";
import { PrismaService } from "src/modules/deffault/prisma/prisma.service";

@Injectable()
export class UserPlansService {

    constructor(private readonly helpers: HelpersService,
        private readonly prisma: PrismaService,
    ) {}

    async setPlan(id: number, body:{plan: Plan}){
        try{
            await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');

            const plan = body.plan

            const updatedUser = await this.prisma.user.update({
                where: { id: id },
                data: { 
                    plan: plan,
                    planWillDeleteAt: new Date(new Date().setDate(new Date().getDate() + 14)),
                    planCreatedAt: new Date()
                }
            });

            return updatedUser
        }catch(error){
            throw error
        }
    }

    async checkPlan(id: number){
        try{
            await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');
            
            const updatedUser = await this.prisma.user.findUnique({
                where: { id: id }
            });

            return {
                plan: updatedUser?.plan,
                planWillDeleteAt: updatedUser?.planWillDeleteAt,
                planCreatedAt: updatedUser?.planCreatedAt
            }
        }catch(error){
            throw error
        }
    }
}