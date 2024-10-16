<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-title">天气状况</div>
      <div v-if="isOnline">
        <iframe
          width="800"
          height="150"
          frameborder="0"
          allowtransparency="true"
          scrolling="no"
          src="https://i.tianqi.com?c=code&id=48&color=%2300B0F0&bgc=%23&icon=5&py=请选择&num=3&site=18"
          style="position: absolute; top: 35%;"
        />
      </div>
      <div v-else>
        <img src="../../assets/img/天气.png" style="position: absolute; left: 10%; top: 35%;" alt="天气">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pyramid',
  data() {
    return {
      isOnline: navigator.onLine // 初始网络状态
    }
  },
  created() {
    // 添加监听器，检测网络状态的变化
    window.addEventListener('online', this.updateNetworkStatus)
    window.addEventListener('offline', this.updateNetworkStatus)
  },
  beforeDestroy() {
    // 移除监听器
    window.removeEventListener('online', this.updateNetworkStatus)
    window.removeEventListener('offline', this.updateNetworkStatus)
  },
  methods: {
    updateNetworkStatus() {
      this.isOnline = navigator.onLine // 更新网络状态
    }
  }
}
</script>

<style lang="scss" scoped>
.sn-container {
  position: relative;
  left: 50px;
  top: 700px;
  width: 586px;
  height: 400px;
}
</style>
