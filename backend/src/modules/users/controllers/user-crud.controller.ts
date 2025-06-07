import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Body, Delete, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserCrudService } from '../services/user-crud.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/modules/deffault/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import {
  DeleteResponse,
  UpdateResponse,
  FindOneResponse,
  FindAllResponse,
} from '../responses/user-crud.response';
import { AuthRequest } from 'src/common/types';

@ApiTags('User - crud')
@Controller('users')
export class UserCrudController {
  constructor(private readonly userCrudService: UserCrudService) {}
  
  // Find all users
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users',
    type: FindAllResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'No users found',
  })
  findAll() {
    return this.userCrudService.findAll();
  }

  // Find one
  @Get(':idOrUsername')
  @ApiOperation({ summary: 'Retrieve a single user by ID or username' })
  @ApiParam({ name: 'idOrUsername', type: 'string', description: 'User ID or username' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user based on the provided ID or username',
    type: FindOneResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findOne(@Param('idOrUsername') idOrUsername: string) {
    return this.userCrudService.findOne(idOrUsername);
  }

  // Update
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated.',
    type: UpdateResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Permission denied',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResponse> {
    return this.userCrudService.update(+id, updateUserDto);
  }

  // Delete
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully deleted.',
    type: DeleteResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  remove(@Param('id') id: string): Promise<DeleteResponse> {
    return this.userCrudService.remove(+id);
  }

  // Update Me
  @Patch('me/:updateUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update your profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated.',
    type: UpdateResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  updateMe(
    @Request() req: AuthRequest,
    @Param('updateUserId') updateUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResponse> {
    return this.userCrudService.updateMe(+req.user.id, +updateUserId, updateUserDto);
  }
}
