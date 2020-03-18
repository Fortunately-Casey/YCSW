<template>
    <div id="lineChart" :style="{width: '900px', height: '400px'}" >

    </div>
</template>
<script>
export default {
  props: {
    lineList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dataGX: []
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      var vm = this
      vm.dataGX = []
      let myChart = this.$echarts.init(document.getElementById('lineChart'))
      let spacing = 0
      vm.lineList.map((v) => {
        spacing += v.attributes.SHAPE_Length
        vm.dataGX.push([
          spacing.toFixed(4),
          v.attributes.S_DEEP,
          v.attributes.D_S,
          v.attributes.MATERIAL,
          v.attributes.SHAPE_Length.toFixed(4)
        ])
      })
      let arr = []
      vm.dataGX.map((v, index) => {
        arr.push({
          symbolSize: 15,
          color: index % 2 === 0 ? '#4785FE' : '#BF4DD8',
          data: [vm.dataGX[index], vm.dataGX[index + 1]],
          type: 'line'
        })
      })
      myChart.setOption({
        tooltip: {
          backgroundColor: '#fff',
          borderColor: '#CCCCCC',
          borderWidth: 1,
          padding: 0,
          formatter: function (obj) {
            var value = obj.data
            return '<div style="height:15px; font-size:14px; background-color:#4785FE; margin-bottom:7px; padding-bottom:7px;width:180px;text-align:center;border-radius:4px 4px 0 0;">' +
                                    '管线信息</div>' +
                                    '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">埋深:' + '&nbsp;&nbsp;&nbsp;&nbsp;' + value[1] +
                                    '</div>' +
                                    '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">管径:' + '&nbsp;&nbsp;&nbsp;&nbsp;' + value[2] + '(mm)' +
                                    '</div>' +
                                    '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">管材:' + '&nbsp;&nbsp;&nbsp;&nbsp;' + value[3] +
                                    '</div>' +
                                    '<div style="color:#4C5564;font-size:12px;padding: 0 10px;">间距:' + '&nbsp;&nbsp;&nbsp;&nbsp;' + value[4] +
                                    '</div>'
          }
        },
        xAxis: {
          name: '间距(m)',
          scale: true
        },
        yAxis: {
          name: '埋深(m)',
          scale: true
        },
        series: arr
      })
    }
  },
  watch: {
    lineList () {
      this.drawLine()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
