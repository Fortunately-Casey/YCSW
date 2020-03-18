<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul>
                <li><span class="attr">单位名称:</span><span class="value">{{comsuptionDetail.CompanyName}}</span></li>
                <li><span class="attr">用水量:</span><span class="value">{{comsuptionDetail.YSL}}</span></li>
                <li><span class="attr">规模:</span><span class="value">{{comsuptionDetail.Production}}</span></li>
                <li><span class="attr">库容:</span><span class="value">{{comsuptionDetail.Capacity+comsuptionDetail.CapacityUnit }}</span></li>
                <li><span class="attr">地址:</span><span class="value">{{comsuptionDetail.CompanyAddress}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['comsuptionDetail'])
  },
  methods: {
    ...mapActions({
      showDetail: 'setIsShowComsuption'
    }),
    close () {
      this.showDetail(false)
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  width: 240px;
//   height: 480px;
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
    i {
      float: right;
      margin: 5px 5px 0 0;
      cursor: pointer;
    }
  }
  .content {
    padding: 0 15px;
    ul {
      list-style: none;
      li {
        margin-top: 4px;
        font-size: 13px;
        height: 20px;
        line-height: 20px;
        .attr {
          float: left;
        }
        .value {
          float: right;
          color: #a8a8a8;
        }
      }
    }
  }
}
</style>
