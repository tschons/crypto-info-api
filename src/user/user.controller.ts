import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { UpdateUserInputDto } from './dtos/update-user-input.dto';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UserOutputDto } from './dtos/user-output.dto';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { GetUsersInputDto } from './dtos/get-users.input.dto';
import { Response } from 'express';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { EntityNotFoundFilter } from '../shared/filters/entity-not-found.filter';

@Controller('users')
@UseFilters(EntityNotFoundFilter)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    return this.createUserUseCase.execute(createUserInputDto);
  }

  @Get()
  async getUsers(
    @Query() getUsersInputDto: GetUsersInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserOutputDto[]> {
    const paginatedUsers = await this.getUsersUseCase.execute(getUsersInputDto);

    response.set('X-Page', paginatedUsers.page.toString());
    response.set('X-Page-Size', paginatedUsers.pageSize.toString());
    response.set('X-Total-Items', paginatedUsers.totalItems.toString());
    response.set('X-Total-Pages', paginatedUsers.totalPages.toString());

    return paginatedUsers.items;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string): Promise<UserOutputDto> {
    return this.getUserByIdUseCase.execute(userId);
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserInputDto: UpdateUserInputDto,
  ): Promise<UserOutputDto> {
    return this.updateUserUseCase.execute(userId, updateUserInputDto);
  }
}
