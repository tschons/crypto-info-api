import { Module } from '@nestjs/common';
import { BcryptHashService } from './services/bcrypt-hash.service';

@Module({
  providers: [BcryptHashService],
  exports: [BcryptHashService],
})
export class HashModule {}
