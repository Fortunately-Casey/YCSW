<template>
        <div class="content">
            <div class="header">
                <div class="number">序 号</div>
                <div class="code">设 备 编 号</div>
                <div class="type">故 障 类 型</div>
                <div class="level">故 障 等 级</div>
                <div class="status">解 决 状 态</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table">
                <li v-for="(item,index) in list"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index+1}}</span>
                    <span class="code">{{item.DeviceId}}</span>
                    <span class="type">{{item.StrType}}</span>
                    <span class="level">{{item.StrLevel}}</span>
                    <span class="status">{{item.StrIsSettle}}</span>
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
import { mapActions } from "vuex";
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      showFaultDetail: "setIsShowFaultDetail",
      setFaultDetail: "setFaultDetailValue"
    }),
    changePage(page) {
      this.$emit("pageSearch", page);
    },
    goToDetail(item) {
      var vm = this;
      vm.$emit("slideDown");
      esriLoader
        .loadModules([
          "esri/geometry/Point",
          "static/arcpackage/arcgisUtil",
          "esri/geometry/Polyline",
          "esri/graphic",
          "dojo/colors",
          "esri/symbols/SimpleLineSymbol",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol"
        ])
        .then(
          ([
            Point,
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,
            SimpleMarkerSymbol
          ]) => {
            window.mapBase.clearGraphic();
            vm.showFaultDetail(true);
            vm.setFaultDetail(item);
            let color, pointValue;
            if (item.Level === 1) {
              color = "#555555";
            } else if (item.Level === 2) {
              color = "#FF7800";
            } else if (item.Level === 3) {
              color = "#FF2222";
            }
            if (item.StrShape.split(" ")[0] === "LINESTRING") {
              pointValue = arcgisUtil
                .wktToPolyline(item.StrShape)
                .getPoint(0, 0);
            } else {
              pointValue = arcgisUtil.wktToPoint(item.StrShape);
            }
            let point = new Point(pointValue.x,pointValue.y,window.mapBase.map.spatialReference);
            //将地图放大到第7级
            window.mapBase.map.setZoom(16);
            //获取外包矩形的中心点，把地图中心定位到中心点
            window.mapBase.map.centerAt(point);
            var detailSymbol = new SimpleMarkerSymbol();
            detailSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
            detailSymbol.setSize(16);
            detailSymbol.setColor(new Colors(color));

            var startPointGraphic = new Graphic(point, detailSymbol);
            startPointGraphic.attributes = item;
             window.mapBase.addGraphic(startPointGraphic);
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
    .code {
      width: 140px;
    }
    .type {
      width: 140px;
    }
    .level {
      width: 140px;
    }
    .status {
      width: 140px;
    }
    .operation {
      width: 140px;
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
      .code {
        width: 140px;
      }
      .type {
        width: 140px;
      }
      .level {
        width: 140px;
      }
      .status {
        width: 140px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 140px;
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