import apiClient from '../axios/apiClient'

export const placeBetApi = (data) => {
  return apiClient.postRequest('/demo/place-bet', data)
}

export const getPreGameDataApi = (data) => {
  return apiClient.postRequest('/demo/game-data', data)
}

export const gameResult = (data) => {
  return apiClient.postRequest('/demo/game-result', data)
}

export const stopRound = (data) => {
  return apiClient.postRequest('/demo/stop-round', data)
}
