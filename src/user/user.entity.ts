import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEnum } from '../shared/enums/profile.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 80 })
  email: string;

  @Column({ select: false, length: 80 })
  password: string;

  @Column({ type: 'enum', enum: ProfileEnum })
  profile: ProfileEnum = ProfileEnum.Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
