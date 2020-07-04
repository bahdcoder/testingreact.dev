import AxiosPackage from 'axios'
import { BASE_URL } from './constants'

export const Axios = AxiosPackage.create({
  baseURL: BASE_URL,
})
