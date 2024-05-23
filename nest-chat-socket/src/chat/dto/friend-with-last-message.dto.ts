import { User } from 'src/auth/user.entity';
import { Message } from '../message.entity';

export class FriendWithLastMessageDto {
  user: User;
  lastMessage?: Message;
}
