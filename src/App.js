import React from 'react'
import './styles/App.css'
import { store } from './redux-thunk/store'
import AppRoutes from './routes'
import { Provider } from 'react-redux'
import { SocketContext, socket } from './context/socket'

function App () {
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </SocketContext.Provider>
  )
}

export default App
