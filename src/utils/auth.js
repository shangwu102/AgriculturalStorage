const TokenKey = 'AS-token'
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
const UserKey = 'AS-user' // 管理员信息
export function getUser() {
  return localStorage.getItem(UserKey)
}

export function setUser(user) {
  return localStorage.setItem(UserKey, JSON.stringify(user))
}

export function removeUser() {
  return localStorage.removeItem(UserKey)
}

const CompanyKey = 'company' // 公司注册
export function getCompany() {
  return localStorage.getItem(CompanyKey)
}

export function setCompany(companyInfo) {
  return localStorage.setItem(CompanyKey, JSON.stringify(companyInfo))
}

export function removeCompany() {
  return localStorage.removeItem(CompanyKey)
}
