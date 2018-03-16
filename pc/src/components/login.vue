<template>
<div class="login">
  <!-- <img class='bg' src="@/assets/img/login-bg.jpg"> -->
  <div class="con">
    <div class="img-con">
        <img :src="require('../assets/img/logo.png')" alt="">
    </div>
    <span class="errMsg" v-show="isErr">{{errShow}}</span>
    <!-- 登陆 -->
    <div class="login" v-if='islogin' >
      
      <div class="clomn">
        <img src="../assets/img/login/name.png" alt=""> 
        <input type="text" v-model="stuId" placeholder="请输入学号">
      </div>
      <div class="clomn">
        <img src="../assets/img/login/password.png" alt=""> 
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <a class="click" @click="login">确定</a>
      <div class="btn-bottom">
        <a class="forgot" @click="register">没有账号？赶快注册</a>     
      </div>
    </div>
    <!-- 注册 -->
    <div class="resigter" v-else>
      <div class="clomn">
        <img src="../assets/img/login/name.png" alt="">
        <input type="text" v-model="stuId" placeholder="请输入学号">
      </div>
      <div class="clomn">
        <img src="../assets/img/login/user.png" alt="">
        <input type="text" v-model="name" placeholder="请输入姓名">
      </div>      
      <div class="clomn">
        <img src="../assets/img/login/school.png" alt="">
        <input type="text" v-model="school" placeholder="请输入学校">
      </div>      
      <div class="clomn">
        <img src="../assets/img/login/major.png" alt="">
        <input type="text" v-model="major" placeholder="请输入专业">
      </div>      
      <div class="clomn">
        <img src="../assets/img/login/password.png" alt="">
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <a class="click" @click="realResigter">注册</a>
    </div>

    
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      islogin: true,
      isErr: false,
      errShow: "",
      name: "",
      password: "",
      school: "",
      major: "",
      stuId: ""
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
    },
    stuId(oldVal, newVal) {
      if (oldVal != newVal) {
        this.isErr = false;
      }
    },
    major(oldVal, newVal) {
      if (oldVal != newVal) {
        this.isErr = false;
      }
    },
    school(oldVal, newVal) {
      if (oldVal != newVal) {
        this.isErr = false;
      }
    }
  },
  methods: {
    // 点击注册
    register() {
      // this.$router.push({ path: "/userinfo" });
      this.islogin = false;
    },
    login() {
      if (!this.stuId) {
        this.showErr("请输入学号");
        return;
      }
      if (this.password.length < 6) {
        this.showErr("密码不少于六位");
        return;
      }

      this.$http
        .post("/login", {
          stuId: this.stuId,
          password: this.password
        })
        .then(res => {
          if (res.data.sucess) {
            this.$router.push({ path: "/" });
          } else {
            this.showErr("账号或密码错误");
          }
        });
    },
    showErr(msg) {
      this.isErr = true;
      this.errShow = msg;
    },
    // 真实注册
    realResigter() {
      let self = this;
      if (
        !(this.stuId && this.password && this.name && this.school && this.major)
      ) {
        this.showErr("请将信息填写完整");
        return;
      }
      if (this.password.length < 5) {
        this.showErr("密码不少于6位");
        return;
      }
      this.$http
        .post("/register", {
          stuId: self.stuId,
          name: self.name,
          password: self.password,
          school: self.school,
          major: self.major
        })
        .then(res => {
          if (res.data.sucess) {
            self.password="";
            self.name="";
            self.school="";
            self.major="";
            self.isErr=true;
            self.showErr("注册成功，请登录");
            self.islogin = true;
            
          } else {
            self.showErr(res.data.msg);
            return;
          }
        });
    }
  }
};
</script>

<style lang='scss'>
@import "../assets/common.scss";
.login {
  // background: #eee;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .con {
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 9px;
    text-align: center;
    overflow: hidden;
    border: 2px solid #ddd;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    .errMsg {
      display: block;
      margin: 10px auto;
      font-size: 12px;
      color: #dc143c;
    }
    .img-con {
      background: $blue;
      width: 100%;
      height: 70px;
      img {
        width: 100px;
        height: 35px;
        margin: 17px auto;
      }
      p {
        line-height: 1;
        font-size: 14px;
        color: $black;
      }
    }
  }
  .clomn {
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
      opacity: 0.9;
    }
    input {
      width: 230px;
      height: 33px;
      border-radius: 5px;
      border: 2px solid #bbb;
      box-shadow: 0;
      padding-left: 10px;
      color: #666;
    }
  }
  .click {
    display: block;
    margin: 25px auto;
    width: 280px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    background: $blue;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
  .btn-bottom {
    .forgot {
      display: block;
      font-size: 13px;
      cursor: pointer;
      margin: 0 0 20px 0;
      color: #888888;
      &:hover {
        color: $blue;
      }
    }
  }
}
</style>

