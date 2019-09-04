<template>
    <div class="water">
        <div class="search-content">
            <div class="title">统 计 指 标</div>
            <div class="conditions">
                <div class="date">
                  <div class="left">维修日期:</div>
                  <div class="right el">
                    <el-date-picker
                      class="regis-date"
                      v-model="date"
                      type="daterange"
                      range-separator="~"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期"
                    >
                    </el-date-picker>
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
                <div class="subsection">
                    <div class="left">管线分段:</div>
                    <div class="right">
                        <div class="drop-down" ref="subsection">
                            <div class="dropdown-toggle" @click="showSubsection = !showSubsection">
                            {{subsectionOption.name}}
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showSubsection">
                                <li v-for="(option,index) in subsectionOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('subsection',option)">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
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
      radio: "1",
      date: "",
      typeOption: {
        name: "全部"
      },
      showType: false,
      showSubsection: false,
      subsectionOption: {
        name: "全部"
      },
      equipmentNumber: "",
      subsectionOptions: [
        {
          name: "全部"
        },
        {
          name: "宝应至盐龙湖"
        },
        {
          name: "恒济至建湖"
        },
        {
          name: "盐龙湖至大丰"
        },
        {
          name: "盐龙湖至射阳"
        },
        {
          name: "射阳至明湖"
        }
      ],
      typeOptions: [
        {
          name: "全部"
        },
        {
          name: "给水管线"
        },
        {
          name: "阀门"
        },
        {
          name: "泵站"
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
      if (type === "type") {
        this.typeOption.name = option.name;
        this.showType = false;
        this.$emit("type", option.name);
      } else if (type === "subsection") {
        this.subsectionOption.name = option.name;
        this.showSubsection = false;
        this.$emit("subsection", option.name);
      }
    },
    hidePandel(e) {
      if (this.$refs.subsection) {
        if (!this.$refs.subsection.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showSubsection = false;
        }
      }
      if (this.$refs.type) {
        if (!this.$refs.type.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showType = false;
        }
      }
    }
  },
  watch: {
    date() {
      this.$emit("dateChange", this.date);
    }
  }
};
</script>
<style lang="less" scoped>
.water {
  color: #6f6f6f;
  .search-content {
    .title {
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #c3c3c3;
      padding-left: 40px;
      color: #6f6f6f;
    }
    .conditions {
      height: 150px;
      border-bottom: 1px solid #c3c3c3;
      .type,
      .date,
      .subsection,
      .equipment-number {
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
          .regis-date {
            width: 300px;
            border: 1px solid #c2c2c2;
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
        .el {
          border: none;
        }
      }
    }
  }
}
</style>