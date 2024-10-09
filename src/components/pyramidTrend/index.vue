<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-title">粮仓环境监测</div>
      <div class="sn-body">
        <div class="wrap-container">
          <div id="pyramidTrend1" class="chartsdom" />
          <div id="pyramidTrend2" class="chartsdom" />
          <div id="pyramidTrend3" class="chartsdom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts' // 确保导入 ECharts

export default {
  name: 'PyramidTrend',
  data() {
    return {
      options: [null, null, null], // 存储三个仪表盘的选项
      timers: [null, null, null] // 存储三个仪表盘的定时器
    }
  },
  mounted() {
    // 确保在 DOM 更新后再初始化图表
    this.$nextTick(() => {
      this.getEcharts()
    })
  },
  beforeDestroy() {
    // 清除所有定时器
    for (let i = 0; i < 3; i++) {
      clearInterval(this.timers[i])
    }
  },
  methods: {
    getEcharts() {
      // 渲染三个仪表盘
      for (let i = 0; i < 3; i++) {
        const myChart = echarts.init(document.getElementById(`pyramidTrend${i + 1}`), null, { width: 210, height: 400 }) // 动态获取 ID
        this.options[i] = {
          tooltip: {
            formatter: '{a} <br/>{c} {b}'
          },
          series: [{
            name: `仪表盘 ${i + 1}`, // 仪表盘名称
            type: 'gauge',
            min: 0,
            max: 100,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                width: 6, // 调整仪表盘线条宽度
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10,
              fontSize: 12 // 设置显示字体大小
            },
            axisTick: {
              length: 10,
              lineStyle: {
                color: 'auto',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 3,
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            pointer: {
              width: 5, // 指针的宽度
              length: '90%', // 指针长度
              shadowColor: '#fff',
              shadowBlur: 5
            },
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 12, // 设置标题字体大小
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            detail: {
              offsetCenter: [0, '65%'], // 修改位置
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 20, // 设置字体大小
                color: '#fff'
              },
              formatter: (value) => { // 自定义显示格式
                return value.toFixed(2) // 保留两位小数
              }
            },
            data: [{
              value: Math.random() * 220, // 初始值随机
              name: i === 0 ? '°C/h' : '%/h' // 根据仪表盘索引设置单位
            }]
          }]
        }

        myChart.setOption(this.options[i], true)

        // 监听窗口大小变化以调整图表大小
        window.addEventListener('resize', () => {
          myChart.resize()
        })

        // 设置定时器更新数据
        this.timers[i] = setInterval(() => {
          this.options[i].series[0].data[0].value = (Math.random() * 220).toFixed(2) - 0 // 更新随机值
          myChart.setOption(this.options[i], true)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sn-container {
  left: 1275px;
  top: 700px;
  width: 600px;
  /* 修改为适合的宽度 */
  height: 400px;
  /* 修改为适合的高度 */

  .wrap-container {
    display: flex;
    /* 使用 flexbox 布局 */
    flex-direction: row;
    /* 水平排列 */
    justify-content: space-around;

    /* 在水平方向上均匀分布 */
    .chartsdom {
      margin-left: -1%;
    }
  }
}
</style>
