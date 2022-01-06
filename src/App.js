import React from 'react'
import './styles/App.css'
import { store } from './redux-thunk/store'
import AppRoutes from './routes'
import { Provider } from 'react-redux'

function App () {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default App
