<template>
    <div class="search-box" ref='searchbox'>
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
                <div class="close" @click="close">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </div>
        <div ref="content">
            <div class="condition-content" v-show="chosedTab === 'condition'? true : false">
                <m-result @type="getType" @subsection="getSubsection" @dateChange="getDate" @equipmentNumber="getEquipmentNumber"></m-result>
                <m-space @rectangular="getRectangular" @polygon="getPolygon" @slideDown="slideDown" @slideUp="slideUp" ref="space"></m-space>
                <div class="footer">
                    <div class="cancel" @click="close">取 消</div>
                    <div class="determine" @click="search">查 询</div>
                </div>
            </div>
            <div class="result-content" v-if="chosedTab === 'result'? true : false">
                <m-table :total="total" @pageSearch="pageSearch" @slideDown="slideDown"></m-table>
            </div>
        </div>
    </div>
</template>
<script>
import MResult from "./Result.vue";
import MSpace from "@/common/space/Space.vue";
import MTable from "./Table.vue";
import esriLoader from "esri-loader";
import { GetServiceInfoList } from "@/api/repair.js";
import { mapActions } from "vuex";
import { EventBus } from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: true,
      geometry: "",
      faultType: "",
      subsection: "",
      date: "",
      equipmentNumber: "",
      total: 0,
      page:1
    };
  },
  mounted() {
    EventBus.$on("getNewList", () => {
      this.pageSearch(this.page); 
    });
  },
  methods: {
    ...mapActions({
      setList: "setRepairSearchList"
    }),
    slideDown() {
      this.$refs.content.style = "display:none";
      this.$refs.searchbox.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    slideUp() {
      this.$refs.searchbox.style = "height:460px;bottom:15px";
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
    getRectangular(value) {
      this.geometry = value;
    },
    getPolygon(value) {
      this.geometry = value;
    },
    getType(value) {
      this.faultType = value;
    },
    getSubsection(value) {
      this.subsection = value;
    },
    getDate(value) {
      this.date = value;
    },
    getEquipmentNumber(value) {
      this.equipmentNumber = value;
    },
    search() {
      var vm = this;
      vm.page = 1;
      if (vm.faultType === "") {
        vm.$message({
          message: "故障类型不可为空！",
          type: "warning"
        });
        return;
      }
      esriLoader
        .loadModules(["static/arcpackage/arcgisUtil"])
        .then(function([ArcgisUtil]) {
          if (vm.geometry) {
            vm.geometry = ArcgisUtil.polygonToWKT(vm.geometry);
          }
          GetServiceInfoList({
            ServiceBeginDate: vm.date ? vm.getTime(vm.date[0]) : "",
            ServiceEndDate: vm.date ? vm.getTime(vm.date[1]) : "",
            GXFD: vm.subsection === "全部" ? "" : vm.subsection,
            EquipmentNum: vm.equipmentNumber,
            FaultType: vm.faultType,
            Geometrystr: vm.geometry,
            Page: vm.page,
            Rows: 5
          }).then(resp => {
            if (resp.data.success && resp.data.rows !== null) {
              vm.tableData = resp.data.rows;
              vm.total = resp.data.total;
              vm.setList(resp.data.rows);
              vm.chosedTab = "result";
            } else {
              vm.$message({
                message: "未查询到任何数据！",
                type: "warning"
              });
            }
          });
        });
    },
    pageSearch(page) {
      var vm = this;
      vm.page = page;
      esriLoader
        .loadModules(["static/arcpackage/arcgisUtil"])
        .then(function([ArcgisUtil]) {
          if (vm.geometry) {
            vm.geometry = ArcgisUtil.polygonToWKT(vm.params.geometry);
          }
          GetServiceInfoList({
            ServiceBeginDate: vm.date ? vm.getTime(vm.date[0]) : "",
            ServiceEndDate: vm.date ? vm.getTime(vm.date[1]) : "",
            GXFD: vm.subsection === "全部" ? "" : vm.subsection,
            EquipmentNum: vm.equipmentNumber,
            FaultType: vm.faultType,
            Geometrystr: vm.geometry,
            Page: vm.page,
            Rows: 5
          }).then(resp => {
            if (resp.data.success && resp.data.rows !== null) {
              vm.tableData = resp.data.rows;
              vm.total = resp.data.total;
              vm.setList(resp.data.rows);
              vm.chosedTab = "result";
            } else {
              vm.$message({
                message: "未查询到任何数据！",
                type: "warning"
              });
            }
          });
        });
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
    close() {
      this.$refs.space.closeToolBar();
      this.$emit("close", "");
    }
  },
  components: {
    MResult,
    MSpace,
    MTable
  }
};
</script>
<style lang="less" scoped>
.search-box {
  transition: all 0.5s;
  width: 885px;
  height: 460px;
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