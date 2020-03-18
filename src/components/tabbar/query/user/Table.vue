<template>
        <div class="content">
            <div class="header">
                <div class="number">序 号</div>
                <div class="name">单 位 名 称</div>
                <div class="level">重 要 级 别</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table">
                <li v-for="(item,index) in userQueryList"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index + 1}}</span>
                    <span class="name">{{item.CompanyName}}</span>
                    <span class="level">{{item.Production}}</span>
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
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['userQueryList'])
  },
  data () {
    return {
      page: 1
    }
  },
  methods: {
    ...mapActions({
      setDetail: 'setUserQueryDetail',
      showDetail: 'setIsShowQueryDetail'
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
      this.page = page
      this.$emit('pageSearch', page)
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
          'esri/symbols/SimpleMarkerSymbol',
          'esri/geometry/Point'
        ])
        .then(
          ([
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,
            SimpleMarkerSymbol,
            Point
          ]) => {
            window.mapBase.clearGraphic()
            var startPointSymbol = new SimpleMarkerSymbol()
            startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE
            startPointSymbol.setSize(10)
            startPointSymbol.setColor(new Colors('red'))
            let x = arcgisUtil.wktToPoint(item.StrSHAPE).x
            let y = arcgisUtil.wktToPoint(item.StrSHAPE).y
            var point = new Point(x, y, window.mapBase.map.spatialReference)

            var startPointGraphic = new Graphic(point, startPointSymbol)
            window.mapBase.addGraphic(startPointGraphic)

            // 将地图放大到第7级
            window.mapBase.map.setZoom(16)
            // 把地图中心定位到中心点
            window.mapBase.map.centerAt(point)
            vm.setDetail(item)
            vm.showDetail(true)
          }
        )
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
    .name {
      width: 260px;
    }
    .level {
      width: 260px;
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
      .name {
        width: 260px;
      }
      .level {
        width: 260px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 200px;
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
