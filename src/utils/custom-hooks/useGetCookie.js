import Cookies from 'universal-cookie'

export const useGetCookie = () => {
  const cookies = new Cookies()
  const userId = cookies.get('userId')
  return JSON.parse(userId)
}
