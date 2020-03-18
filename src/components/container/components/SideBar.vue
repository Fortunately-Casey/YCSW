<template>
    <div class="aside">
        <div class="function">
            <router-link to="/home/search" v-if="hasPermissions('管网查询')">
                <div class="icon" title="管网查询" @click="clearAll">
                    <div class="line" :class="router === 'search'?'active':''"></div>
                    <div class="icon-search"></div>
                </div>
            </router-link>
            <router-link to="/home/statistical" v-if="hasPermissions('管网统计')">
                <div class="icon" title="管网统计" @click="clearAll">
                    <div class="line" :class="router === 'statistical'?'active':''"></div>
                    <div class="icon-statistical"></div>
                </div>
            </router-link>
            <router-link to="/home/repair" v-if="hasPermissions('维修管理')">
                <div class="icon" title="维修管理" @click="clearAll">
                    <div class="line" :class="router === 'repair'?'active':''"></div>
                    <div class="icon-repair"></div>
                </div>
            </router-link>
            <!-- <router-link to="/home/realtime" v-if="hasPermissions('实时数据')" >
                <div class="icon" @click="clearEquimentType" title="实时数据">
                    <div class="line" :class="router === 'realtime'?'active':''"></div>
                    <div class="icon-realtime"></div>
                </div>
            </router-link> -->
            <router-link to="/home/query" v-if="hasPermissions('用户管理')">
                <div class="icon" title="受水用户管理" @click="clearAll">
                    <div class="line" :class="router === 'query'?'active':''"></div>
                    <div class="icon-query"></div>
                </div>
            </router-link>
            <router-link to="/home/analysis" v-if="hasPermissions('管网分析')" >
                <div class="icon" title="管网分析" @click="clearAll">
                    <div class="line" :class="router === 'analysis'?'active':''"></div>
                    <div class="icon-analysis"></div>
                </div>
            </router-link>
            <router-link to="/home/library" v-if="hasPermissions('档案管理')">
                <div class="icon" title="档案管理" @click="clearAll">
                    <div class="line" :class="router === 'library'?'active':''"></div>
                    <div class="icon-library"></div>
                </div>
            </router-link>
            <router-link to="/home/patrol">
                <div class="icon" title="巡查管理" @click="clearAll">
                    <div class="line" :class="router === 'patrol'?'active':''"></div>
                    <div class="icon-patrol"></div>
                </div>
            </router-link>
            <div class="line"></div>
            <router-link to="/home/setting" v-if="hasPermissions('系统管理')">
                <div class="icon setting" title="系统管理" @click="clearAll">
                    <div class="line" :class="router === 'setting'?'active':''"></div>
                    <i class="el-icon-setting"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import { Permissions } from '@/api/user.js'
import { mapActions } from 'vuex'
import { clearAllGraphic } from '@/common/mapServer/config.js'
import { EventBus } from '@/common/eventBus/eventBus.js'
export default {
  data () {
    return {
      chosedIndex: '',
      permissions: []
    }
  },
  created () {
    this.getPermission()
  },
  methods: {
    ...mapActions({
      clear: 'setEquimentType',
      setIndex: 'setRealTimeIndex',
      setisShowConnect: 'setIsShowConnect',
      setisShowValve: 'setIsShowValve',
      setisShowClickDetail: 'setIsShowClickDetail',
      setisShowQueryDetail: 'setIsShowQueryDetail',
      setisShowComsuption: 'setIsShowComsuption',
      setisShowRealTimeDetail: 'setIsShowRealTimeDetail',
      setisShowRepairDetail: 'setIsShowRepairDetail',
      setisShowDetail: 'setIsShowDetail',
      setisShowEquipment: 'setIsShowEquipment',
      setisOpenTimer: 'setIsOpenTimer',
      setdisableClick: 'setDisableClick',
      showFaultLevel: 'setIsShowFaultLevel'
    }),
    getPermission () {
      var vm = this
      Permissions().then(resp => {
        if (resp.data.success) {
          this.permissions = resp.data.rows
        }
      })
    },
    hasPermissions (name) {
      return this.permissions.some((v, i) => {
        return v.MenuName === name
      })
    },
    clearAll () {
      EventBus.$emit('changeChecked', [1, 62])
      clearAllGraphic()
      EventBus.$emit('clearDraw')
      this.setisOpenTimer(false)// 关闭计时器
      this.setisShowConnect(false)
      this.setisShowValve(false)
      this.setisShowClickDetail(false)
      this.setisShowQueryDetail(false)
      this.setisShowComsuption(false)
      this.setisShowRealTimeDetail(false)
      this.setisShowRepairDetail(false)
      this.setisShowDetail(false)
      this.setisShowEquipment(false)
      this.showFaultLevel(false)
      window.mapBase.removeLayer('GZPoints')
    },
    clearEquimentType () {
      EventBus.$emit('changeChecked', [1, 62])
      clearAllGraphic()
      EventBus.$emit('clearDraw')
      this.setisOpenTimer(true)// 开启计时器
      this.clear('')
      this.setIndex('')
      this.setisShowConnect(false)
      this.setisShowValve(false)
      this.setisShowClickDetail(false)
      this.setisShowQueryDetail(false)
      this.setisShowComsuption(false)
      this.setisShowRealTimeDetail(false)
      this.setisShowRepairDetail(false)
      this.setisShowDetail(false)
      this.setisShowEquipment(false)
      this.showFaultLevel(false)
      window.mapBase.removeLayer('GZPoints')
    }
  },
  computed: {
    router () {
      return this.$route.name
    }
  }
}
</script>
<style lang="less" scoped>
.aside {
  float: left;
  width: 100px;
  height: 100%;
  background-color: #373d49;
  overflow: hidden;
  position: relative;
  .function {
    margin: 0 auto;
    margin-top: 45px;
    .icon {
      cursor: pointer;
      margin-top: 30px;
      height: 40px;
      line-height: 45px;
      text-align: center;
      position: relative;
      .icon-search {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/search.png") no-repeat;
      }
      .icon-statistical {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/stats.png") no-repeat;
      }
      .icon-repair {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/repair.png") no-repeat;
      }
      .icon-realtime {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/real-time.png") no-repeat;
      }
      .icon-query {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/user-lookup.png") no-repeat;
      }
      .icon-accident {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/warning.png") no-repeat;
      }
      .icon-analysis {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/analysis.png") no-repeat;
      }
      .icon-library {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/archive.png") no-repeat;
      }
      .icon-patrol {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/patrol.png") no-repeat;
        background-size: 20px 20px;
      }
      .icon-divison {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("../../../assets/icon/maps.png") no-repeat;

      }
      .line {
        width: 4px;
        height: 1px;
        background-color: #373d49;
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(40%);
      }
      .line.active {
        height: 45px;
        background-color: #4886ff;
      }
      i {
        color: #eeeeef;
        font-size: 22px;
      }
    }
    .icon:hover {
      .line {
        transition: all 0.5s;
        width: 4px;
        height: 45px;
        background-color: #4886ff;
      }
    }
    .setting {
      margin-top: 70px;
    }
    .line {
      width: 35px;
      height: 1px;
      margin: 0 auto;
      margin-top: 60px;
      background-color: #fff;
    }
  }
}
</style>
