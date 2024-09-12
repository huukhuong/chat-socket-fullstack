import { ApiProperty } from '@nestjs/swagger';

export class RequestFriendDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  userRequestId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  userTargetId: string;
}
