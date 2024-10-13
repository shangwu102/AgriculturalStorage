import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 获取默认的状态，主要是为了重置用户状态时使用
const getDefaultState = () => {
  return {
    token: getToken(), // 初始化时从本地存储获取 token
    name: '', // 用户名，初始为空
    address: '', // 用户地址
    role: '' // 用户角色
  }
}

// 定义 state，存储用户相关数据
const state = getDefaultState()

// 定义 mutations，直接修改 state
const mutations = {
  // 重置 state，恢复默认状态
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置 token 到 state 中
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名到 state 中
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置用户信息到 state 中
  SET_USER_INFO: (state, userInfo) => {
    state.name = userInfo.username
    state.address = userInfo.address
    state.role = userInfo.role
  }
}

// 定义 actions，包含异步操作或复杂逻辑
const actions = {
  // 用户登录，接受用户名和密码，并调用 login 接口
  login({ commit }, userInfo) {
    const { username, password, address, role } = userInfo
    console.log(username, password, address, role)

    // return new Promise((resolve, reject) => {
    //   // 调用 login API，传入经过 trim() 处理后的用户名
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     // 登录成功后，保存 token 到 Vuex 和 localStorage
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token) // 保存 token 到本地存储
    //     resolve() // 继续处理
    //   }).catch(error => {
    //     reject(error) // 登录失败时返回错误
    //   })
    // })
  },

  // 设置用户信息
  setUserInfo({ commit }, userInfo) {
    return new Promise(resolve => {
      commit('SET_USER_INFO', userInfo) // 调用 mutation 设置用户信息
      resolve()
    })
  },

  // 获取用户信息，依赖于 token
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用 getInfo API，传递当前 token
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please login again.') // 如果未获取到用户数据，返回错误
        }

        const { name } = data

        // 保存用户名到 Vuex state
        commit('SET_NAME', name)
        resolve(data) // 继续处理用户数据
      }).catch(error => {
        reject(error) // 获取信息失败时返回错误
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用 logout API
      logout(state.token).then(() => {
        // 清除 token
        removeToken() // 先移除 token
        resetRouter() // 重置路由，防止登出后仍然可以访问某些页面
        commit('RESET_STATE') // 重置 Vuex state
        resolve() // 继续处理登出后的逻辑
      }).catch(error => {
        reject(error) // 登出失败时返回错误
      })
    })
  },

  // 重置 token，仅用于手动清除 token 的场景
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 清除本地存储中的 token
      commit('RESET_STATE') // 重置 Vuex state
      resolve() // 继续处理
    })
  }
}

// 导出 Vuex 模块，使用命名空间
export default {
  namespaced: true, // 启用命名空间，防止多个模块之间的命名冲突
  state, // 状态
  mutations, // 同步修改状态的方法
  actions // 异步操作和逻辑处理方法
}
