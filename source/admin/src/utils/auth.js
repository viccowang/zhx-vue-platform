import Cookie from 'vue-cookie'
import { GlobalSettings } from '@/config'

const TOKEN_KEY = GlobalSettings.TOKEN_DEFAULT_CONFIG.tokenKey

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
