/* eslint-disable no-unused-expressions */
<template>
  <div class="setting">
    <div class="top">
      <div class="tab" @click="choseTab(0)">
        <div class="tabber">
          <span class="user"></span>
          用户管理
        </div>
        <div :class="chosedIndex === 0?'line':''"></div>
      </div>
      <div class="tab" @click="choseTab(1)">
        <div class="tabber">
          <span class="role"></span>
          角色管理
        </div>
        <div :class="chosedIndex === 1?'line':''"></div>
      </div>
      <span class="time" id="txtClock">
        <div class="timer">{{time}}</div>
      </span>
    </div>
    <m-user
      v-if="chosedIndex === 0? true : false"
      @adduser="add"
      @showDetail="showDetail"
      @showEditer="showEditer"
      @showDelete="showDelete"
      ref="user"
      @showReset="showReset"
    ></m-user>
    <m-role
      v-if="chosedIndex === 1? true : false"
      @addRole="addRole"
      @showRoleDetail="showRoleDetail"
      @showRoleEditer="showRoleEditer"
      @showRoleDelete="showRoleDelete"
      ref="role"
    ></m-role>
    <!-- 新增用户 -->
    <el-dialog :visible.sync="isShowAddUser" width="50%" :show-close="false" custom-class="bgc">
      <div class="addUser">
        <div class="header">
          新 增 用 户
          <i class="el-icon-close" @click="isShowAddUser = false"></i>
        </div>
        <div class="content">
          <div class="user-name">
            <div class="left">用户名称:</div>
            <div class="right">
              <input type="text" v-model="username" />
            </div>
          </div>
          <div class="real-name">
            <div class="left">真实姓名:</div>
            <div class="right">
              <input type="text" v-model="truename" />
            </div>
          </div>
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <div class="drop-down" ref="addRole">
                <div class="dropdown-toggle" @click="showRoleName = !showRoleName">
                  {{roleNameOption.RoleName}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu" v-show="showRoleName">
                  <li v-for="(option,index) in roleNameOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="updateOption('rolename',option)"
                    >{{ option.RoleName }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <div class="drop-down" ref="addDisable">
                <div class="dropdown-toggle" @click="showDisable = !showDisable">
                  {{disableOption.name}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu disable" v-show="showDisable">
                  <li v-for="(option,index) in disableOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="updateOption('disable',option)"
                    >{{ option.name }}</a>
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
                    <a
                      href="javascript:void(0)"
                      @click="updateOption('usertype',option)"
                    >{{ option.userType }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="cancel" @click="isShowAddUser = false">取 消</div>
          <div class="determine" @click="addUser">保 存</div>
        </div>
      </div>
    </el-dialog>
    <!-- 用户详情 -->
    <el-dialog :visible.sync="isShowUserDetail" width="50%" :show-close="false" custom-class="bgc">
      <div class="userDetail">
        <div class="header">
          用 户 详 情
          <i class="el-icon-close" @click="isShowUserDetail = false"></i>
        </div>
        <div class="content">
          <div class="user-name">
            <div class="left">用户名称:</div>
            <div class="right">
              <input type="text" :value="userDetail.UserName" disabled="disabled" />
            </div>
          </div>
          <div class="real-name">
            <div class="left">真实姓名:</div>
            <div class="right">
              <input type="text" :value="userDetail.TrueName" disabled="disabled" />
            </div>
          </div>
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <input type="text" :value="userDetail.RoleName" disabled="disabled" />
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <input type="text" :value="userDetail.IsEnable?'未禁用':'禁用'" disabled="disabled" />
            </div>
          </div>
          <div class="user-type">
            <div class="left">用户类型:</div>
            <div class="right">
              <input type="text" :value="userDetail.StrUserType" disabled="disabled" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 用户信息编辑 -->
    <el-dialog :visible.sync="isShowUserEditer" width="50%" :show-close="false" custom-class="bgc">
      <div class="editerUser">
        <div class="header">
          编 辑 用 户
          <i class="el-icon-close" @click="isShowUserEditer = false"></i>
        </div>
        <div class="content">
          <div class="user-name">
            <div class="left">用户名称:</div>
            <div class="right">
              <input type="text" v-model="editer.UserName" disabled="disabled" />
            </div>
          </div>
          <div class="real-name">
            <div class="left">真实姓名:</div>
            <div class="right">
              <input type="text" v-model="editer.TrueName" />
            </div>
          </div>
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <div class="drop-down" ref="editRole">
                <div class="dropdown-toggle" @click="showEditUser = !showEditUser">
                  {{editerRoleName.RoleName}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu" v-show="showEditUser">
                  <li v-for="(option,index) in roleNameOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="editerOption('rolename',option)"
                    >{{ option.RoleName }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <div class="drop-down" ref="editDisable">
                <div class="dropdown-toggle" @click="showDisableUser = !showDisableUser">
                  {{editerDisable.name}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu disable" v-show="showDisableUser">
                  <li v-for="(option,index) in disableOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="editerOption('disable',option)"
                    >{{ option.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="user-type">
            <div class="left">角色名称:</div>
            <div class="right">
              <div class="drop-down" ref="editUserType">
                <div class="dropdown-toggle" @click="showEditUserType = !showEditUserType">
                  {{editerUserType.userType}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu" v-show="showEditUserType">
                  <li v-for="(option,index) in userTypeOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="editerOption('editUserType',option)"
                    >{{ option.userType }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="cancel" @click="isShowUserEditer = false">取 消</div>
          <div class="determine" @click="editerUser">保 存</div>
        </div>
      </div>
    </el-dialog>
    <!-- 用户删除 -->
    <el-dialog :visible.sync="isShowUserDelete" width="40%" :show-close="false" custom-class="bgc">
      <div class="userDelete">
        <div class="header">
          用 户 删 除
          <i class="el-icon-close" @click="isShowUserDelete = false"></i>
        </div>
        <div class="content">
          <p>确定要删除该用户信息吗？</p>
        </div>
        <div class="footer">
          <div class="cancel" @click="isShowUserDelete = false">取 消</div>
          <div class="determine" @click="deleteUser">确 定</div>
        </div>
      </div>
    </el-dialog>

    <!-- 用户删除 -->
    <el-dialog
      :visible.sync="isShowResetPassword"
      width="40%"
      :show-close="false"
      custom-class="bgc"
    >
      <div class="userDelete">
        <div class="header">
          重 置 密 码
          <i class="el-icon-close" @click="isShowResetPassword = false"></i>
        </div>
        <div class="content">
          <p>确定要重置该用户密码吗？</p>
        </div>
        <div class="footer">
          <div class="cancel" @click="isShowResetPassword = false">取 消</div>
          <div class="determine" @click="resetPassWord">确 定</div>
        </div>
      </div>
    </el-dialog>

    <!-- 新增角色 -->
    <el-dialog :visible.sync="isShowAddRole" width="50%" :show-close="false" custom-class="bgc">
      <div class="add-role">
        <div class="header">
          新 增 角 色
          <i class="el-icon-close" @click="isShowAddRole = false"></i>
        </div>
        <div class="content">
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <input type="text" v-model="rolename" />
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <div class="drop-down" ref="isDisableRole">
                <div class="dropdown-toggle" @click="isDisableRole = !isDisableRole">
                  {{roleEnableOption.name}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu disable" v-show="isDisableRole">
                  <li v-for="(option,index) in roleEnableOptions" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="roleEnable('enable',option)"
                    >{{ option.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="root">
            <div class="left">PC端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in roots" :key="index">
                <el-checkbox-group v-model="checkedRoot" @change="choseRoot">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="root">
            <div class="left">移动端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in phoneRoots" :key="index">
                <el-checkbox-group v-model="checkedPhoneRoots" @change="chosePhoneRoot">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="note">
            <div class="left">备 注:</div>
            <textarea name id cols="60" rows="5" class="textarea" v-model="note"></textarea>
          </div>
        </div>
        <div class="bottom">
          <div class="cancel" @click="isShowAddRole = false">关 闭</div>
          <div class="determine" @click="saveRole">保 存</div>
        </div>
      </div>
    </el-dialog>
    <!-- 角色详情 -->
    <el-dialog :visible.sync="isShowRoleDetail" width="50%" :show-close="false" custom-class="bgc">
      <div class="role-detail">
        <div class="header">
          角 色 详 情
          <i class="el-icon-close" @click="isShowRoleDetail = false"></i>
        </div>
        <div class="content">
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <input type="text" disabled="disabled" :value="roleDetail.RoleName" />
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <input type="text" disabled="disabled" :value="roleDetail.IsEnable?'未禁用':'禁用'" />
            </div>
          </div>
          <div class="root">
            <div class="left">PC端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in roots" :key="index">
                <el-checkbox-group :value="roleDetailChecked">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="root">
            <div class="left">移动端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in phoneRoots" :key="index">
                <el-checkbox-group :value="roleDetailChecked">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="note">
            <div class="left">备 注:</div>
            <textarea class="textarea" disabled="disabled" :value="roleDetail.Remark"></textarea>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 角色编辑 -->
    <el-dialog :visible.sync="isShowRoleEditer" width="50%" :show-close="false" custom-class="bgc">
      <div class="add-role">
        <div class="header">
          编 辑 角 色
          <i class="el-icon-close" @click="isShowRoleEditer = false"></i>
        </div>
        <div class="content">
          <div class="role-name">
            <div class="left">角色名称:</div>
            <div class="right">
              <input type="text" :value="RoleEditer.RoleName" disabled="disabled" />
            </div>
          </div>
          <div class="disable">
            <div class="left">是否禁用:</div>
            <div class="right">
              <div class="drop-down" ref="editIsDisableRole">
                <div class="dropdown-toggle" @click="editIsDisableRole = !editIsDisableRole">
                  {{roleEnableEditer.name}}
                  <span class="cart"></span>
                </div>
                <ul class="dropdown-menu disable" v-show="editIsDisableRole">
                  <li v-for="(option,index) in roleEnableEditers" :key="index">
                    <a
                      href="javascript:void(0)"
                      @click="roleEnable('editerRole',option)"
                    >{{ option.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="root">
            <div class="left">PC端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in roots" :key="index">
                <el-checkbox-group v-model="roleEditerChecked" @change="choseEditer">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="root">
            <div class="left">移动端权限:</div>
            <div class="checkbox">
              <div class="group" v-for="(item,index) in phoneRoots" :key="index">
                <el-checkbox-group v-model="roleEditerPhoneChecked" @change="chosePhoneEditer">
                  <el-checkbox :label="item.MenuID">{{item.MenuName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="note">
            <div class="left">备 注:</div>
            <textarea name id cols="60" rows="5" class="textarea" v-model="RoleEditer.Remark"></textarea>
          </div>
        </div>
        <div class="bottom">
          <div class="cancel" @click="isShowRoleEditer = false">关 闭</div>
          <div class="determine" @click="saveRoleEditer">保 存</div>
        </div>
      </div>
    </el-dialog>

    <!-- 角色删除 -->
    <el-dialog :visible.sync="isShowRoleDelete" width="40%" :show-close="false" custom-class="bgc">
      <div class="roleDelete">
        <div class="header">
          角 色 删 除
          <i class="el-icon-close" @click="isShowRoleDelete = false"></i>
        </div>
        <div class="content">
          <p>确定要删除该角色信息吗？</p>
        </div>
        <div class="footer">
          <div class="cancel" @click="isShowRoleDelete = false">取 消</div>
          <div class="determine" @click="deleteRole">确 定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTime } from '@/common/utils/tool.js'
import {
  InsertUserInfo,
  GetRoleInfo,
  GetUserDetail,
  UserDelete,
  UpdateUserInfo,
  GetRoots,
  AddRole,
  GetRoleDetail,
  DeleteRole,
  UpdateRoleInfo,
  ResetPassword
} from '@/api/user.js'
import MUser from './user/User.vue'
import MRole from './role/Role.vue'
export default {
  data () {
    return {
      username: '',
      truename: '',
      rolename: '',
      chosedIndex: 0,
      time: '',
      timer: '',
      isShowAddUser: false,
      isShowUserDetail: false,
      isShowUserEditer: false,
      isShowUserDelete: false,
      isShowAddRole: false,
      isShowRoleDetail: false,
      isShowRoleEditer: false,
      isShowRoleDelete: false,
      showRealName: false,
      showRoleName: false,
      showDisable: false,
      showUserType: false,
      isDisableRole: false,
      roleNameOption: {
        RoleName: '请选择',
        RoleID: ''
      },
      editerRoleName: {
        RoleName: '请选择',
        RoleID: ''
      },
      userTypeOption: {
        userType: '请选择',
        id: ''
      },
      userTypeOptions: [
        {
          userType: 'PC端',
          id: 1
        },
        {
          userType: '移动端',
          id: 2
        },
        {
          userType: 'PC端与移动端',
          id: 3
        }
      ],
      roleEnableOption: {
        name: '请选择'
      },
      roleEnableEditer: {
        name: '请选择'
      },
      roleEnableEditers: [
        {
          id: 0,
          name: '禁用'
        },
        {
          id: 1,
          name: '未禁用'
        }
      ],
      roleEnableOptions: [
        {
          id: 0,
          name: '禁用'
        },
        {
          id: 1,
          name: '未禁用'
        }
      ],
      editerDisable: {
        name: '请选择'
      },
      disableOption: {
        name: '请选择'
      },
      showEditUserType: false,
      editerUserType: {
        userType: '全部',
        id: ''
      },
      roleNameOptions: [],
      disableId: '',
      disableOptions: [
        {
          id: 0,
          name: '禁用'
        },
        {
          id: 1,
          name: '未禁用'
        }
      ],
      userDetail: {
        UserName: '',
        TrueName: '',
        RoleName: '',
        IsDisabled: ''
      },
      deleteUserId: '',
      isSearch: '',
      editer: '',
      editerUserId: '',
      roots: [],
      menus: '',
      phoneMenus: '',
      checkedRoot: [],
      checkedPhoneRoots: [],
      roleDetailChecked: [],
      roleEditerPhoneChecked: [],
      note: '',
      roleDetail: {},
      deleteRoleId: '',
      isRoleSearch: '',
      RoleEditer: {},
      roleEditerChecked: [],
      showEditUser: false,
      showDisableUser: false,
      editIsDisableRole: false,
      isShowResetPassword: false,
      resetId: '',
      phoneRoots: []
    }
  },
  created () {
    this.initTime()
    this.getRoleList()
    this.getRoots()
    this.getPhoneRoots()
  },
  mounted () {
    this.selectedOption = this.selected
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    choseTab (index) {
      this.chosedIndex = index
    },
    initTime () {
      this.time = getTime()
      this.timer = setInterval(() => {
        this.time = getTime()
      }, 1000)
    },
    add (value) {
      var vm = this
      vm.username = ''
      vm.truename = ''
      vm.roleNameOption = {
        RoleName: '请选择',
        RoleID: ''
      }
      vm.disableOption = {
        name: '请选择'
      }
      vm.getRoleList()
      vm.isShowAddUser = value
    },
    addRole (value) {
      var vm = this
      vm.rolename = ''
      vm.note = ''
      vm.roleEnableOption = {
        name: '请选择'
      }
      vm.checkedRoot = []
      vm.checkedPhoneRoots = []
      this.isShowAddRole = value
    },
    updateOption (type, option) {
      if (type === 'rolename') {
        this.roleNameOption.RoleName = option.RoleName
        this.roleNameOption.RoleID = option.RoleID
        this.showRoleName = false
      } else if (type === 'disable') {
        this.disableOption.name = option.name
        this.disableId = option.id
        this.showDisable = false
      } else if (type === 'usertype') {
        this.userTypeOption.userType = option.userType
        this.userTypeOption.id = option.id
        this.showUserType = false
      }
    },
    showReset (item) {
      (this.isShowResetPassword = item.showReset), (this.resetId = item.userId)
    },
    editerOption (type, option) {
      if (type === 'rolename') {
        this.editerRoleName.RoleName = option.RoleName
        this.editerRoleName.RoleID = option.RoleID
        this.showEditUser = false
      } else if (type === 'disable') {
        this.editerDisable.name = option.name
        this.disableId = option.id
        this.showDisableUser = false
      } else if (type === 'editUserType') {
        (this.editerUserType.userType = option.userType),
        (this.editerUserType.id = option.id),
        (this.showEditUserType = false)
      }
    },
    roleEnable (type, option) {
      if (type === 'enable') {
        this.roleEnableOption.name = option.name
        this.isDisableRole = false
      } else if (type === 'editerRole') {
        this.roleEnableEditer.name = option.name
        this.editIsDisableRole = false
      }
    },
    // 新增用户
    addUser () {
      var vm = this
      if (vm.username === '') {
        vm.$message({
          message: '用户名不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.truename === '') {
        vm.$message({
          message: '真实姓名不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.roleNameOption.RoleID === '') {
        vm.$message({
          message: '角色名不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.disableId === '') {
        vm.$message({
          message: '是否禁用不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.userTypeOption.id === '') {
        vm.$message({
          message: '用户类型不可为空',
          type: 'warning'
        })
        return
      }
      InsertUserInfo({
        UserName: vm.username,
        TrueName: vm.truename,
        RoleID: vm.roleNameOption.RoleID,
        IsEnable: !!vm.disableId,
        UserType: vm.userTypeOption.id
      }).then(resp => {
        if (!resp.data.success) {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        } else {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.$refs.user.getUserList()
          vm.isShowAddUser = false
        }
      })
    },
    // 获取角色
    getRoleList () {
      GetRoleInfo({}).then(resp => {
        this.roleNameOptions = resp.data.rows
      })
    },
    // 获取pc权限
    getRoots () {
      var vm = this
      GetRoots({
        MenuType: 1
      }).then(resp => {
        if (resp.data.success) {
          vm.roots = resp.data.rows
        }
      })
    },
    // 获取移动端权限
    getPhoneRoots () {
      var vm = this
      GetRoots({
        MenuType: 2
      }).then(resp => {
        if (resp.data.success) {
          vm.phoneRoots = resp.data.rows
        }
      })
    },
    showDetail (value) {
      var vm = this
      GetUserDetail({
        UserId: value.userId
      }).then(resp => {
        if (resp.data.success) {
          vm.userDetail = resp.data.rows
          vm.isShowUserDetail = value.showDetail
        }
      })
    },
    showEditer (value) {
      this.isShowUserEditer = value.showEditer
      var _obj = JSON.stringify(value.item)
      this.editer = JSON.parse(_obj)
      this.isSearch = value.isSearch
      this.editerRoleName.RoleName = value.item.RoleName
      this.editerRoleName.RoleID = value.item.RoleID
      this.editerDisable.name = value.item.IsEnable ? '未禁用' : '禁用'
      this.editerUserId = value.userId
      this.editerUserType.userType = value.item.StrUserType
      this.editerUserType.id = value.item.UserType
    },
    showDelete (value) {
      this.isShowUserDelete = value.showDelete
      this.deleteUserId = value.userId
      this.isSearch = value.isSearch
    },
    showRoleDetail (value) {
      var vm = this
      GetRoleDetail({
        RoleID: value.roleId
      }).then(resp => {
        if (resp.data.success) {
          vm.roleDetail = resp.data.rows
          vm.roleDetailChecked = resp.data.rows.MenuID.split(',')
          vm.isShowRoleDetail = value.showRoleDetail
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    showRoleEditer (value) {
      var vm = this
      GetRoleDetail({
        RoleID: value.roleId
      }).then(resp => {
        if (resp.data.success) {
          let arr1 = []
          let arr2 = []
          let roots = resp.data.rows.MenuID.split(',')
          var noneArr1 = []
          var noneArr2 = []
          vm.phoneRoots.map(v => {
            noneArr1.push(v.MenuID)
          })
          vm.roots.map(v => {
            noneArr2.push(v.MenuID)
          })
          arr2 = this.getArrEqual(roots, noneArr1)
          arr1 = this.getArrEqual(roots, noneArr2)
          vm.roleEditerChecked = arr1
          vm.roleEditerPhoneChecked = arr2
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })

      vm.isShowRoleEditer = value.showEditer
      var _obj = JSON.stringify(value.item)
      vm.RoleEditer = JSON.parse(_obj)
      vm.isRoleSearch = value.isSearch
      vm.roleEnableEditer.name = value.item.IsEnable ? '未禁用' : '禁用'
      vm.editerRoleId = value.roleId
    },
    getArrDifference (arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    showRoleDelete (value) {
      this.deleteRoleId = value.roleId
      this.isShowRoleDelete = value.showRoleDelete
      this.isRoleSearch = value.isSearch
    },
    // 删除用户
    deleteUser () {
      var vm = this
      UserDelete({
        UserID: vm.deleteUserId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.isShowUserDelete = false
          if (vm.isSearch) {
            vm.$refs.user.search()
          } else {
            vm.$refs.user.getUserList()
          }
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    resetPassWord () {
      var vm = this
      ResetPassword({
        UserId: vm.resetId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.isShowResetPassword = false
        } else {
          vm.$message({
            message: '重置密码失败!',
            type: 'warning'
          })
        }
      })
    },
    // 删除角色
    deleteRole () {
      var vm = this
      DeleteRole({
        RoleID: vm.deleteRoleId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.isShowRoleDelete = false

          if (vm.isRoleSearch) {
            vm.$refs.role.search()
          } else {
            vm.$refs.role.getRoleList()
          }
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    // 编辑用户
    editerUser () {
      var vm = this
      UpdateUserInfo({
        UserID: vm.editerUserId,
        TrueName: vm.editer.TrueName,
        RoleID: vm.editerRoleName.RoleID,
        IsEnable: vm.editerDisable.name !== '禁用',
        UserType: vm.editerUserType.id
      }).then(resp => {
        if (!resp.data.success) {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        } else {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.$refs.user.getUserList()
          vm.isShowUserEditer = false
        }
      })
    },
    // 选择权限
    choseRoot (obj) {
      let arr = []
      for (var k in obj) {
        arr.push(obj[k])
      }
      this.menus = arr.join(',')
    },
    chosePhoneRoot (obj) {
      let arr = []
      for (var k in obj) {
        arr.push(obj[k])
      }
      this.phoneMenus = arr.join(',')
    },
    choseEditer (obj) {
      this.roleEditerChecked = obj
      // console.log(this.roleEditerChecked);
      console.log(obj)
    },
    chosePhoneEditer (obj) {
      this.roleEditerPhoneChecked = obj
      // console.log(this.roleEditerPhoneChecked);
      console.log(obj)
    },
    // 新增角色
    saveRole () {
      var vm = this
      if (vm.rolename === '') {
        vm.$message({
          message: '角色名称不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.roleEnableOption.name === '请选择') {
        vm.$message({
          message: '是否禁用不可为空',
          type: 'warning'
        })
        return
      }
      if (vm.phoneMenus.length === 0 && vm.menus.length === 0) {
        vm.$message({
          message: '权限不可为空',
          type: 'warning'
        })
        return
      }
      AddRole({
        RoleName: vm.rolename,
        Remark: vm.note,
        isEnable: vm.roleEnableOption.name !== '禁用',
        MenuID: this.menus + ',' + this.phoneMenus
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.isShowAddRole = false
          vm.$refs.role.getRoleList()
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    hidePandel (e) {
      if (this.$refs.addRole) {
        if (!this.$refs.addRole.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showRoleName = false
        }
      }
      if (this.$refs.addDisable) {
        if (!this.$refs.addDisable.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showDisable = false
        }
      }
      if (this.$refs.editRole) {
        if (!this.$refs.editRole.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showEditUser = false
        }
      }
      if (this.$refs.editDisable) {
        if (!this.$refs.editDisable.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showDisableUser = false
        }
      }
      if (this.$refs.isDisableRole) {
        if (!this.$refs.isDisableRole.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.isDisableRole = false
        }
      }
      if (this.$refs.editIsDisableRole) {
        if (!this.$refs.editIsDisableRole.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.editIsDisableRole = false
        }
      }
      if (this.$refs.userType) {
        if (!this.$refs.userType.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showUserType = false
        }
      }
      if (this.$refs.editUserType) {
        if (!this.$refs.editUserType.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showEditUserType = false
        }
      }
    },
    getArrEqual (arr1, arr2) {
      let newArr = []
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr1[j] === arr2[i]) {
            newArr.push(arr1[j])
          }
        }
      }
      return newArr
    },
    saveRoleEditer () {
      var vm = this
      if (
        vm.roleEditerPhoneChecked.length === 0 &&
        vm.roleEditerChecked === 0
      ) {
        vm.$message({
          message: '权限不能为空!',
          type: 'warning'
        })
        return
      }
      let arr = (
        vm.roleEditerPhoneChecked.join(',') +
        ',' +
        vm.roleEditerChecked.join(',')
      ).split(',')
      UpdateRoleInfo({
        RoleID: vm.editerRoleId,
        Remark: vm.RoleEditer.Remark,
        IsEnable: vm.roleEnableEditer.name !== '禁用',
        MenuID: arr.join(',')
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          if (vm.isRoleSearch) {
            vm.$refs.role.search()
          } else {
            vm.$refs.role.getRoleList()
          }
          vm.isShowRoleEditer = false
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    }
  },
  components: {
    MUser,
    MRole
  }
}
</script>
<style lang="less" scoped>
.setting {
  width: 100%;
  height: 5%;
  background-color: #fff;
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
    .tab {
      height: 100%;
      line-height: 40px;
      margin-right: 40px;
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
        .user {
          background: url("../../../assets/icon/user-search.png") no-repeat;
        }
        .role {
          background: url("../../../assets/icon/user-management.png") no-repeat;
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
  .addUser,
  .userDetail,
  .userDelete,
  .editerUser,
  .add-role,
  .role-detail,
  .roleDelete {
    width: 880px;
    height: 300px;
    background-color: #fff;
    border-radius: 6px;
    .header {
      height: 40px;
      background-color: #4886ff;
      border-radius: 6px 6px 0 0;
      line-height: 40px;
      padding-left: 40px;
      color: #fff;
      font-size: 16px;
      position: relative;
      i {
        font-size: 18px;
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
      }
    }
    .content {
      .user-name,
      .real-name,
      .role-name,
      .user-type,
      .disable,
      .root,
      .note {
        padding-top: 20px;
        width: 400px;
        height: 40px;
        float: left;
        .left {
          width: 115px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .checkbox {
          position: absolute;
          right: 0px;
          top: 0;
          width: 700px;
          height: 100px;
          .group {
            float: left;
            width: 150px;
            margin-top: 20px;
          }
        }
        .textarea {
          position: absolute;
          left: 125px;
          top: 30px;
          width: 640px;
          height: 100px;
          resize: none;
          padding: 10px;
        }
        .right {
          width: 270px;
          position: relative;
          float: right;
          border: 1px solid #c2c2c2;
          margin-left: 10px;
          input {
            width: 250px;
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
              width: 270px;
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
                right: 30px;
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
              width: 270px;
              z-index: 1000;
              padding: 5px 0;
              margin: 2px 0 0;
              list-style: none;
              font-size: 14px;
              background-color: #fff;
              opacity: 0.9;
              border: 1px solid #ccc;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
              height: 300px;
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
            .disable {
              height: 80px;
            }
          }
        }
      }
      .user-type {
        .right {
          .drop-down {
            .dropdown-menu {
              height: 110px;
            }
          }
        }
      }
      .root {
        width: 100%;
        height: 100px;
        position: relative;
      }
      .note {
        position: relative;
      }
      p {
        float: left;
        font-size: 18px;
        height: 100px;
        line-height: 100px;
        padding-left: 100px;
      }
    }
    .bottom {
      margin-top: 460px;
      height: 40px;
      position: relative;
      margin-left: 80px;
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
        left: 180px;
        border: 1px solid #bfbfbf;
      }
      .determine {
        background-color: #4886ff;
        color: #fff;
        left: 380px;
      }
    }
    .footer {
      margin-top: 200px;
      height: 40px;
      position: relative;
      margin-left: 80px;
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
        left: 180px;
        border: 1px solid #bfbfbf;
      }
      .determine {
        background-color: #4886ff;
        color: #fff;
        left: 380px;
      }
    }
  }
  .userDetail {
    width: 830px;
    height: 240px;
  }
  .userDelete {
    width: 600px;
    height: 200px;
    .footer {
      width: 300px;
      margin-top: 90px;
      .cancel {
        left: 50px;
      }
      .determine {
        left: 260px;
      }
    }
  }
  .editerUser {
    width: 830px;
  }
  .add-role,
  .role-detail {
    width: 830px;
  }

  .add-role,
  .role-detail {
    height: 550px;
  }
  .role-detail {
    height: 510px;
  }
  .roleDelete {
    width: 600px;
    height: 200px;
    .footer {
      width: 300px;
      margin-top: 90px;
      .cancel {
        left: 50px;
      }
      .determine {
        left: 260px;
      }
    }
  }
}
</style>
