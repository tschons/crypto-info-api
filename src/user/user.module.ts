import { ConsoleLogger, Logger, Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { UpdatePasswordUserCase } from './use-cases/update-password.user-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    Logger,
    CreateUserUseCase,
    UpdateUserUseCase,
    UpdatePasswordUserCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  exports: [
    TypeOrmModule,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
