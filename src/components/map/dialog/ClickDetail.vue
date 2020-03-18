/* eslint-disable no-unused-vars */
<template>
    <div class="content">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="values">
            <div class="left">
                <div class="type" v-for="(item,index) in clickResult" :key="index" :class="chosedIndex == index?'active':''" @click.stop="chose(index)">
                    {{ clickResult.length&&item.feature.attributes.YSMC}}
                </div>
            </div>
            <div class="right">
                <ul v-if="clickResult[chosedIndex].feature.attributes.YSMC === '给水管线'?false:true">
                    <li><div class="key">要素名称:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.YSMC}}</div></li>
                    <li><div class="key">X(m):</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.X}}</div></li>
                    <li><div class="key">Y(m):</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.Y}}</div></li>
                    <li><div class="key">地面高程(m):</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.SURF_H}}</div></li>
                    <li><div class="key">设计编号:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.DESIGN_NO}}</div></li>
                    <li><div class="key">设备编号:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.EXP_NO}}</div></li>
                    <li><div class="key">特征:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.FEATURE}}</div></li>
                    <li><div class="key">附属物:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.SUBSID}}</div></li>
                    <!-- <li><div class="key">比例尺:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.SCALE}}</div></li> -->
                    <li><div class="key">探测方法:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.METHOD}}</div></li>
                    <!-- <li><div class="key">备注:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.MEMO}}</div></li> -->
                </ul>
                <ul v-else>
                    <li><div class="key">要素名称:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.YSMC}}</div></li>
                    <!-- <li><div class="key">要素代码:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.YSDM}}</div></li> -->
                    <li><div class="key">设备编号:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.EXP_NO}}</div></li>
                    <!-- <li><div class="key">比例尺:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.SCALE}}</div></li> -->
                    <li><div class="key">长度(m):</div><div class="value">{{clickResult.length&&Number(clickResult[chosedIndex].feature.attributes.SHAPE_Length).toFixed(2)}}</div></li>
                    <li><div class="key">起&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.S_POINT}}</div></li>
                    <li><div class="key">终&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.E_POINT }}</div></li>
                    <li><div class="key">起点埋深(m):</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.S_DEEP}}</div></li>
                    <li><div class="key">终点埋深(m):</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.E_DEEP}}</div></li>
                    <li><div class="key">材&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.MATERIAL}}</div></li>
                    <li><div class="key">埋设类型:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.D_TYPE }}</div></li>
                    <li><div class="key">管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.D_S}}</div></li>
                    <li><div class="key">建设年代:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.MDATE}}</div></li>
                    <li><div class="key">管线座落:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.ROADNAME}}</div></li>
                    <!-- <li><div class="key">备注:</div><div class="value">{{clickResult.length&&clickResult[chosedIndex].feature.attributes.MEMO_}}</div></li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { server } from '@/common/mapServer/config.js'
export default {
  data () {
    return {
      chosedIndex: 0
    }
  },
  computed: {
    ...mapGetters(['clickResult'])
  },
  mounted () {},
  methods: {
    ...mapActions({
      closeDetail: 'setIsShowClickDetail'
    }),
    close () {
      this.closeDetail(false)
    },
    chose (index) {
      this.chosedIndex = index
    }
    // type(url) {
    //   if (url === server.BYTTagUrl || url === server.BYTUrl) {
    //     return "补压塔";
    //   } else if (url === server.BZTagUrl || url === server.BZUrl) {
    //     return "泵站";
    //   } else if (url === server.CLBTagUrl || url === server.CLBUrl) {
    //     return "测流表";
    //   } else if (url === server.CSKTagUrl || url === server.CSKUrl) {
    //     return "出水口";
    //   } else if (url === server.CYBTagUrl || url === server.CYBUrl) {
    //     return "测压表";
    //   } else if (url === server.FMJTagUrl || url === server.FMJUrl) {
    //     return "阀门井";
    //   } else if (url === server.FZDLQTagUrl || url === server.FZDLQUrl) {
    //     return "防止倒流器";
    //   } else if (url === server.GLJTagUrl || url === server.GLJUrl) {
    //     return "法兰井";
    //   } else if (url === server.JSKTagUrl || url === server.JSKUrl) {
    //     return "进水口";
    //   } else if (url === server.PQFTagUrl || url === server.PQFUrl) {
    //     return "排气阀";
    //   } else if (url === server.SSCTagUrl || url === server.SSCUrl) {
    //     return "受水厂";
    //   } else if (url === server.TCDTagUrl || url === server.TCDUrl) {
    //     return "探测点";
    //   } else if (url === server.ZFJTagUrl || url === server.ZFJUrl) {
    //     return "闸阀井";
    //   } else if (url === server.DFTagUrl || url === server.DFUrl) {
    //     return "蝶阀";
    //   } else if (url === server.JSGTagUrl || url === server.ssg) {
    //     return "给水管线";
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 350px;
  height: 420px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #adbfd3;
  .header {
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #4886ff;
    border-radius: 6px 6px 0 0;
    color: #fff;
    font-size: 14px;
    padding-left: 20px;
    i {
      float: right;
      margin: 5px 5px 0 0;
      cursor: pointer;
    }
  }
  .values {
    .left {
      float: left;
      width: 110px;
      height: 375px;
      border-right: 1px solid #c2c2c2;
      .type {
        cursor: pointer;
        height: 40px;
        border-bottom: 1px solid #c2c2c2;
        text-align: center;
        line-height: 40px;
        color: #b3b3b3;
        font-size: 15px;
      }
      .active {
        color: #4886ff;
      }
    }
    .right {
      width: 239px;
      height: 375px;
      float: left;
      ul {
        margin-top: 10px;
        font-size: 12px;
        list-style: none;
        li {
          height: 25px;
          line-height: 25px;
          margin-left: 10px;
          .key {
            width: 100px;
            text-align: left;
            float: left;
          }
          .value {
            width: 100px;
            text-align: right;
            float: right;
            margin-right: 10px;
            color: #B7B7B7;
          }
        }
      }
    }
  }
}
</style>
