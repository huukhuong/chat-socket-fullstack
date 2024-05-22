import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDeviceService } from 'src/user-device/user-device.service';

@Injectable()
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly messageService: ChatService,
    private readonly authService: AuthService,
    private readonly userDeviceService: UserDeviceService,
  ) {}

  async handleConnection(client: any, ...args: any[]) {
    const { token, deviceId } = client.handshake.query;

    if (token && deviceId) {
      const user: {
        userId: string;
        username: string;
      } = await this.getUserFromToken(token);

      const userFound = await this.authService.findOne(user.userId);
      if (userFound) {
        await this.userDeviceService.addUserDevice({
          userId: user.userId,
          socketId: client.id,
          deviceId,
        });

        console.log('socketId', client.id);
        console.log('userId', user.userId);
        console.log('deviceId', deviceId);
      }
    }
  }

  handleDisconnect(client: any) {
    console.log('handleDisconnect', client.id);
    this.userDeviceService.deleteUserDevice({
      socketId: client.id,
    });
  }

  async getUserFromToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: SendMessageDto) {
    await this.messageService.sendMessage(body);
    this.server.emit('message', body.content);
  }
}
