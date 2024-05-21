import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
