import request from '@/utils/request'

export function yujingxinxi() {
  return request({
    url: '/getWarnList',
    method: 'get'
  })
}

export function querenyidu(e) {
  return request({
    url: '/updateStatus',
    method: 'post',
    data: e
  })
}

