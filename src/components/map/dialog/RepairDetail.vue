<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul v-if="repairDetail.S_POINT?false:true">
                <li><span class="attr">设备编号:</span><span class="value">{{repairDetail.ID}}</span></li>
                <li><span class="attr">故障类型:</span><span class="value">{{repairDetail.FEATURE}}</span></li>
                <li><span class="attr">维修人员:</span><span class="value">{{repairDetail.Serviceman}}</span></li>
                <li><span class="attr">维修状态:</span><span class="value">{{repairDetail.ServiceStatus}}</span></li>
                <li><span class="attr">维修开始日期:</span><span class="value">{{repairDetail.StrServiceBeginDate}}</span></li>
                <li><span class="attr">维修结束日期:</span><span class="value">{{repairDetail.StrServiceEndDate}}</span></li>
                <li><span class="attr">登记人员:</span><span class="value">{{repairDetail.RegisteredStaff}}</span></li>
                <li><span class="attr">登记日期:</span><span class="value">{{repairDetail.StrRegisteredDate}}</span></li>
                <!-- <li><span class="attr">维修说明:</span><span class="value">{{repairDetail.ServiceDes}}</span></li> -->
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{repairDetail.YSDM}}</span></li> -->
                <li><span class="attr">要素名称:</span><span class="value">{{repairDetail.YSMC}}</span></li>
                <li><span class="attr">X(m):</span><span class="value">{{repairDetail.X}}</span></li>
                <li><span class="attr">Y(m):</span><span class="value">{{repairDetail.Y}}</span></li>
                <li><span class="attr">地面高程(m):</span><span class="value">{{repairDetail.SURF_H}}</span></li>
                <li><span class="attr">设计编号:</span><span class="value">{{repairDetail.DESIGN_NO}}</span></li>
                <li><span class="attr">设备编号:</span><span class="value">{{repairDetail.EXP_NO}}</span></li>
                <li><span class="attr">特征:</span><span class="value">{{repairDetail.FEATURE}}</span></li>
                <li><span class="attr">附属物:</span><span class="value">{{repairDetail.SUBSID}}</span></li>
                <!-- <li><span class="attr">比例尺:</span><span class="value">{{repairDetail.SCALE}}</span></li> -->
                <li><span class="attr">探测方法:</span><span class="value">{{repairDetail.METHOD}}</span></li>
                <!-- <li><span class="attr">备注:</span><span class="value">{{repairDetail.MEMO}}</span></li> -->
            </ul>
            <ul v-else>
                <li><span class="attr">设备编号:</span><span class="value">{{repairDetail.ID}}</span></li>
                <li><span class="attr">故障类型:</span><span class="value">{{repairDetail.FEATURE}}</span></li>
                <li><span class="attr">维修人员:</span><span class="value">{{repairDetail.Serviceman}}</span></li>
                <li><span class="attr">维修状态:</span><span class="value">{{repairDetail.ServiceStatus}}</span></li>
                <li><span class="attr">维修开始日期:</span><span class="value">{{repairDetail.StrServiceBeginDate}}</span></li>
                <li><span class="attr">维修结束日期:</span><span class="value">{{repairDetail.StrServiceEndDate}}</span></li>
                <li><span class="attr">登记人员:</span><span class="value">{{repairDetail.RegisteredStaff}}</span></li>
                <li><span class="attr">登记日期:</span><span class="value">{{repairDetail.StrRegisteredDate}}</span></li>
                <!-- <li><span class="attr">维修说明:</span><span class="value">{{repairDetail.ServiceDes}}</span></li> -->
                <li><span class="attr">要素名称:</span><span class="value">{{repairDetail.YSMC}}</span></li>
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{repairDetail.YSDM}}</span></li> -->
                <!-- <li><span class="attr">比例尺:</span><span class="value">{{repairDetail.SCALE}}</span></li> -->
                <li><span class="attr">长度(m):</span><span class="value">{{repairDetail.SHAPE_Length&&repairDetail.SHAPE_Length.toFixed(2)}}</span></li>
                <li><span class="attr">起&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</span><span class="value">{{repairDetail.S_POINT}}</span></li>
                <li><span class="attr">终&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</span><span class="value">{{repairDetail.E_POINT }}</span></li>
                <li><span class="attr">起点埋深(m):</span><span class="value">{{repairDetail.S_DEEP}}</span></li>
                <li><span class="attr">终点埋深(m):</span><span class="value">{{repairDetail.E_DEEP}}</span></li>
                <li><span class="attr">材&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质:</span><span class="value">{{repairDetail.MATERIAL}}</span></li>
                <li><span class="attr">埋设类型:</span><span class="value">{{repairDetail.D_TYPE }}</span></li>
                <li><span class="attr">管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径:</span><span class="value">{{repairDetail.D_S}}</span></li>
                <li><span class="attr">建设年代:</span><span class="value">{{repairDetail.MDATE}}</span></li>
                <li><span class="attr">管线座落:</span><span class="value">{{repairDetail.ROADNAME}}</span></li>
                <!-- <li><span class="attr">备注:</span><span class="value">{{repairDetail.MEMO_}}</span></li> -->
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
    ...mapGetters(['repairDetail'])
  },
  methods: {
    ...mapActions({
      showDetail: 'setIsShowRepairDetail'
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
