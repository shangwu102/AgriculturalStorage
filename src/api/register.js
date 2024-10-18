import request from '@/utils/request'

export function registerCompany() {
  return request({
    url: '/register',
    method: 'post'
  })
}
