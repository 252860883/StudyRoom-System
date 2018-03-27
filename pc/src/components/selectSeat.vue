<template>
<transition>
    <div class="prompt" >
    <div class="mask"></div>
    <!-- 正常弹窗 -->
    <div v-if="!isShowCreate" class="content">
      <div class="close" @click="close">x</div>
      <div class="seatInfo">
        <span>{{seatIndex}}</span>
        <p>座位号</p>
      </div>
      <p class="title">请选择您的操作</p>
      <div class="btn-group">
        <div class="addRoom" @click="addClick">
          <img src="../assets/img/room/addRoom.png" alt="">
          <p>加入自习</p>
        </div>
        <div class="createRoom" @click="isShowCreate=true">
          <img src="../assets/img/room/creatdRoom.png" alt="">
          <p>创建自习</p>
        </div>
        <div @click="collectClick" class="saveRoom">
          <img src="../assets/img/room/saveRoom.png" alt="">
          <p>收藏自习</p>

        </div>
      </div>
    </div>
    <!-- 创建自习室弹窗 -->
    <div v-else class="content">
      <div class="close" @click="close">x</div>
      <form class="create">
        <div class="title">
          <img src="../assets/img/login/title.png" alt="">
          <input class="title-input" v-model="title" type="text" required>
        </div>
          <textarea  v-model="action" id="" cols="30" rows="10"></textarea>  
          <input class="btn-input" @click="createRoom" type="submit">      
      </form>
    </div>

  </div>
</transition>

</template>
<script>
export default {
  props: {
    seatIndex: {
      type: Number
    },
    room: {
      type: Object
    }
  },
  data() {
    return {
      title: "",
      action: "",
      isShowCreate: false
    };
  },
  methods: {
    close() {
      this.$emit("closeprompt");
    },
    // 创建自习室
    createRoom() {
      let self = this;
      if (!this.title) {
        return;
      }
      this.$http
        .get("/addAdmin", {
          params: {
            stuId: 1411651103,
            moon: this.$route.query.moon,
            day: this.$route.query.day,
            seatIndex: this.seatIndex,
            roomId: this.room.roomInfo._id,
            title: this.title,
            action: this.action
          }
        })
        .then(res => {
          self.$emit("getRoomDetail", res.data.roomId, false);
          self.$router.replace({
            path: "/roomdetail",
            query: {
              roomId: res.data.roomId,
              empty: false
            }
          });
          let msg = "创建自习室成功";
          self.$emit("closeprompt", msg);
        });
    },
    collectClick() {
      let self = this;
      this.$http
        .get("/addStar", {
          params: {
            roomId: this.$route.query.roomId,
            stuId: 1411651103
          }
        })
        .then(res => {
          // console.log(res);
          self.$emit("getRoomDetail", res.data.roomId, false);
          self.$emit("closeprompt", "收藏成功");
        });
    },
    addClick() {
      let self=this;
      this.$http
        .get("/addRoom", {
          params: {
            roomId: this.$route.query.roomId,
            seatIndex:this.seatIndex
          }
        })
        .then(res => {
          // console.log(res);
          // self.$emit("getRoomDetail", res.data.roomId, false);
          self.$emit("closeprompt",res.data.msg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.prompt {
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .content {
    position: fixed;
    z-index: 21;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -190px;
    width: 400px;
    height: 380px;
    background: #fff;
    border-radius: 8px;
    text-align: center;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      color: #fff;
      background: $light;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 10px;
      cursor: pointer;
    }
    .seatInfo {
      padding: 30px;
      span {
        color: $blue;
        font-size: 70px;
        font-weight: 700;
      }
      p {
        color: $light;
        font-size: 18px;
        margin-top: -15px;
      }
    }
    .title {
      font-size: 20px;
      color: $light;
    }
    .btn-group {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .addRoom,
      .createRoom,
      .saveRoom {
        border: 3px solid $blue;
        border-radius: 10px;
        background: $blank;
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 8px;
        cursor: pointer;
        &:hover {
          transform: translateY(-3px);
        }
        img {
          width: 60px;
          height: 60px;
        }
        p {
          color: $light;
        }
      }
    }
    .create {
      width: 280px;
      margin: 0 auto;
      margin-top: 70px;
      .title {
        position: relative;
        img {
          width: 29px;
          height: 29px;
          vertical-align: middle;
          position: absolute;
          top: 6px;
          left: 8px;
        }
        .title-input {
          height: 40px;
          width: 100%;
          border: 2px solid $light;
          border-radius: 6px;
          padding-left: 38px;
          box-sizing: border-box;
          font-size: 18px;
          color: $font;
        }
      }
      textarea {
        width: 100%;
        height: 150px;
        border: 2px solid $light;
        border-radius: 6px;
        margin-top: 10px;
        box-sizing: border-box;
        font-size: 18px;
        color: $font;
        resize: none; //限制不能拖动文本框
        padding: 10px;
      }
      .btn-input {
        width: 90%;
        background: $blue;
        height: 40px;
        border: 0;
        border-radius: 6px;
        margin-top: 20px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>

