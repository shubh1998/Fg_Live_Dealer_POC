import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './User/userReducer'

export const rootReducer = combineReducers({
  userReducer
})
