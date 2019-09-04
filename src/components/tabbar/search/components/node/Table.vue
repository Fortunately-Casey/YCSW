<template>
        <div class="content">
            <div class="header">
                <div class="number">序 号</div>
                <div class="material">编 号</div>
                <div class="type">类 型</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table">
                <li v-for="(item,index) in equipmentList"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index + 1}}</span>
                    <span class="material">{{item.EXP_NO}}</span>
                    <span class="type">{{item.SUBSID }}</span>
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
import esriLoader from "esri-loader";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      page: 1
    };
  },
  props: ["total"],
  computed: {
    ...mapGetters(["equipmentList"])
  },
  methods: {
    ...mapActions({
      setDetail: "setEquipmentDetail",
      showDetail: "setIsShowEquipment"
    }),
    changePage(page) {
      this.page = page;
      this.$emit("pageSearch", page);
    },
    goToDetail(item) {
      var vm = this;
      vm.$emit('slideDown');
      esriLoader
        .loadModules([
          "static/arcpackage/arcgisUtil",
          "esri/geometry/Polyline",
          "esri/graphic",
          "dojo/colors",
          "esri/symbols/SimpleLineSymbol",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/geometry/Point"
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
            window.mapBase.clearGraphic();
            var startPointSymbol = new SimpleMarkerSymbol();
            startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
            startPointSymbol.setSize(10);
            startPointSymbol.setColor(new Colors("red"));
            let x = arcgisUtil.wktToPoint(item.StrShape).x;
            let y = arcgisUtil.wktToPoint(item.StrShape).y;
            var point = new Point(x, y, window.mapBase.map.spatialReference);

            var startPointGraphic = new Graphic(point, startPointSymbol);
            window.mapBase.addGraphic(startPointGraphic);

            //将地图放大到第7级
            window.mapBase.map.setZoom(16);
            // 把地图中心定位到中心点
            window.mapBase.map.centerAt(point);
            vm.setDetail(item);
            vm.showDetail(true);
          }
        );
    }
  }
};
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
      width: 200px;
    }
    .type {
      width: 260px;
    }
    .operation {
      width: 260px;
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
        width: 200px;
      }
      .type {
        width: 260px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 260px;
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