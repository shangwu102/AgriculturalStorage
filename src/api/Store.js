import request from '@/utils/request'
// 新增入库
export function addGrain(addGrain) {
  return request({
    url: '/createInDepotInfo',
    method: 'post',
    data: addGrain
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
