import request from '@/utils/request'
// 新增入库
export function addGrain(addGrain) {
  return request({
    url: '/createInDepotInfo',
    method: 'post',
    data: addGrain
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

// export function findAll() {
//   return request({
//     url: '/depts',
//     method: 'get'
//   })
// }

// export function add(dept) {
//   return request({
//     url: '/depts',
//     method: 'post',
//     data: dept
//   })
// }

// export function update(dept) {
//   return request({
//     url: '/depts',
//     method: 'put',
//     data: dept
//   })
// }

// export function deleteById(id) {
//   return request({
//     url: '/depts/' + id,
//     method: 'delete'
//   })
// }

// export function selectById(id) {
//   return request({
//     url: '/depts/' + id,
//     method: 'get'
//   })
// }
