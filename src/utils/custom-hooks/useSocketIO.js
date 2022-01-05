import socketio from 'socket.io-client'
import { SOCKET_URL } from '../../config'

export const useSocketIO = () => {
  const socket = socketio.connect(SOCKET_URL)
  return socket
}
