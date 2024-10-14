import request from '@/utils/request'

export function cgqsbhq() {
  return request({
    url: '/getAllSensor',
    method: 'get'
  })
}

export function qgqszhq() {
  return request({
    url: '/getAllSetSensor',
    method: 'get'
  })
}

export function xzcgqsz(e) {
  return request({
    url: '/insertSensorSet',
    method: 'post',
    data: e
  })
}
export function shanchu(e) {
  return request({
    url: `/Sensor`,
    method: 'post',
    data: e
  })
}

