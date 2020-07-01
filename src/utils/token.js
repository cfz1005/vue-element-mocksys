import Cookies from 'js-cookie'

const TokenKey = 'MockSys-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, options={}) {
  return Cookies.set(TokenKey, token)

  // let { expires, path } = options;
  // return Cookies.set(TokenKey, token, { expires, path });
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
