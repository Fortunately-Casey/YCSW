<template>
    <div class="content">
        <h3>管网类型</h3>
        <div class="all-length">
            <div class="length">
                {{totalLength&&totalLength.toFixed(2)}}m
            </div>
            <div class="title">管网长度</div>
        </div>
        <div id="myChart" :style="{width: '330px', height: '330px'}"></div>
        <div class="data">
            <div class="pipe" v-for="(item,index) in radiusArr" :key="index">
                <div class="circle" :class="colors[index]"></div>
                 {{item.name}}:{{item.percentage}}
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      totalLength:0,
      radiusArr:[],
      colors:['red','blue','gray','yellow']
    };
  },
  computed:{
    ...mapGetters(['netWorkResult'])
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var vm = this;
      let result = vm.netWorkResult;
      let dataArr = [];
      result.map((v) => {
        dataArr.push({
          value:v.attributes.length&&v.attributes.length.toFixed(2),
          name:v.attributes.MATERIAL === undefined?v.attributes.D_TYPE:v.attributes.MATERIAL
        })
        vm.totalLength += v.attributes.length
      })
      result.map((v) => {
        vm.radiusArr.push({
          percentage:v.attributes.length&& ((v.attributes.length/vm.totalLength)*100).toFixed(2) + '%',
          name:v.attributes.MATERIAL === undefined?v.attributes.D_TYPE:v.attributes.MATERIAL
        })
      })
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {},
        color: ["#BF4DD8", "#4886FF",'rgb(143, 134, 134)','rgb(216, 167, 77)'],
        series: [
          {
            radius: ["50%", "66%"],
            name: "管网类型",
            type: "pie",
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            },
            data: dataArr
          }
        ]
      })
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
    width: 150px;
    height: 50px;
    position: absolute;
    left: 89px;
    top: 175px;
    z-index: 999;
    .length,
    .title {
      text-align: center;
    }
    .length {
      font-size: 22px;
      color: #000;
      font-weight: bold;
    }
    .title {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  .data {
    width: 115px;
    height: 180px;
    position: absolute;
    right: 35px;
    top: 20px;
    z-index: 999;
    .pipe {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      height: 35px;
      line-height: 35px;
      color: #000;
      position: relative;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 2px;
        top: 15px;
      }
      .blue{
        background-color: #4886ff;
      }
      .red {
        background-color:#BF4DD8;
      }
      .gray {
        background-color: rgb(143, 134, 134);
      }
      .orange {
        background-color: rgb(216, 167, 77);
      }
      .line {
        width: 60px;
        height: 1px;
        background-color: #aaaaad;
        position: absolute;
        bottom: 0;
        left: 20px;
      }
    }
  }
}
</style>