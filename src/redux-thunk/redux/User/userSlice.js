import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userLogout, userRegister } from '../../thunk/User'
const defaultState = {
  name: localStorage.getItem('name') || 'loading...',
  isLoggedIn: !!localStorage.getItem('authtoken')
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: defaultState,
  reducers: {
    loggedIn: (state, action) => {},
    signUpUser: (state, action) => {},
    setIsLoggedIn: (state, action) => {
      // console.log(action.payload)
      return {
        ...state,
        isLoggedIn: action.payload.status,
        name: action.payload.name
      }
    },
    logOut: (state, action) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggedin = true
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoggedin = false
        localStorage.clear()
      })
      .addCase(userRegister.fulfilled, (state, action) => {})
  }
})

export const { loggedIn, signUpUser, setIsLoggedIn, logOut } = userSlice.actions

export default userSlice.reducer
