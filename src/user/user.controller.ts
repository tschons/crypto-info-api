import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { CreateUserOutputDto } from './dtos/create-user-output.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    return await this.createUserUseCase.execute(createUserInputDto);
  }
}
