import request from '@/utils/request'

export function cgqsbhq() {
  return request({
    url: '/getAllSensor',
    method: 'get'
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
