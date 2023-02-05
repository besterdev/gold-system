import axios from 'axios'

const timeout = 5000

export const defaultAppAxiosConfigs = {
  //   timeout: Number.parseInt(`${timeout}`),
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
}

export interface AppAxiosConfig {
  headers: any
}

export const appAxios = (config?: AppAxiosConfig) => {
  const axiosInstance = config ? axios.create(config) : axios.create(defaultAppAxiosConfigs)

  axiosInstance.interceptors.request.use(
    (configParam) => {
      return configParam
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
