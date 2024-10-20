<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in filteredRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    // 获取所有路由
    routes() {
      return this.$router.options.routes
    },
    // 根据当前路由获取激活的菜单项
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置了 activeMenu，则高亮该路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否显示Logo
    showLogo() {
      return true
    },
    // 主题变量
    variables() {
      return variables
    },
    // 菜单是否折叠
    isCollapse() {
      return !this.sidebar.opened
    },
    // 过滤并调整路由，根据用户角色动态设置菜单
    filteredRoutes() {
      const role = this.userRole
      // 过滤有权限的路由
      const accessibleRoutes = this.routes.filter(route => {
        if (route.meta && route.meta.roles) {
          return route.meta.roles.includes(role)
        }
        return true
      }).map(route => {
        // 针对 /asuser 路由，动态设置一级菜单标题
        if (route.path === '/asuser') {
          if (role === 'admin') {
            return {
              ...route,
              meta: { ...route.meta, title: '审核授权' },
              children: route.children.filter(child => child.meta.roles.includes(role))
            }
          } else if (role === 'operator') {
            return {
              ...route,
              meta: { ...route.meta, title: '信息管理' },
              children: route.children.filter(child => child.meta.roles.includes(role))
            }
          }
        }
        return route
      })
      return accessibleRoutes
    },
    // 从localStorage获取用户角色
    userRole() {
      const user = JSON.parse(localStorage.getItem('AS-user'))
      return user ? user.role : ''
    }
  }
}
</script>
