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
                <div class="close">
                    <i class="el-icon-close" @click="close"></i>
                </div>
            </div>
        </div>
        <div ref="content">
            <div class="condition-content" v-show="chosedTab === 'condition'? true : false">
                <m-condition ref="condition"></m-condition>
                <m-space @rectangular="getRectangular" @polygon="getPolygon" @slideDown="slideDown" @slideUp="slideUp" ref="space"></m-space>
                <div class="footer">
                    <div class="cancel" @click="close">取 消</div>
                    <div class="determine" @click="search">查 询</div>
                </div>
            </div>
            <div class="result-content" v-if="chosedTab === 'result'? true : false">
                <m-table @slideDown="slideDown"></m-table>
            </div>
        </div>
    </div>
</template>
<script>
import MCondition from "./Condition.vue";
import MSpace from "@/common/space/Space.vue";
import MTable from "./Table.vue";
import esriLoader from "esri-loader";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { server } from "@/common/mapServer/config.js";
import { GetCZQuery } from "@/api/search.js";
import { EventBus } from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: true,
      geometry: "",
      total: 0
    };
  },
  computed: {
    ...mapGetters(["equipmentParams"])
  },
  methods: {
    ...mapActions({
      setList: "setFactorySearchList"
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
    search() {
      var vm = this;
      vm.$refs.condition.searchData();
      let params = vm.equipmentParams;
      esriLoader
        .loadModules(["static/arcpackage/arcgisUtil"])
        .then(([ArcgisUtil]) => {
          GetCZQuery({
            SUBSID: params.typesOption.name,
            EXP_NO: params.numbersOption.name,
            GXFD: params.subsectionOption.name,
            Geometrystr: vm.geometry ? ArcgisUtil.polygonToWKT(vm.geometry) : ""
          }).then(resp => {
            if (resp.data.success && resp.data.rows.length !== 0 && resp.data.rows !== null) {
              vm.setList(resp.data.rows);
              vm.chosedTab = "result";
            } else if (resp.data.rows.length === 0|| resp.data.rows === null) {
              vm.$message({
                message: "未查询到数据",
                type: "warning"
              });
            } else {
              vm.$message({
                message: '未查询到数据',
                type: "warning"
              });
            }
          });
        });
    },
    getRectangular(value) {
      this.geometry = value;
    },
    getPolygon(value) {
      this.geometry = value;
    },
    close() {
      this.$refs.space.closeToolBar();
      EventBus.$emit("changeChecked", [1, 62]);
      // window.mapBase.clearUI();
      this.$emit("closeFactory", "");
    }
  },
  components: {
    MCondition,
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