<template>
        <div class="content">
            <div class="title" v-if="isConnect">分析结果 : 连通！</div>
            <div class="not-connect" v-else>分析结果 : 未连通！</div>
            <div class="header">
                <div class="number">序 号</div>
                <div class="id">编 号</div>
                <div class="type">类 型</div>
                <div class="operation">操 作</div>
            </div>
            <ul class="table" v-if="isConnect">
                <li v-for="(item,index) in connectList[page]"
                   :key="index"
                   :class="index === 1||index === 3?'gray':''"
                   >
                    <span class="number">{{index + 1}}</span>
                    <span class="id">{{item.attributes.EXP_NO}}</span>
                    <span class="type">{{item.attributes.FEATURE}}</span>
                    <span class="operation" @click="goToDetail(item)">详情</span>
                </li>
            </ul>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="1"
                    :total="connectList.length"
                    @current-change="changePage"
                >
                </el-pagination>
            </div>
        </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import esriLoader from "esri-loader";
export default {
  data() {
    return {
      stripe: true,
      page: 0
    };
  },
  props:{
    isConnect:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    ...mapGetters(["connectList"])
  },
  methods: {
    ...mapActions({
      setDetail:'setConnectDetail',
      showConnect:'setIsShowConnect'
    }),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1 || rowIndex === 3) {
        return "gray";
      } else {
        return "";
      }
      return "gray";
    },
    changePage(page) {
      this.page = page - 1;
    },
    goToDetail(item) {
      var vm = this;
      vm.$emit('slideDown')
      esriLoader
        .loadModules([
          "esri/geometry/Point",
          "static/arcpackage/arcgisUtil",
          "esri/geometry/Polyline",
          "esri/graphic",
          "dojo/colors",
          "esri/symbols/SimpleLineSymbol",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleMarkerSymbol"
        ])
        .then(
          ([
            Point,
            arcgisUtil,
            Polyline,
            Graphic,
            Colors,
            SimpleLineSymbol,
            GraphicsLayer,           
            SimpleMarkerSymbol
          ]) => {
            var newpoint=new Point(item.geometry.x,item.geometry.y,window.mapBase.map.spatialReference);
            //将地图放大到第7级
            window.mapBase.map.setZoom(16);
            //获取外包矩形的中心点，把地图中心定位到中心点
            window.mapBase.map.centerAt(newpoint);
            var detailSymbol = new SimpleMarkerSymbol();
            detailSymbol.style = SimpleMarkerSymbol.STYLE_CIRCLE;
            detailSymbol.setSize(10);
            detailSymbol.setColor(new Colors("red"));

            var graphicPoint = new Graphic(newpoint, detailSymbol);
            
            var graphicsLayer = window.mapBase.map.getLayer("pointTc"); //获取绘制图层

            if (graphicsLayer != null) {
              window.mapBase.map.removeLayer(graphicsLayer);
            }
            graphicsLayer = new GraphicsLayer({ id: "pointTc" });

            graphicsLayer.add(graphicPoint);
            window.mapBase.map.addLayer(graphicsLayer, 1);
            vm.setDetail(item.attributes);
            vm.showConnect(true);
          }
        );
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
    font-size: 14px;
    color: #fff;
    background-color: #48cb65;
  }
  .not-connect {
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
    font-size: 14px;
    color: #fff;
    background-color: #FF6363;
  }
  .header {
    height: 50px;
    background-color: #4886ff;
    div {
      display: inline-block;
      // height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    .number {
      width: 140px;
    }
    .id {
      width: 260px;
    }
    .type {
      width: 260px;
    }
    .operation {
      width: 200px;
    }
  }
  .table {
    height: 250px;
    list-style: none;
    li {
      height: 50px;
      span {
        float: left;
        height: 50px;
        text-align: center;
        line-height: 50px;
      }
      .number {
        width: 140px;
      }
      .id {
        width: 260px;
      }
      .type {
        width: 260px;
      }
      .operation {
        color: #4886ff;
        cursor: pointer;
        width: 200px;
      }
    }
    .gray {
      background-color: #e9e9e9;
    }
  }
  .page {
    width: 420px;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 18px;
  }
}
</style>