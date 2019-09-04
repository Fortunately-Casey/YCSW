<template>
    <div class="locus-box" ref='searchbox'>
        <div class="search-header">
            <div class="chose-tab">
                <span class="condition" :class="chosedTab === 'condition' ?'active':''" @click="chosedTab = 'condition'">
                    条&nbsp;&nbsp;件
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
                <div class="conditions">
                    <div class="true-name">
                        <div class="left">巡查人员:</div>
                        <div class="right">
                            <div class="drop-down" ref="trueName">
                                <div class="dropdown-toggle" @click="showTrueName = !showTrueName">
                                {{ personelOption.TrueName }}
                                    <span class="cart"></span>
                                </div>
                                <el-collapse-transition>
                                    <ul class="dropdown-menu" v-show="showTrueName">
                                        <li v-for="(option,index) in personelOptions" :key="index">
                                            <a href="javascript:void(0)" @click="updateOption('trueName',option)">
                                                {{ option.TrueName }}
                                            </a>
                                        </li>
                                    </ul>
                                </el-collapse-transition>
                            </div>
                        </div>
                    </div>
                    <div class="date">
                        <div class="left">巡查日期:</div>
                        <div class="right el">
                        <el-date-picker
                            class="announce-date"
                            v-model="date"
                            type="date"
                        >
                        </el-date-picker>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <div class="cancel" @click="search">轨 迹 查 询</div>
                    <div class="determine" @click="playBack">轨 迹 回 放</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GetInspectTrack, GetAPPUser } from "@/api/patrol.js";
import esriLoader from "esri-loader";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: true,
      date: "",
      trueName: "",
      personelOption: {
        TrueName: "",
        UserName: ""
      },
      personelOptions: [],
      showTrueName: false,
      pointList: []
    };
  },
  created() {
    this.getAppUsers();
  },
  mounted() {
    document.addEventListener("click", this.hidePandel, false);
  },
  methods: {
    close() {
      this.$emit("closeTab", "");
    },
    slideDown() {
      this.$refs.content.style = "display:none";
      this.$refs.searchbox.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    slideUp() {
      this.$refs.searchbox.style = "height:260px;bottom:15px";
      setTimeout(() => {
        this.$refs.content.style = "display:block";
      }, 500);
      this.isSlideUp = true;
    },
    format2Len(i) {
      return i < 10 ? "0" + i : i;
    },
    getTime(CurrentTime) {
      var timeStr =
        CurrentTime.getFullYear() +
        "-" +
        this.format2Len(CurrentTime.getMonth() + 1) +
        "-" +
        this.format2Len(CurrentTime.getDate());
      return timeStr;
    },
    getAppUsers() {
      var vm = this;
      GetAPPUser({}).then(resp => {
        if (resp.data.success) {
          vm.personelOptions = resp.data.rows;
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    },
    updateOption(type, option) {
      if (type === "trueName") {
        this.personelOption.TrueName = option.TrueName;
        this.personelOption.UserName = option.UserName;
        this.showTrueName = false;
      }
    },
    hidePandel(e) {
      if (this.$refs.trueName) {
        if (!this.$refs.trueName.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showTrueName = false;
        }
      }
    },
    search() {
      var vm = this;
      vm.slideDown();
      if (!vm.personelOption.UserName) {
        vm.$message({
          message: "请选择巡查人员！",
          type: "warning"
        });
        return;
      }
      if (!vm.date) {
        vm.$message({
          message: "请选择巡查日期！",
          type: "warning"
        });
        return;
      }
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
            GetInspectTrack({
              UserId: vm.personelOption.UserName,
              PosTime: vm.getTime(vm.date)
            }).then(resp => {
              if (resp.data.success && resp.data.rows) {
                vm.pointList = resp.data.rows;
                vm.pointList.map(v => {
                  let point = new Point(
                    v.X,
                    v.Y,
                    window.mapBase.map.spatialReference
                  );
                  //将地图放大到第7级
                  window.mapBase.map.setZoom(14);
                  //获取外包矩形的中心点，把地图中心定位到中心点
                  window.mapBase.map.centerAt(point);
                  var detailSymbol = new SimpleMarkerSymbol();
                  detailSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
                  detailSymbol.setSize(16);
                  detailSymbol.setColor(new Colors("#FF2222"));
                  var startPointGraphic = new Graphic(point, detailSymbol);
                  startPointGraphic.attributes = v;
                  window.mapBase.addGraphic(startPointGraphic);
                });
              } else {
                vm.$message({
                  message: "未查询到数据",
                  type: "warning"
                });
              }
            });
          }
        );
    },
    playBack() {
      var vm = this;
      vm.slideDown();
      if (!vm.personelOption.UserName) {
        vm.$message({
          message: "请选择巡查人员！",
          type: "warning"
        });
        return;
      }
      if (!vm.date) {
        vm.$message({
          message: "请选择巡查日期！",
          type: "warning"
        });
        return;
      }
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
            GetInspectTrack({
              UserId: vm.personelOption.UserName,
              PosTime: vm.getTime(vm.date)
            }).then(resp => {
              if (resp.data.success && resp.data.rows) {
                vm.pointList = resp.data.rows;
                for (let i = 0; i < vm.pointList.length; i++) {
                  setTimeout(() => {
                    let point = new Point(
                      vm.pointList[i].X,
                      vm.pointList[i].Y,
                      window.mapBase.map.spatialReference
                    );
                    //将地图放大到第7级
                    window.mapBase.map.setZoom(14);
                    //获取外包矩形的中心点，把地图中心定位到中心点
                    window.mapBase.map.centerAt(point);
                    var detailSymbol = new SimpleMarkerSymbol();
                    detailSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
                    detailSymbol.setSize(16);
                    detailSymbol.setColor(new Colors("#FF2222"));
                    var startPointGraphic = new Graphic(point, detailSymbol);
                    startPointGraphic.attributes = vm.pointList[i];
                    window.mapBase.addGraphic(startPointGraphic);
                  }, 1000 * i);
                }
              } else {
                vm.$message({
                  message: "未查询到数据",
                  type: "warning"
                });
              }
            });
          }
      );
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.locus-box {
  transition: all 0.5s;
  width: 885px;
  height: 260px;
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
  .condition-content {
    .conditions {
      height: 110px;
      border-bottom: 1px solid #c3c3c3;
      .true-name,
      .date {
        padding-top: 20px;
        width: 50%;
        height: 40px;
        float: left;
        .left {
          width: 115px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .right {
          width: 300px;
          position: relative;
          float: left;
          border: 1px solid #c2c2c2;
          .drop-down {
            float: left;
            .dropdown-toggle {
              text-align: left;
              cursor: pointer;
              font-family: PingFangSC-Semibold;
              list-style-type: none;
              color: #5a5a5a;
              width: 280px;
              font-size: 14px;
              height: 40px;
              line-height: 40px;
              text-transform: none;
              padding-left: 20px;
              font-weight: 300;
              border-radius: 0;
              font-size: 14px;
              .cart {
                width: 0;
                position: relative;
                top: 18px;
                left: -20px;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-top: 4px dashed;
                border-top: 4px solid gray;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
                float: right;
              }
            }
            .dropdown-menu {
              position: absolute;
              top: 38px;
              left: 0;
              width: 300px;
              max-height: 100px;
              overflow-y: auto;
              z-index: 1000;
              padding: 5px 0;
              margin: 2px 0 0;
              list-style: none;
              font-size: 14px;
              background-color: #fff;
              opacity: 0.9;
              border: 1px solid #ccc;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
              li {
                text-align: center;
                a {
                  padding: 10px 30px;
                  display: block;
                  clear: both;
                  font-weight: normal;
                  line-height: 1;
                  color: #727272;
                  white-space: nowrap;
                  text-decoration: none;
                  text-align: left;
                }
                a:hover {
                  color: #fff;
                  text-decoration: none;
                }
                overflow: hidden;
                width: 100%;
                position: relative;
                margin: 0;
              }
              li:hover {
                background-color: #4785fe;
              }
            }
          }
          .announce-date {
            width: 300px;
          }
          input {
            width: 290px;
            height: 40px;
            border: none;
            padding-left: 10px;
          }
        }
        .el {
          border: none;
        }
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
      background-color: #4886ff;
      color: #fff;
    }
    .determine {
      background-color: #4886ff;
      color: #fff;
      left: 480px;
    }
  }
}
</style>