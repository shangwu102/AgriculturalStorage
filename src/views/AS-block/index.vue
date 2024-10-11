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

export default {
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // Chart 1: Block Height
      const chart1 = echarts.init(document.getElementById('chart1'))
      const option1 = {
        title: { text: '区块高度' },
        xAxis: { type: 'category', data: ['22:29', '22:30', '22:31'] },
        yAxis: { type: 'value' },
        series: [{ data: [0, 0.5, 1], type: 'line' }]
      }
      chart1.setOption(option1)

      // Chart 2: pbftView
      const chart2 = echarts.init(document.getElementById('chart2'))
      const option2 = {
        title: { text: 'pbftView' },
        xAxis: { type: 'category', data: ['22:29', '22:30', '22:31'] },
        yAxis: { type: 'value' },
        series: [{ data: [40, 80, 160], type: 'line' }]
      }
      chart2.setOption(option2)

      // Chart 3: Pending Transactions
      const chart3 = echarts.init(document.getElementById('chart3'))
      const option3 = {
        title: { text: '待打包的交易数' },
        xAxis: { type: 'category', data: ['22:29', '22:30', '22:31'] },
        yAxis: { type: 'value' },
        series: [{ data: [0, 0.4, 0.8], type: 'line' }]
      }
      chart3.setOption(option3)

      // Chart 4: Average Block Size
      const chart4 = echarts.init(document.getElementById('chart4'))
      const option4 = {
        title: { text: '平均块大小' },
        xAxis: { type: 'category', data: ['22:29', '22:30', '22:31'] },
        yAxis: { type: 'value' },
        series: [{ data: [0, 0.2, 0.4], type: 'line' }]
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
