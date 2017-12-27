<template>
  <div class="user-change">
    <div class="user-con">
      <div class="btn-group">
        <a class="btn-sub" @click="submit">确定</a>
        <a class="btn-sub" @click="returnBack">返回</a>
      </div>
      <div class="photo">设置头像</div>
      <div class="user-row">
        <span>姓名</span>
        <input type="text" v-model="name">        
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
      msg: "这是一个提示",
      isShowMsg: false
    };
  },
  components: {
    showTag
  },
  methods: {
    submit() {
      let self = this;
      if (this.name && this.school && this.major && this.stuId) {
      } else {
        this.msg = "输入不完整，请填写完整后再提交";
        this.isShowMsg = true;
        setTimeout(() => {
          self.isShowMsg = false;
        }, 2000);
      }
    },
    returnBack(){
      this.$router.push({path:'/user',query:{index:"first"}});
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
  background: $blank;
  border-radius: 5px;
  padding: 20px;
  color: $black;
  .user-con {
    .photo {
      width: 100px;
      height: 100px;
      background: $light;
      border-radius: 50%;
      margin: 30px auto;
      text-align: center;
      line-height: 100px;
      color: #fff;
      cursor: pointer;
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
        margin-left:8px;
        background: $blue;
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
}
</style>


