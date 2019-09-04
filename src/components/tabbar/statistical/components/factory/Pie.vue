<template>
    <div class="content">
        <h3>厂站类型</h3>
        <div class="all-length">
            <div class="length">
                {{totalLength}}个
            </div>
            <div class="title">厂站个数</div>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      totalLength: 0,
      radiusArr: [],
      colors: [
        "red",
        "blue",
        "gray",
        "orange",
        "yellow",
        "green",
        "black",
        "gold",
        "pink"
      ]
    };
  },
  computed: {
    ...mapGetters(["searchList"])
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var vm = this;
      let result = vm.searchList;
      let dataArr = [];
      result.map(v => {
        dataArr.push({
          value: v.StaticCount,
          name: v.SUBSID + "-" + v.GXFD
        });
        vm.totalLength += v.StaticCount;
      });
      result.map(v => {
        vm.radiusArr.push({
          percentage: ((v.StaticCount / vm.totalLength) * 100).toFixed(2) + "%",
          name: v.SUBSID + "-" + v.GXFD
        });
      });
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {},
        color: [
          "#BF4DD8",
          "#4886FF",
          "rgb(143, 134, 134)",
          "orange",
          "yellow",
          "green",
          "black",
          "#daa520",
          "pink"
        ],
        series: [
          {
            radius: ["50%", "66%"],
            name: "厂站类型",
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
    width: 200px;
    height: 290px;
    overflow-y: auto;
    position: absolute;
    right: 5px;
    top: 20px;
    z-index: 999;
    .pipe {
      text-align: left;
      font-size: 10px;
      font-weight: bold;
      padding-left: 15px;
      height: 30px;
      line-height: 30px;
      color: #000;
      position: relative;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 2px;
        top: 12px;
      }
      .blue {
        background-color: #4886ff;
      }
      .red {
        background-color: #bf4dd8;
      }
      .gray {
        background-color: rgb(143, 134, 134);
      }
      .orange {
        background-color: orange;
      }
      .yellow {
        background-color: yellow;
      }
      .green {
        background-color: green;
      }
      .black {
        background-color: #000;
      }
      .gold {
        background-color: #daa520;
      }
      .pink {
        background-color: pink;
      }
      .line {
        width: 170px;
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