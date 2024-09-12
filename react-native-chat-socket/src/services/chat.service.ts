import { MessageModel } from '@models/MessageModel';
import api from './api';
import { UserWithLastMessageModel } from '@models/UserWithLastMessageModel';

const findMessagesBetweenUsers = async (userId1?: string, userId2?: string) => {
  return await api.get<MessageModel[]>(
    `/chat/between-users/${userId1}/${userId2}`,
  );
};

const getFriendsWithLastestMessage = async (userId?: string) => {
  return await api.get<UserWithLastMessageModel[]>(
    `/chat/friend-with-last-message/${userId}`,
  );
};

const chatService = {
  findMessagesBetweenUsers,
  getFriendsWithLastestMessage,
};
export default chatService;
