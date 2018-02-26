<template>
<div class="login">
  <div class="login-con">
    <div class="img-con">
        <img :src="require('../assets/img/logo.png')" alt="">
        <!-- <p>您的自习室管家</p> --> 
    </div>
    <span class="errMsg" v-show="isErr">{{errShow}}</span>
    <input type="text" v-model="name" placeholder="请输入账号">
    <input type="password" v-model="password" placeholder="请输入密码">
    <a class="click" @click="login">确定</a>
    <div class="btn-bottom">
     <a class="forgot" @click="forgotPassword">忘记密码</a>     
     <a class="forgot" @click="register">注册</a>     
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      isErr: false,
      errShow: "",
      name: "",
      password: ""
    };
  },
  watch: {
    name(oldVal, newVal) {
      if (oldVal != newVal) {
        this.isErr = false;
      }
    },
    password(oldVal, newVal) {
      if (oldVal != newVal) {
        this.isErr = false;
      }
    }
  },
  methods: {
    register() {
      this.$router.push({ path: "/userinfo" });
    },
    forgotPassword() {},
    login() {
      if (!this.name) {
        this.showErr("请输入账号");
        return;
      }
      if (this.password.length < 6) {
        this.showErr("密码不少于六位");
        return;
      }
      if (this.name == "admin" && this.password == "123456") {
        this.$router.push({ path: "/" });
      } else {
        this.showErr("账号或密码错误");
        return;
      }
    },
    showErr(msg) {
      this.isErr = true;
      this.errShow = msg;
    }
  }
};
</script>

<style lang='scss'>
@import "../assets/common.scss";
.login {
  background-image: url("@/assets/img/login-bg.jpg");
  background-size: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .login-con {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;
    .errMsg {
      display: block;
      margin: 10px auto;
      // margin-bottom: 0;
      font-size: 12px;
      color: red;
    }
    .img-con {
      background: $blue;
      width: 100%;
      img {
        width: 100px;
        margin: 10px;
      }
      p {
        line-height: 1;
        font-size: 14px;
        color: $black;
      }
    }
  }
  input {
    display: block;
    width: 250px;
    height: 35px;
    margin: 20px auto;
    // margin-top: 10px;
    border-radius: 5px;
    border: 1px solid $blue;
    box-shadow: 0;
    padding-left: 10px;
  }
  .click {
    display: block;
    margin: 20px auto;
    margin-bottom: 15px;
    width: 262px;
    height: 35px;
    line-height: 35px;
    background: $blue;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
  }
  .btn-bottom {
    .forgot {
      float: right;
      display: block;
      font-size: 13px;
      cursor: pointer;
      margin: 10px 20px 20px 0;
      &:hover {
        color: $blue;
      }
    }
  }
}
</style>

