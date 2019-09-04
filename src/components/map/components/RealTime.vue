<template>
    <div class="content" @click="chose" :class="isCenter?'center':''">
        <div :id="myChart" :style="{width: '200px', height: '165px'}"></div>
        <!-- <div class="time">
            {{date}}<br/>
            {{clock}}
        </div> -->
    </div>
</template>
<script>
import { getDate, getClock } from "@/common/utils/tool.js";
import { mapGetters, mapActions } from "vuex";
import { GetPumpDetailSCAD } from "@/api/realTime.js";
import esriLoader from "esri-loader";
import { server } from "@/common/mapServer/config.js";
export default {
  props: {
    myChart: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: ""
    },
    isCenter: {
      type: Boolean,
      default: ""
    }
  },
  data() {
    return {
      date: "",
      clock: "",
      timer: ""
    };
  },
  computed: {},
  created() {
    this.initTime();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    ...mapActions({
      setDetail: "setRealTimeDetail",
      isShowDetail: "setIsShowRealTimeDetail"
    }),
    drawLine() {
      var vm = this;
      let myChart = vm.$echarts.init(document.getElementById(vm.myChart));
      let option = {
        tooltip: {
          formatter: function() {
            var company = vm.data.EquimentType === '测流表'?'km³':'Kpa'
            return vm.data.Value + company;
          }
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: "实时数据",
            type: "gauge",
            // min:vm.data.MinValue/1000,
            min:
              vm.data.MinValue < -1000
                ? (vm.data.MinValue * 1.1) / 1000
                : vm.data.MinValue * 1.1,
            max:
              vm.data.MaxValue > 1000
                ? (vm.data.MaxValue * 1.1) / 1000
                : vm.data.MaxValue * 1.1,
            axisLine: {
              lineStyle: {
                color: [
                  [1 / 22, "#c23531"],
                  [21 / 22, "#63869e"],
                  [1, "#c23531"]
                ],
                width: 5
              }
            },
            axisLabel: {
              fontSize: 9,
              formatter:
                vm.data.Value > -20 && vm.data.Value < 20
                  ? "{value}"
                  : "{value}k"
            },
            radius: "90%",
            axisTick: {
              length: 6,
              lineStyle: {
                color: "auto"
              }
            },
            splitLine: {
              length: 8,
              lineStyle: {
                color: "auto"
              }
            },
            pointer: {
              width: 4
            },
            title: {
              offsetCenter: [0, "-35%"],
              fontSize: "10",
              color: "#B3B3B3"
            },
            detail: {
              formatter: function() {
                var company = vm.data.EquimentType === '测流表'?'km³':'Kpa'
                return vm.data.Value + company;
              },
              fontSize: "10",
              // backgroundColor: "#E6E6E7",
              borderRadius: 6,
              offsetCenter: [0, "80%"]
            },
            data: [{ value: vm.data.Value / 1000, name: vm.data.TagName }]
          }
        ]
      };
      myChart.setOption(option, true);
    },
    initTime() {
      this.timer = setInterval(() => {
        this.date = getDate();
        this.clock = getClock();
      }, 1000);
    },
    chose() {
      var vm = this;
      esriLoader
        .loadModules([
          "static/arcpackage/arcgisUtil",
          "esri/geometry/Polyline",
          "esri/graphic",
          "dojo/colors",
          "esri/symbols/SimpleLineSymbol",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/geometry/Point"
        ])
        .then(
          ([
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,
            SimpleMarkerSymbol,
            Point
          ]) => {
            window.mapBase.clearGraphic();
            var startPointSymbol = new SimpleMarkerSymbol();
            startPointSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
            startPointSymbol.setSize(10);
            startPointSymbol.setColor(new Colors("red"));
            let x = arcgisUtil.wktToPoint(vm.data.StrSHAPE).x;
            let y = arcgisUtil.wktToPoint(vm.data.StrSHAPE).y;
            var point = new Point(x, y, window.mapBase.map.spatialReference);

            var startPointGraphic = new Graphic(point, startPointSymbol);
            window.mapBase.addGraphic(startPointGraphic);

            //将地图放大到第7级
            window.mapBase.map.setZoom(16);
            // 把地图中心定位到中心点
            window.mapBase.map.centerAt(point);
          }
        );
      GetPumpDetailSCAD({
        EquimentType: vm.data.EquimentType,
        PumpStationNum: vm.data.PumpStationNum
      }).then(resp => {
        if (resp.data.success) {
          if (resp.data.rows) {
            vm.setDetail({
              detail:resp.data.rows,
              tagName:vm.data.TagName
            });
            vm.isShowDetail(true);
          } else {
            vm.isShowDetail(false);
            vm.$message({
              message: "该泵站内无设备！",
              type: "warning"
            });
          }
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    }
  },
  watch: {
    data() {
      this.drawLine();
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  // margin: 0 24px;
  height: 145px;
  // float: left;
  transform: translateY(30px);
  .time {
    line-height: 12px;
    transform: translateY(-30px);
    font-size: 12px;
    text-align: center;
  }
}
.center {
  width: 50%;
  margin: 0 auto;
}
</style>