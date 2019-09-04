<template>
    <div class="condition">
        <div class="fault-content">
            <div class="title">属 性 条 件</div>
            <div class="conditions">
                <div class="number">
                    <div class="left">设备编号:</div>
                    <div class="right">
                        <input type="text" v-model="number">
                    </div>
                </div>
                <!-- <div class="address">
                    <div class="left">设备地址:</div>
                    <div class="right">
                        <input type="text" v-model="address">
                    </div>
                </div> -->
                <div class="fault-type">
                    <div class="left">故障类型:</div>
                    <div class="right">
                        <div class="drop-down" ref="faultType">
                            <div class="dropdown-toggle" @click="showFaultType = !showFaultType">
                            {{ faultTypeOption.name }}
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showFaultType">
                                <li v-for="(option,index) in faultTypeOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('faultType',option)">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
                <div class="faultLevel">
                    <div class="left">故障等级:</div>
                    <div class="right">
                        <div class="drop-down" ref="faultLevel">
                            <div class="dropdown-toggle" @click="showFaultLevel = !showFaultLevel">
                            {{ faultLevelOption.name }}
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showFaultLevel">
                                <li v-for="(option,index) in faultLevelOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('faultLevel',option)">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
                <div class="status">
                    <div class="left">解决状态:</div>
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
                <div class="date">
                    <div class="left">巡查日期:</div>
                    <div class="right el">
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      date: "",
      number: "",
      address: "",
      showFaultType: false,
      faultTypeOption: {
        name: "全部",
        id: ""
      },
      faultTypeOptions: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "阀门",
          id: 1
        },
        {
          name: "管网设备",
          id: 2
        },
        {
          name: "节点",
          id: 3
        },
        {
          name: "给水管线",
          id: 4
        }
      ],
      showFaultLevel: false,
      faultLevelOption: {
        name: "全部",
        id: ""
      },
      faultLevelOptions: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "紧急",
          id: 3
        },
        {
          name: "中级",
          id: 2
        },
        {
          name: "一般",
          id: 1
        }
      ],
      showStatus: false,
      statusOption: {
        name: "全部",
        id: ""
      },
      statusOptions: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "已解决",
          id: 1
        },
        {
          name: "未解决",
          id: 0
        }
      ]
    };
  },
  mounted() {
    this.selectedOption = this.selected;
    document.addEventListener("click", this.hidePandel, false);
  },
  methods: {
    updateOption(type, option) {
      if (type === "faultType") {
        this.faultTypeOption.name = option.name;
        this.faultTypeOption.id = option.id;
        this.showFaultType = false;
      }
      if (type === "faultLevel") {
        this.faultLevelOption.name = option.name;
        this.faultLevelOption.id = option.id;
        this.showFaultLevel = false;
      }
      if (type === "status") {
        this.statusOption.name = option.name;
        this.statusOption.id = option.id;
        this.showStatus = false;
      }
    },
    format2Len(i) {
      return i < 10 ? "0" + i : i;
    },
    getTime(CurrentTime) {
      var timeStr =
        CurrentTime.getFullYear() +
        "-" +
        this.format2Len(CurrentTime.getMonth() + 1) +
        "-" +
        this.format2Len(CurrentTime.getDate());
      return timeStr;
    },
    hidePandel(e) {
      if (this.$refs.faultType) {
        if (!this.$refs.faultType.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showFaultType = false;
        }
      }
      if (this.$refs.faultLevel) {
        if (!this.$refs.faultLevel.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showFaultLevel = false;
        }
      }
      if (this.$refs.status) {
        if (!this.$refs.status.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showStatus = false;
        }
      }
    },
    getParams() {
      var vm = this;
      return {
        DeviceId: vm.number,
        Type: vm.faultTypeOption.id,
        Level: vm.faultLevelOption.id,
        IsSettle: vm.statusOption.id,
        StartInspectTime: vm.date?vm.getTime(vm.date[0]):'',
        EndInspectTime: vm.date?vm.getTime(vm.date[1]):''
      };
    }
  }
};
</script>
<style lang="less" scoped>
.condition {
  color: #6f6f6f;
  .fault-content {
    .title {
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #c3c3c3;
      padding-left: 40px;
      color: #6f6f6f;
    }
    .conditions {
      height: 240px;
      border-bottom: 1px solid #c3c3c3;
      .number,
      .address,
      .fault-type,
      .faultLevel,
      .status,
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
          border: 1px solid #c2c2c2;
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
          .announce-date {
            width: 300px;
          }
          input {
            width: 290px;
            height: 40px;
            border: none;
            padding-left: 10px;
          }
        }
        .el {
          border: none;
        }
      }
    }
  }
}
</style>