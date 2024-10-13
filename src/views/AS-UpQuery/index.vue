<template>
  <div class="app-container">
    <!-- 使用 transition-group 包裹 el-tabs -->
    <transition-group name="fade" tag="div">
      <el-tabs key="activeName" v-model="activeName" :animated="false" @tab-click="handleClick">
        <!-- 传感器 Tab -->
        <el-tab-pane label="传感器" name="chuangganqi">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="value" placeholder="请选择" @change="chaxun">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="sousuo" placeholder="请输入产品姓名" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="chaxun">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table :key="newdata.id" :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
            <el-table-column prop="status" label="状态" width="130" />
            <el-table-column prop="icon" label="图标" />
            <el-table-column prop="sensor_name" label="传感器名称" />
            <el-table-column prop="value" label="数值" />
            <el-table-column prop="device_name" label="操作" />
          </el-table>
          <div class="yema">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="zhongjianshuju.length"
              :current-page.sync="dangqianyema"
              @current-change="handlePageChange"
            />
          </div>
        </el-tab-pane>

        <!-- 控制器 Tab -->
        <el-tab-pane label="控制器" name="kongzhiqi">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="value" placeholder="请选择" @change="chaxun">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="sousuo" placeholder="请输入控制器名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="chaxun">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table :key="newdata.id" :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
            <el-table-column prop="status" label="状态" width="130" />
            <el-table-column prop="icon" label="图标" />
            <el-table-column prop="controller_name" label="控制器名称" />
            <el-table-column prop="value" label="数值" />
            <el-table-column prop="device_name" label="操作" />
          </el-table>
          <div class="yema">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="zhongjianshuju.length"
              :current-page.sync="dangqianyema"
              @current-change="handlePageChange"
            />
          </div>
        </el-tab-pane>

        <!-- 摄像头 Tab -->
        <el-tab-pane label="摄像头" name="shexiangtou">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="value" placeholder="请选择" @change="chaxun">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="sousuo" placeholder="请输入摄像头名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="chaxun">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table :key="newdata.id" :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
            <el-table-column prop="status" label="状态" width="130" />
            <el-table-column prop="icon" label="图标" />
            <el-table-column prop="camera_name" label="摄像头名称" />
            <el-table-column prop="value" label="数值" />
            <el-table-column prop="device_name" label="操作" />
          </el-table>
          <div class="yema">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="zhongjianshuju.length"
              :current-page.sync="dangqianyema"
              @current-change="handlePageChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </transition-group>
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
      activeName: 'chuangganqi', // 默认选中的 tab
      value: '', // select 选项
      sousuo: '', // 搜索关键字
      newdata: [
        {
          id: 1,
          status: '正常',
          icon: '✅',
          sensor_name: '温度传感器',
          value: '22°C',
          device_name: '设备A'
        },
        {
          id: 2,
          status: '警告',
          icon: '⚠️',
          sensor_name: '湿度传感器',
          value: '70%',
          device_name: '设备B'
        },
        {
          id: 3,
          status: '故障',
          icon: '❌',
          sensor_name: '压力传感器',
          value: '故障',
          device_name: '设备C'
        }
      ], // 表格假数据
      options: [
        { id: '1', value: '正常', label: '正常' },
        { id: '2', value: '警告', label: '警告' },
        { id: '3', value: '故障', label: '故障' }
      ],
      zhongjianshuju: [],
      dangqianyema: 1
    }
  },
  methods: {
    handleClick(tab) {
      console.log('当前点击的 Tab 是：', tab.name)
    },
    chaxun() {
      console.log('执行查询逻辑，搜索值:', this.sousuo)
      // 实现搜索逻辑，可以基于 value 和 sousuo 进行数据过滤
    },
    handlePageChange(page) {
      console.log('当前页:', page)
      this.dangqianyema = page
      // 实现分页逻辑
    }
  }
}

</script>

<style scoped>
.el-select {
  width: 17vw;
}

.yema {
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
  /* 缩短过渡时间 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
