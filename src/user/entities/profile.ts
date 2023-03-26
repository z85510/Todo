import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_profiles' })
export class Profile {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true })
  mobileNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  birthDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class CreateUserProfileParamsValidator {
  @Type(() => Profile)
  @ValidateNested()
  userProfileDetail: Profile;
}
