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
                <div class="start">
                    <div class="title">开始管段:</div>
                    <div class="right">
                        <input type="text" disabled="disabled" v-model="startNumber" placeholder="请按水流方向选择上游管段">
                    </div>
                    <div class="button" id="start" title="请按水流方向选择上游管段">选&nbsp;&nbsp;取</div>
                </div>
                <div class="end">
                    <div class="title">结束管段:</div>
                    <div class="right">
                          <input type="text" disabled = "disabled" v-model="endNumber" placeholder="请按水流方向选择下游管段">
                    </div>
                    <div class="button" id="end" title="请按水流方向选择下游管段">选&nbsp;&nbsp;取</div>
                </div>
                <div class="footer">
                    <div class="cancel">取 消</div>
                    <div class="determine" @click="search">分 析</div>
                </div>
              </div>
          </div>
        </div>
         <div class="result-box" ref='result' v-show="chosedTab === 'result'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''" @click="choseCondition">
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
                  <m-table :isConnect="isConnect" @slideDown="shotDown"></m-table>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import MTable from './Table.vue'
import esriLoader from 'esri-loader'
import { server, clearAllGraphic } from '@/common/mapServer/config.js'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      chosedTab: 'condition',
      isSlideUp: true,
      startPoint: {},
      endPoint: {},
      startNumber: '',
      endNumber: '',
      isConnect: false
    }
  },
  mounted () {
    this.drawLineSegment()
  },
  methods: {
    ...mapActions({
      setList: 'setConnectList',
      setMeasure: 'setIsMeasure'
    }),
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
          'esri/layers/GraphicsLayer'
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
            GraphicsLayer
          ]) => {
            // 获取起点
            on(dom.byId('start'), 'click', function () {
              // 激活绘图工具，绘制面要素
              var mapClickHandler = dojo.connect(
                window.mapBase.map,
                'onClick',
                function (e) {
                  let identifyTask = new IdentifyTask(server.netWorkUrl)
                  let identifyParams = new IdentifyParameters()
                  identifyParams.tolerance = 3
                  identifyParams.returnGeometry = true
                  identifyParams.layerIds = ['*']
                  identifyParams.layerOption =
                    IdentifyParameters.LAYER_OPTION_ALL
                  identifyParams.width = window.mapBase.map.width
                  identifyParams.height = window.mapBase.map.height
                  identifyParams.geometry = e.mapPoint
                  identifyParams.mapExtent = window.mapBase.map.extent
                  identifyTask.execute(identifyParams, result => {
                    var lineSymbol = new SimpleLineSymbol(
                      SimpleLineSymbol.STYLE_SOLID,
                      new Colors([84, 228, 203]),
                      4
                    )
                    if (result.length > 0) {
                      var graphic = result[0].feature
                      graphic.setSymbol(lineSymbol)

                      var graphicsLayer = window.mapBase.map.getLayer(
                        'startgraphiclayer'
                      ) // 获取绘制图层

                      if (graphicsLayer != null) {
                        window.mapBase.map.removeLayer(graphicsLayer)
                      }
                      graphicsLayer = new GraphicsLayer({
                        id: 'startgraphiclayer'
                      })
                      graphicsLayer.add(graphic)
                      vm.startNumber =
                        graphic.attributes['S_POINT'] +
                        '-' +
                        graphic.attributes['E_POINT']
                      window.mapBase.map.addLayer(graphicsLayer, 1)
                      vm.startPoint = graphic.geometry.getPoint(0, 0)
                    } else {
                      vm.$message({
                        message: '请按水流方向在管线上选取',
                        type: 'warning'
                      })
                    }
                  })
                  if (mapClickHandler != null) {
                    dojo.disconnect(mapClickHandler)
                  }
                }
              )
            })
            // 获取终点
            on(dom.byId('end'), 'click', function () {
              vm.setMeasure(true)
              // 激活绘图工具，绘制面要素
              var mapClickHandler = dojo.connect(
                window.mapBase.map,
                'onClick',
                function (e) {
                  let identifyTask = new IdentifyTask(server.netWorkUrl)
                  let identifyParams = new IdentifyParameters()
                  identifyParams.tolerance = 3
                  identifyParams.returnGeometry = true
                  identifyParams.layerIds = ['*']
                  identifyParams.layerOption =
                    IdentifyParameters.LAYER_OPTION_ALL
                  identifyParams.width = window.mapBase.map.width
                  identifyParams.height = window.mapBase.map.height
                  identifyParams.geometry = e.mapPoint
                  identifyParams.mapExtent = window.mapBase.map.extent
                  identifyTask.execute(identifyParams, result => {
                    var lineSymbol = new SimpleLineSymbol(
                      SimpleLineSymbol.STYLE_SOLID,
                      new Colors([84, 228, 203]),
                      4
                    )
                    if (result.length > 0) {
                      var graphic = result[0].feature
                      graphic.setSymbol(lineSymbol)

                      var graphicsLayer = window.mapBase.map.getLayer(
                        'endgraphiclayer'
                      ) // 获取绘制图层

                      if (graphicsLayer != null) {
                        window.mapBase.map.removeLayer(graphicsLayer)
                      }
                      graphicsLayer = new GraphicsLayer({
                        id: 'endgraphiclayer'
                      })
                      graphicsLayer.add(graphic)
                      vm.endNumber =
                        graphic.attributes['S_POINT'] +
                        '-' +
                        graphic.attributes['E_POINT']
                      window.mapBase.map.addLayer(graphicsLayer, 1)
                      let endIndex = graphic.geometry.paths.length - 1
                      vm.endPoint = graphic.geometry.getPoint(endIndex, 1)
                    } else {
                      vm.$message({
                        message: '请按水流方向在管线上选取',
                        type: 'warning'
                      })
                    }
                  })
                  if (mapClickHandler != null) {
                    dojo.disconnect(mapClickHandler)
                  }
                }
              )
            })
          }
        )
    },
    choseCondition () {
      this.chosedTab = 'condition'
      clearAllGraphic()
      this.startNumber = ''
      this.endNumber = ''
    },
    slideDown () {
      this.$refs.content1.style = 'display:none'
      this.$refs.condition.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.condition.style = 'height:260px;bottom:15px'
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
                message: '输入参数不全，无法分析',
                type: 'warning'
              })
              return
            }
            routeParas.stops.features.push(start)
            routeParas.stops.features.push(end)

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
                    params.distances = [1]
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
                            // var graphic = new esri.Graphic(v, polygonSymbol);
                            // window.mapBase.map.graphics.add(graphic);

                            var query = new Query()
                            var queryTask = new QueryTask(
                              server.SSGDUrl + '/0'
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
                              vm.setList(result.features)
                              vm.isConnect = true
                              vm.chosedTab = 'result'
                            })
                          })
                        }
                      },
                      function () {
                        vm.$message({
                          message: '未分析到结果！',
                          type: 'warning'
                        })
                      }
                    )
                  }
                }
              },
              function () {
                vm.isConnect = false
                vm.chosedTab = 'result'
              }
            )
          }
        )
    }
  },
  components: {
    MTable
  }
}
</script>
<style lang="less" scoped>
.condition-box {
  width: 680px;
  height: 260px;
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
    .start,
    .end {
      height: 40px;
      padding-top: 20px;
      .title {
        float: left;
        height: 40px;
        width: 165px;
        text-align: center;
        line-height: 40px;
      }
      .right {
        width: 270px;
        float: left;
        border: 1px solid #c2c2c2;
        input {
          width: 250px;
          height: 40px;
          border: none;
          padding-left: 20px;
        }
        input::-webkit-input-placeholder {
          color: #FE4A41;
        }
      }
      .button {
        float: left;
        width: 120px;
        height: 40px;
        border-radius: 6px;
        background-color: #4886ff;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-left: 65px;
        cursor: pointer;
      }
    }
    .end {
      margin-bottom: 30px;
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
