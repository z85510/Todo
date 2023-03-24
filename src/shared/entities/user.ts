import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo';
import { Profile } from '../../user/entities/profile';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({ type: 'number', format: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'password', description: 'The user password' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ type: Profile, format: 'profile' })
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @ApiProperty({ type: () => Todo, format: 'table' })
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
