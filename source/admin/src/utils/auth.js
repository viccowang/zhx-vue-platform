import Cookie from 'vue-cookie'

const TOKEN_KEY = 'Zhx_PlateForm_'

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
