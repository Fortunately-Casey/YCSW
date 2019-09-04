<template>
    <div class="header">
        <div class="logo">
            <div class="circle">

            </div>
        </div>
        <div class="title">盐城新水源地工程输水管网地理信息系统</div>
        <div class="user">
            <span :title="extraData">
                <div class="admin"></div>
                {{ extraData }}
            </span>
            <span @click="editPassWord">
                <div class="password"></div>
                修改密码
            </span>
            <span @click="isShowLogout = true">
                <div class="logout" ></div>
                退出
            </span>
        </div>
        <el-dialog 
            width="32%"
            :visible.sync="isShowEditPassWord"
            :show-close="false"  
            class="dialog"
            custom-class="bgc"
        >
            <div class="edit-password">
                <i class="el-icon-close close" @click="isShowEditPassWord = false"></i>
                <div class="header">重置密码</div>
                <div class="old-password">
                    <input type="password" placeholder="原密码" v-model="oldPassword">
                </div>
                <div class="input-password">
                    <input type="password" placeholder="输入新密码" v-model="inputPassword">
                </div>
                <div class="confirm-password">
                    <input type="password" placeholder="确认新密码" v-model="confirmPassword">
                </div>
                <div class="button" @click="confirm">重置密码</div>
            </div>
        </el-dialog>
        <el-dialog
            width="32%"
            :visible.sync="isShowLogout"
            :show-close="false"
            class="dialog"
            custom-class="bgc"
        >
            <div class="log-out">
              <div class="header">
                账号退出
              </div>
              <div class="content">是否退出当前账号?</div>
              <div class="footer">
                  <div class="cancel" @click="isShowLogout = false">取 消</div>
                  <div class="determine" @click="logOut">确 定</div>
              </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Permissions } from "@/api/user.js";
import { EditPassword } from "@/api/login.js";
export default {
  data() {
    return {
      extraData: "",
      isShowEditPassWord: false,
      isShowLogout: false,
      oldPassword: "",
      inputPassword: "",
      confirmPassword: ""
    };
  },
  created() {
    this.getUserName();
  },
  methods: {
    getUserName() {
      var vm = this;
      Permissions().then(resp => {
        // alert('111')
        if (resp.data.success) {
          this.extraData = resp.data.extraData;
        } else {
          vm.$message({
            message: "登录过期，请退出账号重新登录！",
            type: "warning"
          });
        }
      });
    },
    editPassWord() {
      this.isShowEditPassWord = true;
      this.oldPassword = "";
      this.inputPassword = "";
      this.confirmPassword = "";
    },
    confirm() {
      var vm = this;
      if (vm.inputPassword !== vm.confirmPassword) {
        vm.$message({
          message: "输入的两次新密码不一致！",
          type: "warning"
        });
        return;
      } else if (!vm.oldPassword || !vm.inputPassword || !vm.confirmPassword) {
        vm.$message({
          message: "原密码与新密码不可为空！",
          type: "warning"
        });
        return;
      }
      EditPassword({
        Password: vm.oldPassword,
        NewPassword: vm.confirmPassword
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: "success"
          });
          vm.$router.push({
            path: "/login"
          });
        } else {
          vm.$message({
            message: resp.data.message,
            type: "warning"
          });
        }
      });
    },
    logOut() {
      (this.isShowLogout = false),
        this.$router.push({
          path: "/login"
        });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 7%;
  background-color: #fff;
  .logo {
    width: 100px;
    height: 100%;
    background-color: #4886ff;
    float: left;
    position: relative;
    .circle {
      width: 40px;
      height: 40px;
      background: url("../../assets/image/logo.png") no-repeat;
      background-size: 40px 40px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .title {
    float: left;
    font-size: 24px;
    height: 100%;
    line-height: 70px;
    color: #548eff;
    font-weight: bold;
    padding-left: 30px;
  }
  .user {
    width: 363px;
    height: 100%;
    float: right;
    span {
      cursor: pointer;
      margin-top: 25px;
      float: left;
      width: 75px;
      height: 20px;
      font-size: 14px;
      position: relative;
      padding-left: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .admin,
      .password,
      .logout {
        position: absolute;
        left: 15px;
        top: 2px;
        display: inline-block;
        width: 17px;
        height: 16px;
      }
      .admin {
        background: url("../../assets/icon/admin.png") no-repeat;
      }
      .password {
        background: url("../../assets/icon/change-pw.png") no-repeat;
      }
      .logout {
        background: url("../../assets/icon/exit.png") no-repeat;
      }
    }
    span:nth-child(2) {
      border-left: 1px solid #a4c3ff;
      border-right: 1px solid #a4c3ff;
    }
  }
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .dialog {
    .edit-password {
      width: 500px;
      height: 380px;
      background-color: #fff;
      position: relative;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        cursor: pointer;
      }
      .header {
        height: 60px;
        line-height: 70px;
        text-align: center;
        font-size: 22px;
        color: #4a89fd;
      }
      .old-password,
      .input-password,
      .confirm-password {
        width: 300px;
        margin: 0 auto;
        position: relative;
        border: 1px solid #c2c2c2;
        margin-top: 25px;
        input {
          width: 290px;
          height: 40px;
          border: none;
          padding-left: 10px;
        }
      }
      .button {
        margin: 0 auto;
        width: 150px;
        height: 50px;
        font-size: 14px;
        color: #fff;
        border-radius: 6px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        margin-top: 40px;
        background: linear-gradient(to right, #74c3ef, #4788fe);
      }
    }
    .log-out {
      border-radius: 6px;
      width: 500px;
      height: 180px;
      background-color: #fff;
      .header {
        border-radius: 6px 6px 0 0;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        padding-left: 20px;
        background-color: #4a89fd;
      }
      .content {
        margin-top: 20px;
        text-align: center;
        font-size: 16px;
      }
      .footer {
        margin-top: 30px;
        height: 40px;
        position: relative;
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
          left: 100px;
          border: 1px solid #bfbfbf;
        }
        .determine {
          background-color: #4886ff;
          color: #fff;
          left: 280px;
        }
      }
    }
  }
}
</style>