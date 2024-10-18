const orderStatusKey = 'orderStatus' // 订单信息
export function getOrder() {
  return localStorage.getItem(orderStatusKey)
}

export function setOrder(order) {
  return localStorage.setItem(orderStatusKey, JSON.stringify(order))
}

export function removeOrder() {
  return localStorage.removeItem(orderStatusKey)
}
