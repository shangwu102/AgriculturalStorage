import request from '@/utils/request'

export function cgqsbhq() {
  return request({
    url: '/getAllSensor',
    method: 'get'
  })
}

export function qgqszhq(e) {
  return request({
    url: '/getAllSetSensor',
    method: 'post',
    data: e
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
export function chongmingming(e) {
  return request({
    url: `/updateSensorName`,
    method: 'post',
    data: e
  })
}
export function xuigaishuju(e) {
  return request({
    url: `/updateSensor`,
    method: 'post',
    data: e
  })
}

