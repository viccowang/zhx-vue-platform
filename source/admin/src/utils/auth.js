import Cookie from 'vue-cookie'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'

const TOKEN_KEY = `${BASE_PER_FIX_KEY}_PlateForm`

function getToken () {
  return Cookie.get(TOKEN_KEY)
}

function setToken (token) {
  Cookie.set(TOKEN_KEY, token, 7)
}

function removeToken () {
  Cookie.delete(TOKEN_KEY)
}

export { getToken, setToken, removeToken }
