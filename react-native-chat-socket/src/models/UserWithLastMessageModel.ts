import { MessageModel } from './MessageModel';
import { UserModel } from './UserModel';

export interface UserWithLastMessageModel {
  user: UserModel;
  lastMessage?: MessageModel;
}
