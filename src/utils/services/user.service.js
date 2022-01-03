import apiClient from '../axios/apiClient'

export const loginRequest = (data) => {
  return apiClient.postRequest('/company/login', data)
}

export const logoutRequest = () => {
  return apiClient.getRequest('/user/logout')
}

export const registerRequest = (data) => {
  return apiClient.postRequest('/company/register', data)
}

export const placeBetApi = (data) => {
  return apiClient.postRequest('/demo/place-bet', data)
}
