<template>
  <div class="water">
    <div class="search-content">
      <div class="title">统 计 指 标</div>
      <div class="conditions">
        <!-- <el-radio :value="netWorkRadio" label="MATERIAL" @change="choseMaterial"><span>管 材</span></el-radio>
        <el-radio :value="netWorkRadio" label="D_TYPE" @change="choseType"><span>埋设类型</span></el-radio>-->
        <div class="subsection">
          <div class="left">管 线 分 段:</div>
          <div class="right">
            <div class="drop-down" ref="subsection">
              <div class="dropdown-toggle" @click="showSubsection = !showSubsection">
                {{subsectionOption.name}}
                <span class="cart"></span>
              </div>
              <el-collapse-transition>
                <ul class="dropdown-menu" v-show="showSubsection">
                  <li v-for="(option,index) in subsectionOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="updateOption('subsection',option)"
                    >{{ option.name }}</a>
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
  data () {
    return {
      showSubsection: false,
      subsectionOptions: [
        {
          name: '全部'
        },
        {
          name: '宝应至盐龙湖'
        },
        {
          name: '恒济至建湖'
        },
        {
          name: '盐龙湖至大丰'
        },
        {
          name: '盐龙湖至射阳'
        },
        {
          name: '射阳至明湖'
        }
      ],
      subsectionOption: {
        name: '全部'
      }
    }
  },
  mounted () {
    this.selectedOption = this.selected
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    updateOption (type, option) {
      if (type === 'subsection') {
        this.subsectionOption.name = option.name
        this.showSubsection = false
        this.$emit(
          'subsection',
          this.subsectionOption.name === '全部'
            ? ''
            : this.subsectionOption.name
        )
      }
    },
    hidePandel (e) {
      if (this.$refs.subsection) {
        if (!this.$refs.subsection.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showSubsection = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.water {
  position: absolute;
  left: 0;
  top: 0;
  color: #6f6f6f;
  z-index: 999;
  width: 100%;
  .search-content {
    .title {
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #c3c3c3;
      padding-left: 40px;
      color: #6f6f6f;
    }
    .conditions {
      padding-top: 25px;
      padding-left: 30px;
      height: 55px;
      border-bottom: 1px solid #c3c3c3;
      span {
        font-size: 16px;
        color: #6f6f6f;
      }
      .subsection {
        transform: translate(-8px, -10px);
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
        }
        .scope {
          width: 300px;
          float: left;
          padding-top: 5px;
          input {
            width: 80px;
            height: 30px;
            margin-left: 10px;
            padding-left: 3px;
          }
        }
      }
    }
  }
}
</style>
