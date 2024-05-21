import io from 'socket.io-client';
import Constants from '../utils/constants';

const socket = io(Constants.URL);

export default socket;
