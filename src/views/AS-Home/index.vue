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
        }
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
  height: 100vh;
}
</style>
