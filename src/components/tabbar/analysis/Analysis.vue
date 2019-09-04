<template>
    <div class="analysis">
        <div class="top">
            <div class="tab" @click="choseTab(0)">
              <div class="tabber">
                <span class="connect"></span>
                连通性分析
              </div>
             <div :class="chosedIndex === 0?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(1)">
              <div class="tabber">
                <span class="sectional"></span>
                横断面分析
              </div>
              <div :class="chosedIndex === 1?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(2)">
              <div class="tabber">
                <span class="profile"></span>
                纵断面分析
              </div>
              <div :class="chosedIndex === 2?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(3)">
              <div class="tabber">
                <span class="tube"></span>
                爆管管阀分析
              </div>
              <div :class="chosedIndex === 3?'line':''"></div>
            </div>
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span>
        </div> 
        <m-connect v-if="chosedIndex === 0? true : false" @close="closeTab"></m-connect>
        <cross-sectional v-if="chosedIndex === 1? true : false" @close="closeTab"></cross-sectional>
        <m-profile v-if="chosedIndex === 2? true : false" @close="choseTab"></m-profile>
        <m-tube v-if="chosedIndex === 3? true : false" @close="choseTab"></m-tube>
    </div>
</template>
<script>
import MConnect from "./connect/Connect.vue";
import CrossSectional from "./cross-sectional/CrossSectional.vue";
import { getTime } from "@/common/utils/tool.js";
import MProfile from "./profile/Profile.vue";
import MTube from "./tube/Tube.vue";
import { clearAllGraphic } from "@/common/mapServer/config.js";
import { EventBus } from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      chosedIndex: ""
    };
  },
  created() {
    this.initTime();
  },
  methods: {
    choseTab(index) {
      this.chosedIndex = index;
      clearAllGraphic();
      EventBus.$emit("clearDraw");
    },
    closeTab(value) {
      this.chosedIndex = value;
    },
    initTime() {
      this.time = getTime();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    }
  },
  components: {
    MConnect,
    CrossSectional,
    MProfile,
    MTube
  }
};
</script>
<style lang="less" scoped>
.analysis {
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
      padding-left: 24px;
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
        width: 100%;
        .connect,
        .sectional,
        .profile,
        .tube {
          display: inline-block;
          width: 22px;
          height: 22px;
          position: absolute;
          left: 0;
          top: 10px;
        }
        .connect {
          background: url("../../../assets/icon/connection.png") no-repeat;
          background-position: center center;
        }
        .sectional {
          background: url("../../../assets/icon/c-sec.png") no-repeat;
          background-position: center center;
        }
        .profile {
          background: url("../../../assets/icon/l-sec.png") no-repeat;
          background-position: center center;
        }
        .tube {
          background: url("../../../assets/icon/break.png") no-repeat;
          background-position: center center;
        }
      }
      .line {
        width: 100%;
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 17px;
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