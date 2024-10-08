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

<!-- <template>
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
        key: 'c64c582ba15f63f9c869c1091fabfc73', // 首次调用 load 时必填
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
</style> -->

<!-- <template>
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
        key: 'c64c582ba15f63f9c869c1091fabfc73',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.Marker'] // 添加 Marker 插件
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 11,
            center: [116.397428, 39.90923] // 默认中心点
          })
          this.getLocationAndAddMarker() // 获取位置信息并添加标记
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getLocationAndAddMarker() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            this.map.setCenter([longitude, latitude]) // 设置地图中心为用户当前位置

            // 添加标记
            const marker = new AMap.Marker({
              position: [longitude, latitude], // 标记位置
              icon: '' // 使用自定义图片URL
            })
            marker.setMap(this.map) // 将标记添加到地图上
          },
          (error) => {
            console.error('获取位置失败:', error)
          }
        )
      } else {
        console.error('浏览器不支持地理定位')
      }
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
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
    // 初始化地图
    initAMap() {
      window._AMapSecurityConfig = {
        securityJsCode: '288f6c42bf0b81a19f289a70939e37a3'
      }

      AMapLoader.load({
        key: 'c64c582ba15f63f9c869c1091fabfc73', // 高德地图API密钥
        version: '2.0', // API版本
        plugins: ['AMap.Scale', 'AMap.Marker'] // 加载的插件
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            viewMode: '3D', // 3D地图模式
            zoom: 11, // 地图初始化缩放级别
            center: [116.397428, 39.90923] // 初始化中心点
          })
          this.getLocationAndAddMarker() // 调用定位和添加标记的方法
        })
        .catch((e) => {
          console.error('地图加载失败:', e)
        })
    },

    // 获取地理位置并在地图上添加标记
    getLocationAndAddMarker() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            this.map.setCenter([longitude, latitude]) // 设置地图中心为当前位置

            // 创建并添加标记
            // eslint-disable-next-line no-undef
            const marker = new AMap.Marker({
              position: [longitude, latitude], // 标记位置
              icon: '' // 这里可以设置自定义图标的URL
            })
            marker.setMap(this.map) // 将标记添加到地图上

            // 为标记添加点击事件，跳转网页或路由
            marker.on('click', () => {
              // 跳转到外部网页
              window.location.href = 'https://hiwcq.com'

              // 如果需要跳转路由，可以取消上面的行，并使用下面的代码
              // this.$router.push({ name: 'TargetRoute' }) // 跳转到路由
            })
          },
          (error) => {
            console.error('获取地理位置失败:', error)
          }
        )
      } else {
        console.error('浏览器不支持地理定位')
      }
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

