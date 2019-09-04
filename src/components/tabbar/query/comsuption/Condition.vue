<template>
    <div class="content">
        <div class="search-content">
            <div class="title">属 性 条 件</div>
            <div class="conditions">
                <div class="name">
                    <div class="left">
                        单位名称:
                    </div>
                    <div class="right">
                        <input type="text" v-model="name">
                    </div>
                </div>
                <div class="date-range">
                    <div class="left">时间段:</div>
                    <div class="right">
                      <el-date-picker
                        class="date"
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
      name: ""
    };
  },
  methods: {
    getParams() {
      this.$emit("getParams", {
        CompanyName:this.name,
      });
    }
  },
  watch:{
    date() {
      this.$emit('dateChange', this.date)
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
      height: 80px;
      border-bottom: 1px solid #c3c3c3;
      .date-range,
      .name {
        padding-top: 20px;
        margin-left: 15px;
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
    }
  }
}
</style>