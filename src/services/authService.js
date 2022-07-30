import http from './httpService'
import jwtDecode from 'jwt-decode'

const apiUrl = process.env.REACT_APP_AUTH_API
const tokenKey = 'token'
const currentUser = getCurrentUser()

http.setJwt(getJwt())

async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

function logout() {
  localStorage.removeItem(tokenKey)
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt)
  } catch (error) {
    return null
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey)
}

const auth = {
  login,
  logout,
  getCurrentUser,
  currentUser,
  loginWithJwt,
  getJwt,
}
export default auth
