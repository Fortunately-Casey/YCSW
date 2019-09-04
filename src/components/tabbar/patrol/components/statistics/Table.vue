<template>
    <div class="table">
        <div class="header">
            <div class="index">序号</div>
            <div class="true-name">巡查人员</div>
            <div class="inspect-count">巡查次数</div>
        </div>
        <ul class="content">
            <li v-for="(item,index) in list" :key="index">
                <div class="index">{{index + 1}}</div>
                <div class="true-name">{{item.TrueName}}</div>
                <div class="inspect-count">{{item.InspectCount}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.table {
  //   height: 150px;
  
  width: 820px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 6px 6px 0 0;
  border: 1px solid #adbfd3;
  box-sizing: border-box;
  .header {
    height: 30px;
    background-color: #4a86fd;
    border-radius: 6px 6px 0 0;
    .index,
    .true-name,
    .inspect-count,
    .option {
      width: 33.33%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      float: left;
      color: #fff;
      font-size: 14px;
    }
  }
  .content {
    list-style: none;
    max-height: 120px;
    overflow-y: auto;
    li {
      height: 30px;
      .index,
      .true-name,
      .inspect-count,
      .option {
        width: 33.33%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        float: left;
        font-size: 14px;
      }
      .option {
          cursor: pointer;
          color: #2c6ff7;
      }
    }
  }
}
</style>