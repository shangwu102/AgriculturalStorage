<!-- <template>
  <div class="dashboard-container">
    <img src="@/assets/welcome.jpg" width="85%">
  </div>
</template>

<script>
import { getIndexData } from '@/api/index.js'
export default {
  name: 'Dashboard',
  mounted() {
    getIndexData().then((result) => {
      console.log(result)
      // TODO
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
 -->

<!-- <template>
  <div id="app">
    <h1>实时天气查询</h1>
    <div v-if="weather">
      <h2>{{ city }} 的天气</h2>
      <p>天气状况: {{ weather.weather }}</p>
      <p>温度: {{ weather.temperature }}°C</p>
      <p>风向: {{ weather.winddirection }}</p>
      <p>风速: {{ weather.windpower }}级</p>
      <p>湿度: {{ weather.humidity }}%</p>
    </div>
    <div v-else>
      <p>正在加载天气数据...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      city: '北京', // 默认城市
      weather: null // 保存天气信息
    }
  },
  created() {
    this.getWeatherData()
  },
  methods: {
    // 获取天气信息的方法
    async getWeatherData() {
      const key = 'c64c582ba15f63f9c869c1091fabfc73' // 使用你提供的高德API key
      const cityCode = '110000' // 北京的城市代码

      try {
        const response = await axios.get(
          `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${key}`
        )
        console.log(response)

        if (response.data.status === '1') {
          this.weather = response.data.lives[0] // 获取第一个实时天气数据
        } else {
          console.error('获取天气数据失败:', response.data.info)
        }
      } catch (error) {
        console.error('请求失败:', error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 24px;
}

p {
  font-size: 18px;
}
</style> -->

<template>
  <div id="container" />
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapView',
  mounted() {
    this.initAMap()
  },
  unmounted() {
    this.map?.destroy()
  },
  methods: {
    initAMap() {
      window._AMapSecurityConfig = {
        securityJsCode: '288f6c42bf0b81a19f289a70939e37a3'
      }
      AMapLoader.load({
        key: 'c64c582ba15f63f9c869c1091fabfc73', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale'] // 需要使用的的插件列表
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [116.397428, 39.90923] // 初始化地图中心点位置
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
