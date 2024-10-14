import request from '@/utils/request'

export function sxtsbhq() {
  return request({
    url: '/getCamera',
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
