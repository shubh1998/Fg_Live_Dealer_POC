import { configureStore } from '@reduxjs/toolkit'
import { rootReducer as reducer } from './redux'

export const store = configureStore({
  reducer
})
