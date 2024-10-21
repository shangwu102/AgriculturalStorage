import request from '@/utils/request'

export function jiedianshuliang() {
  return request({
    url: '/http://192.168.47.12:5002/WeBASE-Front/1/web3/groupPeers',
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

