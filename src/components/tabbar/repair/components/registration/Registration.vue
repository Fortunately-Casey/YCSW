<template>
    <div class="registration">
        <div class="header">
            维 修 登 记
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="water">
            <div class="search-content">
                <div class="conditions">
                    <div class="serial-number">
                        <div class="left">
                            设备编号:
                        </div>
                        <div class="right">
                            <input type="text" v-model="serialNumber">
                        </div>
                    </div>
                    <div class="type">
                        <div class="left">故障类型:</div>
                        <div class="right">
                            <div class="drop-down" ref="type">
                                <div class="dropdown-toggle" @click="showType = !showType">
                                {{typeOption.name}}
                                <span class="cart"></span>
                                </div>
                                <el-collapse-transition>
                                <ul class="dropdown-menu" v-show="showType">
                                    <li v-for="(option,index) in typeOptions" :key="index">
                                        <a href="javascript:void(0)" @click="updateOption('type',option)">
                                            {{ option.name }}
                                        </a>
                                    </li>
                                </ul>
                                </el-collapse-transition>
                            </div>
                        </div>
                    </div>
                    <div class="personal">
                        <div class="left">
                            维修人员:
                        </div>
                        <div class="right">
                            <input type="text" v-model="serviceman">
                        </div>
                    </div>
                    <div class="status">
                        <div class="left">维修状态:</div>
                        <div class="right">
                            <div class="drop-down" ref="status">
                                <div class="dropdown-toggle" @click="showStatus = !showStatus">
                                {{statusOption.name}}
                                <span class="cart"></span>
                                </div>
                                <el-collapse-transition>
                                <ul class="dropdown-menu" v-show="showStatus">
                                    <li v-for="(option,index) in statusOptions" :key="index">
                                        <a href="javascript:void(0)" @click="updateOption('status',option)">
                                            {{ option.name }}
                                        </a>
                                    </li>
                                </ul>
                                </el-collapse-transition>
                            </div>
                        </div>
                    </div>
                    <div class="start-date">
                        <div class="left">维修开始日期:</div>
                        <div class="right">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="选择日期"
                                class="date"
                            >

                            </el-date-picker>
                        </div>
                    </div>
                    <div class="end-date">
                        <div class="left">维修结束日期:</div>
                        <div class="right">
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="选择日期"
                                class="date"
                            >

                            </el-date-picker>
                        </div>
                    </div>
                    <div class="regis-personal">
                        <div class="left">
                            登记人员:
                        </div>
                        <div class="right">
                            <input type="text" disabled="disabled" v-model="extraData">
                        </div>
                    </div>
                    <div class="statis-date">
                        <div class="left">登记日期:</div>
                        <div class="right">
                            <input type="text" disabled="disabled" v-model="statisDate">
                        </div>
                    </div>
                    <div class="statis-explain">
                        <div class="left">维修说明:</div>
                        <div class="right">
                            <textarea name="" id="" cols="100" rows="5" v-model="serviceDes"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="cancel" @click="close">取 消</div>
            <div class="determine" @click="save">保 存</div>
        </div>
    </div>
</template>
<script>
import { Permissions } from '@/api/user.js'
import { InsertServieceInfo } from '@/api/repair.js'
export default {
  data () {
    return {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24),
      statisDate: '',
      serialNumber: '',
      serviceman: '',
      typeOption: {
        name: ''
      },
      statusOption: {
        name: ''
      },
      showType: false,
      showStatus: false,
      extraData: '',
      serviceDes: '',
      isClick: true,
      typeOptions: [
        {
          name: '给水管线'
        },
        {
          name: '阀门'
        },
        {
          name: '泵站'
        }
      ],
      statusOptions: [
        {
          name: '已维修'
        },
        {
          name: '维修中'
        },
        {
          name: '未维修'
        }
      ]
    }
  },
  created () {
    this.getUserName()
    this.statisDate = this.getTime(new Date())
  },
  mounted () {
    this.selectedOption = this.selected
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    getUserName () {
      var vm = this
      Permissions().then(resp => {
        this.extraData = resp.data.extraData
      })
    },
    updateOption (type, option) {
      if (type === 'type') {
        this.typeOption.name = option.name
        this.showType = false
      } else if (type === 'status') {
        this.statusOption.name = option.name
        this.showStatus = false
      }
    },
    format2Len (i) {
      return i < 10 ? '0' + i : i
    },
    getTime (CurrentTime) {
      var timeStr
      if (CurrentTime) {
        timeStr =
          CurrentTime.getFullYear() +
          '-' +
          this.format2Len(CurrentTime.getMonth() + 1) +
          '-' +
          this.format2Len(CurrentTime.getDate())
      }
      return timeStr
    },
    hidePandel (e) {
      if (this.$refs.type) {
        if (!this.$refs.type.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showType = false
        }
      }
      if (this.$refs.status) {
        if (!this.$refs.status.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showStatus = false
        }
      }
    },
    save () {
      var vm = this
      if (!vm.startDate || !vm.endDate) {
        vm.$message({
          message: '维修开始结束日期不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.isClick) {
        vm.isClick = false
        if (vm.serialNumber && vm.typeOption.name) {
          InsertServieceInfo({
            EquipmentNum: vm.serialNumber,
            FaultType: vm.typeOption.name,
            Serviceman: vm.serviceman,
            ServiceStatus: vm.statusOption.name,
            ServiceBeginDate: vm.getTime(vm.startDate),
            ServiceEndDate: vm.getTime(vm.endDate),
            RegisteredStaff: vm.extraData,
            RegisteredDate: vm.statisDate,
            ServiceDes: vm.serviceDes
          }).then(resp => {
            vm.isClick = true
            if (resp.data.success) {
              vm.$message({
                message: resp.data.rows,
                type: 'success'
              })
              vm.close()
            } else {
              vm.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
          })
        } else {
          vm.$message({
            message: '设备编号与故障类型不能为空！',
            type: 'warning'
          })
        }
      }
    },
    close () {
      this.$emit('close', '')
    }
  }
}
</script>
<style lang="less" scoped>
.registration {
  width: 880px;
  height: 480px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
  z-index: 999;
  box-shadow: 0 0 13px 2px #adbfd3;
  border-radius: 6px;
  .header {
    height: 38px;
    background-color: #4886ff;
    border-radius: 6px 6px 0 0;
    color: #fff;
    line-height: 38px;
    font-size: 16px;
    padding-left: 40px;
    position: relative;
    i {
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .water {
    color: #6f6f6f;
    .search-content {
      .conditions {
        height: 390px;
        .serial-number,
        .type,
        .status,
        .start-date,
        .end-date,
        .personal,
        .statis-date,
        .regis-personal,
        .statis-explain {
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
            border: 1px solid #c2c2c2;
            .date {
              width: 300px;
            }
            input {
              width: 280px;
              height: 40px;
              border: none;
              padding-left: 20px;
            }
            .drop-down {
              float: left;
              .dropdown-toggle {
                text-align: left;
                cursor: pointer;
                font-family: PingFangSC-Semibold;
                list-style-type: none;
                color: #5a5a5a;
                width: 280px;
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                text-transform: none;
                padding-left: 20px;
                font-weight: 300;
                border-radius: 0;
                font-size: 14px;
                .cart {
                  width: 0;
                  position: relative;
                  top: 18px;
                  left: -20px;
                  height: 0;
                  margin-left: 2px;
                  vertical-align: middle;
                  border-top: 4px dashed;
                  border-top: 4px solid gray;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                  float: right;
                }
              }
              .dropdown-menu {
                position: absolute;
                top: 38px;
                left: 0;
                width: 300px;
                z-index: 1000;
                padding: 5px 0;
                margin: 2px 0 0;
                list-style: none;
                font-size: 14px;
                background-color: #fff;
                opacity: 0.9;
                border: 1px solid #ccc;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
                li {
                  text-align: center;
                  a {
                    padding: 10px 30px;
                    display: block;
                    clear: both;
                    font-weight: normal;
                    line-height: 1;
                    color: #727272;
                    white-space: nowrap;
                    text-decoration: none;
                    text-align: left;
                  }
                  a:hover {
                    color: #fff;
                    text-decoration: none;
                  }
                  overflow: hidden;
                  width: 100%;
                  position: relative;
                  margin: 0;
                }
                li:hover {
                  background-color: #4785fe;
                }
              }
            }
          }
        }
        .start-date,
        .end-date {
          .right {
            border: none;
          }
        }
        .statis-explain {
          .right {
            border: none;
            textarea {
              resize: none;
              padding: 5px;
            }
          }
        }
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
