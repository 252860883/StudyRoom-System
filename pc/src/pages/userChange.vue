<template>
  <div class="user-change">
    <div class="user-con">

      <div class="photo">
        设置头像
        <input type="file" v-on="photoUrl" accept="image/png,image/gif"/>
      </div>

      <div class="user-row">
        <span>姓名</span>
        <input type="text" v-model="name" style="width:140px;"> 
      </div>

      <div class="user-row readOnly">
        <span>学号</span>
        <input type="text" readonly v-model="stuId" style="width:140px;">
        <span class="warn">* 学号在您注册后不能修改</span>
      </div>

      <div class="user-row">
        <span>学校</span>
        <input type="text" v-model="school" style="width:180px;">   
        <span>专业</span>
        <input type="text" v-model="major" >       
      </div>

      <div class="user-row">
        <span>密码</span>
        <input type="password" v-model="password">   
        <span class="warn">* 密码不少于六位</span>     
      </div>
      <!-- 按钮 -->
      <div class="btn-group">
        <a class="btn-sub" @click="submit">保存</a>
        <a class="btn-sub" @click="returnBack">返回</a>
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
      name: "",
      school: "",
      major: "",
      stuId: "12222",
      password: "",
      msg: "",
      isShowMsg: false,
      photoUrl: ""
    };
  },
  components: {
    showTag
  },
  watch: {
    photoUrl: function(val) {
    }
  },
  created() {
    let self=this;
    this.$http.get('/user').then(res=>{
      let re=res.data.data;
      self.name= re.name;
      self.stuId=re.stuId;
      self.school=re.school;
      self.major=re.major;
      self.password=re.password;
    })
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
      this.$http.post('/modify',{
        name:this.name,
        school:this.school,
        major:this.major,
        password:this.password
      }).then(()=>{
        this.showErr("修改资料成功");
        this.$emit('modifyBack');
      })
    },
    // 返回
    returnBack() {
      this.$emit('returnBack');
    },
    showErr(msg) {
      let self=this;
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
  margin: 0px auto;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  color: $black;
  .user-con {
    .photo {
      width: 100px;
      height: 100px;
      display: block;
      background: $light;
      border-radius: 50%;
      margin: 0px auto;
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
      width: 555px;
      margin: 20px auto;
      &:nth-of-type(2) {
        // margin-top: 40px;
      }
      &:nth-of-type(5) {
        // margin-bottom: 20px;
      }
      span {
        font-size: 16px;
        margin: 0 5px;
        vertical-align: middle;
        color: $light;
      }
      .warn{
        font-size: 12px;
        color: #aaa;
      }
      input {
        height: 40px;
        width: 230px;
        border-radius: 5px;
        border: 0px solid #ccc;
        background: #fff;
        outline: none;
        padding-left: 10px;
      }
    }
    .readOnly {
      input {
        color: #999;
        background: $blank;
      }
    }
    .btn-group {
      margin-right: 0;
      width: 260px;
      margin:50px auto 20px auto;
      height: 35px;
      .btn-sub {
        display: block;
        float: right;
        width: 120px;
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


