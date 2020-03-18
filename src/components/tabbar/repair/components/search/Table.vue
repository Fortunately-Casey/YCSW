<template>
        <div class="content">
            <div class="header">
                <div class="number">序 号</div>
                <div class="serial">管 线 编 号</div>
                <div class="type">维 修 类 型</div>
                <div class="date">维 修 日 期</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table">
                <li v-for="(item,index) in repairSearchList"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index+1}}</span>
                    <span class="serial">{{item.EquipmentNum}}</span>
                    <span class="type">{{item.FaultType}}</span>
                    <span class="date">{{item.StrServiceBeginDate + '-' + item.StrServiceEndDate}}</span>
                    <span class="operation" @click="goToDetail(item)"> 详情</span>
                    <span class="edit" @click="editSearch(item)">编辑</span>
                    <span class="delete" @click="deleteRepair(item)">删除</span>
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
import { GetServiceInfoList } from '@/api/repair.js'
import esriLoader from 'esri-loader'
import { mapActions, mapGetters } from 'vuex'
import { EventBus } from '@/common/eventBus/eventBus.js'
export default {
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters(['repairSearchList'])
  },
  methods: {
    ...mapActions({
      setDetail: 'setRepairDetail',
      showDetail: 'setIsShowRepairDetail'
    }),
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1 || rowIndex === 3) {
        return 'gray'
      } else {
        return ''
      }
      return 'gray'
    },
    changePage (page) {
      var vm = this
      vm.page = page
      vm.$emit('pageSearch', page)
    },
    editSearch (item) {
      var vm = this
      EventBus.$emit('showEdit', item)
    },
    deleteRepair (item) {
      var vm = this
      EventBus.$emit('deleteRepair', item)
    },
    goToDetail (item) {
      var vm = this
      vm.$emit('slideDown')
      esriLoader
        .loadModules([
          'static/arcpackage/arcgisUtil',
          'esri/geometry/Polyline',
          'esri/graphic',
          'dojo/colors',
          'esri/symbols/SimpleLineSymbol',
          'esri/layers/GraphicsLayer',
          'esri/geometry/Point',
          'esri/symbols/SimpleMarkerSymbol'
        ])
        .then(
          ([
            ArcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,
            Point,
            SimpleMarkerSymbol
          ]) => {
            let geometry = ''
            mapBase.clearGraphic()
            if (item.StrSHAPE.indexOf('LINESTRING') !== -1) {
              geometry = ArcgisUtil.wktToPolyline(item.StrSHAPE)
              // 获取/创建详情记录对应的图形---线要素
              var polyline = new Polyline({
                paths: geometry.paths,
                spatialReference: window.mapBase.map.spatialReference
              })
              // 获取线线要素的外包矩形
              var extent = polyline.getExtent()
              if (extent != null) {
                // 将地图放大到第7级
                window.mapBase.map.setZoom(16)
                // 获取外包矩形的中心点，把地图中心定位到中心点
                var centerpoint = extent.getCenter()
                window.mapBase.map.centerAt(centerpoint)

                // 创建线的符号，把线加到地图中
                var lineSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Colors([84, 228, 203]),
                  10
                )
                var graphicpolyLine = new Graphic(polyline, lineSymbol)

                var graphicsLayer = window.mapBase.map.getLayer('hztc') // 获取绘制图层

                if (graphicsLayer != null) {
                  window.mapBase.map.removeLayer(graphicsLayer)
                }
                graphicsLayer = new GraphicsLayer({ id: 'hztc' })
                graphicsLayer.add(graphicpolyLine)
                window.mapBase.map.addLayer(graphicsLayer, 1)
                // vm.setDetail(item);
                // vm.showDetail(true);
              }
            } else {
              window.mapBase.clearGraphic()
              var startPointSymbol = new SimpleMarkerSymbol()
              startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE
              startPointSymbol.setSize(10)
              startPointSymbol.setColor(new Colors('red'))
              let x = ArcgisUtil.wktToPoint(item.StrSHAPE).x
              let y = ArcgisUtil.wktToPoint(item.StrSHAPE).y
              var point = new Point(x, y, window.mapBase.map.spatialReference)

              var startPointGraphic = new Graphic(point, startPointSymbol)
              window.mapBase.addGraphic(startPointGraphic)

              // 将地图放大到第7级
              window.mapBase.map.setZoom(16)
              // 把地图中心定位到中心点
              window.mapBase.map.centerAt(point)
            }
          }
        )
      vm.setDetail(item)
      vm.showDetail(true)
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
      float: left;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    .number {
      width: 140px;
    }
    .serial {
      width: 140px;
    }
    .type {
      width: 180px;
    }
    .date {
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
        float: left;
        height: 50px;
        text-align: center;
        line-height: 50px;
      }
      .number {
        width: 140px;
      }
      .serial {
        width: 140px;
      }
      .type {
        width: 180px;
      }
      .date {
        width: 190px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 60px;
        text-align: center;
      }
      .edit {
        color: #74D48C;
        cursor: pointer;
        width: 60px;
        text-align: center;
      }
      .delete {
        color: #E35D5D;
        cursor: pointer;
        width: 60px;
        text-align: center;
      }
    }
    .gray {
      background-color: #e9e9e9;
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
