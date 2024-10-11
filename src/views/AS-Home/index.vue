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
      <!-- <div ref="popOut">/*div中可以放置弹窗内容*/</div> -->
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
import { Style, Icon, Stroke } from 'ol/style'
import { Point } from 'ol/geom'
import Overlay from 'ol/Overlay'
import { LineString } from 'ol/geom'

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      pointData: [],
      pointImg: 'http://192.168.10.52:8080/坐标.png',
      mapObj: null,
      mapDom: null,
      pointLayer: {},
      a: [],
      linePointData: [
        // [
        //   [116.379008, 39.865012], // 起点坐标
        //   [116.37809, 39.87085], // 终点坐标，其他坐标可放进起终点坐标之间
        // ],
        // [
        //   [116.37809, 39.87085], // 起点坐标
        //   [116.37491, 39.87365], // 终点坐标，其他坐标可放进起终点坐标之间
        // ],
        // [
        //   [116.37491, 39.87365], // 起点坐标
        //   [116.37435, 39.87477], // 终点坐标，其他坐标可放进起终点坐标之间
        // ],
        // [
        //   [116.37435, 39.87477], // 起点坐标
        //   [116.3744, 39.90677], // 终点坐标，其他坐标可放进起终点坐标之间
        // ],
      ]
      // pointData: [
      //   {
      //     name: "北京西站",
      //     location: [116.322062, 39.894914],
      //   },
      //   {
      //     name: "北京南站",
      //     location: [116.379008, 39.865012],
      //   },
      //   {
      //     name: "菜市口",
      //     location: [116.37435, 39.88916],
      //   },
      // ],
    }
  },
  mounted() {
    this.initMap()
    // this.clickMap();

    this.pointData.forEach((v, index) => {
      this.addPoints(v, index)
    })

    // this.clickOverLay();

    this.drawLine(this.linePointData)
  },

  beforeDestroy() {
    this.mapClear()
  },
  methods: {
    // 清除地图；某些情况下地图容器会存在两个，导致地图无法正常显示。
    // 找了半天官方貌似也没有提供对应的api，自己动手了。
    mapClear() {
      if (this.mapDom) {
        this.mapDom.innerHTML = ''
        this.mapDom = null
      }
    },

    // 初始化地图
    initMap() {
      // 先尝试清除
      // this.mapClear()
      // 获取地图容器
      this.mapDom = document.getElementById('map')

      // 初始化地图配置
      this.mapObj = new Map({
        target: this.mapDom, // 地图容器
        view: new View({
          // center: [114.18897629, 36.66153409], // 地图中心点
          center: [116.2317, 39.5427], // 地图中心点
          zoom: 6, // 缩放
          minZoom: 1, // 设置最小缩放级别
          maxZoom: 18, // 设置最大缩放级别

          // doubleClickZoom: false,   //屏蔽双击放大事件  (失效)

          projection: 'EPSG:4326', // 坐标系
          extent: [
            73.1339870718837, 16.722475512185397, 140.59154463897022,
            55.75498452724199
          ]

          // 73.1339870718837, 55.75498452724199
          // 140.59154463897022,16.722475512185397
        })
      })

      // 添加一个使用离线瓦片地图的层
      const offlineMapLayer = new TileLayer({
        source: new XYZ({
          // url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
          url: 'http://localhost:8000/roadmap' + '/{z}/{x}/{y}.png' // 设置本地离线瓦片所在路径,前面的地址是你输入http-server之后的服务地址
        })
      })

      // // 地图点击触发事件
      // this.mapObj.on("click", (e) => {
      //   // 判断是不是移动到图标之上
      //   const feature = this.mapObj.forEachFeatureAtPixel(e.pixel, (feature) => {
      //     return feature;
      //   });
      //   // 如果移动到图标上就继续进行下一步操作
      //   if (feature) {
      //     // 设定弹窗位置
      //     this.overLayer.setPosition(e.coordinate);
      //     // 获取到上面预先设置的属性，可以根据获取预先设置的属性来改变弹窗内容
      //     console.info(feature.values_.name);
      //   } else {
      //     // 取消弹窗显示
      //     this.overLayer.setPosition(undefined);
      //   }
      // });

      this.mapObj.on('singleclick', (event) => {
        console.log(event.coordinate, 'awdasdas')
        this.a.push(event.coordinate)
        console.log(this.a)
        this.pointDrowLine()
        const pixel = event.pixel // pixel：点击的像素点
        // forEachFeatureAtPixel：map对象上的通过像素点获取标注点
        const feature = this.mapObj.forEachFeatureAtPixel(
          pixel,
          (feature) => feature
        )
        if (feature) {
          console.log(
            '当前为标记点，id为：' +
            feature.values_.id +
            '，坐标为：' +
            event.coordinate
          )
          console.log(feature)
          // console.log(event);
          // 如果feature存在，表示点击的是标注点
          // 可以通过feature.get(属性值)来获取标注点自定义的一些属性，这些属性是在new Feature构造函数中设置的属性值
        } else {
          // 如果feature不存在，表示点击的是地图的空白部分
          // const coordinate = event.coordinate // 通过event.coordiante属性获取点击的地方的经纬度
          // console.log(coordinate,"123131231")
          console.log('当前为空白处，坐标为:' + event.coordinate)
        }
      })
      // 将图层添加到地图
      this.mapObj.addLayer(offlineMapLayer)
    },
    clickMap() {
      this.mapObj.on('click', (e) => {
        // this.addPoints(e.coordinate);
        console.log(e.coordinate)
      })
    },

    // clickOverLay() {
    //   this.mapObj.on('click', function (event) {
    //     const feature = this.mapObj.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
    //       return feature;
    //     });
    //     if (feature) {
    //       // 在这里执行您的回调函数，例如弹出一个信息框
    //       console.log('Feature clicked:', feature.get('name'));
    //     }
    //   })
    // },

    pointDrowLine() {
      if (this.a.length > 1) {
        for (let i = 0; i < this.a.length - 1; i++) {
          const pointInfo = []
          pointInfo.push(this.a[i])
          pointInfo.push(this.a[i + 1])
          this.linePointData.push(pointInfo)
        }
      }

      this.drawLine(this.linePointData)
    },

    /**
     * 根据经纬度坐标添加覆盖物
     */
    addPoints(coordinate, index) {
      if (Object.keys(this.pointLayer).length === 0) {
        // 创建图层
        this.pointLayer = new VectorLayer({
          source: new VectorSource()
        })
        // 图层添加到地图上
        this.mapObj.addLayer(this.pointLayer)
      }

      // 创建feature要素，一个feature就是一个点坐标信息
      const feature = new Feature({
        geometry: new Point(coordinate.location),
        id: index
      })
      // 设置要素的图标
      feature.setStyle(
        new Style({
          // 设置图片效果
          image: new Icon({
            src: 'http://192.168.10.52:8080/坐标.png',
            // anchor: [0.5, 0.5],
            scale: 0.2
          })
        })
      )
      // 要素添加到地图图层上
      // this.pointLayer.getSource().addFeatures([feature]);
      this.pointLayer.getSource().addFeature(feature)

      // 设置文字信息
      this.addText(coordinate)
    },
    addText(coordinate) {
      const overlayBox = document.getElementById('map') // 获取一个div
      const oSpan = document.createElement('span') // 创建一个span
      oSpan.contentEditable = false // 设置文字是否可编辑
      oSpan.className = 'oSpanStyle'
      // oSpan.id = coordinate[0]; //创建一个id
      const ospanId =
        coordinate.location[0].toString() + coordinate.location[1].toString()
      oSpan.id = ospanId // 创建一个id
      // let pText = document.createTextNode(
      //   `${coordinate.name}(${coordinate.location[0].toFixed(2)},${coordinate.location[1].toFixed(2)})`
      // ); //创建span的文本信息
      const pText = document.createTextNode(`${coordinate.name}`) // 创建span的文本信息
      oSpan.appendChild(pText) // 将文本信息添加到span
      overlayBox.appendChild(oSpan) // 将span添加到div中
      const textInfo = new Overlay({
        position: coordinate.location, // 设置位置
        element: document.getElementById(ospanId),
        offset: [-35, 10] // 设置偏移
      })
      this.mapObj.addOverlay(textInfo)
    },

    // 绘制连线  绘制线
    drawLine(coordinates) {
      // coordinates：坐标数据
      if (coordinates && coordinates.length > 0) {
        const features = [] // 线条样式存放路径
        coordinates.map((item) => {
          if (item.length > 1) {
            const feature = new Feature({
              geometry: new LineString(item)
            })
            features.push(feature)
          }
        })
        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: features
          }),
          style: new Style({
            // 线段颜色
            stroke: new Stroke({
              color: 'green',
              width: 5
            })
          })
        })
        this.mapObj.addLayer(vectorLayer)
      }
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
  // overflow: hidden;
  // background-color: red;
  pointer-events: auto;
}

.oSpanStyle {
  font-size: 18px;
  font-weight: 600;
  color: blue;
  // width: auto;
  cursor: pointer;
  // height: 80px;
  // display: flex;
  // align-items: flex-end;
  // position: absolute;
  // top: -50px;
}
</style>
