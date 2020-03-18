<template>
    <div class="content">
        <h3>厂站统计</h3>
        <div class="all-length">总个数:{{totalLength}}个</div>
        <div class="type">(类型)</div>
        <div id="myPillars" :style="{width: '380px', height: '300px'}"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nameArr: [],
      dataArr: [],
      totalLength: 0
    }
  },
  mounted () {
    this.drawLine()
  },
  computed: {
    ...mapGetters(['searchList'])
  },
  methods: {
    drawLine () {
      var vm = this
      let result = vm.searchList
      result.map(v => {
        vm.nameArr.push(v.SUBSID + '-' + v.GXFD)
        vm.dataArr.push(v.StaticCount)
        vm.totalLength += v.StaticCount
      })
      let myPillars = this.$echarts.init(document.getElementById('myPillars'))
      myPillars.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#4886FF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '类型',
            type: 'category',
            data: vm.nameArr,
            axisTick: {
              alignWidthLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: '(个)',
            type: 'value'
          }
        ],
        series: [
          {
            name: '厂站个数',
            type: 'bar',
            barWidth: '30%',
            data: vm.dataArr
          }
        ]
      })
    }
  }
}
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
    right: 20px;
    font-size: 13px;
  }
  #myPillars {
    margin-left: 50px;
  }
}
</style>
