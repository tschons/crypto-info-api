import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  Request,
  UseFilters,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { UpdateUserInputDto } from './dtos/update-user-input.dto';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UpdatePasswordInputDto } from './dtos/update-password-input.dto';
import { UpdatePasswordUserCase } from './use-cases/update-password.user-case';
import { UserOutputDto } from './dtos/user-output.dto';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { GetUsersInputDto } from './dtos/get-users.input.dto';
import { Response } from 'express';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { EntityNotFoundFilter } from '../shared/filters/entity-not-found.filter';
import { Profile } from '../shared/decorators/profile.decorator';
import { ProfileEnum } from '../shared/enums/profile.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProfileGuard } from '../shared/guards/profile.guard';
import { AccessTokenPayload } from '../shared/value-objects/access-token-payload';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), ProfileGuard)
@Controller('users')
@UseFilters(EntityNotFoundFilter)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUserCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  @Profile(ProfileEnum.Admin)
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    return this.createUserUseCase.execute(createUserInputDto);
  }

  @Get()
  @Profile(ProfileEnum.Admin)
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
    @Request() request,
  ): Promise<UserOutputDto> {
    const accessTokenPayload = request.user as AccessTokenPayload;
    if (
      userId !== accessTokenPayload.sub &&
      accessTokenPayload.role !== ProfileEnum.Admin
    )
      throw new UnauthorizedException('You can only change your own profile');

    return this.updateUserUseCase.execute(userId, updateUserInputDto);
  }

  @Patch('/:userId/password')
  async updatePassword(
    @Param('userId') userId: string,
    @Body() updatePasswordInputDto: UpdatePasswordInputDto,
    @Request() request,
  ): Promise<void> {
    const accessTokenPayload = request.user as AccessTokenPayload;
    if (userId !== accessTokenPayload.sub)
      throw new UnauthorizedException('You can only change your own password');

    return this.updatePasswordUseCase.execute(userId, updatePasswordInputDto);
  }
}
