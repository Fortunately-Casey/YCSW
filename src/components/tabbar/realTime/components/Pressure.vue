<template>
    <div class="search-box" ref='searchbox'>
        <div class="search-header">
            <div class="chose-tab">
                <span class="condition" :class="chosedTab === 'condition' ?'active':''" >
                    条&nbsp;&nbsp;&nbsp;件
                </span>
            </div>
            <div class="icons">
                <div class="slide-up" :class="!isSlideUp ? 'active':''" @click="slideUp">
                    <i class="el-icon-arrow-up"></i>
                </div>
                <div class="slide-down" :class="isSlideUp ? 'active':''" @click="slideDown">
                    <i class="el-icon-arrow-down"></i>
                </div>
                <div class="close" @click="close">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </div>
        <div ref="content">
            <div class="condition-content">
                <m-space @rectangular="getRectangular" @polygon="getPolygon" @slideDown="slideDown" @slideUp="slideUp" ref="space"></m-space>
                <div class="footer">
                    <div class="cancel" @click="close">取 消</div>
                    <div class="determine" @click="search">显 示</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MSpace from '@/common/space/Space.vue'
import esriLoader from 'esri-loader'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      chosedTab: 'condition',
      isSlideUp: true,
      geometry: ''
    }
  },
  methods: {
    ...mapActions({
      setGeometry: 'setGeometry',
      setIndex: 'setRealTimeIndex',
      setParams: 'setEquimentType'
    }),
    slideDown () {
      this.$refs.content.style = 'display:none'
      this.$refs.searchbox.style = 'height:39px;bottom:15px'
      this.isSlideUp = false
    },
    slideUp () {
      this.$refs.searchbox.style = 'height:260px;bottom:15px'
      setTimeout(() => {
        this.$refs.content.style = 'display:block'
      }, 500)
      this.isSlideUp = true
    },
    getRectangular (value) {
      this.geometry = value
    },
    getPolygon (value) {
      this.geometry = value
    },
    search () {
      var vm = this
      esriLoader
        .loadModules([
          'static/arcpackage/arcgisUtil'
        ])
        .then(([ArcgisUtil]) => {
          if (vm.geometry === '') {
            this.setGeometry('')
          } else {
            vm.geometry = ArcgisUtil.polygonToWKT(vm.geometry)
            this.setGeometry(vm.geometry)
            vm.geometry = ''
          }
          window.mapBase.clearGraphic()
        })
    },
    close () {
      this.$refs.space.closeToolBar()
      // window.mapBase.clearUI();
      this.setIndex('')
      this.setParams('')
      this.setGeometry('')
    }
  },
  components: {
    MSpace
  }
}
</script>
<style lang="less" scoped>
.search-box {
  transition: all 0.5s;
  width: 885px;
  height: 260px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  box-shadow: 0 0 13px 2px #adbfd3;
  transform: translateX(-40%);
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
        width: 100px;
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
</style>
