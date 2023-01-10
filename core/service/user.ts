import axios from 'axios'
import Cookies from 'js-cookie'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export type RegisterInput = {
  email: string
  password: string
}

type LoginInput = RegisterInput

export type VerifyInput = {
  userId: string
  otp: string
}
const token = Cookies.get('access_token')

export const authApi = axios.create({
  baseURL: publicRuntimeConfig.BASE_URL
  // headers: { Authorization: `Bearer ${token}` }
})

export const getMe = (token: string | undefined) => {
  return authApi.get('user/me', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data)
}

export const signUpUser = async (user: RegisterInput) => {
  const response = await authApi.post('user/signup', user).then((res) => res.data)
  return response.data
}

export const signIn = async (user: LoginInput) => {
  const response = await axios.post(`${publicRuntimeConfig.BASE_URL}signin`, user)
  return response.data
}

export const verify = async (data: VerifyInput) => {
  const response = await axios.post(`${publicRuntimeConfig.BASE_URL}user/verify`, data)
  return response.data
}
