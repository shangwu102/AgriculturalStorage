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
    this.initCharts() // 页面加载时初始化图表
  },
  methods: {
    // 初始化图表方法
    initCharts() {
      // 图表1: 小麦产量
      const chart1 = echarts.init(document.getElementById('chart1'))
      const option1 = {
        title: { text: '小麦产量 (百万吨)' }, // 图表标题
        tooltip: { trigger: 'axis' }, // 提示框
        xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023'] }, // 横轴数据
        yAxis: { type: 'value', name: '百万吨' }, // 纵轴单位
        series: [
          {
            name: '小麦',
            data: [720, 740, 750, 760], // 示例数据：小麦产量
            type: 'bar' // 图表类型：柱形图
          }
        ]
      }
      chart1.setOption(option1)

      // 图表2: 玉米产量
      const chart2 = echarts.init(document.getElementById('chart2'))
      const option2 = {
        title: { text: '玉米产量 (百万吨)' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '百万吨' },
        series: [
          {
            name: '玉米',
            data: [1100, 1150, 1170, 1200], // 示例数据：玉米产量
            type: 'bar'
          }
        ]
      }
      chart2.setOption(option2)

      // 图表3: 大米产量
      const chart3 = echarts.init(document.getElementById('chart3'))
      const option3 = {
        title: { text: '大米产量 (百万吨)' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '百万吨' },
        series: [
          {
            name: '大米',
            data: [500, 510, 530, 540], // 示例数据：大米产量
            type: 'bar'
          }
        ]
      }
      chart3.setOption(option3)

      // 图表4: 大豆产量
      const chart4 = echarts.init(document.getElementById('chart4'))
      const option4 = {
        title: { text: '大豆产量 (百万吨)' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '百万吨' },
        series: [
          {
            name: '大豆',
            data: [350, 360, 370, 380], // 示例数据：大豆产量
            type: 'bar'
          }
        ]
      }
      chart4.setOption(option4)
    }
  }
}
</script>

<style scoped>
/* 布局相关样式 */
.charts-row {
  display: flex;
  justify-content: space-between;
  /* 图表间保持间距 */
  width: 100%;
  margin-top: 5vh;
  /* 图表行的上边距 */
}

.chart {
  flex: 1 1 48%;
  /* 每个图表占48%的宽度 */
  height: 40vh;
  /* 设置图表高度 */
  margin-right: 2%;
  /* 图表间的右边距 */
}

.chart:last-child {
  margin-right: 0;
  /* 最后一个图表的右边距为0 */
}
</style>
