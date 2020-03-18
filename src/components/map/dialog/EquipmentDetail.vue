<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul>
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{equipmentDetail.YSDM}}</span></li> -->
                <li><span class="attr">要素名称:</span><span class="value">{{equipmentDetail.YSMC}}</span></li>
                <li><span class="attr">X(m):</span><span class="value">{{equipmentDetail.X}}</span></li>
                <li><span class="attr">Y(m):</span><span class="value">{{equipmentDetail.Y}}</span></li>
                <li><span class="attr">地面高程(m):</span><span class="value">{{equipmentDetail.SURF_H}}</span></li>
                <li><span class="attr">设计编号:</span><span class="value">{{equipmentDetail.DESIGN_NO}}</span></li>
                <li><span class="attr">设备编号:</span><span class="value">{{equipmentDetail.EXP_NO}}</span></li>
                <li><span class="attr">特征:</span><span class="value">{{equipmentDetail.FEATURE}}</span></li>
                <li><span class="attr">附属物:</span><span class="value">{{equipmentDetail.SUBSID}}</span></li>
                <!-- <li><span class="attr">比例尺:</span><span class="value">{{equipmentDetail.SCALE}}</span></li> -->
                <li><span class="attr">探测方法:</span><span class="value">{{equipmentDetail.METHOD}}</span></li>
                <!-- <li><span class="attr">备注:</span><span class="value">{{equipmentDetail.MEMO}}</span></li> -->
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
    ...mapGetters(['equipmentDetail'])
  },
  created () {
  },
  methods: {
    ...mapActions({
      showDetail: 'setIsShowEquipment'
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
