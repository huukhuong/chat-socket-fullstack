import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
