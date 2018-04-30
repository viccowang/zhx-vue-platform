
function setSession (key, data) {
  if (window.sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }
}

function getSession (key) {
  if (window.sessionStorage) {
    return JSON.parse(sessionStorage.getItem(key))
  }
}

function removeSession (key) {
  if (window.sessionStorage) {
    sessionStorage.removeItem(key)
  }
}

export { setSession, getSession, removeSession }
