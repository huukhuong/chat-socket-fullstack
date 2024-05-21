import Constants from '@utils/constants';
import io from 'socket.io-client';

const socket = io(Constants.URL);

export default socket;
