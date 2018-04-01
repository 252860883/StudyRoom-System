<template>
  <div class="chatInfo">
    <div class="left">
      <div class="bar">
        <div class="return-btn"><</div>
        <p>{{chatInfo.name}}与你的对话</p>
      </div>
      <div class="chat-message">
        <div class="item" v-for="item in chatLists" :key="item.date">
          <div class="chater" v-if="item.stuId==chatInfo.stuId">
            <img class="" src="../assets/img/pic/userPhoto-default.png" alt="">
            <div class="massage">{{item.content}}</div> 
          </div>

          <div class="owner" v-else>
            <div class="massage">{{item.content}}</div> 
            <img class="" src="../assets/img/pic/userPhoto-default.png" alt="">
          </div>

        </div>
      </div>
      <div class="input-con">
        <input type="text">
        <div class="send">发送</div>
      </div>
    </div>
    <div class="right">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chatInfo: {}, //聊天者信息
      chatLists: [] //聊天记录
    };
  },
  created() {
    this.getChatInfo();
  },
  methods: {
    getChatLists() {},
    getChatInfo() {
      let self = this;
      this.$http
        .get("/chatInfo", {
          params: { chaterId: 1411651103 }
        })
        .then(res => {
          console.log(res);
          self.chatInfo = res.data.cheaterInfo;
          self.chatLists = res.data.chatInfoLists.chatLists;
          console.log(self.chatLists);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.user-right {
  background: #fff;
}
.chatInfo {
  width: 100%;
  display: flex;
  height: 500px;
  .left {
    flex: 0 1 70%;
    border-right: 2px solid #fff;
    .bar {
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: relative;
      text-align: center;
      border-bottom: 2px solid #fff;
      color: $light;
      .return-btn {
        position: absolute;
        left: 0;
        width: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
    .chat-message {
      width: 100%;
      height: 390px;
      overflow-y: scroll;
      border-bottom: 2px solid #fff;
      img {
        width: 50px;
        height: 50px;
        padding: 15px;
      }
      .item {
        font-size: 15px;
        .chater {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          // margin: 10px;
          .massage {
            background: #fff;
            border-radius: 5px;
            padding: 15px;
            position: relative;
            color: $light;
            max-width: 200px;
            margin-top: 15px;
            &::after {
              position: absolute;
              left: -10px;
              top: 18px;
              content: "";
              border-right: 10px solid #fff;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
            }
          }
        }
        .owner {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          // margin: 10px;
          .massage {
            background: $blue;
            border-radius: 5px;
            padding: 15px;
            position: relative;
            max-width: 200px;
            margin-top: 15px;
            color: #ffffff;
            &::after {
              position: absolute;
              right: -10px;
              top: 18px;
              content: "";
              border-left: 10px solid $blue;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
            }
          }
        }
      }
    }
    .input-con{
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 60px;
      input{
        flex: 0 1 80%;
        border: 0;
        background: #fff;
        height: 40px;
        border-radius: 5px;
      }
      .send{
        flex: 0 1 15%;
        height: 40px;
        background: $blue;
        border-radius: 5px;
        color: #fff;
        line-height: 40px;
        text-align: center;
      }

    }
  }
}
</style>