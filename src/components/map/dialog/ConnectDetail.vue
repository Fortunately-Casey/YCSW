<template>
    <div class="detail">
        <div class="header">
            属 性 信 息
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="content">
            <ul>
                <!-- <li><span class="attr">要素代码:</span><span class="value">{{connectDetail.YSDM}}</span></li> -->
                <li><span class="attr">要素名称:</span><span class="value">{{connectDetail.YSMC}}</span></li>
                <li><span class="attr">X(m):</span><span class="value">{{connectDetail.X}}</span></li>
                <li><span class="attr">Y(m):</span><span class="value">{{connectDetail.Y}}</span></li>
                <li><span class="attr">地面高程(m):</span><span class="value">{{connectDetail.SURF_H}}</span></li>
                <!-- <li><span class="attr">偏心井位:</span><span class="value">{{connectDetail.OFFSET}}</span></li> -->
                <!-- <li><span class="attr">角度:</span><span class="value">{{connectDetail.FWJ}}</span></li> -->
                <li><span class="attr">设计编号:</span><span class="value">{{connectDetail.DESIGN_NO}}</span></li>
                <li><span class="attr">设备编号:</span><span class="value">{{connectDetail.EXP_NO}}</span></li>
                <li><span class="attr">特征:</span><span class="value">{{connectDetail.FEATURE}}</span></li>
                <li><span class="attr">附属物:</span><span class="value">{{connectDetail.SUBSID}}</span></li>
                <li><span class="attr">比例尺:</span><span class="value">{{connectDetail.SCALE}}</span></li>
                <li><span class="attr">探测方法:</span><span class="value">{{connectDetail.METHOD}}</span></li>
                <!-- <li><span class="attr">测绘日期:</span><span class="value">{{connectDetail.CHDATE}}</span></li> -->
                <!-- <li><span class="attr">备注:</span><span class="value">{{connectDetail.MEMO}}</span></li> -->
            </ul>  
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed:{
            ...mapGetters(['connectDetail'])
        },
        methods:{
            ...mapActions({
                showDetail:'setIsShowConnect'    
            }),
            close() {
                this.showDetail(false);
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