import request from '@/utils/request'

export function sxtsbhq() {
  return request({
    url: '/getCamera',
    method: 'get'
  })
}

export function chongmingming(e) {
  return request({
    url: '/updateCamera',
    method: 'post',
    data: e
  })
}
