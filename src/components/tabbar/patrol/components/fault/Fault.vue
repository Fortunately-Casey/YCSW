<template>
    <div class="fault-box" ref='searchbox'>
        <div class="search-header">
            <div class="chose-tab">
                <span class="condition" :class="chosedTab === 'condition' ?'active':''" @click="chosedTab = 'condition'">
                    条&nbsp;&nbsp;件
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
                <div class="close">
                    <i class="el-icon-close" @click="close"></i>
                </div>
            </div>
        </div>
        <div ref="content">
            <div class="condition-content" v-show="chosedTab === 'condition'? true : false">
                <m-condition ref="condition" ></m-condition>
                <div class="footer">
                    <div class="cancel" @click="close">取 消</div>
                    <div class="determine" @click="search">查 询</div>
                </div>
            </div>
            <div class="result-content" v-if="chosedTab === 'result'? true : false">
                <m-table :list="list" :total="total" :page="page" @slideDown="slideDown" @pageSearch="pageSearch"></m-table>
            </div>
        </div>
    </div>
</template>
<script>
import MCondition from "./Condition.vue";
import MTable from "./Table.vue";
import { GetXZGZ } from "@/api/patrol.js";
import esriLoader from "esri-loader";
import { GetInspectRecordList } from "@/api/patrol.js";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: false,
      pointList: [],
      deviceId: "",
      type: "",
      level: "",
      isSettle: "",
      inspectTime: "",
      page: 1,
      rows: 5,
      list: [],
      total: 0,
      params: {}
    };
  },
  created() {
    this.getGZPoint();
  },
  mounted() {
    this.$refs.content.style = "display:none";
  },
  methods: {
    close() {
      this.$emit("closeTab", "");
    },
    search() {
      var vm = this;
      vm.page = 1;
      vm.params = vm.$refs.condition.getParams();
      GetInspectRecordList({
        Page: vm.page,
        Rows: 5,
        DeviceId: vm.params.DeviceId,
        Type: vm.params.Type,
        Level: vm.params.Level,
        IsSettle: vm.params.IsSettle,
        StartInspectTime: vm.params.StartInspectTime,
        EndInspectTime: vm.params.EndInspectTime
      }).then(resp => {
        if (resp.data.success && resp.data.rows) {
          vm.list = resp.data.rows;
          vm.total = resp.data.total;
          vm.chosedTab = "result";
        } else {
          vm.$message({
            message: "未查询到数据",
            type: "warning"
          });
        }
      });
    },
    pageSearch(page) {
      var vm = this;
      vm.page = page;
      GetInspectRecordList({
        Page: vm.page,
        Rows: 5,
        DeviceId: vm.params.DeviceId,
        Type: vm.params.Type,
        Level: vm.params.Level,
        IsSettle: vm.params.IsSettle,
        StartInspectTime: vm.params.StartInspectTime,
        EndInspectTime: vm.params.EndInspectTime
      }).then(resp => {
        if (resp.data.success && resp.data.rows) {
          vm.list = resp.data.rows;
          vm.total = resp.data.total;
          vm.chosedTab = "result";
        } else {
          vm.$message({
            message: "未查询到数据",
            type: "warning"
          });
        }
      });
    },
    slideDown() {
      this.$refs.content.style = "display:none";
      this.$refs.searchbox.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    slideUp() {
      this.$refs.searchbox.style = "height:430px;bottom:15px";
      setTimeout(() => {
        this.$refs.content.style = "display:block";
      }, 500);
      this.isSlideUp = true;
    },
    getGZPoint() {
      var vm = this;
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
            var graphicsLayer = new GraphicsLayer({ id: "GZPoints" });
            GetXZGZ({}).then(resp => {
              vm.pointList = resp.data.rows;
              vm.pointList.map(v => {
                let color, pointValue;
                if (v.Level === 1) {
                  color = "#555555";
                } else if (v.Level === 2) {
                  color = "#FF7800";
                } else if (v.Level === 3) {
                  color = "#FF2222";
                }
                if (v.StrShape.split(" ")[0] === "LINESTRING") {
                  pointValue = arcgisUtil
                    .wktToPolyline(v.StrShape)
                    .getPoint(0, 0);
                } else if (v.StrShape.split(" ")[0] === "POINT") {
                  pointValue = arcgisUtil.wktToPoint(v.StrShape);
                }
                var GZPointSymbol = new SimpleMarkerSymbol();
                GZPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
                GZPointSymbol.setSize(16);
                GZPointSymbol.setColor(new Colors(color));
                var point = new Point(
                  pointValue.x,
                  pointValue.y,
                  window.mapBase.map.spatialReference
                );
                var pointGraphic = new Graphic(point, GZPointSymbol);
                pointGraphic.attributes = v;
                graphicsLayer.add(pointGraphic);
                window.mapBase.map.addLayer(graphicsLayer, 100);
              });
            });
          }
        );
    }
  },
  components: {
    MCondition,
    MTable
  }
};
</script>
<style lang="less" scoped>
.fault-box {
  transition: all 0.5s;
  width: 885px;
  height: 39px;
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
        width: 50px;
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
  .footer {
    height: 40px;
    position: relative;
    margin-top: 30px;
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
      left: 280px;
      border: 1px solid #a9a9a9;
    }
    .determine {
      background-color: #4886ff;
      color: #fff;
      left: 480px;
    }
  }
}
</style>