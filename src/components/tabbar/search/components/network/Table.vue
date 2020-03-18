<template>
        <div class="content">
            <div class="header">
                <div class="number">序 号</div>
                <div class="material">管 材</div>
                <div class="type">埋 深 类 型</div>
                <div class="length">长 度（m）</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table">
                <li v-for="(item,index) in netWorkList"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index + 1}}</span>
                    <span class="material">{{item.MATERIAL}}</span>
                    <span class="type">{{item.D_TYPE }}</span>
                    <span class="length">{{item.SHAPE_Length&&item.SHAPE_Length.toFixed(4) }}</span>
                    <span class="operation" @click="goToDetail(item)">详情</span>
                </li>
            </ul>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="total"
                    @current-change="changePage"
                >
                </el-pagination>
            </div>
        </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      page: 1
    }
  },
  props: ['total'],
  computed: {
    ...mapGetters(['netWorkList'])
  },
  methods: {
    ...mapActions({
      setDetail: 'setDetailValues',
      showDetail: 'setIsShowDetail'
    }),
    changePage (page) {
      this.page = page
      this.$emit('pageSearch', page)
    },
    goToDetail (item) {
      var vm = this
      vm.$emit('slideDown')
      esriLoader
        .loadModules(['static/arcpackage/arcgisUtil', 'esri/geometry/Polyline', 'esri/graphic', 'dojo/colors', 'esri/symbols/SimpleLineSymbol', 'esri/layers/GraphicsLayer'])
        .then(([arcgisUtil, Polyline, Graphic, Colors, SimpleLineSymbol, GraphicsLayer]) => {
        //  mapBase.clearGraphic();
        // 获取/创建详情记录对应的图形---线要素
          var polyline = new Polyline({'paths': arcgisUtil.wktToPolyline(item.StrShape).paths, 'spatialReference': window.mapBase.map.spatialReference})
          // 获取线线要素的外包矩形
          var extent = polyline.getExtent()
          if (extent != null) {
            // 将地图放大到第7级
            window.mapBase.map.setZoom(16)
            // 获取外包矩形的中心点，把地图中心定位到中心点
            var centerpoint = extent.getCenter()
            window.mapBase.map.centerAt(centerpoint)

            // 创建线的符号，把线加到地图中
            var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Colors([84, 228, 203]), 10)
            var graphicpolyLine = new Graphic(polyline, lineSymbol)

            var graphicsLayer = window.mapBase.map.getLayer('hztc')// 获取绘制图层

            if (graphicsLayer != null) {
              window.mapBase.map.removeLayer(graphicsLayer)
            }
            graphicsLayer = new GraphicsLayer({id: 'hztc'})
            graphicsLayer.add(graphicpolyLine)
            window.mapBase.map.addLayer(graphicsLayer, 1)
            vm.setDetail(item)
            vm.showDetail(true)
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  .header {
    height: 50px;
    background-color: #4886ff;
    div {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    .number {
      width: 140px;
    }
    .material {
      width: 140px;
    }
    .type {
      width: 180px;
    }
    .length {
      width: 190px;
    }
    .operation {
      width: 200px;
    }
  }
  .table {
    height: 250px;
    list-style: none;
    li {
      height: 50px;
      span {
          display: inline-block;
          text-align: center;
          line-height: 50px;
      }
      .number {
        width: 140px;
      }
      .material {
        width: 140px;
      }
      .type {
        width: 180px;
      }
      .length {
        width: 190px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 200px;
      }
    }
    .gray {
        background-color: #E9E9E9;
    }
  }
  .page {
      width: 420px;
      margin: 0 auto;
      margin-top: 30px;
      font-size: 18px;
  }
}
</style>
