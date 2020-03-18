<template>
    <div class="content">
        <div id="myPillars" :style="{width: '800px', height: '280px'}"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      var vm = this
      let nameArr = []
      let dataArr = []
      vm.list.map((v) => {
        nameArr.push(v.TrueName)
        dataArr.push(v.InspectCount)
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
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '人员',
            type: 'category',
            data: nameArr
          }
        ],
        yAxis: [
          {
            name: '(次)',
            type: 'value'
          }
        ],
        series: [
          {
            name: '巡查次数',
            type: 'bar',
            barWidth: '30%',
            data: dataArr
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  // position: relative;
  h3 {
    padding-left: 20px;
    height: 30px;
    line-height: 55px;
    font-size: 20px;
    color: #000;
  }
  #myPillars {
    margin-left: 20px;
  }
}
</style>
