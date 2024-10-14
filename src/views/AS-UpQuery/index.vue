<template>
  <div class="app-container">
    <keep-alive>
      <el-tabs v-model="activeName">
        <el-tab-pane label="传感器" name="chuangganqi"><chuanganqi v-if="activeName == 'chuangganqi'" /></el-tab-pane>
        <el-tab-pane label="控制器" name="kongzhiqi"><kongzhiqi v-if="activeName == 'kongzhiqi'" /></el-tab-pane>
        <el-tab-pane label="摄像头" name="shexiangtou"><shexiangtou v-if="activeName == 'shexiangtou'" /></el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>

<script>
import chuanganqi from './yemian/chuanganqi.vue'
import kongzhiqi from './yemian/kongzhiqi.vue'
import shexiangtou from './yemian/shexiangtou.vue'
export default {
  components: {
    chuanganqi,
    kongzhiqi,
    shexiangtou
  },
  data() {
    return {
      activeName: 'chuangganqi'
    }
  }
}
</script>
<style scoped>
.app-container{
  /* border: 1px solid red; */
  overflow-y: auto;
  height: calc(100vh - 50px);

}
</style>
