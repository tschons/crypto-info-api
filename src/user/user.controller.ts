import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseFilters,
  UseGuards,
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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProfileGuard } from '../shared/guards/profile.guard';
import { AccessTokenPayload } from '../shared/value-objects/access-token-payload';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { DuplicateKeyFilter } from '../shared/filters/duplicate-key.filter';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), ProfileGuard)
@Controller('users')
@UseFilters(EntityNotFoundFilter, DuplicateKeyFilter)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUserCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post()
  @Profile(ProfileEnum.Admin)
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    return this.createUserUseCase.execute(createUserInputDto);
  }

  @ApiOperation({
    summary:
      'Get all users or filtered users by name, email or profile - paginated',
  })
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

  @ApiOperation({ summary: 'Get a user by id' })
  @Get('/:userId')
  async getUserById(
    @Param('userId') userId: string,
    @Request() request,
  ): Promise<UserOutputDto> {
    const accessTokenPayload = request.user as AccessTokenPayload;

    if (
      accessTokenPayload.role !== ProfileEnum.Admin &&
      userId !== accessTokenPayload.sub
    )
      throw new ForbiddenException('You can only get your own profile');

    return this.getUserByIdUseCase.execute(userId);
  }

  @ApiOperation({ summary: 'Update a user' })
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
      throw new ForbiddenException('You can only change your own profile');

    if (
      updateUserInputDto.profile &&
      accessTokenPayload.role !== ProfileEnum.Admin
    )
      throw new ForbiddenException('Only admins can change the profile');

    return this.updateUserUseCase.execute(userId, updateUserInputDto);
  }

  @ApiOperation({ summary: 'Update a user password' })
  @Patch('/:userId/password')
  async updatePassword(
    @Param('userId') userId: string,
    @Body() updatePasswordInputDto: UpdatePasswordInputDto,
    @Request() request,
  ): Promise<void> {
    const accessTokenPayload = request.user as AccessTokenPayload;
    if (userId !== accessTokenPayload.sub)
      throw new ForbiddenException('You can only change your own password');

    return this.updatePasswordUseCase.execute(userId, updatePasswordInputDto);
  }

  @ApiOperation({ summary: 'Remove a user' })
  @Profile(ProfileEnum.Admin)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.deleteUserUseCase.execute(userId);
  }
}
