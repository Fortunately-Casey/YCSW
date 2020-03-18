<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul>
                <li><span class="attr">要素名称:</span><span class="value">{{detailValues.YSMC}}</span></li>
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{detailValues.YSDM}}</span></li> -->
                <!-- <li><span class="attr">比例尺:</span><span class="value">{{detailValues.SCALE}}</span></li> -->
                <li><span class="attr">长度(m):</span><span class="value">{{detailValues.SHAPE_Length&&detailValues.SHAPE_Length.toFixed(2)}}</span></li>
                <li><span class="attr">起&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</span><span class="value">{{detailValues.S_POINT}}</span></li>
                <li><span class="attr">终&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</span><span class="value">{{detailValues.E_POINT }}</span></li>
                <li><span class="attr">起点埋深(m):</span><span class="value">{{detailValues.S_DEEP}}</span></li>
                <li><span class="attr">终点埋深(m):</span><span class="value">{{detailValues.E_DEEP}}</span></li>
                <li><span class="attr">材&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质:</span><span class="value">{{detailValues.MATERIAL}}</span></li>
                <li><span class="attr">埋设类型:</span><span class="value">{{detailValues.D_TYPE }}</span></li>
                <li><span class="attr">管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径:</span><span class="value">{{detailValues.D_S + 'mm'}}</span></li>
                <li><span class="attr">建设年代:</span><span class="value">{{detailValues.MDATE}}</span></li>
                <li><span class="attr">管线座落:</span><span class="value">{{detailValues.ROADNAME}}</span></li>
                <!-- <li><span class="attr">备注:</span><span class="value">{{detailValues.MEMO_}}</span></li> -->
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
    ...mapGetters(['detailValues'])
  },
  methods: {
    ...mapActions({
      showDetail: 'setIsShowDetail'
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
