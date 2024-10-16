<template>
  <div class="home-container">
    <div ref="editor" class="wrap">
      <div class="top" />
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
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    screenSize(this.$refs.editor)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
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
    }

  }
}
</style>
