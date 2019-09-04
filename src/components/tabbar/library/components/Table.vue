<template>
    <div class="content">
        <div class="header">
            <div class="project-name">
                <div class="left">
                    工程名称:
                </div>
                <div class="right">
                    <input type="text" v-model="projectname">
                </div>
            </div>
            <div class="library-name">
                <div class="left">图件库名称:</div>
                <div class="right">
                    <input type="text" v-model="TKName">
                </div>
            </div>
            <div class="type-name">
                <div class="left">图件库类型:</div>
                <div class="right">
                     <div class="drop-down" ref="typeName">
                        <div class="dropdown-toggle" @click="showType = !showType">
                        {{typeOption.TKType}}
                        <span class="cart"></span>
                        </div>
                        <ul class="dropdown-menu" v-show="showType">
                            <li v-for="(option,index) in typeOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('type',option)">
                                    {{ option.TKType }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="document-name">
                <div class="left">资料名称:</div>
                <div class="right">
                    <input type="text" v-model="documentName">
                </div>
            </div>
            <div class="search-button" @click="onSearch">
                查&nbsp;&nbsp;询
            </div>
            <div class="add-button" @click="addLibrary">
                新&nbsp;&nbsp;增
            </div>
        </div>
        <div class="table">
            <div class="thead">
                <div class="index">序号</div>
                <div class="project-name">工程名称</div>
                <div class="library-name">图件库名称</div>
                <div class="type">图件库类型</div>
                <!-- <div class="document-name">资料名称</div> -->
                <div class="option">操作</div>
            </div>
            <m-loading v-show="list.length === 0?true:false"></m-loading>
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" :class="index%2==0?'':'gray'">
                    <div class="index">{{index + 1}}</div>
                    <div class="project-name" :title="item.ProjectName">{{item.ProjectName}}</div>
                    <div class="library-name" :title="item.TKName">{{item.TKName}}</div>
                    <div class="type" :title="item.TKType">{{item.TKType}}</div>
                    <!-- <div class="document-name" :title="item.DocumentName">{{item.DocumentName}}</div> -->
                    <div class="option">
                        <span class="detail" @click="getDetail(item)">查看详情</span>
                        <span class="editor" @click="editer(item)">编 辑</span>
                        <span class="delete" @click="deleteLibrary(item)">删 除</span>
                        <!-- <a :href="'/api'+item.DocumentStoreName" class="download" download="">下载</a> -->
                        <span class="download" @click="download(item)">下载</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="paging">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="12"
                :total="listLength"
                @current-change="changePage"
                center
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { GetDocunmentTypeInfo, GetDocumentManageInfo } from "@/api/library.js";
import MLoading from "@/common/loading/Loading.vue";
export default {
  data() {
    return {
      projectname: "",
      TKName: "",
      showRealName: false,
      showRoleName: false,
      documentName: "",
      typeOption: {
        TKType: "全部"
      },
      showType: false,
      typeOptions: [],
      list: [],
      isShowAddLibrary: true,
      page: 1,
      searchPage: 1,
      isSearch: false,
      listLength: 0
    };
  },
  created() {
    this.getDocunmentTypeInfo();
    this.getDocumentManageInfo();
  },
  mounted() {
    this.selectedOption = this.selected;
    document.addEventListener("click", this.hidePandel, false);
  },
  methods: {
    updateOption(type, option) {
      if ((type === "type", option)) {
        this.typeOption.TKType = option.TKType;
        this.showType = false;
      }
    },
    addLibrary() {
      this.$emit("addLibrary", true);
    },
    // 详情
    getDetail(item) {
      this.$emit("showDetail", { showDetail: true, item: item });
    },
    // 编辑
    editer(item) {
      this.$emit("showEditer", {
        showEditer: true,
        item: JSON.parse(JSON.stringify(item)),
        isSearch: this.isSearch
      });
    },
    // 删除
    deleteLibrary(item) {
      this.$emit("showDelete", {
        showDelete: true,
        item: item,
        isSearch: this.isSearch
      });
    },
    changePage(page) {
      this.page = page;
      if (this.isSearch) {
        this.search();
      } else {
        this.getDocumentManageInfo();
      }
    },
    download(item) {
      this.$emit('showDownLoad',item);
    },
    hidePandel(e) {
      if (this.$refs.typeName) {
        if (!this.$refs.typeName.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showType = false;
        }
      }
    },
    onSearch() {
      var vm = this;
      vm.page = 1
      vm.isSearch = true;
      GetDocumentManageInfo({
        Page: vm.page,
        Rows: 12,
        ProjectName: vm.projectname,
        TKName: vm.TKName,
        TKType: vm.typeOption.TKType === "全部" ? "" : vm.typeOption.TKType,
        DocumentName: vm.documentName
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows;
          vm.listLength = resp.data.total;
        }
      });
    },
    // 查询
    search() {
      var vm = this;
      vm.isSearch = true;
      GetDocumentManageInfo({
        Page: vm.page === 1 ? 1 : vm.page,
        Rows: 12,
        ProjectName: vm.projectname,
        TKName: vm.TKName,
        TKType: vm.typeOption.TKType === "全部" ? "" : vm.typeOption.TKType,
        DocumentName: vm.documentName
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows;
          vm.listLength = resp.data.total;
        }
      })
    },
    getDocunmentTypeInfo() {
      var vm = this;
      GetDocunmentTypeInfo({}).then(resp => {
        if (resp.data.success) {
          vm.typeOptions = resp.data.rows;
          vm.typeOptions.unshift({ TKType : '全部'})
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    },
    getDocumentManageInfo() {
      var vm = this;
      GetDocumentManageInfo({
        Page: vm.page === 1 ? 1 : vm.page,
        Rows: 12
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows;
          vm.listLength = resp.data.total;
        }
      });
    }
  },
  components: {
    MLoading
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 98%;
  background: #fff;
  position: absolute;
  box-shadow: 0px 0px 3px 1px #adbfd3;
  left: 15px;
  top: 6%;
  z-index: 999;
  height: 92%;
  .header {
    height: 80px;
    position: relative;
    .project-name,
    .library-name,
    .type-name,
    .document-name {
      padding-top: 20px;
      // width: 300px;
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
        width: 170px;
        position: relative;
        float: left;
        border: 1px solid #c2c2c2;
        border-radius: 6px;
        input {
          width: 150px;
          height: 41px;
          border: none;
          padding-left: 20px;
          border-radius: 6px;
        }
        .drop-down {
          float: left;
          .dropdown-toggle {
            text-align: left;
            cursor: pointer;
            font-family: PingFangSC-Semibold;
            list-style-type: none;
            color: #5a5a5a;
            width: 170px;
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
              left: -30px;
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
            width: 170px;
            z-index: 1000;
            padding: 5px 0;
            margin: 2px 0 0;
            list-style: none;
            font-size: 14px;
            background-color: #fff;
            opacity: 0.9;
            border: 1px solid #ccc;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
            // height: 300px;
            overflow-y: auto;
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
    .search-button {
      float: left;
      width: 100px;
      height: 40px;
      border-radius: 6px;
      background-color: #4886ff;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px 0 0 20px;
      cursor: pointer;
    }
    .add-button {
      position: absolute;
      right: 20px;
      width: 100px;
      height: 40px;
      border-radius: 6px;
      background-color: #40bb60;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px 0 0 20px;
      cursor: pointer;
    }
  }
  .table {
    font-size: 14px;
    margin: 20px 20px 0 20px;
    height: 550px;
    .thead {
      height: 40px;
      background-color: #4886ff;
      .project-name,
      .library-name,
      .document-name,
      .type,
      .index,
      .option {
        float: left;
        line-height: 40px;
        color: #fff;
      }
      .project-name {
        width: 14%;
        padding-left: 5%;
      }
      .library-name {
        width: 16%;
        padding-left: 5%;
      }
      .type {
        width: 16%;
        padding-left: 5%;
      }
      .index {
        width: 6%;
        padding-left: 5%;
      }
      .document-name {
        width: 14%;
        padding-left: 5%;
      }
      .option {
        width: 20%;
        text-align: center;
      }
    }
    .list {
      li {
        list-style-type: none;
        height: 40px;
        .project-name,
        .library-name,
        .type,
        .index,
        .document-name,
        .option {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          float: left;
          line-height: 40px;
          color: #606060;
        }
        .project-name {
          width: 14%;
          padding-left: 5%;
        }
        .library-name {
          width: 16%;
          padding-left: 5%;
        }
        .type {
          width: 16%;
          padding-left: 5%;
        }
        .index {
          width: 6%;
          padding-left: 5%;
        }
        .document-name {
          width: 14%;
          padding-left: 5%;
        }
        .option {
          width: 20%;
          text-align: center;
          span {
            margin: 0 10px;
            cursor: pointer;
          }
          .detail {
            color: #4886ff;
          }
          .editor {
            color: #56cf71;
          }
          .delete {
            color: #e44c4c;
          }
          .download {
            color: #5a5a5a;
            text-decoration: none;
          }
        }
      }
      .gray {
        background-color: #e9e9e9;
      }
    }
  }
  .paging {
    margin-top: 50px;
    text-align: center;
  }
}
</style>