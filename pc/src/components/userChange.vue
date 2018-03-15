<template>
  <div class="user-change">
    <div class="user-con">
      <div class="btn-group">
        <a class="btn-sub" @click="submit">确定</a>
        <!-- <a class="btn-sub" @click="returnBack">返回</a> -->
      </div>
      <div class="photo">
      设置头像
      <input type="file" v-on="photoUrl" accept="image/png,image/gif"/>
      </div>
      <div class="user-row">
        <span>姓名</span>
        <input type="text" v-model="name" >        
      </div>
      <div class="user-row">
        <span>学校</span>
        <input type="text" v-model="school">        
      </div>
      <div class="user-row">
        <span>专业</span>
        <input type="text" v-model="major">        
      </div>
      <div class="user-row">
        <span>学号</span>
        <input type="text" v-model="stuId">        
      </div>
      <div class="user-row">
        <span>密码</span>
        <input type="password" v-model="password">        
      </div>
    </div>
    <!-- 提示 -->
    <show-tag :msg="msg" v-show="isShowMsg"></show-tag>
  </div>
</template>
<script>
import showTag from "../components/showTag.vue";
export default {
  data() {
    return {
      name: "杜杜杜",
      school: "123",
      major: "233",
      stuId: "1411651104",
      password: "123456",
      msg: "这是一个提示",
      isShowMsg: false,
      photoUrl: ""
    };
  },
  components: {
    showTag
  },
  watch: {
    photoUrl: function(val) {
      console.log(val);
    }
  },
  methods: {
    submit() {
      let self = this;
      if (this.password.length < 6) {
        this.showErr("密码不得少于六位");
        return;
      }
      if (!(this.name && this.school && this.major && this.stuId)) {
        this.showErr("输入不完整，请填写完整后再提交");
        return;
      }
      this.$router.push({ path: "/user", query: { index: "first" } });
    },
    returnBack() {
      this.$router.push({ path: "/user", query: { index: "first" } });
    },
    showErr(msg) {
      this.msg = msg;
      this.isShowMsg = true;
      setTimeout(() => {
        self.isShowMsg = false;
      }, 2000);
    },
    uploadPhoto() {
      var file = e.target.files[0]; //获取File对象，这里是上传单张图片，[0]代表第一张图片。如果多张，就是一个var file = e.target.files;
      var type = file.type.split("/")[0]; //按照惯例，不应该由前端判断格式，因为这里是根据后缀名判断的，修改后缀名仍旧可以上传，理应由后端根据文件格式来判断。
      if (type != "image") {
        alert("请上传图片");
        return;
      }
      var size = Math.round(file.size / 1024 / 1024);
      if (size > 3) {
        alert("图片大小不得超过3M");
        return;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.user-change {
  width: 400px;
  margin: 20px auto;
  box-sizing: border-box;
  // background: $blank;
  border-radius: 5px;
  padding: 20px;
  color: $black;
  border: 2px solid #ddd;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  .user-con {
    .photo {
      width: 100px;
      height: 100px;
      display: block;
      background: $light;
      border-radius: 50%;
      margin: 30px auto;
      text-align: center;
      line-height: 100px;
      color: #fff;
      position: relative;
      input {
        display: block;
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
        cursor: pointer;
        opacity: 0;
      }
    }
    .user-row {
      width: 295px;
      margin: 10px auto;
      &:nth-of-type(2) {
        // margin-top: 40px;
      }
      &:nth-of-type(5) {
        // margin-bottom: 20px;
      }
      span {
        font-size: 20px;
        margin-right: 5px;
        vertical-align: middle;
      }
      input {
        height: 40px;
        width: 230px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        padding-left: 10px;
      }
    }
    .btn-group {
      margin-right: 0;
      // width: 200px;
      height: 35px;
      .btn-sub {
        display: block;
        float: right;
        width: 60px;
        height: 35px;
        margin-left: 8px;
        background: $blue;
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>


