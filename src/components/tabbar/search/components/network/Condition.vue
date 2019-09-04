<template>
    <div class="condition">
        <div class="search-content">
            <div class="title">属 性 条 件</div>
            <div class="conditions">
                  <div class="material">
                    <div class="left">管材:</div>
                    <div class="right">
                        <div class="drop-down" ref="material">
                            <div class="dropdown-toggle" @click="showMaterial = !showMaterial">
                            {{materialOption.name}}
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showMaterial">
                                <li v-for="(option,index) in materialOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('material',option)">
                                        {{ option.name }}
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
                <div class="diameter">
                    <div class="left">管径:</div>
                      <div class="right">
                        <div class="drop-down" ref="diameter">
                            <div class="dropdown-toggle" @click="showDiameter = !showDiameter">
                            {{diameterOption.diameter}}mm
                            <span class="cart"></span>
                            </div>
                            <el-collapse-transition>
                            <ul class="dropdown-menu" v-show="showDiameter">
                                <li v-for="(option,index) in diameterOptions" :key="index">
                                    <a href="javascript:void(0)" @click="updateOption('diameter',option)">
                                        {{ option.diameter }}mm
                                    </a>
                                </li>
                            </ul>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
                <div class="length">
                    <div class="left">长度:</div>
                     <div class="scope">
                       <div class="input">
                         <input type="text" v-model="minLength">
                       </div>
                        m &nbsp;~&nbsp;
                       <div class="input">
                         <input type="text" v-model="maxLength">
                       </div>
                        m
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
import { materials, diameters } from "@/common/mapServer/config.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      materialOption: {
        name: "钢"
      },
      diameterOption: {
        diameter: "2400"
      },
      showMaterial: false,
      showDiameter: false,
      materialOptions: materials,
      diameterOptions: diameters,
      minLength: "",
      maxLength: "",
      showSubsection: false,
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
      subsectionOption: {
        name: "全部"
      }
    };
  },
  mounted() {
    this.selectedOption = this.selected;
    document.addEventListener("click", this.hidePandel, false);
  },
  methods: {
    ...mapActions({
      setParams: "setSearchParams"
    }),
    updateOption(type, option) {
      if (type === "material") {
        this.materialOption.name = option.name;
        this.showMaterial = false;
      }
      if (type === "diameter") {
        this.diameterOption.diameter = option.diameter;
        this.showDiameter = false;
      }
      if (type === "subsection") {
        this.subsectionOption.name = option.name;
        this.showSubsection = false;
      }
    },
    searchData() {
      this.setParams({
        materialOption: this.materialOption,
        diameterOption: this.diameterOption,
        minLength: this.minLength,
        maxLength: this.maxLength,
        subsectionOption: this.subsectionOption.name === '全部'?{ name:''}:this.subsectionOption
      });
    },
    hidePandel(e) {
      if (this.$refs.material) {
        if (!this.$refs.material.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showMaterial = false;
        }
      }
      if (this.$refs.diameter) {
        if (!this.$refs.diameter.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showDiameter = false;
        }
      }
      if (this.$refs.subsection) {
        if (!this.$refs.subsection.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showSubsection = false;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.condition {
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
      .subsection,
      .diameter,
      .length,
      .material {
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
        }
        .scope {
          width: 300px;
          float: left;
          padding-top: 5px;
          .input {
            border: 1px solid #C1C1C1;
            display: inline-block;
            input {
              width: 100px;
              height: 30px;
              padding-left: 3px;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>