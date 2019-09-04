<template>
    <div class="content">
        <div class="search-content">
            <div class="title">属 性 条 件</div>
            <div class="conditions">
               <div class="name">
                    <div class="left">
                        名称:
                    </div>
                    <div class="right">
                        <input type="text" v-model="name">
                    </div>
                </div>
                <div class="scale">
                    <div class="left">生产规模:</div>
                    <div class="right">
                        <div class="drop-down" ref="scale">
                            <div class="dropdown-toggle" @click="showScale = !showScale">
                            {{scaleOption.name}}
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showScale">
                                <li v-for="(option,index) in scaleOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('scale',option)">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
                <div class="space">
                    <div class="left">
                        库容:
                    </div>
                     <div class="scope">
                       <div class="input">
                         <input type="text" v-model="minSpace">
                       </div>
                        立方千米 &nbsp;~&nbsp;
                       <div class="input">
                         <input type="text" v-model="maxSpace">
                       </div>
                        立方千米
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
      scaleOption: {
        name: "全部"
      },
      name:'',
      showScale: false,
      minSpace:'',
      maxSpace:'',
      scaleOptions: [
        {
          name: "全部"
        },
        {
          name: "小型"
        },
        {
          name: "中型"
        },
        {
          name: "大型"
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
      if (type === "scale") {
        this.scaleOption.name = option.name;
        this.showScale = false;
      }
    },
    hidePandel(e) {
      if (this.$refs.scale) {
        if (!this.$refs.scale.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showScale = false;
        }
      }
    },
    getParams() {
      this.$emit('getParams',{
         CompanyName:this.name,
         Production:this.scaleOption.name === '全部'?'':this.scaleOption.name,
         Capacity:this.maxSpace,
         MinCapacity:this.minSpace
      })
    }
  }
};
</script>
<style lang="less" scoped>
.content {
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
      height: 140px;
      border-bottom: 1px solid #c3c3c3;
      .scale,
      .name,
      .space {
        padding-top: 20px;
        margin-left: 15px;
        height: 40px;
        line-height: 40px;
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
          input {
            width: 280px;
            height: 40px;
            border: 1px solid #c3c3c3;
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
        .scope {
          width: 400px;
          float: left;
          padding-top: 5px;
          .input {
            border: none;
            display: inline-block;
            input {
              width: 100px;
              height: 35px;
              border: 1px solid #c1c1c1;
              padding-left: 3px;
            }
          }
        }
      }
      .scale {
        .right {
          border: 1px solid #c3c3c3;
        }
      }
    }
  }
}
</style>