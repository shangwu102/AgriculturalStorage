<template>
  <div v-if="!item.hidden && (!item.meta || !item.meta.roles || item.meta.roles.includes(role))">
    <!-- 一级菜单 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="getTitle(onlyOneChild.meta)" />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 二级菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="getTitle(item.meta)" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { getUser } from '@/utils/auth' // 引入你封装的本地存储工具

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    // 从 localStorage 中获取用户角色信息
    role() {
      const user = JSON.parse(getUser()) // 从 localStorage 中获取用户信息
      return user ? user.role : '' // 如果存在用户信息，则返回角色，否则返回空字符串
    }
  },
  methods: {
    // 获取菜单标题，支持函数和字符串
    getTitle(meta) {
      if (typeof meta.title === 'function') {
        return meta.title(this.role)
      }
      return meta.title
    },
    // 判断是否只显示一个子菜单
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        // 过滤菜单项的逻辑，检查菜单是否隐藏和角色权限
        if (item.hidden || (item.meta.roles && !item.meta.roles.includes(this.role))) {
          return false
        } else {
          // 当只有一个子菜单时，设置 onlyOneChild
          this.onlyOneChild = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // 解析路由路径
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
