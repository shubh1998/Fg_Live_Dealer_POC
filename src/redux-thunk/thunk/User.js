import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginRequest, logoutRequest, registerRequest } from '../../utils/services/user.service'

export const userLogin = createAsyncThunk('user/login', async (loginData, thunkApi) => {
  try {
    const res = await loginRequest(loginData)
    if (res.data.success) {
      localStorage.setItem('authtoken', res.headers.authtoken)
    }
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const userRegister = createAsyncThunk('user/register', async (registerData, thunkApi) => {
  try {
    const res = await registerRequest(registerData)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const userLogout = createAsyncThunk('user/logout', async () => {
  const res = await logoutRequest()
  return res
})
