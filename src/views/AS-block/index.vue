<template>
  <div v-loading="loading" style="max-height: 100vh; overflow-y: auto; padding: 10px;">
    <!-- 时间选择器，默认选中时间范围 -->
    <el-row style="position: relative; left: 5%; margin-top: 30px;">
      <el-col>
        <el-time-picker
          v-model="timeRange"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          style="position: relative;"
        />
        <!-- 搜索按钮，点击后触发数据请求 -->
        <el-button type="primary" plain style="margin-left: 10px;" :disabled="loading" @click="fetchData">
          搜索
        </el-button>
      </el-col>
    </el-row>

    <!-- 图表的布局，每行两个 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <ChartComponent
          chart-id="blockHeightChart1"
          :line-data="blockHeightData"
          :y-axis-min="0"
          :y-axis-max="1000"
          :y-axis-interval="100"
          title="区块高度"
          :tooltip-formatter="tooltipFormatter1"
        />
      </el-col>
      <el-col :span="12">
        <ChartComponent
          chart-id="blockHeightChart2"
          :line-data="blockPbftViewData"
          :y-axis-min="0"
          :y-axis-max="100000"
          :y-axis-interval="10000"
          title="pbftView"
          :tooltip-formatter="tooltipFormatter2"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <ChartComponent
          chart-id="blockHeightChart3"
          :line-data="blockPendingCount"
          :y-axis-min="0"
          :y-axis-max="1000"
          :y-axis-interval="100"
          title="待交易数量"
          :tooltip-formatter="tooltipFormatter3"
        />
      </el-col>
      <el-col :span="12">
        <ChartComponent
          chart-id="blockHeightChart4"
          :line-data="cpu"
          :y-axis-min="0"
          :y-axis-max="1.2"
          :y-axis-interval="0.2"
          title="CPU利用率"
          :tooltip-formatter="tooltipFormatter4"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartComponent from '@/components/chart'
import axios from 'axios'
import { Message } from 'element-ui' // Import Element UI's Message component for notifications

export default {
  components: {
    ChartComponent
  },
  data() {
    return {
      title: '',
      loading: false, // Loading state
      timeRange: [], // 保存时间范围，用户选择或默认
      blockHeightData: {
        timestampList: [], // 时间戳列表
        valueList: [] // 对应的区块高度值列表
      },
      blockPbftViewData: {
        timestampList: [], // 时间戳列表
        valueList: [] // 对应的区块高度值列表
      },
      blockPendingCount: {
        timestampList: [], // 时间戳列表
        valueList: [] // 对应的区块高度值列表
      },
      cpu: {
        timestampList: [], // 时间戳列表
        valueList: [] // 对应的区块高度值列表
      }
    }
  },
  created() {
    this.setDefaultTimeRange() // 初始化时设置默认时间范围
    this.fetchData() // 获取默认时间范围的数据
  },
  methods: {
    // 时间格式化函数 (HH:mm:ss)
    formatTimestampToTime(timestamp) {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1 // 月份从 0 开始，需要加 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()

      // 补零操作
      const pad = (n) => (n < 10 ? '0' + n : n)

      return `${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    },

    // tooltipFormatter 函数用于格式化 tooltip 信息
    tooltipFormatter1(params) {
      const c0 = params[0].value
      return `时间： ${params[0].name}<br>区块高度: ${c0}`
    },

    tooltipFormatter2(params) {
      const c0 = params[0].value
      return `时间： ${params[0].name}<br>PBFT View: ${c0}`
    },

    tooltipFormatter3(params) {
      const c0 = params[0].value
      return `时间： ${params[0].name}<br>交易数量: ${c0}`
    },

    tooltipFormatter4(params) {
      const c0 = params[0].value
      return `时间： ${params[0].name}<br>CPU利用率%: ${c0}`
    },

    // 设置默认时间范围为当前时间的前一小时到现在
    setDefaultTimeRange() {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      this.timeRange = [oneHourAgo, now] // 默认时间范围设置
    },

    // 格式化日期为 YYYY-MM-DDTHH:MM:SS 格式
    formatDateTime(date) {
      const pad = (n) => (n < 10 ? '0' + n : n)
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    },

    // 获取数据并更新图表
    async fetchData() {
      if (this.timeRange.length !== 2) {
        Message.warning('请完整选择时间范围')
        return // 如果没有选择完整的时间范围，退出
      }

      // Set loading to true before starting the request
      this.loading = true

      // 获取时间范围
      const [beginDate, endDate] = this.timeRange

      // 格式化选择的时间
      const formattedBeginDate = this.formatDateTime(new Date(beginDate))
      const formattedEndDate = this.formatDateTime(new Date(endDate))

      // 构建请求URL
      const url = `/WeBASE-Front/chain?beginDate=${formattedBeginDate}&endDate=${formattedEndDate}`
      const url2 = `/WeBASE-Front/performance?beginDate=${formattedBeginDate}&endDate=${formattedEndDate}`

      try {
        // 发起请求
        const [response, response2] = await Promise.all([
          axios.get(url),
          axios.get(url2)
        ])
        console.log(response)
        console.log(response2)

        // 假设数据结构与之前相同
        this.blockHeightData.timestampList = response.data[0].data.lineDataList.timestampList
        this.blockHeightData.valueList = response.data[0].data.lineDataList.valueList

        this.blockPbftViewData.timestampList = response.data[0].data.lineDataList.timestampList
        this.blockPbftViewData.valueList = response.data[1].data.lineDataList.valueList

        this.blockPendingCount.timestampList = response.data[0].data.lineDataList.timestampList
        this.blockPendingCount.valueList = response.data[2].data.lineDataList.valueList

        this.cpu.timestampList = response2.data[0].data.lineDataList.timestampList
        this.cpu.valueList = response2.data[0].data.lineDataList.valueList

        // 调整时间戳（减去8小时）
        const newTimestamp = response.data[0].data.lineDataList.timestampList.map(times => {
          // 将时间戳转换为毫秒，并减去 8 小时（8 * 60 * 60 * 1000 毫秒）
          return times - 8 * 60 * 60 * 1000
        })
        const newTimestamp1 = response2.data[0].data.lineDataList.timestampList.map(times => {
          // 将时间戳转换为毫秒，并减去 8 小时（8 * 60 * 60 * 1000 毫秒）
          return times - 8 * 60 * 60 * 1000
        })
        this.blockHeightData.timestampList = newTimestamp
        this.blockPbftViewData.timestampList = newTimestamp
        this.blockPendingCount.timestampList = newTimestamp
        this.cpu.timestampList = newTimestamp1

        // 强制更新图表
        this.$forceUpdate()
      } catch (error) {
        Message.error('数据请求失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
