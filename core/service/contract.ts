import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

type queryParams = {
  customerId: string
  status: boolean | undefined
}

export const getContracts = async (query: queryParams) => {
  const response = await axios.get(`${publicRuntimeConfig.BASE_URL}/contract`, {
    params: query
  })
  return response.data
}

export const getContract = async (contractId: string) => {
  const response = await axios.get(`${publicRuntimeConfig.BASE_URL}/contract/${contractId}`)
  return response.data
}

export const createContract = async (data: any) => {
  const response = await axios.post(`${publicRuntimeConfig.BASE_URL}/contract/create`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const uploadFile = async (data: any) => {
  const response = await axios.post(`${publicRuntimeConfig.BASE_URL}/contract/upload`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}
