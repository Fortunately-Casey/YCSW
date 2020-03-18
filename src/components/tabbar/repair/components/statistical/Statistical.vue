<template>
    <div class="content">
        <div class="search-box" ref='searchbox' v-show="isShowSearchBox">
            <div class="search-header">
                <div class="chose-tab">
                    <span class="condition" :class="chosedTab === 'condition' ?'active':''">
                        条&nbsp;&nbsp;件
                    </span>
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
                <div class="condition-content" v-show="chosedTab === 'condition'? true : false">
                   <m-indicators @type="getType" @subsection="getSubsection" @dateChange="getDate"></m-indicators>
                   <m-space @rectangular="getRectangular" @polygon="getPolygon" @slideDown="slideDown" @slideUp="slideUp" ref="space"></m-space>
                    <div class="footer">
                        <div class="cancel" @click="close">取 消</div>
                        <div class="determine" @click="search">查 询</div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :visible.sync = "dialogVisible"
            :show-close="false"
            class="result"
            top="10vh"
            custom-class="bgc"
        >
            <div class="main">
                <div class="button">
                    <div class="back" @click="back"><img src="../../../../../assets/icon/return.png">返 回</div>
                    <div class="output" @click="output"><img src="../../../../../assets/icon/export.png">导 出</div>
                </div>
                <div class="echarts">
                    <div id="line">
                      <m-line :list="list"></m-line>
                    </div>
                    <div id="table">
                        <div class="header">
                            <div class="number">序 号</div>
                            <div class="type">类型</div>
                            <div class="subsection">管线分段</div>
                            <div class="time">次 数</div>
                        </div>
                        <ul>
                            <li v-for="(item,index) in list" :key="index">
                                <div class="number">{{index+1}}</div>
                                <div class="type">{{item.FaultType}}</div>
                                <div class="subsection">{{item.GXFD}}</div>
                                <div class="time">{{item.StaticCount}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import MIndicators from './Indicators.vue'
import MSpace from '@/common/space/Space.vue'
import MLine from './Line.vue'
import { GetStaticInfo } from '@/api/repair.js'
import { exportStaticData } from '@/api/statistic.js'
import esriLoader from 'esri-loader'
export default {
  data () {
    return {
      chosedTab: 'condition',
      isSlideUp: true,
      isShowSearchBox: true,
      dialogVisible: false,
      geometry: '',
      faultType: '全部',
      subsection: '全部',
      date: '',
      list: []
    }
  },
  mounted () {},
  methods: {
    slideDown () {
      this.$refs.content.style = 'display:none'
      this.$refs.searchbox.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.searchbox.style = 'height:460px;bottom:15px'
      setTimeout(() => {
        this.$refs.content.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    format2Len (i) {
      return i < 10 ? '0' + i : i
    },
    getTime (CurrentTime) {
      var timeStr =
        CurrentTime.getFullYear() +
        '-' +
        this.format2Len(CurrentTime.getMonth() + 1) +
        '-' +
        this.format2Len(CurrentTime.getDate())
      return timeStr
    },
    getRectangular (value) {
      this.geometry = value
    },
    getPolygon (value) {
      this.geometry = value
    },
    getType (value) {
      this.faultType = value
    },
    getSubsection (value) {
      this.subsection = value
    },
    getDate (value) {
      this.date = value
    },
    output () {
      var vm = this
      let arr = []
      vm.list.map((v, i) => {
        arr.push({
          序号: i + 1,
          类型: v.FaultType,
          管线分段: v.GXFD,
          次数: v.StaticCount
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
        .loadModules(['static/arcpackage/arcgisUtil'])
        .then(function ([ArcgisUtil]) {
          if (vm.geometry) {
            vm.geometry = ArcgisUtil.polygonToWKT(vm.geometry)
            GetStaticInfo({
              FaultType: vm.faultType,
              GXFD: vm.subsection,
              ServiceBeginDate: vm.date ? vm.getTime(vm.date[0]) : '',
              ServiceEndDate: vm.date ? vm.getTime(vm.date[1]) : '',
              Geometrystr: vm.geometry
            }).then(resp => {
              if (resp.data.success) {
                vm.list = resp.data.rows
                vm.dialogVisible = true
                vm.isShowSearchBox = false
              } else {
                vm.$message({
                  message: resp.data.message,
                  type: 'warning'
                })
              }
            })
          } else {
            GetStaticInfo({
              FaultType: vm.faultType,
              GXFD: vm.subsection,
              ServiceBeginDate: vm.date ? vm.getTime(vm.date[0]) : '',
              ServiceEndDate: vm.date ? vm.getTime(vm.date[1]) : ''
            }).then(resp => {
              if (resp.data.success) {
                vm.list = resp.data.rows
                vm.dialogVisible = true
                vm.isShowSearchBox = false
              } else {
                vm.$message({
                  message: resp.data.message,
                  type: 'warning'
                })
              }
            })
          }
        })
    },
    back () {
      this.dialogVisible = false
      this.isShowSearchBox = true
    },
    close () {
      this.$refs.space.closeToolBar()
      // window.mapBase.clearUI();
      this.$emit('close', '')
    }
  },
  components: {
    MIndicators,
    MSpace,
    MLine
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
    height: 460px;
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
        border: 1px solid #a9a9a9;
      }
      .determine {
        background-color: #4886ff;
        color: #fff;
        left: 480px;
      }
    }
  }
  .result {
    .main {
      .button {
        transform: translateX(200px);
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
        #line,
        #table {
          transform: translateX(200px);
          width: 600px;
          height: 330px;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 1px 1px 2px #adbfd3;
        }
        #table {
          margin-top: 20px;
          .header {
            height: 60px;
            background-color: #4886ff;
            border-radius: 6px 6px 0 0;
            font-size: 16px;
            color: #fff;
            .number,
            .type,
            .subsection,
            .time {
              float: left;
              text-align: center;
              height: 60px;
              line-height: 60px;
            }
            .number {
              width: 140px;
            }
            .type {
              width: 140px;
            }
            .subsection {
              width: 140px;
            }
            .time {
              width: 140px;
            }
          }
          ul {
            overflow-y: auto;
            height: 270px;
            li {
              list-style: none;
              height: 60px;
              font-size: 16px;
              .number,
              .type,
              .subsection,
              .time {
                float: left;
                text-align: center;
                height: 60px;
                line-height: 60px;
              }
              .number {
                width: 140px;
              }
              .type {
                width: 140px;
              }
              .subsection {
                width: 140px;
              }
              .time {
                width: 140px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
