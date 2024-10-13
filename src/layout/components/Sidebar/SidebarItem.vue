<template>
  <div v-if="!item.hidden && (!item.meta || !item.meta.roles || item.meta.roles.includes(role))">
    <!-- 一级菜单 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 二级菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
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
    // 修复 iOS 设备上点击菜单触发 mouseleave 的 Bug
    // 参见：https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: 使用 render function 重构
    this.onlyOneChild = null
    return {}
  },
  computed: {
    role() {
      return this.$store.state.user.role // 假设用户角色保存在 Vuex 的 user 模块中
    }
  },
  methods: {
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
