<template>
  <div class="dashboard-container">
    <img src="@/assets/welcome.jpg" width="85%">
  </div>
</template>

<script>
import { getIndexData } from '@/api/index.js'
export default {
  name: 'Dashboard',
  mounted() {
    getIndexData().then((result) => {
      console.log(result)
      // TODO
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

