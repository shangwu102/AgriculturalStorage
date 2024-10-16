<template>
  <div class="home-container">
    <div ref="editor" class="wrap">
      <div class="top">
        <span>{{ currentTime }}</span>
      </div>
      <!-- 粮食储备排名 -->
      <sinan />
      <!-- 区块链信息 -->
      <dynamicList />
      <!-- 新闻无缝滚动 -->
      <seamless />
      <!-- 天气状况 -->
      <pyramid />
      <!-- 粮仓出入库占比 -->
      <cakeLinkage />
      <!-- 环境监测 -->
      <pyramidTrend />

      <div class="divider" />
    </div>
  </div>
</template>

<script>
import { screenSize } from '@/assets/js/utils'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      currentTime: '' // 保存当前时间
    }
  },
  computed: {},
  created() {
    this.updateTime() // 初始化时更新一次时间
    this.timer = setInterval(this.updateTime, 1000) // 每秒更新一次时间
  },
  mounted() {
    screenSize(this.$refs.editor)
  },
  beforeDestroy() {
    clearInterval(this.timer) // 组件销毁前清除定时器
  },
  methods: {
    updateTime() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      const weekday = weekdays[now.getDay()]
      this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${weekday}`
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  position: relative;
  font-size: 30px;
  color: #2d6cb5;
  left: 35%;
  top: 30%;
}

.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .wrap {
    transform-origin: 0px 0px 0px;
    background: url(../../assets/img/bj.jpg) no-repeat;
    background-size: contain;
    background-position: 50% 0;
    background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: hidden;

    .top {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 80px;
      background-color: transparent;
      background: url(../../assets/img/top_nav.png) no-repeat;
      background-position: 65% 0;
      border: none;
      overflow: hidden;
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
