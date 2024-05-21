import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: SendMessageDto) {
    await this.messageService.sendMessage(body);
    this.server.emit('message', body.content);
  }
}
