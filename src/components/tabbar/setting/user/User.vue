<template>
    <div class="user">
        <div class="header">
            <div class="user-name">
                <div class="left">
                    用户名称:
                </div>
                <div class="right">
                    <input type="text" v-model="username">
                </div>
            </div>
            <div class="real-name">
                <div class="left">真实姓名:</div>
                <div class="right">
                    <input type="text" v-model="truename">
                </div>
            </div>
            <div class="role-name">
                <div class="left">角色名称:</div>
                <div class="right">
                     <div class="drop-down" ref="roleName">
                        <div class="dropdown-toggle" @click="showRoleName = !showRoleName">
                        {{roleNameOption.RoleName}}
                        <span class="cart"></span>
                        </div>
                        <ul class="dropdown-menu" v-show="showRoleName">
                            <li v-for="(option,index) in roleNameOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('rolename',option)">
                                    {{ option.RoleName }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="user-type">
                <div class="left">用户类型:</div>
                <div class="right">
                     <div class="drop-down" ref="userType">
                        <div class="dropdown-toggle" @click="showUserType = !showUserType">
                        {{userTypeOption.userType}}
                        <span class="cart"></span>
                        </div>
                        <ul class="dropdown-menu" v-show="showUserType">
                            <li v-for="(option,index) in userTypeOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('userType',option)">
                                    {{ option.userType }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="search-button" @click="onSearch">
                查&nbsp;&nbsp;询
            </div>
            <div class="add-button" @click="addUser">
                新&nbsp;&nbsp;增
            </div>
        </div>
        <div class="table">
            <div class="thead">
                <div class="user-name">用户名称</div>
                <div class="real-name">真实姓名</div>
                <div class="role">角色</div>
                <div class="user-type">用户类型</div>
                <div class="disable">是否禁用</div>
                <div class="option">操作</div>
            </div>
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" :class="index%2==0?'':'gray'">
                    <div class="user-name" :title="item.UserName">{{item.UserName}}</div>
                    <div class="real-name" :title="item.TrueName">{{item.TrueName}}</div>
                    <div class="role" :title="item.RoleName">{{item.RoleName}}</div>
                    <div class="user-type" :title="item.StrUserType">{{item.StrUserType}}</div>
                    <div class="disable" :title="item.IsEnable">{{item.IsEnable?'未禁用':'禁用'}}</div>
                    <div class="option">
                        <span class="detail" @click="getDetail(item)">查看详情</span>
                        <span class="editor" @click="editer(item)">编 辑</span>
                        <span class="reset-password" @click="resetPassWord(item)">重置密码</span>
                        <span class="delete" @click="deleteUser(item)">删 除</span>
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
import { GetUserInfo, GetRoleInfo } from "@/api/user.js";
export default {
  data() {
    return {
      username: "",
      truename: "",
      showRealName: false,
      showRoleName: false,
      roleNameOption: {
        RoleName: "全部"
      },
      roleNameOptions: [],
      list: [],
      isShowAddUser: true,
      page: 1,
      searchPage: 1,
      isSearch: false,
      listLength: 0,
      showUserType:false,
      userTypeOption: {
        userType: "全部",
        id: ""
      },
      userTypeOptions: [
        {
          userType:'全部',
          id:''
        },
        {
          userType: "PC端",
          id: 1
        },
        {
          userType: "移动端",
          id: 2
        },
        {
          userType: "PC端与移动端",
          id: 3
        }
      ]
    };
  },
  created() {
    this.getUserList();
    this.getRoleInfo();
  },
  mounted() {
    this.selectedOption = this.selected;
    document.addEventListener("click", this.hidePandel, false);
  },
  methods: {
    updateOption(type, option) {
      if (type === "rolename") {
        this.roleNameOption.RoleName = option.RoleName;
        this.showRoleName = false;
      }
      if (type === "userType") {
        this.userTypeOption.userType = option.userType;
        this.userTypeOption.id = option.id;
        this.showUserType = false;
      }
    },
    hidePandel(e) {
      if (this.$refs.roleName) {
        if (!this.$refs.roleName.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showRoleName = false;
        }
      }
      if (this.$refs.userType) {
        if (!this.$refs.userType.contains(e.target)) {
          //点击除弹出层外的空白区域
          this.showUserType = false;
        }
      }
    },
    addUser() {
      this.$emit("adduser", true);
    },
    getUserList() {
      GetUserInfo({ Page: this.page, Rows: 12 }).then(resp => {
        this.listLength = resp.data.total;
        this.list = resp.data.rows;
      });
    },
    // 详情
    getDetail(item) {
      this.$emit("showDetail", { showDetail: true, userId: item.UserID });
    },
    // 编辑
    editer(item) {
      this.$emit("showEditer", {
        showEditer: true,
        userId: item.UserID,
        item: item,
        isSearch: this.isSearch
      });
    },
    resetPassWord(item) {
      this.$emit("showReset", {
        showReset: true,
        userId: item.UserID,
        isSearch: this.isSearch
      })
    },
    // 删除
    deleteUser(item) {
      this.$emit("showDelete", {
        showDelete: true,
        userId: item.UserID,
        isSearch: this.isSearch
      });
    },
    changePage(page) {
      this.page = page;
      if (this.isSearch) {
        this.search();
      } else {
        this.getUserList();
      }
    },
    getRoleInfo() {
      var vm = this;
      GetRoleInfo({}).then(resp => {
        if (resp.data.success) {
          vm.roleNameOptions = resp.data.rows;
          vm.roleNameOptions.unshift({ RoleName: "全部" });
        }
      });
    },
    onSearch() {
      var vm = this;
      // if (!vm.isSearch) {
      vm.page = 1;
      // }
      vm.isSearch = true;
      GetUserInfo({
        Rows: 12,
        Page: 1,
        UserName: vm.username,
        TrueName: vm.truename,
        RoleName:
          vm.roleNameOption.RoleName === "全部"
            ? ""
            : vm.roleNameOption.RoleName,
        UserType:vm.userTypeOption.id,    
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows;
          vm.listLength = resp.data.total;
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    },
    // 查询
    search() {
      var vm = this;
      if (!vm.isSearch) {
        vm.page = 1;
      }
      vm.isSearch = true;
      GetUserInfo({
        Rows: 12,
        Page: vm.page,
        UserName: vm.username,
        TrueName: vm.truename,
        RoleName:
          vm.roleNameOption.RoleName === "全部"
            ? ""
            : vm.roleNameOption.RoleName,
        UserType:vm.userTypeOption.id,   
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows;
          vm.listLength = resp.data.total;
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.user {
  width: 98%;
  background: #fff;
  position: absolute;
  left: 15px;
  top: 6%;
  height: 92%;
  z-index: 999;
  box-shadow: 0px 0px 3px 1px #adbfd3;
  .header {
    height: 80px;
    .user-name,
    .real-name,
    .role-name,
    .user-type {
      padding-top: 20px;
      width: 300px;
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
            height: 140px;
            overflow-y: scroll;
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
      float: right;
      width: 100px;
      height: 40px;
      border-radius: 6px;
      background-color: #40bb60;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px 0 0 20px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .table {
    font-size: 14px;
    margin: 20px 20px 0 20px;
    .thead {
      height: 40px;
      background-color: #4886ff;
      .user-name,
      .real-name,
      .role,
      .user-type,
      .disable,
      .option {
        float: left;
        line-height: 40px;
        color: #fff;
      }
      .user-name {
        width: 10%;
        padding-left: 5%;
      }
      .real-name {
        width: 10%;
        padding-left: 5%;
      }
      .role {
        width: 10%;
        padding-left: 5%;
      }
      .user-type {
        width: 10%;
        padding-left: 2%;
      }
      .disable {
        width: 10%;
        padding-left: 5%;
      }
      .option {
        width: 24%;
        text-align: center;
      }
    }
    .list {
      list-style-type: none;
      li {
        height: 40px;
        .user-name,
        .real-name,
        .role,
        .disable,
        .user-type,
        .option {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          float: left;
          line-height: 40px;
          color: #606060;
        }
        .user-name {
          width: 10%;
          padding-left: 5%;
        }
        .real-name {
          width: 10%;
          padding-left: 5%;
        }
        .role {
          width: 10%;
          padding-left: 5%;
        }
        .user-type {
          width: 10%;
          padding-left: 2%;
        }
        .disable {
          width: 10%;
          padding-left: 5%;
        }
        .option {
          width: 24%;
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