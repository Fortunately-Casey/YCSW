/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
<template >
  <div class="arcmap">
    <div id="mapDiv">
      <div class="fault-level">
        <fault-level v-if="isShowFaultLevel"></fault-level>
      </div>
      <div class="fault-detail">
        <fault-detail v-if="isShowFaultDetail"></fault-detail>
      </div>
    </div>
    <div class="tool">
      <tool-bar :baseMap="baseMap" @registerMapClick="registerMapClick"></tool-bar>
    </div>
    <div class="map-switch">
      <map-switch :baseMap="baseMap"></map-switch>
    </div>
    <div class="detail" v-if="isShowDetail">
      <search-detail></search-detail>
    </div>
    <div class="detail" v-if="isShowConnect">
      <connect-detail></connect-detail>
    </div>
    <div class="detail" v-if="isShowValve">
      <valve-detail></valve-detail>
    </div>
    <div class="detail" v-if="isShowRepairDetail">
      <repair-detail></repair-detail>
    </div>
    <div class="detail" v-if="isShowEquipment">
      <equipment-detail></equipment-detail>
    </div>
    <div class="detail" v-if="isShowRealTimeDetail">
      <realTime-detail></realTime-detail>
    </div>
    <div class="detail" v-if="isShowUserQueryDetail">
      <userquery-detail></userquery-detail>
    </div>
    <div class="detail" v-if="isShowComsuptionDetail">
      <comsuption-detail></comsuption-detail>
    </div>
    <div class="clickDetail" ref="clickDetail">
      <click-detail v-if="isShowClickDetail"></click-detail>
    </div>
    <div class="realTime" v-if="isShowRealTime">
      <div class="header">{{date}} {{clock}}</div>
      <div class="pressure" v-if="realTimeList.length > 5">
        <real-time
          v-for="(item,index) in realTimeList.slice(5,10)"
          :key="index"
          :myChart="'myChart'+ (index+6)"
          :data="item"
          :isCenter="isCenter"
        ></real-time>
      </div>
      <div class="traffic" v-if="realTimeList.length > 5">
        <real-time
          v-for="(item,index) in realTimeList.slice(0,5)"
          :key="index"
          :myChart="'myChart'+ (index+1)"
          :data="item"
          :isCenter="isCenter"
        ></real-time>
      </div>
      <div class="traffic" v-if="realTimeList.length <= 5">
        <real-time
          v-for="(item,index) in realTimeList.slice(0,5)"
          :key="index"
          :myChart="'myChart'+ (index+1)"
          :data="item"
          :isCenter="isCenter"
        ></real-time>
      </div>
    </div>
  </div>
</template>
<script>
import ToolBar from './components/ToolBar.vue'
import MapSwitch from './components/MapSwitch.vue'
// import SearchBar from './components/SearchBar.vue'
import SearchDetail from './dialog/SearchDetail.vue'
import ConnectDetail from './dialog/ConnectDetail.vue'
import ValveDetail from './dialog/ValveDetail.vue'
import RepairDetail from './dialog/RepairDetail.vue'
import EquipmentDetail from './dialog/EquipmentDetail.vue'
import RealTime from './components/RealTime.vue'
import RealTimeDetail from './dialog/RealTimeDetail.vue'
import ClickDetail from './dialog/ClickDetail.vue'
import UserqueryDetail from './dialog/UserqueryDetail.vue'
import ComsuptionDetail from './dialog/ComsuptionDetail.vue'
import FaultDetail from './dialog/FaultDetail.vue'
import FaultLevel from './components/FaultLevel.vue'
import esriLoader from 'esri-loader'
import { mapGetters, mapActions } from 'vuex'
import { GetSCADALive } from '@/api/realTime.js'
import { getDate, getClock } from '@/common/utils/tool.js'

export default {
  data () {
    return {
      realTimeList: [],
      date: '',
      clock: '',
      timer: '',
      isCenter: false,
      baseMap: '',
      time: ''
    }
  },

  computed: {
    ...mapGetters([
      'isShowDetail',
      'isShowConnect',
      'isShowValve',
      'isShowRepairDetail',
      'isShowEquipment',
      'EquimentType',
      'Geometrystr',
      'isShowRealTimeDetail',
      'isShowClickDetail',
      'isMeasure',
      'clickResult',
      'isShowUserQueryDetail',
      'isShowComsuptionDetail',
      'isOpenTimer',
      'isShowFaultLevel',
      'isShowFaultDetail'
    ]),
    isShowRealTime () {
      return this.$route.name === 'realtime'
    }
  },
  mounted () {
    this.createMap()
    if (this.$route.name === 'realtime') {
      this.setisOpenTimer(true)
    }
  },
  //
  created () {
    // this.getRealTime();
    this.initTime()
    setInterval(() => {
      this.initTime()
    }, 1000)
  },
  methods: {
    ...mapActions({
      setClick: 'setClickResult',
      showClick: 'setIsShowClickDetail',
      setMap: 'setMapBase',
      setisOpenTimer: 'setIsOpenTimer',
      showFaultDetail: 'setIsShowFaultDetail',
      setFaultDetail: 'setFaultDetailValue'
    }),
    createMap () {
      var vm = this
      esriLoader
        .loadModules([
          'static/arcpackage/mapBaseNew',
          'esri/geometry/Point',
          'esri/geometry/Extent',
          'esri/SpatialReference',
          'esri/layers/ArcGISTiledMapServiceLayer',
          'esri/tasks/IdentifyTask',
          'esri/tasks/IdentifyParameters',
          'esri/layers/WebTiledLayer'
        ])
        .then(function ([
          CreateMap,
          Point,
          Extent,
          SpatialReference,
          ArcGISTiledMapServiceLayer,
          IdentifyTask,
          IdentifyParameters,
          WebTiledLayer
        ]) {
          dojo.addOnLoad(function () {
            esriConfig.defaults.io.proxyUrl =
              'http://10.11.222.52:14451/Proxy/proxy.ashx'
            esriConfig.defaults.io.alwaysUseProxy = false
          })
          var centerpoint = new Point(
            13348940,
            3952540,
            new SpatialReference({ wkid: 102100 })
          )
          vm.baseMap = new CreateMap('mapDiv', {
            center: centerpoint,
            logo: false,
            wrapAround180: false,
            slider: false,
            zoom: 10
          })
          vm.baseMap.map.on('load', function () {
            vm.registerMapClick()
          })
          vm.baseMap.map.on('zoom-end', evt => {
            if (evt.level < 9) {
              vm.baseMap.map.setLevel(10)
              vm.baseMap.map.centerAt(centerpoint)
            }
          })
          vm.baseMap.map.on('mouse-drag-end', evt => {
            // console.log(vm.baseMap.map.extent.xmax);
            // console.log(evt.mapPoint.x);
            // if (evt.mapPoint.x < vm.baseMap.map.extent.xmax) {
            //   console.log("111");
            // }
            // vm.baseMap.map.setLevel(10);
            // vm.baseMap.map.centerAt(
            //   new Point(
            //     13348940,
            //     3952540,
            //     new SpatialReference({ wkid: 102100 })
            //   )
            // );
          })
          var googleMap1 = new WebTiledLayer(
            'http://mt${subDomain}.google.cn/maps/vt?lyrs=s%40717&hl=zh-CN&gl=CN&x=${col}&y=${row}&z=${level}',
            {
              id: 'googleMap1',
              subDomains: ['0', '1', '2']
            }
          )
          var googleMap2 = new WebTiledLayer(
            'http://mt${subDomain}.google.cn/maps/vt/imgtp=png32&lyrs=h@262&hl=x-local&gl=cn&x=${col}&y=${row}&z=${level}&s=G',
            {
              id: 'googleMap2',
              subDomains: ['0', '1', '2']
            }
          )
          var googleMap3 = new WebTiledLayer(
            'http://mt${subDomain}.google.cn/maps/vt?lyrs=m@748&gl=cn&x=${col}&y=${row}&z=${level}',
            {
              id: 'googleMap3',
              subDomains: ['0', '1', '2']
            }
          )

          vm.baseMap.map.addLayer(googleMap1)
          vm.baseMap.map.addLayer(googleMap2)
          vm.baseMap.map.addLayer(googleMap3)
          vm.baseMap.map.on('click', function (result) {
            if (vm.$route.name === 'patrol' && vm.isShowFaultLevel) {
              if (result.graphic) {
                if (result.graphic.attributes) {
                  vm.setFaultDetail(result.graphic.attributes)
                  vm.showFaultDetail(true)
                } else {
                  vm.$message({
                    message: '数据为空',
                    type: 'warning'
                  })
                }
              } else {
                vm.showFaultDetail(false)
              }
            }
          })

          // vm.baseMap.addTiledMapServiceLayer(
          //   "http://10.11.222.52:6080/arcgis/rest/services/YCSWData/YCDZDT_XA80/MapServer",
          //   {
          //     id: "basemap",
          //     visible: true,
          //     opacity: 1,
          //     index: 0
          //   }
          // );
          // vm.baseMap.addTiledMapServiceLayer(
          //   "http://10.11.222.52:6080/arcgis/rest/services/YCSWData/YCSWYXService/MapServer",
          //   {
          //     id: "cultrue",
          //     visible: true,
          //     opacity: 1,
          //     index: 1
          //   }
          // );
          vm.baseMap.addDynamicMapServiceLayer(
            'ssg',
            // "http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSX_XA80/MapServer",
            'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSX_XA80/MapServer',
            true,
            1,
            4
          )
          vm.baseMap.addDynamicMapServiceLayer(
            'xzqh',
            'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/YCSWXZQH_XA80/MapServer',
            true,
            0.7,
            3
          )
          // vm.baseMap.addTiledMapServiceLayer(
          //   "http://10.11.222.52:6080/arcgis/rest/services/YCSWData/DXT_XA80/MapServer",
          //   {
          //     id: "dxt",
          //     visible: true,
          //     opacity: 1,
          //     index: 3
          //   }
          // );
          // vm.baseMap.hideLayer("dxt");
          vm.baseMap.hideLayer('googleMap3')

          window.mapBase = vm.baseMap
        })
    },
    registerMapClick () {
      var vm = this
      vm.baseMap.registerMapClick(function (e) {
        if (vm.$route.name !== 'analysis' && vm.isShowFaultLevel !== true) {
          vm.showClick(false)
          var result = []
          var visiblelayers = vm.baseMap.identityQuery(e)
          visiblelayers.map((v, i) => {
            vm.mapIdentifyTask(v, e.mapPoint).then(resp => {
              result.push(resp)
              vm.showClick(true)
              vm.setClick(result)
            })
          })
        }
      })
    },
    mapIdentifyTask (identifier, geometry) {
      var deferred = new dojo.Deferred()
      var vm = this
      esriLoader
        .loadModules([
          'esri/tasks/IdentifyTask',
          'esri/tasks/IdentifyParameters'
        ])
        .then(function ([IdentifyTask, IdentifyParameters]) {
          var mapIdentifyTask = new IdentifyTask(identifier.url)
          var identifyParams = new IdentifyParameters()
          identifyParams.tolerance = 3
          identifyParams.returnGeometry = true
          identifyParams.layerIds = [0]
          identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL
          identifyParams.width = vm.baseMap.map.width
          identifyParams.height = vm.baseMap.map.height
          identifyParams.geometry = geometry
          identifyParams.mapExtent = vm.baseMap.map.extent
          mapIdentifyTask.execute(
            identifyParams,
            function (identifyResults) {
              if (identifyResults.length > 0) {
                deferred.resolve({
                  url: identifier.url,
                  feature: identifyResults[0].feature
                })
              } else {
              }
            },
            function () {
              deferred.reject('查询失败！')
            }
          )
        })
      return deferred.promise
    },
    getRealTime () {
      var vm = this
      GetSCADALive({
        EquimentType: vm.EquimentType,
        Geometrystr: vm.Geometrystr
      }).then(resp => {
        if (resp.data.success) {
          vm.realTimeList = resp.data.rows
          if (vm.realTimeList.length > 5) {
            vm.isCenter = false
          } else {
            vm.isCenter = true
          }
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    initTime () {
      this.timer = setInterval(() => {
        this.date = getDate()
        this.clock = getClock()
      }, 1000)
    }
  },
  watch: {
    isOpenTimer () {
      var vm = this
      if (vm.isOpenTimer) {
        vm.time = setInterval(() => {
          this.getRealTime()
        }, 1000)
      } else {
        clearInterval(vm.time)
      }
    }
  },
  components: {
    ToolBar,
    MapSwitch,
    SearchDetail,
    ConnectDetail,
    ValveDetail,
    RepairDetail,
    EquipmentDetail,
    RealTime,
    RealTimeDetail,
    ClickDetail,
    UserqueryDetail,
    ComsuptionDetail,
    FaultLevel,
    FaultDetail
  }
}
</script>
<style lang="less" scoped>
.arcmap {
  width: 100%;
  height: 95%;
  position: relative;
  #mapDiv {
    width: 98%;
    height: 96%;
    position: absolute;
    left: 15px;
    top: 15px;
    box-shadow: 0px 0px 3px 1px #adbfd3;
    .fault-level {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #fff;
      z-index: 999;
      border-radius: 5px;
      box-shadow: 0px 0px 3px 1px #adbfd3;
    }
    .fault-detail {
      position: absolute;
      left: 100px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      z-index: 99;
      border-radius: 5px;
      box-shadow: 0px 0px 3px 1px #adbfd3;
    }
  }
  .search-bar {
    position: absolute;
    left: 30px;
    top: 20px;
  }
  .tool {
    position: absolute;
    right: 40px;
    top: 40px;
  }
  .map-switch {
    position: absolute;
    right: 20px;
    bottom: 30px;
  }
  .detail {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(60%, -60%);
  }

  .clickDetail {
    position: absolute;
    z-index: 2;
    left: 100px;
    top: 200px;
  }
  .realTime {
    width: 400px;
    height: 96%;
    background-color: #fff;
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 999;
    box-shadow: 0px 0px 3px 1px #adbfd3;
    .header {
      width: 300px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      // padding-left: 40px;
      color: rgb(65, 127, 252);
      font-size: 20px;
      position: absolute;
      z-index: 999;
      left: 50%;
      top: 3px;
      transform: translateX(-50%);
      .icon {
        background: url("../../assets/icon/MITTER.png") no-repeat;
        background-size: 100% 100%;
        width: 29px;
        height: 20px;
        position: absolute;
        left: 125px;
        top: 5px;
      }
    }
    .pressure,
    .traffic {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap-reverse;
      float: left;
      width: 50%;
      height: 100%;
    }
  }
}
</style>
