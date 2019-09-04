<template>
    <div class="real-time">
        <div class="top">
            <div class="tab" @click="choseTab(0)">
              <div class="tabber">
                <span class="pressure"></span>
                实时压力
              </div>
              <div :class="realTimeIndex === 0?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(1)">
              <div class="tabber">
                <span class="traffic"></span>
                实时流量
              </div>
              <div :class="realTimeIndex === 1?'line':''"></div>
            </div>
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span>
        </div> 
        <m-pressure v-if="realTimeIndex === 0?true:false"></m-pressure>
        <m-pressure v-if="realTimeIndex === 1?true:false"></m-pressure>
    </div>
</template>
<script>
import MPressure from "./components/Pressure.vue";
import { mapActions, mapGetters } from "vuex";
import { getTime } from "@/common/utils/tool.js";
import { clearAllGraphic } from "@/common/mapServer/config.js";
export default {
  data() {
    return {
      chosedIndex: ""
    };
  },
  computed: {
    ...mapGetters(["realTimeIndex"])
  },
  created() {
    this.initTime();
  },
  methods: {
    ...mapActions({
      setParams: "setEquimentType",
      setIndex: "setRealTimeIndex"
    }),
    initTime() {
      this.time = getTime();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    },
    choseTab(index) {
      this.setIndex(index);
      clearAllGraphic();
      if (index === 0) {
        this.setParams("测压表");
      } else {
        this.setParams("测流表");
      }
    }
  },
  components: {
    MPressure
  }
};
</script>
<style lang="less" scoped>
.real-time {
  width: 100%;
  height: 5%;
  background-color: #fff;
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
    .tab {
      height: 100%;
      line-height: 40px;
      margin-right: 40px;
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
        .pressure,
        .traffic,
        .quality {
          display: inline-block;
          width: 18px;
          height: 20px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .pressure {
          background: url("../../../assets/icon/pressure.png") no-repeat;
          background-position: center 4px;
        }
        .traffic {
          background: url("../../../assets/icon/flow.png") no-repeat;
        }
      }
      .line {
        width: 100%;
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