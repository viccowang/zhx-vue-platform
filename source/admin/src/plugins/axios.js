import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '@/config/settings'
import {
  axiosRequestSucessFunc,
  axiosRequestFailFunc,
  axiosResponseSucessFunc,
  axiosResponseFailFunc }
  from '@/config/interceptors/axios'

let axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)
// 注入request拦截器
axiosInstance.interceptors.request.use(axiosRequestSucessFunc, axiosRequestFailFunc)
// 注入response拦截器
axiosInstance.interceptors.response.use(axiosResponseSucessFunc, axiosResponseFailFunc)

export default axiosInstance
