<template>
  <div>
    <div class="charts-row">
      <div id="chart1" class="chart" />
      <div id="chart2" class="chart" />
    </div>
    <div class="charts-row">
      <div id="chart3" class="chart" />
      <div id="chart4" class="chart" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  mounted () {
    this.fetchChartData()
  },
  methods: {
    fetchChartData () {
      const url = 'http://192.168.47.14:5000/mgr/WeBASE-Node-Manager/stat'
      const params = {
        gap: 60,
        beginDate: 1728835200000,
        endDate: 1728867726000,
        contrastBeginDate: '',
        contrastEndDate: ''
      }

      axios.get(url, { params })
        .then((response) => {
          if (response.data.code === 0) {
            const data = response.data.data
            this.updateCharts(data)
          } else {
            console.error('Failed to fetch data:', response.data.message)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },
    updateCharts (data) {
      // 假设我们已经成功获取数据，现在将它们更新到图表中

      // 找到不同的metricType的数据
      const blockSizeData = data.find(item => item.metricType === 'blockSize')
      const blockCycleData = data.find(item => item.metricType === 'blockCycle')
      const tpsData = data.find(item => item.metricType === 'tps')

      // 提取数据
      const timestamps = blockSizeData.data.lineDataList.timestampList || ['22:29', '22:30', '22:31']
      const blockSizeValues = blockSizeData.data.lineDataList.valueList || [0, 0.2, 0.4]
      const blockCycleValues = blockCycleData.data.lineDataList.valueList || [0.4, 0.8, 1.2]
      const tpsValues = tpsData.data.lineDataList.valueList || [100, 200, 300]

      this.initCharts(timestamps, blockSizeValues, blockCycleValues, tpsValues)
    },
    initCharts (timestamps, blockSizeValues, blockCycleValues, tpsValues) {
      // Chart 1: Block Height (using block size)
      const chart1 = echarts.init(document.getElementById('chart1'))
      const option1 = {
        title: { text: '区块大小' },
        xAxis: { type: 'category', data: timestamps },
        yAxis: { type: 'value' },
        series: [{ data: blockSizeValues, type: 'line' }]
      }
      chart1.setOption(option1)

      // Chart 2: pbftView (using block cycle)
      const chart2 = echarts.init(document.getElementById('chart2'))
      const option2 = {
        title: { text: '区块周期' },
        xAxis: { type: 'category', data: timestamps },
        yAxis: { type: 'value' },
        series: [{ data: blockCycleValues, type: 'line' }]
      }
      chart2.setOption(option2)

      // Chart 3: Pending Transactions (using tps)
      const chart3 = echarts.init(document.getElementById('chart3'))
      const option3 = {
        title: { text: 'TPS' },
        xAxis: { type: 'category', data: timestamps },
        yAxis: { type: 'value' },
        series: [{ data: tpsValues, type: 'line' }]
      }
      chart3.setOption(option3)

      // Chart 4: Average Block Size (reuse block size for simplicity)
      const chart4 = echarts.init(document.getElementById('chart4'))
      const option4 = {
        title: { text: '平均块大小' },
        xAxis: { type: 'category', data: timestamps },
        yAxis: { type: 'value' },
        series: [{ data: blockSizeValues, type: 'line' }]
      }
      chart4.setOption(option4)
    }
  }
}
</script>

<style scoped>
.charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.charts-row {
  display: flex;
  width: 100%;
  /* 设置图表之间的间距 */
  margin-top: 5vh;
  margin-left: 5vh;
}

.chart {
  flex: 1 1 48%;
  /* 默认情况下两列布局 */
  height: 40vh;
  /* 您可以根据需要调整高度 */
}
</style>
