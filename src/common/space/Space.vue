<template>
    <div class="space">
        <div class="title">
            空 间 条 件
        </div>
        <div class="content">
            <div id="rectangular"></div><span>矩 形</span>
            <div id="polygon"></div><span>多边形</span>
        </div>
    </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      toolBar: {}
    }
  },
  mounted () {
    this.drawRectangular()
  },
  methods: {
    drawRectangular () {
      var vm = this
      esriLoader
        .loadModules([
          // "static/arcpackage/mapBase",
          'esri/toolbars/draw',
          'dojo/on',
          'dojo/dom',
          'esri/graphic',
          'esri/symbols/SimpleFillSymbol',
          'esri/symbols/SimpleLineSymbol'
        ])
        .then(
          ([
            // mapBase,
            Draw,
            on,
            dom,
            Graphic,
            SimpleFillSymbol,
            SimpleLineSymbol
          ]) => {
            vm.toolBar = new Draw(window.mapBase.map)
            let flag = ''
            // 绘制矩形
            on(dom.byId('rectangular'), 'click', function () {
              flag = 'rectangular'
              window.mapBase.clearGraphic()
              // 激活绘图工具，绘制面要素
              vm.toolBar.activate(Draw.RECTANGLE)
              vm.$emit('slideDown')
            })

            // 绘制多边形
            on(dom.byId('polygon'), 'click', function () {
              flag = 'polygon'
              window.mapBase.clearGraphic()
              // 激活绘图工具，绘制面要素
              vm.toolBar.activate(Draw.POLYGON)
              vm.$emit('slideDown')
            })

            // 绘制结束
            on(vm.toolBar, 'draw-complete', function (result) {
              // console.log(result)
              if ((flag = 'rectangular')) {
                vm.$emit('rectangular', result.geometry)
              } else {
                vm.$emit('polygon', result.geometry)
              }
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
              window.mapBase.addGraphic(graphic)
              vm.toolBar.deactivate()
              vm.$emit('slideUp')
            })
          }
        )
    },
    closeToolBar () {
      this.toolBar.deactivate()
    }
  }
}
</script>
<style lang="less" scoped>
.space {
  color: #6f6f6f;
  .title {
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #c3c3c3;
    padding-left: 40px;
    color: #6f6f6f;
  }
  .content {
    padding-left: 115px;
    padding-top: 20px;
    height: 80px;
    #rectangular {
      cursor: pointer;
      width: 85px;
      height: 40px;
      background: url("../../assets/icon/rect.png") no-repeat;
      float: left;
    }
    span {
      height: 40px;
      line-height: 40px;
      float: left;
      margin-left: 20px;
    }
    #polygon {
      cursor: pointer;
      margin-left: 30px;
      width: 45px;
      height: 43px;
      background: url("../../assets/icon/polygon.png") no-repeat;
      float: left;
    }
  }
}
</style>
