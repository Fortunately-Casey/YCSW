<template>
    <div id="pointChart" :style="{width: '900px', height: '400px'}" >

    </div>
</template>
<script>
    export default {
        props:{
            pointList:{
                type:Array,
                default:[],
            }
        },
        data() {
            return {
                dataGJ:[]
            }
        },
        mounted() {
            this.drawPoint()
        },
        methods:{
            drawPoint() {
                var vm = this;
                vm.dataGJ = []
                let myChart = this.$echarts.init(document.getElementById("pointChart"));
                
                vm.pointList.map((v) => {
                    vm.dataGJ.push([
                        v.centerDistance,
                        v.centerZ,
                        v.attributes.D_S,
                        v.attributes.MATERIAL 
                    ])
                })
                myChart.setOption({
                    tooltip:{
                        backgroundColor:'#fff',
                        borderColor:'#CCCCCC',
                        borderWidth:1,
                        padding:0,
                        formatter:function(obj) {
                            var value = obj.data;
                            return '<div style="height:15px; font-size:14px; background-color:#4785FE; margin-bottom:7px; padding-bottom:7px;width:180px;text-align:center;border-radius:4px 4px 0 0;">'
                                    +'管点信息</div>'
                                    + '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">埋深:' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ value[1]
                                    + '</div>'    
                                    + '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">管径:' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ value[2] + '(mm)'
                                    + '</div>'    
                                    + '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">管材:' + '&nbsp;&nbsp;&nbsp;&nbsp;' + value[3]
                                    + '</div>'    
                        }
                    },
                    xAxis:{
                        name:'间距(m)',
                        scale:true,
                    },
                    yAxis:{
                        name:'埋深(m)',
                        scale:true
                    },
                    series:[{
                        symbolSize:15,
                        color:'#4785FE',
                        data:vm.dataGJ,
                        type:'effectScatter'
                    }]
                })
            }
        },
        watch:{
            pointList() {
                this.drawPoint()
            }
        }
    }
</script>
<style lang="less" scoped>
    #pointChart {

    }
</style>