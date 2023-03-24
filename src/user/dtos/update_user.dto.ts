import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ type: 'string', format: 'string' })
  username?: string;

  @IsString()
  @ApiProperty({ type: 'string', format: 'string' })
  password?: string;
}
