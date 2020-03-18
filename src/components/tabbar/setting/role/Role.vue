<template>
    <div class="role-list">
        <div class="header">
            <div class="role-name">
                <div class="left">角色名称:</div>
                <div class="right">
                    <input type="text" v-model="rolename">
                </div>
            </div>
            <div class="disable">
                <div class="left">是否禁用:</div>
                <div class="right">
                    <div class="drop-down" ref="isDisable">
                        <div class="dropdown-toggle" @click="showDisable = !showDisable">
                        {{disableOption.name}}
                        <span class="cart"></span>
                        </div>
                        <el-collapse-transition>
                        <ul class="dropdown-menu" v-show="showDisable">
                            <li v-for="(option,index) in disableOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('disable',option)">
                                    {{ option.name }}
                                </a>
                            </li>
                        </ul>
                        </el-collapse-transition>
                    </div>
                </div>
            </div>
            <div class="search-button" @click="onSearch">
                查&nbsp;&nbsp;询
            </div>
            <div class="add-button" @click="addRole">
                新&nbsp;&nbsp;增
            </div>
        </div>
         <div class="table">
            <div class="thead">
                <div class="role">角色名称</div>
                <div class="disable">是否禁用</div>
                <div class="note">备注</div>
                <div class="option">操作</div>
            </div>
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" :class="index%2==0?'':'gray'">
                    <div class="role" :title="item.RoleName">{{item.RoleName}}</div>
                    <div class="disable" :title="item.IsEnable">{{item.IsEnable?'未禁用':'禁用'}}</div>
                    <div class="note" :title="item.Remark"> {{item.Remark}}</div>
                    <div class="option">
                        <span class="detail" @click="getDetail(item)">查看详情</span>
                        <span class="editor" @click="editer(item)">编 辑</span>
                        <span class="delete" @click="deleteRole(item)">删 除</span>
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
import { GetRoleInfo, GetRoleList } from '@/api/user.js'
export default {
  data () {
    return {
      rolename: '',
      showDisable: false,
      disableOption: {
        name: '全部'
      },
      disableOptions: [
        {
          id: '',
          name: '全部'
        },
        {
          id: 0,
          name: '禁用'
        },
        {
          id: 1,
          name: '未禁用'
        }
      ],
      disableId: '',
      list: [],
      page: 1,
      searchPage: 1,
      isSearch: false,
      listLength: 0
    }
  },
  created () {
    this.getRoleList()
  },
  mounted () {
    this.selectedOption = this.selected
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    updateOption (type, option) {
      if (type === 'rolename') {
        this.roleNameOption.RoleName = option.RoleName
        this.showRoleName = false
      } else if (type === 'disable') {
        this.disableOption.name = option.name
        this.disableId = option.id
        this.showDisable = false;
        ``
      }
    },
    hidePandel (e) {
      if (this.$refs.isDisable) {
        if (!this.$refs.isDisable.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showDisable = false
        }
      }
    },
    addRole () {
      this.$emit('addRole', true)
    },
    // 详情
    getDetail (item) {
      this.$emit('showRoleDetail', {
        showRoleDetail: true,
        roleId: item.RoleID
      })
    },
    // 编辑
    editer (item) {
      this.$emit('showRoleEditer', {
        showEditer: true,
        roleId: item.RoleID,
        item: item,
        isSearch: this.isSearch
      })
    },
    // 删除
    deleteRole (item) {
      this.$emit('showRoleDelete', {
        showRoleDelete: true,
        roleId: item.RoleID,
        isSearch: this.isSearch
      })
    },
    changePage (page) {
      this.page = page
      if (this.isSearch) {
        this.search()
      } else {
        this.getRoleList()
      }
    },
    getRoleList () {
      var vm = this
      GetRoleList({
        Rows: 12,
        Page: vm.page
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.listLength = resp.data.total
        }
      })
    },
    onSearch () {
      var vm = this
      vm.page = 1
      vm.isSearch = true
      let params = {}
      if (vm.disableOption.name === '全部') {
        params = {
          Rows: 12,
          Page: vm.page,
          RoleName: vm.rolename
        }
      } else {
        params = {
          Rows: 12,
          Page: vm.page,
          RoleName: vm.rolename,
          IsEnable: vm.disableOption.name !== '禁用'
        }
      }
      GetRoleList(params).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.listLength = resp.data.total
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    // 查询
    search () {
      var vm = this
      if (!vm.isSearch) {
        vm.page = 1
      }
      vm.isSearch = true
      let params = {}
      if (vm.disableOption.name === '请选择') {
        params = {
          Rows: 12,
          Page: vm.page,
          RoleName: vm.rolename
        }
      } else {
        params = {
          Rows: 12,
          Page: vm.page,
          RoleName: vm.rolename,
          IsEnable: vm.disableOption.name !== '禁用'
        }
      }
      GetRoleList(params).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.listLength = resp.data.total
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.role-list {
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
    .role-name,
    .disable {
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
        border-radius: 6px;
        float: left;
        border: 1px solid #c2c2c2;
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
    height: 550px;
    .thead {
      height: 40px;
      background-color: #4886ff;
      .role,
      .disable,
      .note,
      .option {
        float: left;
        height: 40px;
        line-height: 40px;
        color: #fff;
      }
      .role {
        width: 10%;
        padding-left: 5%;
      }
      .disable {
        width: 10%;
        padding-left: 5%;
      }
      .note {
        width: 40%;
        padding-left: 5%;
        cursor: pointer;
      }
      .option {
        width: 20%;
        text-align: center;
      }
    }
    .list {
      list-style-type: none;
      li {
        height: 40px;
        .role,
        .note,
        .disable,
        .option {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          float: left;
          line-height: 40px;
          color: #606060;
        }
        .role {
          width: 10%;
          padding-left: 5%;
        }
        .disable {
          width: 10%;
          padding-left: 5%;
        }
        .note {
          width: 40%;
          padding-left: 5%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
