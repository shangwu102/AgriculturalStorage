import request from '@/utils/request'

export function initCompany(data) {
  return request({
    url: '/initCompany',
    method: 'post',
    data
  })
}

export function loginCompany(data) {
  return request({
    url: '/loginCompany',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
