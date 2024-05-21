import { ApiProperty } from '@nestjs/swagger';
import { EContentType } from '../EContentType';

export class SendMessageDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  senderId?: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  receiverId: string;

  @ApiProperty()
  content: string;

  @ApiProperty({
    enum: EContentType,
    description: 'Type of the content, can be either text or image',
  })
  type: EContentType;
}
