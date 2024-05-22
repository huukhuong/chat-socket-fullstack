import { MessageModel } from '@models/MessageModel';
import api from './api';

const findMessagesBetweenUsers = async (userId1?: string, userId2?: string) => {
  return await api.get<MessageModel[]>('chat/between-users', {
    params: {
      userId1,
      userId2,
    },
  });
};

const chatService = {
  findMessagesBetweenUsers,
};
export default chatService;
