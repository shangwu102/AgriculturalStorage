<!-- <template>
  <div :id="chartId" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ChartComponent',
  props: {
    chartId: {
      type: String,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '图表'
    },
    tooltipFormatter: {
      type: Function,
      default: (params) => {
        const b0 = params[0].name;
        const c0 = params[0].value;
        return `${b0}号<br>区块高度: ${c0}`;
      }
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
    }
  },
  mounted () {
    this.initChart();
  },
  methods: {
    getLastSevenDays () {
      const days = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        days.push(`${month}.${day}`);
      }
      return days;
    },
    initChart () {
      const chartDom = document.getElementById(this.chartId);
      const myChart = echarts.init(chartDom);

      const lastSevenDays = this.getLastSevenDays();

      const option = {
        title: {
          text: this.title,
          top: '6%',
          left: '7%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: this.tooltipFormatter // Use dynamic formatter from props
        },
        xAxis: {
          type: 'category',
          data: lastSevenDays
        },
        yAxis: {
          min: this.yAxisMin,  // Use dynamic min value
          max: this.yAxisMax,  // Use dynamic max value
          interval: this.yAxisInterval,  // Use dynamic interval
          type: 'value'
        },
        series: [
          {
            data: this.chartData,
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 2,
              color: '#5470C6'
            },
            areaStyle: {
              color: 'rgba(84, 112, 198, 0.2)'
            },
            symbol: 'circle',
            symbolSize: 8
          }
        ],
        // 使用 inside 类型的 dataZoom 以允许缩放，不显示拖动条
        dataZoom: [
          {
            type: 'inside', // 只使用内部缩放，去掉外部滑块
            xAxisIndex: 0, // 应用于x轴
            yAxisIndex: 0, // 应用于y轴，纵坐标也会跟着变化
            start: 0,
            end: 100
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart {
  width: 45vw;
  height: 400px;
  margin-top: 2%;
}
</style> -->

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
  },
  methods: {
    // 将时间戳转换为 (MM-DD HH:mm) 格式
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${month}-${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    },

    // 初始化图表
    initChart() {
      const chartDom = document.getElementById(this.chartId)
      const myChart = echarts.init(chartDom)

      // 获取格式化后的时间戳列表
      const formattedTimestamps = this.lineData.timestampList.map(ts => this.formatTimestamp(ts))

      const option = {
        title: {
          text: this.title,
          top: '6%',
          left: '7%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: this.tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: formattedTimestamps // 使用转换后的时间戳
        },
        yAxis: {
          min: this.yAxisMin, // 动态最小值
          max: this.yAxisMax, // 动态最大值
          interval: this.yAxisInterval, // 动态区间
          type: 'value'
        },
        series: [
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
        ],
        dataZoom: [
          {
            type: 'inside', // 启用内部缩放
            xAxisIndex: 0,
            start: 0,
            end: 100
          }
        ]
      }

      myChart.setOption(option)
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

