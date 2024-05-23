import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Message } from './message.entity';
import { ChatGateway } from './chat.gateway';
import { UserDeviceService } from 'src/user-device/user-device.service';
import { UserDevice } from 'src/user-device/user-device.entity';
import { UserRelationship } from 'src/user-relationship/user-relationship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Message, UserDevice, UserRelationship]),
  ],
  controllers: [ChatController],
  providers: [AuthService, ChatService, UserDeviceService, ChatGateway],
})
export class ChatModule {}
