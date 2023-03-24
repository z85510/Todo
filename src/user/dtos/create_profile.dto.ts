import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'string' })
  firstName: string;

  @ApiProperty({ type: 'string', format: 'string' })
  lastName?: string;

  @ApiProperty({ type: 'string', format: 'email' })
  email?: string;

  @ApiProperty({ type: 'string', format: 'mobile' })
  mobileNumber?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  birthDate?: Date;
}
