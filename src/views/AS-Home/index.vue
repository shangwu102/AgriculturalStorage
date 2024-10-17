<!-- 高德在线版本 -->

<template>
  <div id="container" />
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

// 导入仓库图标
import beijingIcon from '@/icons/beijing-icon.png'
// 如果需要不同的图标，可以继续导入其他图标
// import tianjinIcon from '@/icons/tianjin-icon.png'
// import shijiazhuangIcon from '@/icons/shijiazhuang-icon.png'
// import taiyuanIcon from '@/icons/taiyuan-icon.png'
// import zhengzhouIcon from '@/icons/zhengzhou-icon.png'
// import shanghaiIcon from '@/icons/shanghai-icon.png'
// import guangzhouIcon from '@/icons/guangzhou-icon.png'
// import chengduIcon from '@/icons/chengdu-icon.png'

export default {
  name: 'MapView',
  data() {
    return {
      map: null // 存储地图实例
    }
  },
  mounted() {
    this.initAMap()
  },
  unmounted() {
    this.map?.destroy()
  },
  methods: {
    // 初始化地图
    initAMap() {
      // 配置高德地图安全码
      window._AMapSecurityConfig = {
        securityJsCode: '288f6c42bf0b81a19f289a70939e37a3' // 替换为您的安全码
      }

      AMapLoader.load({
        key: 'c64c582ba15f63f9c869c1091fabfc73', // 替换为您的高德地图API密钥
        version: '2.0', // API版本
        plugins: ['AMap.Scale', 'AMap.Marker'] // 加载的插件
      })
        .then((AMap) => {
          // 创建地图实例
          this.map = new AMap.Map('container', {
            viewMode: '2D', // 2D地图模式，减少视图范围限制
            zoom: 5, // 根据全国范围调整缩放级别
            center: [104.195397, 35.86166], // 中国中心坐标
            // pitch: 45, // 地图倾斜角度（可选）
            showBuildingBlock: true, // 显示建筑物
            resizeEnable: true // 地图尺寸随窗口变化
            // 其他地图参数可以根据需要添加
          })

          // 注释掉自动定位功能
          // this.getLocationAndAddMarker()

          // 添加仓库标记
          this.addWarehouseMarkers(AMap)

          // 可选：调整地图视图以适应所有标记
          // this.map.setFitView()
        })
        .catch((e) => {
          console.error('地图加载失败:', e)
        })
    },

    // 获取地理位置并在地图上添加标记（已注释）
    /*
    getLocationAndAddMarker() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            this.map.setCenter([longitude, latitude]) // 设置地图中心为当前位置

            // 创建并添加标记
            const marker = new AMap.Marker({
              position: [longitude, latitude], // 标记位置
              icon: '' // 这里可以设置自定义图标的URL
            })
            marker.setMap(this.map) // 将标记添加到地图上

            // 为标记添加点击事件，跳转网页或路由
            marker.on('click', () => {
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
    },
    */

    // 添加仓库标记
    addWarehouseMarkers(AMap) {
      // 定义全国范围内仓库的位置信息
      const warehouses = [
        // 华北地区
        {
          name: '北京仓库',
          position: [116.407395, 39.904211], // 北京市
          icon: beijingIcon // 自定义图标
        },
        {
          name: '天津仓库',
          position: [117.200983, 39.084158], // 天津市
          icon: beijingIcon
        },
        {
          name: '石家庄仓库',
          position: [114.514863, 38.042307], // 石家庄市
          icon: beijingIcon
        },
        {
          name: '太原仓库',
          position: [112.550864, 37.890277], // 太原市
          icon: beijingIcon
        },
        {
          name: '郑州仓库',
          position: [113.665412, 34.757977], // 郑州市
          icon: beijingIcon
        },
        // 东北地区
        {
          name: '沈阳仓库',
          position: [123.429096, 41.796767], // 沈阳市
          icon: beijingIcon // 使用相同的自定义图标
        },
        {
          name: '大连仓库',
          position: [121.614682, 38.914003], // 大连市
          icon: beijingIcon
        },
        {
          name: '哈尔滨仓库',
          position: [126.642464, 45.756967], // 哈尔滨市
          icon: beijingIcon
        },
        {
          name: '长春仓库',
          position: [125.3245, 43.886841], // 长春市
          icon: beijingIcon
        },
        // 华东地区
        {
          name: '上海仓库',
          position: [121.473701, 31.230416], // 上海市
          icon: beijingIcon
        },
        {
          name: '南京仓库',
          position: [118.796877, 32.060255], // 南京市
          icon: beijingIcon
        },
        {
          name: '杭州仓库',
          position: [120.15507, 30.274085], // 杭州市
          icon: beijingIcon
        },
        // 华南地区
        {
          name: '广州仓库',
          position: [113.264385, 23.129112], // 广州市
          icon: beijingIcon
        },
        {
          name: '深圳仓库',
          position: [114.057868, 22.543099], // 深圳市
          icon: beijingIcon
        },
        // 西南地区
        {
          name: '成都仓库',
          position: [104.066541, 30.572269], // 成都市
          icon: beijingIcon
        },
        {
          name: '重庆仓库',
          position: [106.551556, 29.56301], // 重庆市
          icon: beijingIcon
        },
        // 西北地区
        {
          name: '西安仓库',
          position: [108.948024, 34.263161], // 西安市
          icon: beijingIcon
        },
        {
          name: '兰州仓库',
          position: [103.834304, 36.061089], // 兰州市
          icon: beijingIcon
        },
        // 中南地区
        {
          name: '武汉仓库',
          position: [114.305393, 30.593099], // 武汉市
          icon: beijingIcon
        },
        {
          name: '长沙仓库',
          position: [112.982279, 28.19409], // 长沙市
          icon: beijingIcon
        },
        // 其他地区
        {
          name: '昆明仓库',
          position: [102.712251, 25.040609], // 昆明市
          icon: beijingIcon
        },
        {
          name: '南昌仓库',
          position: [115.858198, 28.682892], // 南昌市
          icon: beijingIcon
        },
        // 随机添加更多全国范围内的仓库
        {
          name: '厦门仓库',
          position: [118.089425, 24.479834], // 厦门市
          icon: beijingIcon
        },
        {
          name: '福州仓库',
          position: [119.306239, 26.075302], // 福州市
          icon: beijingIcon
        },
        {
          name: '合肥仓库',
          position: [117.283042, 31.86119], // 合肥市
          icon: beijingIcon
        },
        {
          name: '南宁仓库',
          position: [108.320004, 22.82402], // 南宁市
          icon: beijingIcon
        },
        {
          name: '贵阳仓库',
          position: [106.713478, 26.578343], // 贵阳市
          icon: beijingIcon
        },
        {
          name: '南充仓库',
          position: [106.082995, 30.784419], // 南充市
          icon: beijingIcon
        },
        {
          name: '包头仓库',
          position: [109.84624, 40.647122], // 包头市
          icon: beijingIcon
        },
        {
          name: '乌鲁木齐仓库',
          position: [87.616848, 43.825592], // 乌鲁木齐市
          icon: beijingIcon
        }
        // 更多仓库可按需添加
      ]

      // 创建一个统一的自定义图标（如果所有仓库使用相同图标）
      const unifiedCustomIcon = new AMap.Icon({
        size: new AMap.Size(32, 32), // 图标大小，单位像素
        image: beijingIcon, // 图标地址
        imageSize: new AMap.Size(32, 32) // 根据图标的实际大小调整
        // 可以添加其他属性，如图标的偏移量
      })

      // 遍历仓库列表，逐个添加标记
      warehouses.forEach((warehouse) => {
        // 如果每个仓库使用不同的图标，可以在这里为每个仓库创建不同的自定义图标
        // const customIcon = new AMap.Icon({
        //   size: new AMap.Size(32, 32),
        //   image: warehouse.icon,
        //   imageSize: new AMap.Size(32, 32)
        // })

        const marker = new AMap.Marker({
          position: warehouse.position,
          // icon: customIcon, // 使用不同的自定义图标
          icon: unifiedCustomIcon, // 使用统一的自定义图标
          title: warehouse.name
        })
        marker.setMap(this.map)

        // 为每个标记添加点击事件，例如显示信息窗体或跳转页面
        marker.on('click', () => {
          // 示例：显示信息窗体
          const infoWindow = new AMap.InfoWindow({
            content: `<div style="min-width:200px"><strong>${warehouse.name}</strong></div>`,
            offset: new AMap.Pixel(0, -30)
          })
          infoWindow.open(this.map, warehouse.position)

          // 示例：跳转到仓库详情页面
          // this.$router.push(`/warehouse/${encodeURIComponent(warehouse.name)}`)
        })
      })
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
  /* 可以根据需要调整高度 */
}
</style>

<!-- <template>
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

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style> -->

