import Cookie from 'vue-cookie'

const TOKEN_KEY = 'Vue-System-Demo'

function getToken () {
  return Cookie.get(TOKEN_KEY)
}

function setToken (token) {
  Cookie.set(TOKEN_KEY, token, {expires: 1, domain: 'localhost'})
}

function removeToken () {
  Cookie.delete(TOKEN_KEY, {domain: 'localhost'})
}

export { getToken, setToken, removeToken }
