import Cookie from 'vue-cookie'
import GLOBAL_CONST from '@/config/const'

const TOKEN_KEY = GLOBAL_CONST.token.tokenKey

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
