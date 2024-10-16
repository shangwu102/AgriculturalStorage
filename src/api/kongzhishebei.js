import request from '@/utils/request'
export function kzqsbhq() {
  return request({
    url: '/getController',
    method: 'get'
  })
}

export function hqdskzq(e) {
  return request({
    url: '/getInsertController',
    method: 'post',
    data: e
  })
}

export function hqxhkzq(e) {
  return request({
    url: '/getInsertSet',
    method: 'post',
    data: e
  })
}

export function hqznkzq(e) {
  return request({
    url: '/getInsertSmartSet',
    method: 'post',
    data: e
  })
}

export function chongmingming(e) {
  return request({
    url: '/updateControllerName',
    method: 'post',
    data: e
  })
}

export function hqkzqmc() {
  return request({
    url: '/getKZ',
    method: 'get'
  })
}

export function xzdssz(e) {
  return request({
    url: '/insertRegularController',
    method: 'post',
    data: e
  })
}

export function xzxhsz(e) {
  return request({
    url: '/insertCycleController',
    method: 'post',
    data: e
  })
}

export function xzznsz(e) {
  return request({
    url: '/insertSmartController',
    method: 'post',
    data: e
  })
}
