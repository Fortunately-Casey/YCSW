<template>
        <div class="footer">
            <div class="cancel" id="chose" @click="init">选&nbsp;&nbsp;取</div>
            <div class="determine" @click="search">分 析</div>
        </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { server } from '@/common/mapServer/config.js'
import { mapActions } from 'vuex'
import { EventBus } from '@/common/eventBus/eventBus.js'
export default {
  data () {
    return {
      itemPoints: [],
      toolBar: {}
    }
  },
  mounted () {
    this.drawLineSegment()
    EventBus.$on('clearDraw', () => {
      this.toolBar.deactivate()
    })
  },
  methods: {
    ...mapActions({
      setMeasure: 'setIsMeasure'
    }),
    drawLineSegment () {
      var vm = this
      esriLoader
        .loadModules([
          'esri/toolbars/draw',
          'dojo/on',
          'dojo/dom',
          'esri/graphic',
          'esri/symbols/SimpleFillSymbol',
          'esri/symbols/SimpleLineSymbol',
          'esri/tasks/query',
          'esri/tasks/QueryTask',
          'esri/geometry/geometryEngine'
        ])
        .then(
          ([
            Draw,
            on,
            dom,
            Graphic,
            SimpleFillSymbol,
            SimpleLineSymbol,
            Query,
            QueryTask,
            geometryEngine
          ]) => {
            vm.toolBar = new Draw(window.mapBase.map)
            // 绘制线
            on(dom.byId('chose'), 'click', function () {
              vm.setMeasure(true)
              window.mapBase.clearGraphic()
              // 激活绘图工具，绘制面要素
              vm.toolBar.activate(Draw.POLYLINE)
            })

            // 绘制结束
            on(vm.toolBar, 'draw-complete', function (result) {
              vm.setMeasure(false)
              var graphic = new Graphic(
                result.geometry,
                new SimpleFillSymbol(
                  SimpleFillSymbol.STYLE_SOLID,
                  new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_DASHDOT,
                    new dojo.Color([255, 0, 0]),
                    2
                  ),
                  new dojo.Color([255, 255, 0, 0.25])
                )
              )
              mapBase.addGraphic(graphic)
              vm.toolBar.deactivate()
              var query = new Query()
              var queryTask = new QueryTask(server.netWorkUrl + '/0')
              query.geometry = result.geometry
              query.outFields = ['*']
              // 空间参考信息
              query.outSpatialReference = window.mapBase.map.spatialReference
              query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS
              query.returnGeometry = true

              let itemPoints = []
              queryTask.execute(query, queryResult => {
                queryResult.features.map(v => {
                  var intersect = geometryEngine.cut(
                    result.geometry,
                    v.geometry
                  )
                  // 1.计算点的横轴value:交点距离分割线起点的距离
                  // 1.1获取交点cutpoint的坐标
                  var cutpointX = intersect[0].paths[0][1][0]
                  var cutpointY = intersect[0].paths[0][1][1]
                  // 1.2获取分割线起点的坐标
                  var cutStartX = result.geometry.paths[0][0][0]
                  var cutStartY = result.geometry.paths[0][0][1]
                  // 1.3计算交点与分割线之间的距离distance，保留2位小数
                  var distance = Number(Math.sqrt(
                    Math.pow(cutpointX - cutStartX, 2) +
                      Math.pow(cutpointY - cutStartY, 2)
                  ).toFixed(2))

                  // 2.计算点的纵轴value：交点的埋深
                  // 2.1获取管线的起点与终点坐标
                  var GXstartX = v.geometry.paths[0][0][0]
                  var GXstartY = v.geometry.paths[0][0][1]
                  var GXstartZ = v.attributes.S_DEEP
                  var GXendX = v.geometry.paths[0][1][0]
                  var GXendY = v.geometry.paths[0][1][1]
                  var GXendZ = v.attributes.E_DEEP
                  // 2.2分别计算交点与管线起始点之间的距离distance2StartPoint\distance2EndPoint
                  var distance2StartPoint = Number(Math.sqrt(
                    Math.pow(cutpointX - GXstartX, 2) +
                      Math.pow(cutpointY - GXstartY, 2)
                  ).toFixed(2))
                  var distance2EndPoint = Number(Math.sqrt(
                    Math.pow(cutpointX - GXendX, 2) +
                      Math.pow(cutpointY - GXendY, 2)
                  ).toFixed(2))
                  // 3.计算纵轴value:切点的埋深cutpointZ
                  var cutpointZ = 0
                  // if(GXstartZ&&GXendZ)  进行埋深验证，如果没有埋深，则提示不能进行横断面分析，退出函数
                  if (GXstartZ < GXendZ) {
                    cutpointZ =
                      GXstartZ +
                      (distance2StartPoint /
                        (distance2StartPoint + distance2EndPoint)) *
                        (GXendZ - GXstartZ)
                  }
                  if (GXstartZ > GXendZ) {
                    cutpointZ =
                      GXendZ +
                      (distance2EndPoint /
                        (distance2StartPoint + distance2EndPoint)) *
                        (GXstartZ - GXendZ)
                  }
                  if ((GXstartZ = GXendZ)) {
                    cutpointZ = GXstartZ
                  }

                  itemPoints.push({
                    centerX: cutpointX.toFixed(4),
                    centerY: cutpointY.toFixed(4),
                    centerZ: cutpointZ.toFixed(4),
                    centerDistance: distance,
                    attributes: v.attributes
                  })
                })
                vm.$emit('itemPoints', itemPoints)
              })
            })
          }
        )
    },
    init () {
      this.drawLineSegment()
    },
    search () {
      this.$emit('chosedTab', 'result')
    }
  }
}
</script>
<style lang="less" scoped>
    .footer {
      margin-top: 40px;
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
</style>
