import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export const routes = [
  // 登陆页面
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404/index')
  },
  // 访问根路径重定向到登录
  {
    path: '/',
    redirect: '/login'
  },
  // 首页
  {
    path: '/ashome',
    component: Layout,
    children: [{
      path: '',
      name: 'AShome',
      component: () => import('@/views/AS-Home/index'),
      meta: { title: '首页', icon: 'editor-left-alignment' }
    }]
  },
  // 粮食信息管理
  {
    path: '/asinformation',
    component: Layout,
    name: 'ASasinformation',
    meta: { title: '粮食信息管理', icon: '粮食安全考核' },
    children: [
      {
        path: 'blockchainwarehouse',
        name: 'Blockchainwarehouse',
        component: () => import('@/views/AS-Tabulation'),
        meta: { title: '链上仓库', icon: '链接' }
      },
      {
        path: 'equipmentwarehouse',
        name: 'Equipmentwarehouse',
        component: () => import('@/views/AS-UpQuery'),
        meta: { title: '仓库设备', icon: '应用管理' }
      },
      {
        path: 'controlwarehouse',
        name: 'Controlwarehouse',
        component: () => import('@/views/AS-DownQuery'),
        meta: { title: '库存控制', icon: '仓库信息' }
      }
      // {
      //   path: '/fixed-page',
      //   name: 'fixedPage',
      //   component: FixedPage
      // }
    ]
  },
  // 生产管理
  {
    path: '/asmanage',
    component: Layout,
    name: 'Asmanage',
    meta: { title: '生产管理', icon: '生产管理' },
    children: [
      {
        path: 'warehousing',
        name: 'Warehousing',
        component: () => import('@/views/AS-Warehousing'),
        meta: { title: '入库信息', icon: '新风神_扫码入库' }
      },
      {
        path: 'outbound',
        name: 'Outbound',
        component: () => import('@/views/AS-Outbound'),
        meta: { title: '出库信息', icon: '已出库' }
      }
    ]
  },
  // 数据报表
  {
    path: '/asreport',
    component: Layout,
    name: 'Asreport',
    meta: { title: '数据报表', icon: '数据报表' },
    children: [
      {
        path: 'warehousereport',
        name: 'Warehousereport',
        component: () => import('@/views/AS-report'),
        meta: { title: '仓库报表', icon: '仓库报表' }
      },
      {
        path: 'testreport',
        name: 'Testreport',
        component: () => import('@/views/student-report'),
        meta: { title: 'test', icon: 'el-icon-s-data' }
      }
    ]
  },
  // 安全预警
  {
    path: '/aswarning',
    component: Layout,
    children: [{
      path: '',
      name: 'WarningDashboard',
      component: () => import('@/views/AS-Waining/index'),
      meta: { title: '安全预警', icon: '安全预警' }
    }]
  },
  // 大屏展示
  {
    path: '/lshome',
    component: () => import('@/views/LS-Home/index')
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({

  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
