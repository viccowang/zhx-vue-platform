/**
 * BASE PER FIX URL
 */
const baseUrl = {
  // dev: 'http://192.168.10.241:3000/mock/68',
  dev: ' https://easy-mock.com/mock/5adacb0934648462c311ab20',
  prod: 'http://117.34.118.17:8083'
}

const BASE_PER_FIX_URL = process.env.NODE_ENV === 'production' ? baseUrl.prod : baseUrl.dev

export { BASE_PER_FIX_URL }
