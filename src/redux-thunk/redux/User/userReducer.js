import { createReducer } from '@reduxjs/toolkit'
import { userLogin, userLogout, userRegister } from '../../thunk/User'

const initialState = {
  isLoggedin: true
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userLogin.fulfilled, (state, action) => {
      state.isLoggedin = true
    })
    .addCase(userLogout.fulfilled, (state, action) => {
      state.isLoggedin = false
      localStorage.clear()
    })
    .addCase(userRegister.fulfilled, (state, action) => { })
})
