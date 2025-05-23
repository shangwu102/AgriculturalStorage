<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 如果是管理员或操作员显示这个布局 -->
    <template v-if="role === 'admin' || role === 'operator'">
      <!-- 侧边栏 -->
      <Sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <!-- 导航栏 -->
          <Navbar />
        </div>
        <!-- 主页 -->
        <AppMain />
      </div>
    </template>

    <!-- 如果是公司显示不同的布局 -->
    <template v-else-if="role === 'company'">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <navbar />
        </div>
        <!-- 替换为公司的页面 -->
        <CompanyMain />
      </div>
    </template>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import CompanyMain from './components/CompanyMain.vue'
import ResizeMixin from './mixin/ResizeHandler'
import { getUser } from '@/utils/auth' // 引入你封装的本地存储工具

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    CompanyMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    role() {
      const user = JSON.parse(getUser()) // 从 localStorage 中获取用户信息
      console.log(user)
      return user ? user.role : '' // 如果存在用户信息，则返回角色，否则返回空字符串
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
