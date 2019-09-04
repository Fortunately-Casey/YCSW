<template>
  <div class="search">
    <div class="top">
      <div class="tab" @click="choseTab(0)">
        <div class="tabber">
          <span class="network"></span>
          输水管网
        </div>
        <div :class="chosedIndex === 0?'line':''"></div>
      </div>
      <div class="tab" @click="choseTab(1)">
        <div class="tabber">
          <span class="equipment"></span>
          管网设备
        </div>
        <div :class="chosedIndex === 1?'line':''"></div>
      </div>
      <div class="tab" @click="choseTab(2)">
        <div class="tabber">
          <span class="factory"></span>
          厂&nbsp;&nbsp;&nbsp;&nbsp;站
        </div>
        <div :class="chosedIndex === 2?'line':''"></div>
      </div>
      <div class="tab" @click="choseTab(3)">
        <div class="tabber">
          <span class="valve"></span>
          管网阀门
        </div>
        <div :class="chosedIndex === 3?'line':''"></div>
      </div>
      <div class="tab" @click="choseTab(4)">
        <div class="tabber">
          <span class="node"></span>
          管网节点
        </div>
        <div :class="chosedIndex === 4?'line':''"></div>
      </div>
      <span class="time" id="txtClock">
        <div class="timer">{{time}}</div>
      </span>
    </div>
    <net-work v-if="chosedIndex === 0?true:false" @closeNetWork="close"></net-work>
    <m-equipment v-if="chosedIndex === 1?true:false" @closeEquipment="close"></m-equipment>
    <m-factory v-if="chosedIndex === 2?true:false" @closeFactory="close"></m-factory>
    <m-valve v-if="chosedIndex === 3?true:false" @closeValve="close"></m-valve>
    <m-node v-if="chosedIndex === 4?true:false" @closeNode="close"></m-node>
  </div>
</template>
<script>
import NetWork from "./components/network/NetWork.vue";
import MEquipment from "./components/equipment/Equipment.vue";
import MFactory from "./components/factory/Factory.vue";
import MValve from "./components/valve/Valve.vue";
import MNode from "./components/node/Node.vue";
import { getTime } from "@/common/utils/tool.js";
import MMap from "../../map/Map.vue";
import { EventBus } from "@/common/eventBus/eventBus.js";
import { mapActions, mapGetters } from "vuex";
import esriLoader from "esri-loader";
import { clearAllGraphic } from "@/common/mapServer/config.js";
export default {
  data() {
    return {
      chosedIndex: "",
      time: "",
      timer: ""
    };
  },
  created() {
    this.initTime();
  },
  methods: {
    ...mapActions({
      closeNetWorkDetail: "setIsShowDetail",
      closeDetail: "setIsShowEquipment"
    }),
    choseTab(index) {
      var vm = this;
      esriLoader
        .loadModules(["esri/geometry/Point", "esri/SpatialReference"])
        .then(([Point, SpatialReference]) => {
          var centerpoint = new Point(
            13348940,
            3952540,
            new SpatialReference({ wkid: 102100 })
          );
          window.mapBase.map.setZoom(10);
          window.mapBase.map.centerAt(centerpoint);
        });
      window.mapBase.clearGraphic();
      this.chosedIndex = index;
      this.closeNetWorkDetail(false);
      this.closeDetail(false);
      if (index === 0) {
        EventBus.$emit("changeChecked", [1, 62]);
      } else if (index === 1) {
        EventBus.$emit("changeChecked", [1, 2, 62]);
      } else if (index === 2) {
        EventBus.$emit("changeChecked", [1, 3, 62]);
      } else if (index === 3) {
        EventBus.$emit("changeChecked", [1, 4, 62]);
      } else if (index === 4) {
        EventBus.$emit("changeChecked", [1, 5, 62]);
      }
      clearAllGraphic();
    },
    initTime() {
      this.time = getTime();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    },
    close(value) {
      this.chosedIndex = value;
    }
  },
  components: {
    NetWork,
    MEquipment,
    MFactory,
    MValve,
    MNode
  }
};
</script>
<style lang="less" scoped>
.search {
  height: 5%;
  background-color: #fff;
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
    .tab {
      height: 100%;
      line-height: 40px;
      margin-right: 20px;
      float: left;
      cursor: pointer;
      padding-left: 22px;
      font-size: 16px;
      color: #fff;
      position: relative;
      width: 100px;
      .tabber {
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 25px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .network {
          background: url("../../../assets/icon/web.png") no-repeat;
        }
        .equipment {
          background: url("../../../assets/icon/facility.png") no-repeat;
        }
        .factory {
          background: url("../../../assets/icon/factory.png") no-repeat;
          transform: translate(-3px, -3px);
        }
        .valve {
          background: url("../../../assets/icon/valve.png") no-repeat;
          transform: translateY(3px);
        }
        .node {
          background: url("../../../assets/icon/node.png") no-repeat;
        }
      }
      .line {
        width: 100px;
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 13px;
        bottom: 0;
      }
    }
    .time {
      width: 200px;
      height: 100%;
      float: right;
      color: #fff;
      line-height: 30px;
      font-size: 14px;
      font-family: "微软雅黑";
      position: relative;
      .timer {
        width: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>