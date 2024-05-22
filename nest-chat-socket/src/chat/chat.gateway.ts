import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
import { User } from 'src/auth/user.entity';

@Injectable()
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
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
      }

      // cho user online
      this.authService.setOnline(user.userId, true);
      // noti cho user get lại list
      this.server.emit('newUser', {});
    }
  }

  async handleDisconnect(client: any) {
    console.log('handleDisconnect client: ' + client.id);

    try {
      if (client.id) {
        const { data: userId } = await this.userDeviceService.deleteUserSocket(
          client.id,
        );

        // nếu còn socket của user đó => còn online
        // nếu không còn socket nào => offline
        const listSocketIds = await this.userDeviceService.getAllSocketIds(
          client.id,
        );

        await this.authService.setOnline(
          userId || '',
          listSocketIds.length > 0,
        );

        // noti cho user get lại list
        this.server.emit('newUser', {});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserFromToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: SendMessageDto) {
    const { senderId, receiverId } = body;

    // lấy list sockets của người gửi và người nhận
    const listSocketsOfSender =
      await this.userDeviceService.getAllSocketIds(senderId);
    const listSocketsOfReceiver =
      await this.userDeviceService.getAllSocketIds(receiverId);

    await this.chatService.sendMessage(body); // save new message to db
    const emit = this.server;

    const listMessage = await this.chatService.findBetweenUsers(
      senderId,
      receiverId,
    );

    [...listSocketsOfSender, ...listSocketsOfReceiver].map((socketId) => {
      emit.to(socketId).emit('message', listMessage.data);
    });
  }

  @SubscribeMessage('newUser')
  async handleNewUser(@MessageBody() body: User) {
    this.server.emit('newUser', body);
  }
}
