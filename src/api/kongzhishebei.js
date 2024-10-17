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

export function xgdssz(e) {
  return request({
    url: '/updateInsertController',
    method: 'post',
    data: e
  })
}

export function xgxhsz(e) {
  return request({
    url: '/updateInsertSet',
    method: 'post',
    data: e
  })
}

export function xgznsz(e) {
  return request({
    url: '/updateInsertSmartSet',
    method: 'post',
    data: e
  })
}

export function scdssz(e) {
  return request({
    url: `/delInsertController/${e.id}`,
    method: 'post',
    data: e
  })
}

export function scxhsz(e) {
  return request({
    url: `/delInsertSet/${e.id}`,
    method: 'post',
    data: e
  })
}

export function scznsz(e) {
  return request({
    url: `/delInsertSmartSet/${e.id}`,
    method: 'post',
    data: e
  })
}
