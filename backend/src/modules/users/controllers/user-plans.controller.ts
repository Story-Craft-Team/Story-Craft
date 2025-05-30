import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { UserPlansService } from "../services/user-plans.service";
import { Plan, Role } from "@prisma/client";
import { AuthRequest } from "src/common/types";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/deffault/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/modules/deffault/auth/decorators/roles.decorator";
import { SetPlan, CheckPlan, CheckSecondLevel, CheckFirstLevel } from "../responses/user-plans.response";
import { PlansGuard } from "src/common/guards/plans.guard";
import { Plans } from "src/modules/deffault/auth/decorators/plans.decorator";

@ApiTags('User - plans')
@Controller('users/plans')
export class UserPlansController{
    constructor(private readonly userPlansService:UserPlansService) {}

    @ApiOperation({ summary: 'Set new plan for user' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.admin)
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiBody({ 
        schema: {
            type: 'object',
            properties: {
                plan: { type: 'string', enum: Object.values(Plan) },
            },
            example: {
                plan: Plan.level_1,
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Plan has been successfully changed.',
        type: SetPlan
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Patch(':id')
    setPlan(@Param('id') id: string, @Body() body: {plan: Plan}){
        return this.userPlansService.setPlan(+id, body)
    }

    @ApiOperation({ summary: 'Receiving current plan of this user' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Current plan of this user received',
        type: CheckPlan
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Post()
    checkPlan(@Request() req: AuthRequest){
        return this.userPlansService.checkPlan(+req.user.id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PlansGuard)
    @Plans(Plan.level_1, Plan.level_2)
    @ApiOperation({ summary: 'User`s plan level check' })
    @ApiResponse({
        status: 200,
        description: 'Current plan of this user received',
        type: CheckFirstLevel
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Get('firstLevel')
    checkFirstLevel() {
        return {
            "lvl1": true
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PlansGuard)
    @Plans(Plan.level_2)
    @ApiOperation({ summary: 'User`s plan level check' })
        @ApiResponse({
        status: 200,
        description: 'User`s plan level checked',
        type: CheckSecondLevel
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Get('secondLevel')
    checkSecondLevel() {
        return {
            "lvl2": true
        }
    }
}