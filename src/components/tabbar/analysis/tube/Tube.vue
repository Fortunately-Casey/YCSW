<template>
    <div>
        <div class="condition-box" ref='condition' v-if="chosedTab === 'condition'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''" >
                      爆 管 分 析
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
                    <div class="title">选取爆管点:</div>
                    <div class="chose" id="burstPoint">选&nbsp;&nbsp;取</div>
                    <div class="button" @click="search">分&nbsp;&nbsp;析</div>
                </div> 
                <div class="table">
                  <div class="header">
                    <span>序号</span>
                    <span>编号</span>
                    <span>类型</span>
                    <span>操作</span>
                  </div>
                  <ul>
                    <li v-for="(item,index) in dataList" :key="index">
                       <span>{{index + 1}}</span>
                       <span>{{item.attributes.EXP_NO}}</span>
                       <span>{{item.attributes.MEMO}}</span>
                       <span class="detail" @click="goToDetail(item)">详情</span>
                    </li>
                  </ul>
                </div> 
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import esriLoader from "esri-loader";
import { server } from "@/common/mapServer/config.js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: true,
      startPoint: {},
      dataList: []
    };
  },
  mounted() {
    this.drawPointSegment();
  },
  methods: {
    ...mapActions({
      isshowValve: "setIsShowValve",
      valveDetail: "setValveDetail",
      setMeasure:"setIsMeasure"
    }),
    drawPointSegment() {
      var vm = this;
      esriLoader
        .loadModules([
          "dojo/on",
          "dojo/dom",
          "esri/graphic",
          "esri/symbols/SimpleFillSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/tasks/IdentifyTask",
          "esri/tasks/IdentifyParameters",
          "esri/geometry/Polyline",
          "dojo/colors",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol"
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
            SimpleMarkerSymbol
          ]) => {
            // 选取爆点
            on(dom.byId("burstPoint"), "click", function() {
              vm.setMeasure(true)
              //激活绘图工具，绘制面要素
              var mapClickHandler = dojo.connect(
                window.mapBase.map,
                "onClick",
                function(e) {
                  var startPointSymbol = new SimpleMarkerSymbol();
                  startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
                  startPointSymbol.setSize(10);
                  startPointSymbol.setColor(new Colors("red"));

                  var startPointGraphic = new Graphic(
                    e.mapPoint,
                    startPointSymbol
                  );
                  vm.startPoint = startPointGraphic;
                  var graphicsLayer = window.mapBase.map.getLayer("pointTc"); //获取绘制图层

                  if (graphicsLayer != null) {
                    window.mapBase.map.removeLayer(graphicsLayer);
                  }
                  graphicsLayer = new GraphicsLayer({ id: "pointTc" });

                  graphicsLayer.add(startPointGraphic);
                  window.mapBase.map.addLayer(graphicsLayer, 1);

                  if (mapClickHandler != null) {
                    dojo.disconnect(mapClickHandler);
                  }
                }
              );
            });
          }
        );
    },
    slideDown() {
      this.$refs.content1.style = "display:none";
      this.$refs.condition.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    slideUp() {
      this.$refs.condition.style = "height:280px;bottom:15px";
      setTimeout(() => {
        this.$refs.content1.style = "display:block";
      }, 500);
      this.isSlideUp = true;
    },
    shotDown() {
      this.$refs.content2.style = "display:none";
      this.$refs.result.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    shotUp() {
      this.$refs.result.style = "height:430px;bottom:15px";
      setTimeout(() => {
        this.$refs.content2.style = "display:block";
      }, 500);
      this.isSlideUp = true;
    },
    close() {
      this.$emit("close", "");
    },
    search() {
      this.dataList = []
      this.analysis(1); //自动
      this.analysis(0); //手动
    },
    analysis(index) {
      var vm = this;
      esriLoader
        .loadModules([
          "dojo/on",
          "dojo/dom",
          "esri/graphic",
          "esri/symbols/SimpleFillSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/tasks/IdentifyTask",
          "esri/tasks/IdentifyParameters",
          "esri/geometry/Polyline",
          "dojo/colors",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/tasks/ClosestFacilityTask",
          "esri/tasks/ClosestFacilityParameters",
          "esri/tasks/FeatureSet",
          "esri/layers/FeatureLayer",
          "esri/tasks/query",
          "esri/tasks/QueryTask",
          "esri/geometry/Point"
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
            ClosestFacilityTask,
            ClosestFacilityParameters,
            FeatureSet,
            FeatureLayer,
            Query,
            QueryTask,
            Point
          ]) => {
            var closestFacilityTask = new ClosestFacilityTask(
              "http://49.4.55.238:6080/arcgis/rest/services/YCSWData/BGFXNetWork_XA80/NAServer/Closest Facility"
            );
            // 临近设施分析参数
            var params = new ClosestFacilityParameters();
            //   是否返回事件信息
            params.returnIncidents = true;
            //   是否返回路径
            params.returnRoutes = true;
            //   路径是否有参数
            params.returnDirections = true;
            //   服务点
            params.facilities = new FeatureSet();
            var queryTask = new QueryTask(
              "http://49.4.55.238:6080/arcgis/rest/services/YCSWData/ClosetFacilityServiece/MapServer/" +
                index
            );
            var query = new Query();
            query.where = "1=1";
            query.outSpatialReference = window.mapBase.map.spatialReference;
            query.returnGeometry = true;
            query.outFields = ["OBJECTID"];
            queryTask.execute(query, result => {
              params.facilities.features = result.features;
              //  爆管点
              params.incidents = new FeatureSet();
              params.incidents.features.push(vm.startPoint);
              // 空间参考
              params.outSpatialReference = window.mapBase.map.spatialReference;
              // 返回自动阀门设施
              params.returnFacilities = true;
              closestFacilityTask.solve(
                params,
                result => {
                  var routeResults = result.routes;
                  var res = routeResults.length;
                  var routeSymbol = new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Colors([84, 228, 203]),
                    4
                  );
                  if (res > 0) {
                    for (var i = 0; i < res; i++) {
                      var graphicroute = routeResults[i];
                      var graphic = new Graphic(graphicroute.geometry);
                      graphic.setSymbol(routeSymbol);
                      window.mapBase.map.graphics.add(graphic);

                      var startPointSymbol = new SimpleMarkerSymbol();
                      startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
                      startPointSymbol.setSize(10);
                      startPointSymbol.setColor(new Colors("blue"));

                      var pathindex = graphicroute.geometry.paths[0].length - 1;

                      var point = new Point(
                        graphicroute.geometry.paths[0][pathindex][0],
                        graphicroute.geometry.paths[0][pathindex][1],
                        window.mapBase.map.spatialReference
                      );

                      let identifyTask = new IdentifyTask(
                        server.SSGDUrl
                      );
                      let identifyParams = new IdentifyParameters();
                      identifyParams.tolerance = 1;
                      identifyParams.returnGeometry = true;
                      identifyParams.layerIds = ["*"];
                      identifyParams.layerOption =
                        IdentifyParameters.LAYER_OPTION_ALL;
                      identifyParams.width = window.mapBase.map.width;
                      identifyParams.height = window.mapBase.map.height;
                      identifyParams.geometry = point;
                      identifyParams.mapExtent = window.mapBase.map.extent;
                      identifyTask.execute(identifyParams, result => {
                        vm.dataList.push(result[0].feature);
                        result.map(v => {
                          var startPointGraphic = new Graphic(
                            v.feature.geometry,
                            startPointSymbol
                          );
                          window.mapBase.map.graphics.add(startPointGraphic);
                        });
                      });
                    }
                  }
                },
                error => {
                  if (index === 1) {
                    vm.$message({
                      message: "未查询到自动阀门",
                      type: "warning"
                    });
                  } else if (index === 0) {
                    vm.$message({
                      message: "未查询到手动阀门",
                      type: "warning"
                    });
                  }
                }
              );
            });
          }
        );
    },
    goToDetail(item) {
      var vm = this;
      esriLoader
        .loadModules([
          "static/arcpackage/arcgisUtil",
          "esri/geometry/Polyline",
          "esri/graphic",
          "dojo/colors",
          "esri/symbols/SimpleLineSymbol",
          "esri/layers/GraphicsLayer"
        ])
        .then(
          ([
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer
          ]) => {
            //将地图放大到第7级
            window.mapBase.map.setZoom(16);
            window.mapBase.map.centerAt(item.geometry);
            this.isshowValve(true);
            this.valveDetail(item.attributes);
          }
        );
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.condition-box {
  width: 680px;
  height: 280px;
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
        width: 90px;
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
    .start {
      height: 40px;
      padding-top: 20px;
      margin-bottom: 20px;
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
      }
      .chose {
        float: left;
        width: 120px;
        height: 40px;
        border-radius: 6px;
        background-color: #4886ff;
        text-align: center;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
      }
      .button {
        float: left;
        width: 120px;
        height: 40px;
        border-radius: 6px;
        background-color: #40bb60;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-left: 140px;
        cursor: pointer;
      }
    }
    .table {
      .header {
        height: 39px;
        background-color: #4886ff;
        span {
          width: 24%;
          height: 39px;
          line-height: 39px;
          text-align: center;
          color: #fff;
          display: inline-block;
        }
      }
      ul {
        list-style: none;
        height: 120px;
        overflow-y:auto;
        li {
          height: 39px;
          span {
            width: 24%;
            height: 39px;
            line-height: 39px;
            text-align: center;
            color: #555555;
            display: inline-block;
          }
          .detail {
            color: #4886ff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
 
 