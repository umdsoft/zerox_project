import { io } from 'socket.io-client';
import { storage } from '../store/api/token/getToken';

class SocketService {
  socket;

  constructor() {
    this.socket = io('https://app.zerox.uz', {
      autoConnect: true,
      timeout: 5000,
      rejectUnauthorized: false,
      auth: {
        token: storage.getString('token'),
      },
    });
  }

  initial() {
    this.socket.connect();
    this.socket.on('connect', () => { });
    this.socket.on('connect_error', error => {
      console.log(error);
    });
  }

  getId() {
    return this.socket.id;
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }
  emit(event, data) {
    this.socket.emit(event, data);
  }
  connected() {
    return this.socket.connected ? 'Online' : 'Offline';
  }
}

const socketService = new SocketService();

export default socketService;
