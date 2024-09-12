import Constants from '@utils/constants';
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  initializeSocket(token: string, deviceId: string) {
    this.socket = io(Constants.API_URL, {
      query: { token, deviceId },
    });
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}
const socketService = new SocketService();
export default socketService;
