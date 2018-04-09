<template>
  <div class="chatInfo">
    <div class="left">
      <div class="bar">
        <div class="return-btn" @click="backChatLists"></div>
        <p>{{chatInfo.name}}与你的对话</p>
      </div>
      <div class="chat-message" id="chat-message">
        <div class="item" v-if="chatLists.length" v-for="item in chatLists" :key="item.date">
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
        <input type="text" v-model="sendInfoNow" @keyup.enter="sendInfo">
        <div class="send" @click="sendInfo" >发送</div>
      </div>
    </div>
    <div class="right">
      <div class="title">对话列表</div>
      <div style="overflow-y:scroll;height:500px">
      <div :class="{'chat-item':true,'chat-item-blue':chatInfo.stuId==item.chater.stuId}" v-for="item in  chatMemberLists" :key="item.stuId" @click="changeChatInfo(item.chater)" >
       <div class="chat-item-top">
        <img src="../assets/img/pic/userPhoto-default.png" alt="">
        <div class="chater-info">
          <span class="name">{{item.chater.name}}</span>
          <span class="school">{{item.chater.school}}{{item.chater.major}}</span>
        </div>
       </div>
      <p class="last-info">{{item.lastlist && item.lastlist.content || ''}}</p>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
let serverPath = `${location.protocol}//${location.host}:4000`;
const socket = io("http://localhost:4000");
export default {
  data() {
    return {
      chatInfo: {}, //聊天者信息
      chatLists: [], //聊天记录
      sendInfoNow: "",
      chatMemberLists: [],
      chaterId: "141651122",
      userId: "" //本人id
    };
  },
  created() {
    // 这个值从何获取是个问题
    let self = this;
    // 获取详细信息
    this.getChatInfo(Number(this.$route.query.chaterId));
    setTimeout(() => {
      self.getChatMemberLists();
    }, 0);
  },
  methods: {
    // 切换用户信息
    changeChatInfo(stu) {
      this.getChatInfo(stu.stuId);
    },
    // 获取用户信息
    getChatMemberLists() {
      let self = this;
      this.$http
        .get("/chatLists", {
          params: { chaterId: 1411651102 }
        })
        .then(res => {
          self.chatMemberLists = res.data;
          // console.log(self.chatMemberLists);
        });
    },
    getChatInfo(stuId) {
      let self = this;
      // setInterval(function() {
      self.$http
        .get("/chatInfo", {
          params: { chaterId: stuId }
        })
        .then(res => {
          // console.log(res);
          self.chatInfo = res.data.cheaterInfo;
          self.chatLists = res.data.chatInfoLists.chatLists || [];
          self.userId = res.data.userId;
          socket.on(self.userId, function(data) {
            data.stuId = data.sendId;
            self.chatLists.push(data);
            self.scrollToBottom();
          });

          self.scrollToBottom();
        });
      // },1000);
    },
    sendInfo() {
      let self = this;

      if (this.sendInfoNow == "") return;
      socket.emit("chatInfo", {
        sendId: this.userId.toString(),
        saveId: this.chatInfo.stuId.toString(),
        content: this.sendInfoNow,
        date: new Date().getTime()
      });
      this.chatLists.push({
        content: self.sendInfoNow,
        stuId: this.userId,
        date: new Date().getTime()
      });
      this.sendInfoNow = "";
      this.scrollToBottom();
      setTimeout(() => {
        self.getChatMemberLists();
      }, 0);
    },
    // 滚动条到最底部
    scrollToBottom() {
      this.$nextTick(() => {
        let scrollDom = document.getElementById("chat-message");
        let height = scrollDom.getBoundingClientRect().height;
        // console.log(scrollDom.scrollHeight);
        scrollDom.scrollTop = scrollDom.scrollHeight;
      });
    },
    backChatLists() {
      this.$router.push({ path: "/user", query: { index: "first", nav: 2 } });
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
  height: 550px;
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
      color: #ffffff;
      background: $blue;
      border-radius: 5px 0 0 0;
      overflow: hidden;

      .return-btn {
        position: absolute;
        left: 0;
        width: 50px;
        height: 100%;
        text-align: center;
        background: #fff;
        cursor: pointer;
        &::after {
          display: block;
          content: "<";
          color: #fff;
          font-weight: 700;
          font-size: 23px;
          background: rgba($color: $blue, $alpha: 0.7);
        }
      }
    }
    .chat-message {
      width: 100%;
      height: 440px;
      overflow-y: scroll;
      border-bottom: 2px solid #fff;
      img {
        width: 50px;
        height: 50px;
        padding: 15px;
      }
      .item {
        font-size: 13px;
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
            margin: 15px 0;
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
            margin: 15px 0;
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
    .input-con {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 54px;
      input {
        flex: 0 1 80%;
        border: 0;
        background: #fff;
        height: 40px;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 20px;
      }
      .send {
        flex: 0 1 15%;
        height: 40px;
        background: $blue;
        border-radius: 5px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .right {
    color: $light;
    flex: 0 1 30%;
    .title {
      width: 100%;
      text-align: center;
      border-bottom: 2px solid #fff;
      line-height: 50px;
      box-sizing: border-box;
      background: $blue;
      border-radius: 0 5px 0 0;
      color: #fff;
    }
    .chat-item {
      height: 100px;
      width: 100%;
      border-bottom: 1px solid #fff;
      position: relative;
      // &::after {
      &:hover {
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 10%;
          width: 10px;
          height: 80%;
          background: $blue;
        }
      }
      // }

      cursor: pointer;
      .chat-item-top {
        display: flex;
        img {
          width: 40px;
          height: 40px;
          padding: 15px;
        }
        .chater-info {
          margin-top: 10px;
          .name {
            font-size: 18px;
            color: $black;
            font-weight: 600;
            display: block;
          }
          .school {
            font-size: 13px;
          }
        }
      }
      .last-info {
        color: #bbb;
        width: 200px;
        font-size: 14px;
        padding: 0 20px;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分省略号显示*/
      }
    }
    .chat-item-blue {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 10%;
        width: 10px;
        height: 80%;
        background: $blue;
      }
    }
  }
}
</style>