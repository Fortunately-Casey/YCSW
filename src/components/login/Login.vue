/* eslint-disable no-unused-vars */
<template>
    <div class="login">
        <h3>盐城新水源地工程输水管网地理信息系统</h3>
        <div class="title">欢迎您 , 请登录</div>
        <div class="login-box">
            <div class="user">
                <div class="user-icon">
                    <input type="text" style="display:none">
                    <input type="text" placeholder="用户名" v-model="username">
                </div>
            </div>
            <div class="password">
                <div class="password-icon">
                    <input type="password" style="display:none">
                    <input :type="isShowPassWord?'text':'password'" auto-complete="new-password" placeholder="密码" v-model="password" @keyup.enter="submit">
                    <div class="show-password"
                        v-show="isShowPassWord"
                        @click="isShowPassWord = !isShowPassWord"
                    ></div>
                    <div class="hide-password"
                        v-show="!isShowPassWord"
                        @click="isShowPassWord = !isShowPassWord"
                    ></div>
                </div>
            </div>
        </div>
        <div class="remember">
            <div class="button" @click="submit">
                登&nbsp;&nbsp;&nbsp;录
            </div>
        </div>
        <div class="support">
            <p>建设单位： 盐城粤海水务有限公司</p>
            <!-- <p>技术支持： 南通市测绘院有限公司</p> -->
        </div>
    </div>
</template>
<script>
import { b64DecodeUnicode, b64EncodeUnicode } from '@/common/utils/tool.js'

import { Login } from '@/api/login.js'

export default {
  data () {
    return {
      isShowPassWord: false,
      isRememberPW: false,
      username: '',
      password: ''
    }
  },
  created () {
    //   在页面加载时从cookie获取登录信息
    // let username = this.getCookie('username')
    // let password
    // if(username) {
    //     password = b64DecodeUnicode(this.getCookie('password'))
    // }
    // 如果存在赋值给表单，并且将记住密码勾选
    // if(username) {
    //     this.username = username
    //     this.password = password
    //     this.isRememberPW = true
    // }
  },
  methods: {
    // 登录
    submit () {
      var vm = this
      Login({
        Username: vm.username,
        Password: vm.password
      }).then((resp) => {
        if (resp.data.success) {
          this.$router.push({
            path: '/home'
          })
        } else {
          alert('账号或密码错误')
        }
      })
    }
    // 储存表单信息
    // setUserInfo() {
    //     //判断用户是否勾选记住密码，如果勾选，向cookie中存储登录信息
    //     //如果没有勾选，储存的信息为空
    //     if(this.isRememberPW) {
    //         this.setCookie('username',this.username,7)
    //         // base64加密
    //         let password = b64EncodeUnicode(this.password)
    //         this.setCookie('password',password,7)
    //         this.setCookie('remember',this.isRememberPW,7)
    //     }else {
    //         this.setCookie('username','')
    //         this.setCookie('password','')
    //     }
    // },
    // //获取cookie
    // getCookie(key) {
    //     var name = key + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i = 0; i < ca.length; i++ ) {
    //         var c = ca[i];
    //         while(c.charAt(0) == ' ') c = c.substring(1);
    //         if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
    //     }
    // },
    // //保存cookie
    // setCookie(cName, value, expiredays) {
    //    var d = new Date();
    //    d.setTime(d.getTime() + (expiredays * 24 * 60 * 1000));
    //    var expires = "expires=" + d.toUTCString();
    //    document.cookie = cName + '=' + value + ";" + expires + '; path=/'
    // }
  }
}
</script>
<style lang="less" scoped>
.login {
  min-width: 1366px;
  min-height: 800px;
  margin: 0 auto;
  height: 100%;
  background: url("../../assets/image/login.jpg") no-repeat;
  background-size: 100% 120%;
  position: relative;
  h3 {
    font-size: 36px;
    color: #fff;
    position: absolute;
    left: 50px;
    top: 50px;
    width: 450px;
  }
  .title {
     font-size: 22px;
     color: #fff;
     position: absolute;
     left: 90px;
     top: 230px;
     font-weight: bold;
  }
  .login-box {
    width: 300px;
    height: 150px;
    position: absolute;
    left: 180px;
    top: 300px;
    .user,
    .password {
      width: 300px;
      height: 50px;
      border: 1px solid #bababa;
      border-radius: 5px;
      position: relative;
      background-color: #fff;
    }
    .user {
      margin-bottom: 30px;
      .user-icon {
        width: 50px;
        height: 50px;
        border-right: 1px solid #bababa;
        background: url("../../assets/icon/user-name.png") no-repeat;
        background-position: center center;
      }
      input {
        position: absolute;
        left: 60px;
        top: 10px;
        width: 230px;
        border: none;
        height: 30px;
        outline: none;
      }
    }
    .password {
      .password-icon {
        width: 50px;
        height: 50px;
        border-right: 1px solid #bababa;
        background: url("../../assets/icon/pw.png") no-repeat;
        background-position: center center;
      }
      input {
        position: absolute;
        left: 60px;
        top: 10px;
        width: 230px;
        border: none;
        height: 30px;
        outline: none;
      }
      .show-password {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 10px;
        background: url("../../assets/icon/pw-show.png") no-repeat;
        background-size: 85% 60%;
        background-position: center center;
        cursor: pointer;
      }
      .hide-password {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 10px;
        background: url("../../assets/icon/pw-hide.png") no-repeat;
        background-size: 85% 60%;
        background-position: center center;
        cursor: pointer;
      }
    }
  }
  .remember {
      width: 300px;
      height: 40px;
      position: absolute;
      left: 180px;
      top: 480px;
      color: #bababa;
      font-size: 14px;
      .checkbox {
          display: inline-block;
          width: 25px;
          height: 25px;
          border: 1px solid #bababa;
          border-radius: 5px;
          cursor: pointer;
          i {
              font-size: 24px;
              font-weight: 600;
              color: #4685fe;
          }
      }
      span {
          position: absolute;
          left: 35px;
          top: 5px;
      }
      .button {
          width: 100px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 5px;
          top: -10px;
          cursor: pointer;
          color: #4685fe;
          background: #fff;
          font-size: 16px;
          font-weight: bold;
      }
  }
  .support {
      width: 250px;
      height: 50px;
      position: absolute;
      left: 200px;
      bottom: 220px;
      text-align: center;
      p {
          color: #fff;
          font-size: 14px;
      }
  }
}
</style>
