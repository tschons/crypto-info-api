import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashServiceInterface } from '../../shared/interfaces/hash-service.interface';

@Injectable()
export class BcryptHashService implements HashServiceInterface {
  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
