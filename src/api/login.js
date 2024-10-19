import request from '@/utils/request'

export function initCompany(data) {
  return request({
    url: '/initCompany',
    method: 'post',
    data
  })
}

export function loginCompany(data) {
  return request({
    url: '/loginCompany',
    method: 'post',
    data
  })
}

export function enterpriseVerify(data) {
  return request({
    url: '/enterpriseVerify',
    method: 'post',
    data
  })
}
export function getCompanyInfoByAddress(blockchainAddress) {
  return request({
    url: '/getCompanyInfoByAddress',
    method: 'get',
    params: { address: blockchainAddress } // 将地址传递给后端
  })
}

// 管理员登录
export function loginAdmin(data) {
  return request({
    url: '/loginAdmin',
    method: 'post',
    data
  })
}
// export function login(data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/users/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/logout',
//     method: 'post'
//   })
// }
