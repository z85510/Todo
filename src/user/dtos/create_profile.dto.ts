import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ type: 'string', format: 'email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: 'string', format: 'mobile' })
  @IsOptional()
  @IsMobilePhone()
  mobileNumber?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
