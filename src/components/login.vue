<template>
<div class="login">
<div class="login-con">
    <div class="img-con">
        <img :src="require('../assets/img/logo.png')" alt="">
        <!-- <p>您的自习室管家</p> -->
    </div>
    <input type="text" placeholder="请输入账号">
    <input type="password" placeholder="请输入密码">
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
    return {};
  },
  methods:{
    register(){
      this.$router.push({path:'/userinfo'})
    },
    forgotPassword(){

    },
    login(){
      this.$router.push({path:'/'})
    }
  }
};
</script>

<style lang='scss'>
@import "../assets/common.scss";
.login {
  background-image: url("../assets/img/login-bg.jpg");
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
    // border: 1px solid $blue;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;
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
      margin:10px 20px 20px 0; 
      &:hover{
        color: $blue;
      }
    }
  }
}
</style>

