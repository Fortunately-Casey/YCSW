<template>
    <div class="statistic-box" ref='searchbox'>
        <div class="search-header">
            <div class="chose-tab">
                <span class="condition active" >
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
        <div ref="content" class="content">
            <div class="condition">
                <div class="date">
                    <div class="left">日期:</div>
                    <div class="right">
                        <el-date-picker
                            class="announce-date"
                            v-model="date"
                            type="daterange"
                            range-separator="~"
                            start-placeholde="开始日期"
                            end-placeholde="结束日期"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="output-button" @click="outPut">导 出</div>
                <div class="statistic-button" @click="statistic">统 计</div>
            </div>
            <m-pillars v-if="isShowResult" :list="list"></m-pillars>
            <m-table v-if="isShowResult" :list="list" ></m-table>
        </div>
    </div>
</template>
<script>
import MPillars from './Pillars.vue'
import MTable from './Table.vue'
import {
  GetInspectStaticRecord,
  ExportInspectStaticRecord
} from '@/api/patrol.js'
export default {
  data () {
    return {
      isShowResult: false,
      isSlideUp: true,
      date: '',
      list: []
    }
  },
  methods: {
    close () {
      this.$emit('closeTab', '')
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
    statistic () {
      var vm = this
      GetInspectStaticRecord({
        StartInspectTime: vm.date ? vm.getTime(vm.date[0]) : '',
        EndInspectTime: vm.date ? vm.getTime(vm.date[1]) : ''
      }).then(resp => {
        if (resp.data.success && resp.data.rows) {
          vm.list = resp.data.rows
          vm.isShowResult = true
        } else {
          vm.isShowResult = false
          vm.$message({
            message: '未统计到数据！',
            type: 'warning'
          })
        }
      })
    },
    slideDown () {
      this.$refs.content.style = 'display:none'
      this.$refs.searchbox.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.searchbox.style = 'height:550px;bottom:15px'
      setTimeout(() => {
        this.$refs.content.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    outPut () {
      var vm = this
      ExportInspectStaticRecord().then(resp => {
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
    }
  },
  components: {
    MPillars,
    MTable
  }
}
</script>
<style lang="less" scoped>
.statistic-box {
  transition: all 0.5s;
  width: 900px;
  height: 550px;
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
      .result {
        float: right;
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
  .content {
    .condition {
      height: 60px;
      .date {
        padding-top: 20px;
        width: 50%;
        height: 40px;
        float: left;
        .left {
          width: 115px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .right {
          width: 300px;
          position: relative;
          float: left;
          //   border: 1px solid #c2c2c2;
          .announce-date {
            width: 300px;
          }
        }
      }
      .output-button,
      .statistic-button {
        float: right;
        width: 100px;
        height: 35px;
        border-radius: 6px;
        background-color: #4a86fd;
        text-align: center;
        line-height: 35px;
        color: #fff;
        margin-top: 22px;
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
