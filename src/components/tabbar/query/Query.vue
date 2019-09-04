<template>
    <div class="query">
        <div class="top">
            <div class="tab" @click="choseTab(0)">
              <div class="tabber">
                <span class="user"></span>
                受水用户查询
              </div>
              <div :class="chosedIndex === 0?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(1)">
              <div class="tabber">
                <span class="comsuption"></span>
                  用水量查询
              </div>
              <div :class="chosedIndex === 1?'line':''"></div>
            </div>
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span> 
        </div> 
        <m-user v-if="chosedIndex === 0 ? true : false" @closeTab="choseTab"></m-user>
        <m-comsuption v-if="chosedIndex === 1? true : false" @closeTab="choseTab"></m-comsuption>
    </div> 
</template>
<script>
import MUser from "./user/User.vue";
import MComsuption from "./comsuption/Comsuption.vue";
import { getTime } from "@/common/utils/tool.js";
import { clearAllGraphic } from "@/common/mapServer/config.js";
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
    initTime() {
      this.time = getTime();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    },
    choseTab(index) {
      this.chosedIndex = index;
      clearAllGraphic();
    }
  },
  components: {
    MUser,
    MComsuption
  }
};
</script>
<style lang="less" scoped>
.query {
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
      width: 120px;
      .tabber {
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 25px;
        .user,
        .comsuption {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .user {
          background: url("../../../assets/icon/user-search.png") no-repeat;
        }
        .comsuption {
          background: url("../../../assets/icon/water-usage.png") no-repeat;
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