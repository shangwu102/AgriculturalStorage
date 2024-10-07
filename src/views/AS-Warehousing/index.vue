<template>
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
    this.getUserLocation()
  },
  methods: {
    async getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            this.getWeatherData(lat, lon)
          },
          () => {
            console.error('定位失败，请允许访问位置。')
            this.getWeatherDataByCity(this.city) // 如果定位失败，默认使用城市
          }
        )
      } else {
        console.error('浏览器不支持地理定位。')
        this.getWeatherDataByCity(this.city) // 如果不支持地理定位，默认使用城市
      }
    },
    async getWeatherData(lat, lon) {
      const key = 'c64c582ba15f63f9c869c1091fabfc73' // API 密钥
      try {
        const response = await axios.get(
          `https://restapi.amap.com/v3/weather/weatherInfo?city=${this.getCityCodeByCoordinates(lat, lon)}&key=${key}`
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
    },
    async getWeatherDataByCity(city) {
      const key = 'c64c582ba15f63f9c869c1091fabfc73' // API 密钥
      const cityCode = '110000' // 默认城市代码（北京）
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
    },
    async getCityCodeByCoordinates(lat, lon) {
      const key = 'c64c582ba15f63f9c869c1091fabfc73' // API 密钥
      try {
        const response = await axios.get(
          `https://restapi.amap.com/v3/geocode/regeo?location=${lon},${lat}&key=${key}`
        )
        if (response.data.status === '1') {
          const cityCode = response.data.regeocode.addressComponent.adcode // 获取城市代码
          return cityCode
        } else {
          console.error('获取城市代码失败:', response.data.info)
          return '110000' // 默认返回北京
        }
      } catch (error) {
        console.error('请求失败:', error)
        return '110000' // 默认返回北京
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
</style>
