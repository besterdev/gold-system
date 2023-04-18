import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

type queryParams = {
  page: number
  limit: number
  searchWord: string
}

export const getCustomers = async (query: queryParams) => {
  const response = await axios.get(`${publicRuntimeConfig.BASE_URL}/customer`, {
    params: query
  })
  return response.data
}

export const getCustomer = async (customerId: string) => {
  const response = await axios.get(`${publicRuntimeConfig.BASE_URL}/customer/${customerId}`)
  return response.data
}

export const createCustomer = async (data: any) => {
  const response = await axios.post(`${publicRuntimeConfig.BASE_URL}/customer/create`, data)
  return response.data
}
