import request from '@/utils/request'
// 新增入库
export function createInDepotInfo(inDepotInfoBO) {
  return request({
    url: '/createInDepotInfo',
    method: 'post',
    data: inDepotInfoBO
  })
}
// 获取入库信息
export function getAllInDepotInfo() {
  return request({
    url: '/getAllInDepotInfo',
    method: 'get'
  })
}
// 获取仓库名称
export function getDepotNames() {
  return request({
    url: '/getDepotNames',
    method: 'get'
  })
}
// 获取仓库所有信息
export function getDepotInfoByName() {
  return request({
    url: '/getAllDepotInfo',
    method: 'get'
  })
}
// 新增仓库
export function createDepotInfo(newWarehouse) {
  return request({
    url: '/createDepotInfo',
    method: 'post',
    data: newWarehouse
  })
}
// 增加操作员

export function initSubuserStruct(initSubuserBO) {
  return request({
    url: '/initSubuserStruct',
    method: 'post',
    data: initSubuserBO
  })
}
// 授权操作员
export function setdistroDepotArr(setdistroDepotArrBO) {
  return request({
    url: '/setdistroDepotArr',
    method: 'post',
    data: setdistroDepotArrBO
  })
}
