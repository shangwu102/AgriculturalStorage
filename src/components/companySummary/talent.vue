<!--
 描述: 人才队伍
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="talent-container">
    <div id="chart_left2" class="chart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Talent',
  data() {
    return {

    }
  },
  mounted() {
    this.getEchartLeft2()
  },
  beforeDestroy() {

  },
  methods: {
    getEchartLeft2() {
      const myChart = echarts.init(document.getElementById('chart_left2'))
      const scaleData = [{
        name: '博士',
        value: 5
      }, {
        name: '硕士',
        value: 10
      }, {
        name: '本科',
        value: 10
      }, {
        name: '专科',
        value: 10
      }, {
        name: '国防科大',
        value: 5
      }, {
        name: '大厂专家',
        value: 5
      }]
      const rich = {
        white: {
          color: '#ddd',
          align: 'center',
          padding: [3, 0]
        }
      }
      const placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
      const data = []
      const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 6,
              shadowBlur: 10,
              borderColor: color[i],
              shadowColor: color[i]
            }
          }
        }, {
          value: 2,
          name: '',
          itemStyle: placeHolderStyle
        })
      }

      const option = {
        series: [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: ['66%', '68%'],
          center: ['50%', '50%'],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: (params) => {
                  let percent = 0
                  let total = 0
                  for (let i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                length: 10,
                length2: 30,
                show: true,
                color: '#00ffff'
              }
            }
          },
          data: data
        }]
      }

      myChart.setOption(option, true)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.talent-container {
  .chart {
    height: 3rem;
  }
}
</style>
