<template>
  <div class="content">
    <div class="search-box" ref="searchbox" v-show="isShowSearchBox">
      <div class="search-header">
        <div class="chose-tab">
          <span class="condition" :class="chosedTab === 'condition' ?'active':''">条&nbsp;&nbsp;件</span>
        </div>
        <div class="icons">
          <div class="slide-up" :class="!isSlideUp ? 'active':''" @click="slideUp">
            <i class="el-icon-arrow-up"></i>
          </div>
          <div class="slide-down" :class="isSlideUp ? 'active':''" @click="slideDown">
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="close">
            <i class="el-icon-close" @click="close"></i>
          </div>
        </div>
      </div>
      <div ref="content">
        <div class="condition-content" v-if="chosedTab === 'condition'? true : false">
          <m-indicators @subsection="setSubsection"></m-indicators>
          <m-space
            @rectangular="getRectangular"
            @polygon="getPolygon"
            @slideDown="slideDown"
            @slideUp="slideUp"
            ref="space"
          ></m-space>
          <div class="footer">
            <div class="cancel" @click="close">取 消</div>
            <div class="determine" @click="search">统 计</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      width="70%"
      class="result"
      top="18vh"
      custom-class="bgc"
      :close-on-click-modal="false"
    >
      <div class="button">
        <div class="back" @click="back">
          <img src="../../../../../assets/icon/return.png" />返 回
        </div>
        <div class="output" @click="output">
          <img src="../../../../../assets/icon/export.png" />导 出
        </div>
      </div>
      <div class="echarts">
        <div id="pie">
          <m-pie v-if="chosedTab === 'result'? true : false"></m-pie>
        </div>
        <div id="pillars">
          <m-pillars v-if="chosedTab === 'result'? true : false"></m-pillars>
        </div>
      </div>
      <div class="table">
        <div class="header">
          <div class="number">序 号</div>
          <div class="type" v-if="isMaterial">材 质</div>
          <div class="type" v-if="isType">埋设类型</div>
          <div class="length">长 度（m）</div>
          <div class="subsection">管线分段</div>
          <div class="proportion">比 例（%）</div>
        </div>
        <ul>
          <li v-for="(item,index) in netWorkResult" :key="index">
            <div class="number">{{index + 1}}</div>
            <div class="type" v-if="isMaterial">{{item.attributes.MATERIAL}}</div>
            <div class="type" v-if="isType">{{item.attributes.D_TYPE}}</div>
            <div class="length">{{item.attributes.length&&item.attributes.length.toFixed(2)}}</div>
            <div class="subsection">{{item.attributes.GXFD}}</div>
            <div
              class="proportion"
            >{{ item.attributes.length&&((item.attributes.length/totalLength)*100).toFixed(2) + '%'}}</div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MIndicators from './Indicators.vue'
import MSpace from '@/common/space/Space.vue'
import MPie from './Pie.vue'
import MPillars from './Pillars.vue'
import esriLoader from 'esri-loader'
import { server } from '@/common/mapServer/config.js'
import { mapGetters, mapActions } from 'vuex'
import { exportStaticData } from '@/api/statistic.js'
import { EventBus } from '@/common/eventBus/eventBus.js'
export default {
  data () {
    return {
      chosedTab: 'condition',
      isSlideUp: true,
      isShowSearchBox: true,
      dialogVisible: false,
      geometry: '',
      length: 0,
      subsection: '',
      isMaterial: false,
      isType: false
    }
  },
  computed: {
    ...mapGetters(['netWorkRadio', 'netWorkResult']),
    totalLength () {
      let totalLength = 0
      this.netWorkResult.map(v => {
        totalLength += v.attributes.length
        v = JSON.stringify(v)
      })
      this.length = totalLength
      return totalLength
    }
  },
  methods: {
    ...mapActions({
      setResult: 'setNetWorkResult'
    }),
    slideDown () {
      this.$refs.content.style = 'display:none'
      this.$refs.searchbox.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.searchbox.style = 'height:400px;bottom:15px'
      setTimeout(() => {
        this.$refs.content.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    setSubsection (value) {
      this.subsection = value
    },
    output () {
      var vm = this
      let arr = []
      vm.netWorkResult.map((v, i) => {
        arr.push({
          序号: i + 1,
          材料: v.attributes.MATERIAL,
          '长度(m)': v.attributes.length.toFixed(2),
          '比例(%)': ((v.attributes.length / vm.length) * 100).toFixed(2) + '%'
        })
      })
      exportStaticData({
        list: JSON.stringify(arr)
      }).then(resp => {
        if (resp.data.success) {
          var download = document.createElement('iframe')
          download.src = 'http://10.11.222.52:14451/' + resp.data.rows
          download.style.display = 'none'
          document.body.appendChild(download)
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    search () {
      var vm = this
      esriLoader
        .loadModules([
          'esri/tasks/QueryTask',
          'esri/tasks/query',
          'esri/symbols/SimpleLineSymbol',
          'dojo/colors',
          'esri/tasks/StatisticDefinition'
        ])
        .then(
          ([
            QueryTask,
            Query,
            SimpleLineSymbol,
            Colors,
            StatisticDefinition
          ]) => {
            // 创建查询对象
            var queryTask = new QueryTask(server.netWorkUrl + '/0')
            var query = new Query()
            query.where = '1=1 '
            if (vm.subsection !== '') {
              query.where += ` and GXFD='${vm.subsection}'`
            }
            // 空间查询的几何对象
            if (vm.geometry) {
              query.geometry = vm.geometry
            }
            // 空间参考信息
            query.outSpatialReference = window.mapBase.map.spatialReference
            query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS
            query.outFields = ['*']

            query.returnGeometry = true
            // 统计条件
            // if(vm.subsection === '') {
            //   query.groupByFieldsForStatistics = [vm.netWorkRadio];
            // }else {
            //   query.groupByFieldsForStatistics = [vm.netWorkRadio,'GXFD'];
            // }
            query.groupByFieldsForStatistics = [vm.netWorkRadio, 'GXFD']
            var statDef = new StatisticDefinition()
            statDef.statisticType = 'sum'
            statDef.onStatisticField = 'SHAPE_Length'
            statDef.outStatisticFieldName = 'length'
            query.outStatistics = [statDef]

            // 执行空间查询

            queryTask.execute(
              query,
              queryResult => {
                vm.setResult(queryResult.features)
                if (queryResult.features[0].attributes.MATERIAL === undefined) {
                  vm.isMaterial = false
                  vm.isType = true
                } else {
                  vm.isMaterial = true
                  vm.isType = false
                }
                vm.isShowSearchBox = false
                vm.dialogVisible = true
                vm.chosedTab = 'result'
                // if(queryResult.features.length == 0 ) {
                //   alert('查询结果为空');
                //   return;
                // }
                // else {
                //   var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Colors([255, 0, 0]), 2);
                //   queryResult.features.map((v) => {
                //     v.setSymbol(lineSymbol);
                //     mapBase.addGraphic(v);
                //   })
                //   vm.chosedTab = 'result'
                // }
              },
              err => {
                vm.$message({
                  message: '未查询到数据',
                  type: 'warning'
                })
              }
            )
          }
        )
    },
    back () {
      this.dialogVisible = false
      this.isShowSearchBox = true
      this.chosedTab = 'condition'
    },
    getRectangular (value) {
      this.geometry = value
    },
    getPolygon (value) {
      this.geometry = value
    },
    close () {
      this.$refs.space.closeToolBar()
      EventBus.$emit('changeChecked', [1, 62])
      // window.mapBase.clearUI();
      this.$emit('closeNetWork', '')
    }
  },
  components: {
    MIndicators,
    MSpace,
    MPie,
    MPillars
  }
}
</script>
<style lang="less" scoped>
.content {
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .search-box {
    transition: all 0.5s;
    width: 885px;
    height: 400px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    box-shadow: 0 0 13px 2px #adbfd3;
    transform: translateX(-50%);
    bottom: 15px;
    z-index: 999;
    .search-header {
      height: 39px;
      border-bottom: 1px solid #70a0ff;
      position: relative;
      .chose-tab {
        width: 200px;
        height: 39px;
        margin-left: 45px;
        .condition,
        .result {
          text-align: center;
          display: inline-block;
          width: 50px;
          height: 37px;
          line-height: 37px;
          font-size: 16px;
          border-bottom: 2px solid #fff;
          color: #afafaf;
          cursor: pointer;
        }
        .condition {
          float: left;
        }
        .active {
          color: #548fff;
          border-bottom: 2px solid #548fff;
        }
      }
      .icons {
        width: 124px;
        position: absolute;
        right: 0;
        top: 0;
        height: 39px;
        .slide-up,
        .slide-down,
        .close {
          float: left;
          width: 39px;
          height: 39px;
          text-align: center;
          line-height: 39px;
          cursor: pointer;
          border-left: 1px solid #c6c6c6;
          i {
            font-weight: bold;
            font-size: 18px;
          }
        }
        .slide-up {
          i {
            color: #b2b2b2;
          }
        }
        .slide-down {
          i {
            color: #b2b2b2;
          }
        }
        .active {
          i {
            color: #4987ff;
          }
        }
        .close {
          color: #ff4a42;
        }
      }
    }
    .condition-content {
      position: relative;
      padding-top: 138px;
      .footer {
        height: 40px;
        position: relative;
        .cancel,
        .determine {
          width: 120px;
          height: 40px;
          border-radius: 5px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          position: absolute;
          top: 0;
        }
        .cancel {
          left: 280px;
          border: 1px solid #c3c3c3;
        }
        .determine {
          background-color: #4886ff;
          color: #fff;
          left: 480px;
        }
      }
    }
  }
  .result {
    padding-left: 150px;
    .button {
      height: 60px;
      .back,
      .output {
        cursor: pointer;
        width: 95px;
        height: 40px;
        line-height: 40px;
        background-color: #4886ff;
        float: left;
        border-radius: 5px;
        color: #fff;
        font-size: 18px;
        text-align: right;
        position: relative;
        padding-right: 10px;
        img {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .output {
        margin-left: 20px;
      }
    }
    .echarts {
      height: 360px;
      // min-width: 1400px;
      #pie,
      #pillars {
        float: left;
        width: 480px;
        height: 330px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 1px 1px 2px #adbfd3;
      }
      #pillars {
        margin-left: 20px;
      }
    }
    .table {
      width: 980px;
      height: 180px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 1px 1px 2px #adbfd3;
      .header {
        height: 58px;
        background-color: #4886ff;
        border-radius: 6px 6px 0 0;
        .number,
        .type,
        .length,
        .subsection,
        .proportion {
          height: 58px;
          line-height: 58px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          float: left;
        }
        .number {
          width: 15%;
        }
        .type {
          width: 20%;
        }
        .subsection {
          width: 20%;
        }
        .length {
          width: 30%;
        }
        .proportion {
          width: 15%;
        }
      }
      ul {
        list-style: none;
        li {
          height: 60px;
          .number,
          .type,
          .length,
          .subsection,
          .proportion {
            height: 58px;
            line-height: 58px;
            font-size: 16px;
            text-align: center;
            float: left;
          }
          .number {
            width: 15%;
          }
          .type {
            width: 20%;
          }
          .subsection {
            width: 20%;
          }
          .length {
            width: 30%;
          }
          .proportion {
            width: 15%;
          }
        }
      }
    }
  }
}
</style>
