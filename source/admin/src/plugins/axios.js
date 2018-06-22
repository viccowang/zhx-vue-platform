import axios from 'axios'
// import { Message } from 'element-ui'
import {
  axiosRequestSucessFunc,
  axiosRequestFailFunc,
  axiosResponseSucessFunc,
  axiosResponseFailFunc }
  from '@/config/interceptors/axios'

let axiosInstance = axios.create()

axiosInstance.interceptors.request.use(axiosRequestSucessFunc, axiosRequestFailFunc)

axiosInstance.interceptors.response.use(axiosResponseSucessFunc, axiosResponseFailFunc)

export default axiosInstance
