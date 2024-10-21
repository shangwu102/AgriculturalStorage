import Vue from 'vue'
import Router from 'vue-router'

// 懒加载组件
const Layout = () => import('@/layout') // 主布局
const Login = () => import('@/views/login/index') // 登录页面
const NotFound = () => import('@/views/404/index') // 404 页面
const ASHome = () => import('@/views/AS-Home/index') // 首页
const Company = () => import('@/views/AS-company/index') // 公司首页
const Companyorder = () => import('@/views/Company-order') // 发布订单
const Companystatus = () => import('@/views/Company-status') // 公司订单状态
const CompanyQuery = () => import('@/views/Company-query') // 公司查看链上库存
const UserCenter = () => import('@/views/AS-user/index') // 信息管理组件
const Authorization = () => import('@/views/AS-Authorization') // 授权组件
const Authentication = () => import('@/views/AS-Authentication') // 认证组件
const BlockchainWarehouse = () => import('@/views/AS-Tabulation') // 链上仓库
const EquipmentWarehouse = () => import('@/views/AS-UpQuery') // 仓库设备
const ControlWarehouse = () => import('@/views/AS-DownQuery') // 库存控制
const Warehousing = () => import('@/views/AS-Warehousing') // 入库信息
const Outbound = () => import('@/views/AS-Outbound') // 出库信息
const Transaction = () => import('@/views/AS-transaction/index') // 交易监管
const BlockReport = () => import('@/views/AS-block') // 区块报表
const AdminOrder = () => import('@/views/AS-adminOrder') // 管理员订单管理
const WarehouseReport = () => import('@/views/AS-report') // 仓库报表
const WarningDashboard = () => import('@/views/AS-Waining/index') // 安全预警
const LSHome = () => import('@/views/LS-Home/index') // 大屏展示
const LSRequest = () => import('@/views/AS-request/index') // 单独请求

// 从本地存储获取用户角色
function getUserRole() {
  const user = JSON.parse(localStorage.getItem('AS-user'))
  return user ? user.role : null
}

Vue.use(Router)

// 定义路由配置
export const routes = [
  { path: '/', redirect: '/login' }, // 重定向到登录页面
  { path: '/login', component: Login },
  { path: '/404', component: NotFound },
  { path: '/request', component: LSRequest },

  // 首页路由
  {
    path: '/ashome',
    component: Layout,
    // 移除了 self-redirect
    children: [
      {
        path: '',
        component: ASHome,
        meta: {
          title: '首页',
          icon: 'editor-left-alignment',
          roles: ['admin', 'operator']
        }
      }
    ]
  },

  // 公司首页路由
  {
    path: '/company',
    component: Layout,
    children: [
      {
        path: '',
        component: Company,
        meta: {
          title: '公司首页',
          icon: 'editor-left-alignment',
          roles: ['company']
        }
      }
    ]
  },

  // 订单管理路由
  {
    path: '/order-management',
    component: Layout,
    redirect: '/order-management/publish', // 重定向到第一个子菜单路径
    meta: {
      title: '订单管理',
      icon: '订单管理',
      roles: ['company']
    },
    children: [
      {
        path: 'publish',
        component: Companyorder,
        meta: {
          title: '发布订单',
          icon: '发布订单',
          roles: ['company']
        }
      },
      {
        path: 'status',
        component: Companystatus,
        meta: {
          title: '订单状态',
          icon: '订单状态',
          roles: ['company']
        }
      }
    ]
  },

  // 查看链上库存路由
  {
    path: '/query',
    component: Layout,
    // 移除了 self-redirect
    children: [
      {
        path: '',
        component: CompanyQuery,
        meta: {
          title: '查看链上库存',
          icon: '查看链上库存',
          roles: ['company']
        }
      }
    ]
  },

  // 信息管理路由
  {
    path: '/asuser',
    component: Layout,
    redirect: '/asuser/info', // 默认重定向到信息管理
    meta: {
      // 不在这里设置 title，标题将在菜单组件中根据角色动态设置
      roles: ['admin', 'operator'],
      icon: '查看链上库存'
    },
    children: [
      // Admin 专用子路由
      {
        path: 'authorization',
        component: Authorization,
        meta: {
          title: '授权',
          icon: '查看链上库存',
          roles: ['admin']
        }
      },
      {
        path: 'authentication',
        component: Authentication,
        meta: {
          title: '认证',
          icon: '查看链上库存',
          roles: ['admin']
        }
      },
      // Operator 专用子路由
      {
        path: 'info',
        component: UserCenter,
        meta: {
          title: '信息管理',
          icon: '查看链上库存',
          roles: ['operator']
        }
      }
    ]
  },

  // 仓库管理路由
  {
    path: '/asinformation',
    component: Layout,
    redirect: '/asinformation/blockchainwarehouse', // 重定向到第一个子菜单路径
    meta: {
      title: '仓库管理',
      icon: '粮食安全考核',
      roles: ['admin', 'operator']
    },
    children: [
      {
        path: 'blockchainwarehouse',
        component: BlockchainWarehouse,
        meta: {
          title: '链上仓库',
          icon: '链接',
          roles: ['admin', 'operator']
        }
      },
      {
        path: 'equipmentwarehouse',
        component: EquipmentWarehouse,
        meta: {
          title: '仓库设备',
          icon: '应用管理',
          roles: ['admin', 'operator']
        }
      }
    ]
  },

  // 生产管理路由
  {
    path: '/asmanage',
    component: Layout,
    redirect: '/asmanage/controlwarehouse', // 重定向到第一个子菜单路径
    meta: {
      title: '生产管理',
      icon: '生产管理',
      roles: ['admin', 'operator']
    },
    children: [
      {
        path: 'controlwarehouse',
        component: ControlWarehouse,
        meta: {
          title: '库存控制',
          icon: '仓库信息',
          roles: ['admin', 'operator']
        }
      },
      {
        path: 'warehousing',
        component: Warehousing,
        meta: {
          title: '入库信息',
          icon: '新风神_扫码入库',
          roles: ['admin', 'operator']
        }
      },
      {
        path: 'outbound',
        component: Outbound,
        meta: {
          title: '出库信息',
          icon: '已出库',
          roles: ['admin', 'operator']
        }
      }
    ]
  },

  // 交易管理路由
  {
    path: '/astransaction',
    component: Layout,
    redirect: '/astransaction/order', // 重定向到第一个子菜单路径
    meta: {
      title: '交易管理',
      icon: '数据报表',
      roles: ['admin']
    },
    children: [
      {
        path: 'order',
        component: AdminOrder,
        meta: {
          title: '订单审批',
          icon: '订单审批',
          roles: ['admin']
        }
      },
      {
        path: 'transaction',
        component: Transaction,
        meta: {
          title: '交易监管',
          icon: '交易监管',
          roles: ['admin']
        }
      }
    ]
  },

  // 数据报表路由
  {
    path: '/asreport',
    component: Layout,
    redirect: '/asreport/blockreport', // 重定向到第一个子菜单路径
    meta: {
      title: '数据报表',
      icon: '数据报表',
      roles: ['admin', 'operator']
    },
    children: [
      {
        path: 'blockreport',
        component: BlockReport,
        meta: {
          title: '区块报表',
          icon: 'tree',
          roles: ['admin', 'operator']
        }
      },
      {
        path: 'warehousereport',
        component: WarehouseReport,
        meta: {
          title: '仓库报表',
          icon: '仓库报表',
          roles: ['admin', 'operator']
        }
      }
    ]
  },

  // 安全预警路由
  {
    path: '/aswarning',
    component: Layout,
    // 移除了 self-redirect
    children: [
      {
        path: '',
        component: WarningDashboard,
        meta: {
          title: '安全预警',
          icon: '安全预警',
          roles: ['admin', 'operator']
        }
      }
    ]
  },

  // 大屏展示路由
  {
    path: '/lshome',
    component: LSHome
  },

  // 捕获所有未匹配的路由，重定向到404
  { path: '*', redirect: '/404' }
]

// 创建 router 实例
const createRouter = () =>
  new Router({

    mode: 'hash',
    routes
  })

const router = createRouter()

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const role = getUserRole()

  if (to.path === '/login') {
    // 如果是登录页面，直接访问
    return next()
  }

  if (!role) {
    // 如果没有获取到用户角色，重定向到登录页面
    return next('/login')
  }

  if (to.meta && to.meta.roles && !to.meta.roles.includes(role)) {
    // 如果用户没有权限，重定向到404页面或其他提示页面
    return next('/404')
  }

  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
