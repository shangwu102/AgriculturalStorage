<!-- 高德在线版本 -->
<!--
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
              // // 跳转到外部网页
              // window.location.href = 'http://localhost:8082/#/home'

              // 跳转路由
              this.$router.push('/lshome')
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

 -->

<template>
  <div class="home">
    <div style="width: 100%; height: 100%">
      <div id="map" class="map" />
    </div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Tile as TileLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Map, View, Feature } from 'ol'
import { Style, Icon } from 'ol/style'
import { Point } from 'ol/geom'
export default {
  name: 'HomeView',
  data() {
    return {
      pointData: [],
      defaultLocationIcon: 'http://192.168.47.11:8080/svg/positioning.svg', // 默认图标链接
      mapObj: null,
      mapDom: null,
      pointLayer: null, // 初始化为空
      onlinePosition: null, // 在线地理位置
      offlinePosition: [116.4074, 39.9042] // 离线位置（北京）
    }
  },
  mounted() {
    console.log('开始初始化地图')
    this.initMap() // 初始化地图
    console.log('地图初始化完成')

    this.getUserLocation() // 获取用户位置
  },
  beforeDestroy() {
    this.mapClear()
  },
  methods: {
    // 初始化地图的方法
    initMap() {
      this.mapDom = document.getElementById('map')
      this.mapObj = new Map({
        target: this.mapDom,
        view: new View({
          center: [116.2317, 39.5427],
          zoom: 6,
          minZoom: 1,
          maxZoom: 18,
          projection: 'EPSG:4326',
          extent: [
            73.1339870718837, 16.722475512185397, 140.59154463897022,
            55.75498452724199
          ]
        })
      })

      const offlineMapLayer = new TileLayer({
        source: new XYZ({
          url: 'http://192.168.47.11:8080/roadmap' + '/{z}/{x}/{y}.png'
        })
      })

      this.mapObj.addLayer(offlineMapLayer)
    },

    // 清除地图内容
    mapClear() {
      if (this.mapDom) {
        this.mapDom.innerHTML = ''
        this.mapDom = null
      }
    },

    // 获取用户位置并使用默认图标显示
    getUserLocation() {
      if ('geolocation' in navigator) {
        console.log('正在尝试获取地理位置...')
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = [position.coords.longitude, position.coords.latitude]
            console.log('获取到的地理位置为:', coords)
            this.onlinePosition = coords

            // 使用默认图标显示在线位置
            this.addLocationPoint(coords, this.defaultLocationIcon, true)
          },
          (error) => {
            console.error('获取在线位置失败: ', error)

            // 使用默认图标显示离线位置
            this.addLocationPoint(this.offlinePosition, this.defaultLocationIcon, true)
          }
        )
      } else {
        console.log('浏览器不支持地理位置，使用离线位置。')

        // 使用默认图标显示离线位置
        this.addLocationPoint(this.offlinePosition, this.defaultLocationIcon, true)
      }
    },

    // 添加位置点并使用图标，添加点击事件实现跳转
    addLocationPoint(coords, icon = this.defaultLocationIcon, addClickEvent = false) {
      // 如果 this.pointLayer 尚未初始化，初始化它
      if (!this.pointLayer) {
        this.pointLayer = new VectorLayer({
          source: new VectorSource() // 确保有有效的 source
        })
        this.mapObj.addLayer(this.pointLayer) // 将图层添加到地图
      }

      // 创建点特征
      const pointFeature = new Feature({
        geometry: new Point(coords) // 使用传入的经纬度
      })

      // 设置点的样式和默认图标
      console.log(icon)
      console.log(this.defaultLocationIcon)

      pointFeature.setStyle(
        new Style({

          image: new Icon({
            src: icon, // 使用默认图标
            scale: 0.3
          })
        })
      )

      // 将点特征添加到图层
      this.pointLayer.getSource().addFeature(pointFeature)
      // 为 map 添加鼠标移入和移出事件，改变光标样式
      this.mapObj.on('pointermove', (event) => {
        // 检查鼠标是否悬停在一个特征上
        const featureAtPixel = this.mapObj.forEachFeatureAtPixel(event.pixel, (feature) => feature)

        if (featureAtPixel === pointFeature) {
          // 鼠标移入图标，将光标样式改为指针
          this.mapObj.getTargetElement().style.cursor = 'pointer'
        } else {
          // 鼠标移出图标，恢复默认光标样式
          this.mapObj.getTargetElement().style.cursor = ''
        }
      })
      // 如果需要添加点击事件
      if (addClickEvent) {
        this.addClickEvent(pointFeature)
      }
    },

    // 添加点击事件
    addClickEvent(feature) {
      const map = this.mapObj

      // 监听点击事件
      map.on('singleclick', (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, (clickedFeature) => {
          if (clickedFeature === feature) {
            // 跳转到指定路由
            this.$router.push('/lshome')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style>

