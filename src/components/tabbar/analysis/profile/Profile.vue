<template>
    <div>
        <div class="condition-box" ref='condition' v-show="chosedTab === 'condition'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''" >
                      参数设置
                  </span>
                  <span class="result" :class="chosedTab === 'result' ?'active':''" >
                      结&nbsp;&nbsp;果
                  </span>
              </div>
              <div class="icons">
                  <div class="slide-up" :class="!isSlideUp ? 'active':''" @click="slideUp">
                      <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="slide-down" :class="isSlideUp ? 'active':''" @click="slideDown">
                      <i class="el-icon-arrow-down"></i>
                  </div>
                  <div class="close" @click="close">
                      <i class="el-icon-close"></i>
                  </div>
              </div>
          </div>
          <div ref="content1">
              <div class="condition-content" v-show="chosedTab === 'condition'? true : false">
                  <div class="button">
                    <div class="start" id="start">选择起点</div>
                    <div class="end" id="end">选择终点</div>
                    <div class="analyse" @click="search">开始分析</div>
                  </div>
              </div>
          </div>
        </div>
         <div class="result-box" ref='result' v-show="chosedTab === 'result'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''" @click="chosedTab = 'condition'">
                      参数设置
                  </span>
                  <span class="result" :class="chosedTab === 'result' ?'active':''" >
                      结&nbsp;&nbsp;果
                  </span>
              </div>
              <div class="icons">
                  <div class="slide-up" :class="!isSlideUp ? 'active':''" @click="shotUp">
                      <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="slide-down" :class="isSlideUp ? 'active':''" @click="shotDown">
                      <i class="el-icon-arrow-down"></i>
                  </div>
                  <div class="close">
                      <i class="el-icon-close" @click="close"></i>
                  </div>
              </div>
          </div>
          <div ref="content2">
              <div class="result-content" v-if="chosedTab === 'result'? true : false">
                  <line-chart :lineList = "lineList"></line-chart>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { server } from '@/common/mapServer/config.js'
import LineChart from './LineChart.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      chosedTab: 'condition',
      isSlideUp: true,
      startPoint: {},
      endPoint: {},
      lineList: []
    }
  },
  mounted () {
    this.drawLineSegment()
  },
  methods: {
    drawLineSegment () {
      var vm = this
      esriLoader
        .loadModules([
          'dojo/on',
          'dojo/dom',
          'esri/graphic',
          'esri/symbols/SimpleFillSymbol',
          'esri/symbols/SimpleLineSymbol',
          'esri/tasks/IdentifyTask',
          'esri/tasks/IdentifyParameters',
          'esri/geometry/Polyline',
          'dojo/colors',
          'esri/layers/GraphicsLayer',
          'esri/symbols/SimpleMarkerSymbol',
          'esri/SnappingManager',
          'esri/layers/FeatureLayer',
          'esri/dijit/Measurement',
          'dojo/keys'
        ])
        .then(
          ([
            on,
            dom,
            Graphic,
            SimpleFillSymbol,
            SimpleLineSymbol,
            IdentifyTask,
            IdentifyParameters,
            Polyline,
            Colors,
            GraphicsLayer,
            SimpleMarkerSymbol,
            SnappingManager,
            FeatureLayer,
            Measurement,
            keys
          ]) => {
            // 获取起点
            on(dom.byId('start'), 'click', function () {
              // 激活绘图工具，绘制面要素
              var mapClickHandler = dojo.connect(
                window.mapBase.map,
                'onClick',
                function (e) {
                  /// ///////////////////////////////捕捉/////////////////////

                  // var parcelsLayer = new FeatureLayer(
                  //   "http://192.168.35.216:6080/arcgis/rest/services/YCSWData/JSX_XA80/MapServer/0",
                  //   {
                  //     mode: FeatureLayer.MODE_ONDEMAND,
                  //     outFields: ["*"]
                  //   }
                  // );
                  // dojo.ready(
                  //   function(){
                  //      dojo.connect(
                  //   window.mapBase.map,
                  //   "onLayersAddResult",
                  //   function(result) {
                  //     var snapManager = window.mapBase.map.enableSnapping({
                  //       snapKey: keys.copyKey
                  //     });
                  //     var layerInfos = [{ layer: parcelsLayer }];
                  //     snapManager.setLayerInfos(layerInfos);

                  //     // var measuerment=new Measurement({map:window.mapBase.map},dojo.byId('testdiv'));
                  //     // measuerment.startup();
                  //   }
                  // );
                  //  window.mapBase.map.addLayers([parcelsLayer]);
                  //   }
                  // );
                  /// ///////////////////////////////捕捉/////////////////////

                  var startPointSymbol = new SimpleMarkerSymbol()
                  startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE
                  startPointSymbol.setSize(10)
                  startPointSymbol.setColor(new Colors('red'))

                  var startPointGraphic = new Graphic(
                    e.mapPoint,
                    startPointSymbol
                  )
                  vm.startPoint = startPointGraphic.geometry
                  var graphicsLayer = window.mapBase.map.getLayer('pointTc') // 获取绘制图层

                  if (graphicsLayer != null) {
                    window.mapBase.map.removeLayer(graphicsLayer)
                  }
                  graphicsLayer = new GraphicsLayer({ id: 'pointTc' })

                  graphicsLayer.add(startPointGraphic)
                  window.mapBase.map.addLayer(graphicsLayer, 1)

                  if (mapClickHandler != null) {
                    dojo.disconnect(mapClickHandler)
                  }
                }
              )
            })
            // 获取终点
            on(dom.byId('end'), 'click', function () {
              // 激活绘图工具，绘制面要素
              var mapClickHandler = dojo.connect(
                window.mapBase.map,
                'onClick',
                function (e) {
                  var endPointSymbol = new SimpleMarkerSymbol()
                  endPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE
                  endPointSymbol.setSize(10)
                  endPointSymbol.setColor(new Colors('red'))

                  var endPointGraphic = new Graphic(e.mapPoint, endPointSymbol)
                  vm.endPoint = endPointGraphic.geometry
                  var graphicsLayer2 = window.mapBase.map.getLayer('pointTc2') // 获取绘制图层

                  if (graphicsLayer2 != null) {
                    window.mapBase.map.removeLayer(graphicsLayer2)
                  }
                  graphicsLayer2 = new GraphicsLayer({ id: 'pointTc2' })

                  graphicsLayer2.add(endPointGraphic)
                  window.mapBase.map.addLayer(graphicsLayer2, 0)
                  if (mapClickHandler != null) {
                    dojo.disconnect(mapClickHandler)
                  }
                }
              )
            })
          }
        )
    },
    slideDown () {
      this.$refs.content1.style = 'display:none'
      this.$refs.condition.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.condition.style = 'height:200px;bottom:15px'
      setTimeout(() => {
        this.$refs.content1.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    shotDown () {
      this.$refs.content2.style = 'display:none'
      this.$refs.result.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    shotUp () {
      this.$refs.result.style = 'height:430px;bottom:15px'
      setTimeout(() => {
        this.$refs.content2.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    close () {
      this.$emit('close', '')
    },
    search () {
      var vm = this
      esriLoader
        .loadModules([
          'static/arcpackage/arcgisUtil',
          'esri/geometry/Polyline',
          'esri/graphic',
          'dojo/colors',
          'esri/symbols/SimpleLineSymbol',
          'esri/layers/GraphicsLayer',
          'esri/tasks/RouteTask',
          'esri/tasks/RouteParameters',
          'esri/tasks/FeatureSet',
          'esri/tasks/IdentifyTask',
          'esri/tasks/IdentifyParameters',
          'esri/symbols/SimpleMarkerSymbol',
          'esri/tasks/query',
          'esri/tasks/QueryTask',
          'esri/tasks/BufferParameters'
        ])
        .then(
          ([
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,
            RouteTask,
            RouteParameters,
            FeatureSet,
            IdentifyTask,
            IdentifyParameters,
            SimpleMarkerSymbol,
            Query,
            QueryTask,
            BufferParameters
          ]) => {
            var shortesAnalyst = new RouteTask(server.RouteUrl)
            var routeParas = new RouteParameters()
            routeParas.routeParas = ['S_POINT ', 'E_POINT ']
            routeParas.barriers = new FeatureSet() // 阻碍  x
            routeParas.stops = new FeatureSet() // 终点
            routeParas.returnDirections = false // 方向
            routeParas.returnRoutes = true // 路径
            routeParas.returnStops = true // 节点
            routeParas.outSpatialReference =
              window.mapBase.map.spatialReference

            var start = new Graphic(vm.startPoint)
            var end = new Graphic(vm.endPoint)
            if (!start.geometry || !end.geometry) {
              vm.$message({
                message: '参数选择不全，无法分析',
                type: 'warning'
              })
              return
            }
            routeParas.stops.features.push(start)
            routeParas.stops.features.push(end)

            if (routeParas.stops.features.length == 0) {
              alert('输入参数不全，无法分析')
              return
            }
            shortesAnalyst.solve(
              routeParas,
              solveResult => {
                var routeResults = solveResult.routeResults
                var res = routeResults.length
                var routeSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Colors([84, 228, 203]),
                  4
                )
                if (res > 0) {
                  for (var i = 0; i < res; i++) {
                    var graphicroute = routeResults[i]
                    var graphic = graphicroute.route
                    graphic.setSymbol(routeSymbol)
                    window.mapBase.map.graphics.add(graphic)
                    // 创建缓冲区,构建空间条件
                    var pGeometryService = window.mapBase.geometryService
                    var params = new BufferParameters()
                    params.distances = [0.1]
                    params.outSpatialReference =
                      window.mapBase.map.spatialReference
                    params.bufferSpatialReference =
                      window.mapBase.map.spatialReference
                    params.geometries = [graphicroute.route.geometry]
                    pGeometryService.buffer(
                      params,
                      function (geometries) {
                        if (geometries.length > 0) {
                          geometries.map(v => {
                            var query = new Query()
                            var queryTask = new QueryTask(
                              server.netWorkUrl + '/0'
                            )
                            query.geometry = v
                            // 空间参考信息
                            query.outSpatialReference =
                              window.mapBase.map.spatialReference
                            query.spatialRelationship =
                              Query.SPATIAL_REL_INTERSECTS
                            query.outFields = ['*']
                            query.returnGeometry = true
                            queryTask.execute(query, result => {
                              vm.lineList = result.features
                              vm.chosedTab = 'result'
                            })
                          })
                        }
                      },
                      function () {
                        vm.$message({
                          message: '未分析到数据',
                          type: 'warning'
                        })
                      }
                    )
                  }
                }
              },
              function () {
                vm.$message({
                  message: '未分析到数据',
                  type: 'warning'
                })
              }
            )
          }
        )
      // this.chosedTab = "result";
      // this.$refs.condition.style = "height:430px;bottom:15px";
    }
  },
  components: {
    LineChart
  }
}
</script>
<style lang="less" scoped>
.condition-box {
  width: 680px;
  height: 200px;
}
.result-box {
  width: 880px;
  height: 430px;
}
.condition-box,
.result-box {
  transition: all 0.5s;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  box-shadow: 0 0 13px 2px #adbfd3;
  transform: translateX(-50%);
  bottom: 15px;
  z-index: 999;
  .search-header {
    height: 39px;
    border-bottom: 1px solid #70a0ff;
    position: relative;
    .chose-tab {
      width: 200px;
      height: 39px;
      margin-left: 45px;
      .condition,
      .result {
        text-align: center;
        display: inline-block;
        width: 70px;
        height: 37px;
        line-height: 37px;
        font-size: 16px;
        border-bottom: 2px solid #fff;
        color: #afafaf;
        cursor: pointer;
      }
      .result {
        float: right;
      }
      .condition {
        float: left;
      }
      .active {
        color: #548fff;
        border-bottom: 2px solid #548fff;
      }
    }
    .icons {
      width: 124px;
      position: absolute;
      right: 0;
      top: 0;
      height: 39px;
      .slide-up,
      .slide-down,
      .close {
        float: left;
        width: 39px;
        height: 39px;
        text-align: center;
        line-height: 39px;
        cursor: pointer;
        border-left: 1px solid #c6c6c6;
        i {
          font-weight: bold;
          font-size: 18px;
        }
      }
      .slide-up {
        i {
          color: #b2b2b2;
        }
      }
      .slide-down {
        i {
          color: #b2b2b2;
        }
      }
      .active {
        i {
          color: #4987ff;
        }
      }
      .close {
        color: #ff4a42;
      }
    }
  }
  .condition-content {
    .button {
      height: 50px;
      .start,
      .end,
      .analyse {
        width: 100px;
        height: 35px;
        text-align: center;
        float: left;
        color: #fff;
        line-height: 35px;
        cursor: pointer;
        border-radius: 5px;
        margin-left: 88px;
        margin-top: 40px;
      }
      .start {
        background-color: #40bb60;
      }
      .end {
        background-color: #fe825e;
      }
      .analyse {
        background-color: #4886ff;
      }
    }
    .footer {
      height: 40px;
      position: relative;
      .cancel,
      .determine {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
      }
      .cancel {
        left: 180px;
        border: 1px solid #bfbfbf;
      }
      .determine {
        background-color: #4886ff;
        color: #fff;
        left: 380px;
      }
    }
  }
}
</style>
