import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Public } from 'src/utils/decorators';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  sendMessage(@Request() req, @Body() body: SendMessageDto) {
    return this.chatService.sendMessage({ ...body, senderId: req.user.userId });
  }

  @Get('/all')
  @Public()
  findAll() {
    return this.chatService.findAll();
  }

  @Get('/between-users')
  @Public()
  findBetweenusers(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
  ) {
    return this.chatService.findBetweenUsers(userId1, userId2);
  }
}
