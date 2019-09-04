<template>
    <div class="content">
        <div class="header">
             {{realTimeDetail.detail[0]&&realTimeDetail.detail[0].EquimentType.substring(0,realTimeDetail.detail[0].EquimentType.length-1)}}点分布值({{realTimeDetail.tagName}})
            <i class="el-icon-close" @click="close"></i>
        </div>
        <ul>
            <li v-for="(item,index) in realTimeDetail.detail" :key="index">
                <div class="icon" :class="item.EquimentType==='测压表'?'groupDown':'group'">
                </div>
                <div class="name">
                    {{item.TagName}}
                </div>
                <div class="value" :class="backGround(item)">
                    {{item.Value}} {{item.EquimentType==='测压表'?'Kpa':'km³'}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["realTimeDetail"])
  },
  methods: {
    ...mapActions({
      isShow: "setIsShowRealTimeDetail"
    }),
    close() {
        this.isShow(false)
    },
    backGround(item) {
      if (item.Value === 0) {
        return "gray";
      } else if (item.Value > item.MaxValue) {
        return "red";
      } else {
        return "green";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 260px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #adbfd3;
  .header {
    height: 25px;
    line-height: 25px;
    background-color: #4886ff;
    border-radius: 6px 6px 0 0;
    color: #fff;
    font-size: 14px;
    padding-left: 20px;
    word-spacing: 8px;
    i {
      float: right;
      margin: 5px 5px 0 0;
      cursor: pointer;
    }
  }
  ul {
    list-style: none;
    height: 255px;
    padding: 10px;
    li {
      height: 20%;
      box-sizing: border-box;
      border-bottom: 1px solid #dcdcdc;
      position: relative;
      .icon {
        width: 20px;
        height: 20px;

        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      .groupDown {
        background: url("../../../assets/icon/GroupDown.png") no-repeat;
        background-size: 100% 100%;
      }
      .group {
        background: url("../../../assets/icon/Group.png") no-repeat;
        background-size: 100% 100%;
      }
      .name {
        width: 70px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: 35px;
        top: 50%;
        color: #4a86fd;
        font-size: 12px;
        transform: translateY(-50%);
      }
      .value {
        min-width: 65px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        position: absolute;
        right: 5px;
        top: 50%;
        color: #fff;
        font-size: 14px;
        transform: translateY(-50%);
      }
      .green {
        background-color: #54c344;
      }
      .red {
        background-color: #fe2122;
      }
      .gray {
        background-color: #545454;
      }
    }
  }
}
</style>