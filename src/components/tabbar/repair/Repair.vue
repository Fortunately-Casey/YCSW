<template>
    <div class="query">
        <div class="top">
            <div class="tab" @click="choseTab(0)">
              <div class="tabber">
                <span class="registration"></span>
                维修登记
              </div>
              <div :class="chosedIndex === 0?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(1)">
              <div class="tabber">
                <span class="search"></span>
                维修查询
              </div>
              <div :class="chosedIndex === 1?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(2)">
              <div class="tabber">
                <span class="statistical"></span>
                维修统计
              </div>
              <div :class="chosedIndex === 2?'line':''"></div>
            </div>
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span>
        </div> 
        <m-registration v-if="chosedIndex === 0? true : false" @close="close"></m-registration>
        <m-search v-if="chosedIndex === 1? true : false" @close="close"></m-search>
        <m-statistical v-if="chosedIndex === 2? true : false" @close="close"></m-statistical>
        <el-dialog
          :visible.sync="isShowEditRepair"
          width="48%"
          :show-close="false"
          custom-class="bgc"
        >
            <div class="search-content">
                <div class="header">
                  维 修 编 辑
                  <i class="el-icon-close" @click="closeEdit"></i>
                </div>
                <div class="conditions">
                    <div class="serial-number">
                      <div class="left">
                          设备编号:
                      </div>
                      <div class="right">
                          <input type="text" v-model="serialNumber" disabled>
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
                                @change="changeStart"
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
                                @change="changeEnd"
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
                            <textarea name="" id="" cols="93" rows="5" v-model="serviceDes"></textarea>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="cancel" @click="close">取 消</div>
                    <div class="determine" @click="saveEdit">保 存</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
          :visible.sync="isShowDeleteRepair"
          width="40%"
          :show-close="false"
          custom-class="bgc"
        >
            <div class="userDelete">
              <div class="header">
                记 录 删 除
                <i class="el-icon-close" @click="isShowDeleteRepair = false"></i>
              </div>
              <div class="content">
                  <p>确定要删除该登记信息吗？</p>
              </div>
              <div class="footer">
                  <div class="cancel" @click="isShowDeleteRepair = false">取 消</div>
                  <div class="determine" @click="deleteRepair">确 定</div>
              </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import MRegistration from "./components/registration/Registration.vue";
import MSearch from "./components/search/Search.vue";
import MStatistical from "./components/statistical/Statistical.vue";
import { getTime } from "@/common/utils/tool.js";
import { clearAllGraphic } from "@/common/mapServer/config.js";
import { mapGetters, mapActions } from "vuex";
import { UpdateServieceInfo, DeleteServieceInfo } from "@/api/repair.js";
import { EventBus } from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      chosedIndex: "",
      serialNumber: "",
      isShowEditRepair: false,
      isShowDeleteRepair: false,
      showType: false,
      showStatus: false,
      startDate: "",
      endDate: "",
      extraData: "",
      statisDate: "",
      serviceDes: "",
      isClick: true,
      deleteId: "",
      id: "",
      typeOption: {
        name: ""
      },
      statusOption: {
        name: ""
      },
      typeOptions: [
        {
          name: "给水管线"
        },
        {
          name: "阀门"
        },
        {
          name: "泵站"
        }
      ],
      statusOptions: [
        {
          name: "已维修"
        },
        {
          name: "维修中"
        },
        {
          name: "未维修"
        }
      ],
      serviceman: ""
    };
  },
  created() {
    this.initTime();
  },
  mounted() {
    var vm = this;
    // 编辑
    EventBus.$on("showEdit", item => {
      vm.isShowEditRepair = true;
      var params = JSON.parse(JSON.stringify(item));
      vm.serialNumber = params.EXP_NO;
      vm.typeOption.name = params.FaultType;
      vm.serviceman = params.Serviceman;
      vm.statusOption.name = params.ServiceStatus;
      vm.startDate = params.StrServiceBeginDate;
      vm.endDate = params.StrServiceEndDate;
      vm.extraData = params.RegisteredStaff;
      vm.statisDate = params.StrRegisteredDate;
      vm.serviceDes = params.ServiceDes;
      vm.id = params.ID;
    });
    // 删除
    EventBus.$on("deleteRepair", item => {
      vm.isShowDeleteRepair = true;
      var params = JSON.parse(JSON.stringify(item));
      vm.deleteId = params.ID;
    });
  },
  computed: {},
  methods: {
    ...mapActions({
      closeEdit: "setIsShowEditRepair"
    }),
    choseTab(index) {
      this.chosedIndex = index;
      clearAllGraphic();
    },
    closeEdit() {
      this.isShowEditRepair = false;
    },
    close() {
      this.chosedIndex = "";
    },
    initTime() {
      this.time = getTime();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    },
    format2Len(i) {
      return i < 10 ? "0" + i : i;
    },
    getTime(CurrentTime) {
      var timeStr;
      if (CurrentTime) {
        timeStr =
          CurrentTime.getFullYear() +
          "-" +
          this.format2Len(CurrentTime.getMonth() + 1) +
          "-" +
          this.format2Len(CurrentTime.getDate());
      }
      return timeStr;
    },
    deleteRepair() {
      var vm = this;
      DeleteServieceInfo({
        ID: vm.deleteId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: "success"
          });
          vm.isShowDeleteRepair = false;
          EventBus.$emit("getNewList");
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    },
    saveEdit() {
      var vm = this;
      if (!vm.startDate || !vm.endDate) {
        vm.$message({
          message: "维修开始结束日期不可为空",
          type: "warning"
        });
        return;
      }
      if (vm.isClick) {
        vm.isClick = false;
        if (vm.serialNumber && vm.typeOption.name) {
          UpdateServieceInfo({
            ID: vm.id,
            EquipmentNum: vm.serialNumber,
            FaultType: vm.typeOption.name,
            Serviceman: vm.serviceman,
            ServiceStatus: vm.statusOption.name,
            ServiceBeginDate: vm.startDate,
            ServiceEndDate: vm.endDate,
            RegisteredStaff: vm.extraData,
            RegisteredDate: vm.statisDate,
            ServiceDes: vm.serviceDes
          }).then(resp => {
            vm.isClick = true;
            if (resp.data.success) {
              vm.$message({
                message: resp.data.rows,
                type: "success"
              });
              vm.isShowEditRepair = false;
              EventBus.$emit("getNewList");
            } else {
              vm.$message({
                message: resp.data.message,
                type: "warning"
              });
            }
          });
        } else {
          vm.$message({
            message: "设备编号与故障类型不能为空！",
            type: "warning"
          });
        }
      }
    },
    changeStart() {
      var vm = this;
      vm.startDate = vm.getTime(vm.startDate);
    },
    changeEnd() {
      var vm = this;
      vm.endDate = vm.getTime(vm.endDate);
    },
    updateOption(type, option) {
      if (type === "type") {
        this.typeOption.name = option.name;
        this.showType = false;
      } else if (type === "status") {
        this.statusOption.name = option.name;
        this.showStatus = false;
      }
    }
  },
  components: {
    MRegistration,
    MSearch,
    MStatistical
  }
};
</script>
<style lang="less" scoped>
.query {
  width: 100%;
  height: 5%;
  background-color: #fff;
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
    .tab {
      height: 100%;
      line-height: 40px;
      margin-right: 20px;
      float: left;
      cursor: pointer;
      padding-left: 22px;
      font-size: 16px;
      color: #fff;
      position: relative;
      width: 100px;
      .tabber {
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 25px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .registration {
          background: url("../../../assets/icon/repair-reg.png") no-repeat;
        }
        .search {
          background: url("../../../assets/icon/repair-search.png") no-repeat;
        }
        .statistical {
          background: url("../../../assets/icon/repair-stat.png") no-repeat;
        }
      }
      .line {
        width: 100%;
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 13px;
        bottom: 0;
      }
    }
    .time {
      width: 200px;
      height: 100%;
      float: right;
      color: #fff;
      line-height: 30px;
      font-size: 14px;
      font-family: "微软雅黑";
      position: relative;
      .timer {
        width: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .search-content,
  .userDelete {
    border-radius: 8px 8px 8px 8px;
    width: 820px;
    height: 500px;
    background-color: #fff;
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
        width: 400px;
        height: 40px;
        float: left;
        .left {
          width: 105px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .right {
          width: 280px;
          position: relative;
          float: left;
          border: 1px solid #c2c2c2;
          .date {
            width: 280px;
          }
          input {
            width: 260px;
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
              width: 260px;
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
              width: 280px;
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
  .userDelete {
    width: 600px;
    height: 220px;
    background-color: #fff;
    .content {
      p {
        font-size: 16px;
        height: 80px;
        line-height: 80px;
        padding-left: 80px;
      }
    }
    .footer {
      width: 300px;
      margin-top: 20px;
      .cancel {
        left: 140px;
      }
      .determine {
        left: 340px;
      }
    }
  }
}
</style>