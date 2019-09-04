<template>
    <div class="content">
        <h3>管线统计</h3>
        <div class="all-length">总长度:{{totalLength&&totalLength.toFixed(2)}}m</div>
        <div class="type">(类型)</div>
        <div id="myPillars" :style="{width: '330px', height: '300px'}"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
         nameArr:[],
         dataArr:[],
         totalLength:0 
    }
  },
  mounted() {
    this.drawLine();
  },
  computed:{
      ...mapGetters(['netWorkResult'])
  },
  methods: {
    drawLine() {
      var vm = this;
      let result = vm.netWorkResult;
      result.map((v) => {
        vm.nameArr.push(v.attributes.MATERIAL === undefined?v.attributes.D_TYPE:v.attributes.MATERIAL);
        vm.dataArr.push(v.attributes.length&&v.attributes.length.toFixed(2))
        vm.totalLength += v.attributes.length
      })
      let myPillars = this.$echarts.init(document.getElementById("myPillars"));
      myPillars.setOption({
        tooltip: {
            trigger:'axis',
            axisPointer : {
                type:'shadow'
            }
        },
        color:['#4886FF'],
        grid: {
            left:'3%',
            right:'4%',
            bottom:'3%',
            containLabel: true
        },
        xAxis: [
            {
                name:'类型',
                type:'category',
                data:vm.nameArr,
                axisTick: {
                    alignWidthLabel: true
                }
            }
        ],
        yAxis:[
            {
                name:'(m)',
                type:'value',
            }
        ],
        series: [
            {
                name:'管线统计',
                type:'bar',
                barWidth:"30%",
                data:vm.dataArr
            }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
    position: relative;
  h3 {
    padding-left: 20px;
    height: 30px;
    line-height: 55px;
    font-size: 20px;
    color: #000;
  }
  .all-length {
      position: absolute;
      top: 18px;
      right: 40px;
      font-size: 12px;
  }
  .type {
      position: absolute;
      top: 294px;
      right: 70px;
      font-size: 13px;
  }
  #myPillars {
      margin-left: 50px;
  }
}
</style>