<template>
  <div :id="chartId" class="chart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ChartComponent',
  props: {
    chartId: {
      type: String,
      required: true
    },
    lineData: {
      type: Object,
      required: true // 包含时间戳列表和数值列表的数据
    },
    title: {
      type: String,
      default: '图表'
    },
    yAxisMin: {
      type: Number,
      default: 0
    },
    yAxisMax: {
      type: Number,
      default: 100
    },
    yAxisInterval: {
      type: Number,
      default: 10
    },
    tooltipFormatter: {
      type: Function, // 父组件传递的函数
      default: (params) => { // 提供默认格式化函数
        const b0 = params[0].name
        const c0 = params[0].value
        return `${b0}<br>图标: ${c0}`
      }
    }
  },
  watch: {
    lineData: {
      deep: true,
      handler(newValue) {
        this.initChart() // 数据变化时重新初始化图表
      }
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.resizeChart) // 监听窗口大小变化以自适应
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    // 将时间戳转换为 (MM-DD HH:mm) 格式
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      // 补零操作
      return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    },
    // 初始化图表
    initChart() {
      const chartDom = document.getElementById(this.chartId)
      const myChart = echarts.init(chartDom)

      // 检查是否有数据
      const hasData = this.lineData.timestampList && this.lineData.valueList &&
        this.lineData.timestampList.length > 0 && this.lineData.valueList.length > 0

      // 获取格式化后的时间戳列表
      const formattedTimestamps = hasData
        ? this.lineData.timestampList.map(ts => this.formatTimestamp(ts))
        : []

      // 基础图表配置
      const option = {
        title: {
          text: this.title,
          top: '6%',
          left: '7%',
          textStyle: {
            fontSize: 18,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: this.tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: formattedTimestamps, // 使用转换后的时间戳
          axisLabel: {
            formatter: (value) => value
          }
        },
        yAxis: {
          min: this.yAxisMin, // 动态最小值
          max: this.yAxisMax, // 动态最大值
          interval: this.yAxisInterval, // 动态区间
          type: 'value'
        },
        series: hasData ? [
          {
            data: this.lineData.valueList, // 从父组件传入的动态数据
            type: 'line',
            smooth: true, // 平滑曲线
            lineStyle: {
              width: 2,
              color: '#5470C6'
            },
            areaStyle: {
              color: 'rgba(84, 112, 198, 0.2)' // 曲线下方区域填充
            },
            symbol: 'circle', // 设置拐点样式为圆形
            symbolSize: 8 // 设置拐点大小
          }
        ] : [],
        dataZoom: hasData ? [
          {
            type: 'inside', // 启用内部缩放
            xAxisIndex: 0,
            start: 0,
            end: 100
          }
        ] : [],
        graphic: !hasData ? { // 当没有数据时显示“暂无数据”
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: '暂无数据',
            textAlign: 'center',
            fill: '#999',
            fontSize: 16
          }
        } : {}
      }

      myChart.setOption(option)

      // 存储实例以便后续操作（如销毁）
      this.myChart = myChart
    },
    // 自适应图表大小
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize()
      }
    }
  }
}
</script>

<style scoped>
.chart {
  width: 45vw;
  height: 400px;
}
</style>
