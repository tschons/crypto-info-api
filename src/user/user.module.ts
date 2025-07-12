import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
