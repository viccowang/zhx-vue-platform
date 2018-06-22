import axios from 'axios'
// import { Message } from 'element-ui'
import {
  axiosRequestSucessFunc,
  axiosRequestFailFunc,
  axiosResponseSucessFunc,
  axiosResponseFailFunc }
  from '@/config/interceptors/axios'

let axiosInstance = axios.create()
// 注入request拦截器
axiosInstance.interceptors.request.use(axiosRequestSucessFunc, axiosRequestFailFunc)
// 注入response拦截器
axiosInstance.interceptors.response.use(axiosResponseSucessFunc, axiosResponseFailFunc)

export default axiosInstance
