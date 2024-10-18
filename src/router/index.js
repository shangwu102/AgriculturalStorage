import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载组件
const Layout = () => import('@/layout') // 主布局
const Login = () => import('@/views/login/index') // 登录页面
const NotFund = () => import('@/views/404/index') // 404 页面
const ASHome = () => import('@/views/AS-Home/index') // 首页
const Company = () => import('@/views/AS-company/index') // 公司首页
const Companyorder = () => import('@/views/Company-order') // 发布订单
const Companystatus = () => import('@/views/Company-status') // 公司订单状态
const CompanyQuery = () => import('@/views/Company-query') // 公司查看链上库存
const UserCenter = () => import('@/views/AS-user/index') // 管理员授权页面
const BlockchainWarehouse = () => import('@/views/AS-Tabulation') // 链上仓库
const EquipmentWarehouse = () => import('@/views/AS-UpQuery') // 仓库设备
const ControlWarehouse = () => import('@/views/AS-DownQuery') // 库存控制
const Warehousing = () => import('@/views/AS-Warehousing') // 入库信息
const Outbound = () => import('@/views/AS-Outbound') // 出库信息
const Transaction = () => import('@/views/AS-transaction/index') // 交易监管
const BlockReport = () => import('@/views/AS-block') // 区块报表
const adminorder = () => import('@/views/AS-adminOrder') // 管理员订单管理
const WarehouseReport = () => import('@/views/AS-report') // 仓库报表
const WarningDashboard = () => import('@/views/AS-Waining/index') // 安全预警
const LSHome = () => import('@/views/LS-Home/index') // 大屏展示

// 从本地存储获取用户角色
function getUserRole() {
  const user = JSON.parse(localStorage.getItem('AS-user'))
  return user ? user.role : null
}

// 定义路由配置
export const routes = [
  { path: '/', redirect: '/login' }, // 重定向到登录页面
  { path: '/login', component: Login },
  { path: '/404', component: NotFund },
  {
    path: '/ashome',
    component: Layout,
    redirect: '/ashome',
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
  {
    path: '/company',
    component: Layout,
    redirect: '/company',
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
  {
    path: '/order-management',
    component: Layout,
    redirect: '/order-management/publish', // 重定向到第一个子菜单路径
    meta: {
      title: '订单管理',
      icon: 'editor-left-alignment',
      roles: ['company']
    },
    children: [
      {
        path: 'publish',
        component: Companyorder,
        meta: {
          title: '发布订单',
          icon: 'editor-left-alignment',
          roles: ['company']
        }
      },
      {
        path: 'status',
        component: Companystatus,
        meta: {
          title: '订单状态',
          icon: 'editor-left-alignment',
          roles: ['company']
        }
      }
    ]
  },
  {
    path: '/query',
    component: Layout,
    redirect: '/query',
    children: [
      {
        path: '',
        component: CompanyQuery,
        meta: {
          title: '查看链上库存',
          icon: 'editor-left-alignment',
          roles: ['company']
        }
      }
    ]
  },
  {
    path: '/asuser',
    component: Layout,
    redirect: '/asuser',
    children: [
      {
        path: '',
        component: UserCenter,
        meta: {
          // 将 title 定义为一个函数，根据用户角色返回标题
          title: (role) => (role === 'admin' ? '操作授权' : '信息管理'),
          icon: '管理员',
          roles: ['admin', 'operator']
        }
      }
    ]
  },
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
        component: adminorder,
        meta: {
          title: '订单审批',
          icon: '订单审批'
        }
      },
      {
        path: 'transaction',
        component: Transaction,
        meta: {
          title: '交易监管',
          icon: '交易监管'
        }
      }
    ]
  },
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
  {
    path: '/aswarning',
    component: Layout,
    redirect: '/aswarning',
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
  {
    path: '/lshome',
    component: LSHome
  },
  { path: '*', redirect: '/404' } // 捕获所有未匹配的路由，重定向到404
]

// 创建 router 实例
const createRouter = () =>
  new Router({
    routes
  })

const router = createRouter()

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const role = getUserRole()
  if (to.meta && to.meta.roles && !to.meta.roles.includes(role)) {
    // 如果用户没有权限，跳转到登录页面或显示错误提示
    return next('/login')
  }
  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
