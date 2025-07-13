import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { UserOutputDto } from './dtos/user-output.dto';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { GetUsersInputDto } from './dtos/get-users.input.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    return await this.createUserUseCase.execute(createUserInputDto);
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
}
