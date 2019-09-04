<template>
    <div class="content">
        <h3>维修统计</h3>
        <div id="myChart" :style="{width: '580px', height: '330px'}"></div>
    </div>
</template>
<script>
export default {
  props:{
    list:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      data:[],
      xAxis:[]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.data = []
      this.xAxis = []
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.list.map((v) =>{
        this.data.push({
          value:v.StaticCount 
        })
        this.xAxis.push(
          v.FaultType + '-' + v.GXFD
        )
      })
      
      myChart.setOption({
        tooltip:{
          trigger:'axis',
        },
        xAxis: {
          type: "category",
          name:'分段',
          boundaryGop:false,
          data:this.xAxis
        },
        yAxis: {
          name:'次数',
          type: "value"
        },
        series: [
          {
            name:'',
            data: this.data,
            type:'line',
            itemStyle: {
              normal: {
                borderWidth:4,
                borderColor:'#4884FE',
                color:'#4884FE'
              }
            }
          },
        ]
      });
    }
  },
  watch:{
    list() {
      this.drawLine()
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
  #myChart {
    h3 {
      text-align: center;
    }
  }
}
</style>