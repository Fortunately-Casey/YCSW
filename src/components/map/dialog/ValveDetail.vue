<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul>
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{valveDetail.YSDM}}</span></li> -->
                <li><span class="attr">要素名称:</span><span class="value">{{valveDetail.YSMC}}</span></li>
                <li><span class="attr">X:</span><span class="value">{{valveDetail.X}}</span></li>
                <li><span class="attr">Y:</span><span class="value">{{valveDetail.Y}}</span></li>
                <li><span class="attr">地面高程:</span><span class="value">{{valveDetail.SURF_H}}</span></li>
                <li><span class="attr">偏心井位:</span><span class="value">{{valveDetail.OFFSET}}</span></li>
                <li><span class="attr">角度:</span><span class="value">{{valveDetail.FWJ}}</span></li>
                <li><span class="attr">设计编号:</span><span class="value">{{valveDetail.DESIGN_NO}}</span></li>
                <li><span class="attr">设备编号:</span><span class="value">{{valveDetail.EXP_NO}}</span></li>
                <li><span class="attr">特征:</span><span class="value">{{valveDetail.FEATURE}}</span></li>
                <li><span class="attr">附属物:</span><span class="value">{{valveDetail.SUBSID}}</span></li>
                <!-- <li><span class="attr">比例尺:</span><span class="value">{{valveDetail.SCALE}}</span></li> -->
                <li><span class="attr">探测方法:</span><span class="value">{{valveDetail.METHOD}}</span></li>
                <li><span class="attr">测绘日期:</span><span class="value">{{valveDetail.CHDATE}}</span></li>
                <!-- <li><span class="attr">备注:</span><span class="value">{{valveDetail.MEMO}}</span></li> -->
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['valveDetail'])
  },
  methods: {
    ...mapActions({
      showDetail: 'setIsShowValve'
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
        // height: 480px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 1px 1px 2px #adbfd3;
        .header {
            height: 25px;
            line-height: 25px;
            background-color: #4886FF;
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
                        color: #A8A8A8;
                    }
                }
            }
        }
    }
</style>
