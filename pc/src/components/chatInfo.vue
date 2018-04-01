<template>
  <div class="chatInfo">
    <div class="left">
      <div class="bar">
        <div class="return-btn">返回</div>
        <p>大帅哥与你的对话</p>
      </div>
      <div class="chat-message">
        <p>对话详情</p>
      </div>
      <div class="input-con">

      </div>
    </div>
    <div class="right">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {

  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.user-right{
  background: #fff;
}
.chatInfo{
  width: 100%;
  display: flex;
  height: 500px;
  .left{
    flex: 0 1 70%;
    border-right: 5px solid #fff;
    .bar{
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: relative;
      text-align: center;
      border-bottom: 1px solid $light;
      color: $light;
      .return-btn{
        position: absolute;
        left: 0;
      }
      .chat-message{
        width: 100%;
        height: 400px;
        background: #fff;
      }
    }
  }
}

</style>