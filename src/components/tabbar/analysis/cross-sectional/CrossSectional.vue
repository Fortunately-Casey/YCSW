<template>
    <div ref="father">
        <div class="condition-box" ref='condition' v-show="chosedTab === 'condition'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''">
                      参数设置
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
          <div ref="content1">
              <div class="condition-content" v-if="chosedTab === 'condition'? true : false">
                <m-chose @itemPoints="points" @chosedTab = "search"></m-chose>
              </div>
          </div>
        </div>
         <div class="result-box" ref='result' v-show="chosedTab === 'result'? true : false">
          <div class="search-header">
              <div class="chose-tab">
                  <span class="condition" :class="chosedTab === 'condition' ?'active':''" @click="choseCondition">
                      参数设置
                  </span>
                  <span class="result" :class="chosedTab === 'result' ?'active':''" >
                      结&nbsp;&nbsp;果
                  </span>
              </div>
              <div class="icons">
                  <div class="slide-up" :class="!isSlideUp ? 'active':''" @click="shotUp">
                      <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="slide-down" :class="isSlideUp ? 'active':''" @click="shotDown">
                      <i class="el-icon-arrow-down"></i>
                  </div>
                  <div class="close">
                      <i class="el-icon-close" @click="close"></i>
                  </div>
              </div>
          </div>
          <div ref="content2">
              <div class="result-content" v-show="chosedTab === 'result'? true : false">
                  <point-chart :pointList="itemPoints"></point-chart>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import esriLoader from "esri-loader";
import { server } from "@/common/mapServer/config.js";
import PointChart from './PointChart.vue';
import MChose from './Chose.vue';
import { EventBus } from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      chosedTab: "condition",
      isSlideUp: true,
      itemPoints:[]
    };
  },
  methods: {
    points(value) {
      this.itemPoints = value
    },
    slideDown() {
      this.$refs.content1.style = "display:none";
      this.$refs.condition.style = "height:39px;bottom:15px";
      this.isSlideUp = false;
    },
    slideUp() {
      this.$refs.condition.style = "height:200px;bottom:15px";
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
    choseCondition() {
      this.chosedTab = 'condition';
    },
    close() {
      EventBus.$emit('clearDraw');
      this.$emit("close", "");
    },
    search(value) {
       
       if(this.itemPoints.length > 0) {
            this.chosedTab = value;
       }else {
          this.$message({
              type:'warning',
              message:'未分析到数据'
          })
       }
      
    }
  },
  components: {
    PointChart,
    MChose
  }
};
</script>
<style lang="less" scoped>
.condition-box {
  width: 680px;
  height: 200px;
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
        width: 80px;
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
}
</style>