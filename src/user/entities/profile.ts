import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_profiles' })
export class Profile {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ nullable: true })
  birthDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
