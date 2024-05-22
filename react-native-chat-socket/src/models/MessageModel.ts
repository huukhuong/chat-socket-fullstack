export interface MessageModel {
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image';
}
