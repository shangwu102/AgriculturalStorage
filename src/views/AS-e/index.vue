<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <ul class="nav">
        <li class="nav-item" @click="setActive('link1')">
          <a href="#" class="nav-link" :class="{ active: activeLink === 'link1' }">传感器</a>
        </li>
        <li class="nav-item" @click="setActive('link2')">
          <a href="#" class="nav-link" :class="{ active: activeLink === 'link2' }">控制器</a>
        </li>
        <li class="nav-item" @click="setActive('link3')">
          <a href="#" class="nav-link" :class="{ active: activeLink === 'link3' }">摄像头</a>
        </li>
      </ul>
      <div class="underline" :style="underlineStyle" />
    </nav>

    <!-- 这是第一部分传感器 -->
    <div v-if="activeLink === 'link1'" class="content">
      <!-- 上方检索部分 -->
      <div class="row m-3">
        <div class="col-2">
          <select id="" name="" class="form-control" />
        </div>
        <div class="col-3 row">
          <div class="col-9"><input id="" type="text" name="" class="form-control" placeholder="请输入要搜索的传感器名称"></div>
          <div class="col-3"> <button class="btn btn-info">搜索</button></div>

        </div>
        <div class="col-3 offset-4">
          <button type="button" class="btn btn-outline-secondary ml-1">全部</button>
          <button type="button" class="btn btn-outline-secondary ml-1">连接正常</button>
          <button type="button" class="btn btn-outline-secondary ml-1">传感报警</button>
          <button type="button" class="btn btn-outline-secondary ml-1">正在运行</button>
        </div>
      </div>
      <!-- 下方列表 -->
      <div class="ml-5 mr-5">
        <div class="row h-10" style="background-color: #F5F5F5; height: 80px; line-height: 80px;">
          <div class="col">状态</div>
          <div class="col">图标</div>
          <div class="col">传感器名称</div>
          <div class="col">数值</div>
          <div class="col">操作</div>
        </div>
      </div>
      <div class="ml-5 mr-5">
        <div class="row" style="height: 80px; line-height: 80px;">
          <div class="col">*</div>
          <div class="col">图标</div>
          <div class="col">环境传感器</div>
          <div class="col">——</div>
          <div class="col">
            <button type="button" class="btn btn-outline-success ml-2">设置</button>
            <button type="button" class="btn btn-outline-primary ml-2">查看报表</button>
            <button type="button" class="btn btn-outline-warning ml-2">重命名</button>
          </div>
        </div>
      </div>

    </div>
    <!-- 这是第二部分控制器 -->
    <div v-if="activeLink === 'link2'" class="content">
      <div class="row m-3">
        <div class="col-2">
          <select id="" name="" class="form-control" />
        </div>
        <div class="col-3 row">
          <div class="col-9"><input id="" type="text" name="" class="form-control" placeholder="请输入要搜索的控制器名称"></div>
          <div class="col-3"> <button class="btn btn-info">搜索</button></div>

        </div>
        <div class="col-3 offset-4">
          <button type="button" class="btn btn-outline-secondary ml-1">全部</button>
          <button type="button" class="btn btn-outline-secondary ml-1">连接正常</button>
          <button type="button" class="btn btn-outline-secondary ml-1">传感报警</button>
          <button type="button" class="btn btn-outline-secondary ml-1">正在运行</button>
        </div>
      </div>
      <!-- 下方列表 -->
      <div class="ml-5 mr-5">
        <div class="row h-10" style="background-color: #F5F5F5; height: 80px; line-height: 80px;">
          <div class="col">状态</div>
          <div class="col">图标</div>
          <div class="col">传感器名称</div>
          <div class="col">数值</div>
          <div class="col">操作</div>
        </div>
      </div>
      <div class="ml-5 mr-5">
        <div class="row" style="height: 80px; line-height: 80px;">
          <div class="col">*</div>
          <div class="col">图标</div>
          <div class="col">环境传感器</div>
          <div class="col">——</div>
          <div class="col">
            <button type="button" class="btn btn-outline-success ml-2">设置</button>
            <button type="button" class="btn btn-outline-primary ml-2">查看报表</button>
            <button type="button" class="btn btn-outline-warning ml-2">重命名</button>
          </div>
        </div>
      </div>

    </div>
    <!-- 这是第三部分摄像头 -->
    <div v-if="activeLink === 'link3'" class="content">
      <div class="row m-3">
        <div class="col-2">
          <select id="" name="" class="form-control" />
        </div>
        <div class="col-3 row">
          <div class="col-9"><input id="" type="text" name="" class="form-control" placeholder="请输入要搜索的摄像头名称"></div>
          <div class="col-3"> <button class="btn btn-info" style="position: relative; left: 10%; ">搜索</button></div>

        </div>
        <div class="col-3 offset-4">
          <button type="button" class="btn btn-outline-secondary ml-1">全部</button>
          <button type="button" class="btn btn-outline-secondary ml-1">连接正常</button>
          <button type="button" class="btn btn-outline-secondary ml-1">传感报警</button>
          <button type="button" class="btn btn-outline-secondary ml-1">正在运行</button>
        </div>
      </div>
      <!-- 下方列表 -->
      <div class="ml-5 mr-5">
        <div class="row h-10" style="background-color: #F5F5F5; height: 80px; line-height: 80px;">
          <div class="col">状态</div>
          <div class="col">图标</div>
          <div class="col">传感器名称</div>
          <div class="col">数值</div>
          <div class="col">操作</div>
        </div>
      </div>
      <div class="ml-5 mr-5">
        <div class="row" style="height: 80px; line-height: 80px;">
          <div class="col">*</div>
          <div class="col">图标</div>
          <div class="col">环境传感器</div>
          <div class="col">——</div>
          <div class="col">
            <button type="button" class="btn btn-outline-success ml-2">设置</button>
            <button type="button" class="btn btn-outline-primary ml-2">查看报表</button>
            <button type="button" class="btn btn-outline-warning ml-2">重命名</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'link1' // 默认激活的链接
    }
  },
  computed: {
    underlineStyle() {
      const links = {
        link1: { left: '20px', width: '75px' }, // 根据实际宽度调整
        link2: { left: '100px', width: '75px' }, // 根据实际宽度调整
        link3: { left: '180px', width: '75px' } // 根据实际宽度调整
      }
      return {
        position: 'absolute',
        height: '3px',
        backgroundColor: '#007bff',
        bottom: '-2px',
        transition: 'left 0.3s, width 0.3s',
        left: links[this.activeLink].left,
        width: links[this.activeLink].width
      }
    }
  },
  methods: {
    setActive(link) {
      this.activeLink = link
    }
  }
}
</script>

<style scoped>
.navbar {
  position: relative;
}
.underline {
  position: absolute;
}
.nav-link.active {
  font-weight: bold; /* 可选：添加激活链接的样式 */
}
</style>
