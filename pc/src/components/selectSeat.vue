<template>
  <div class="prompt" >
    <div class="mask"></div>
    <div class="content">
      <div class="close">x</div>
      <div class="seatInfo">
        <span>{{seatIndex}}</span>
        <p>座位号</p>
      </div>
      <p class="title">请选择您的操作</p>
      <div class="btn-group">
        <div class="addRoom">
          <img src="../assets/img/room/addRoom.png" alt="">
          <p>加入自习</p>
        </div>
        <div class="createRoom">
          <img src="../assets/img/room/creatdRoom.png" alt="">
          <p>创建自习</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    seatIndex:{
      type:Number
    }
  },
  data() {
    return {
      // seatIndex: 20
    };
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
    .close{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      color: #fff;
      background: $light;
      border-radius: 50%;
      width: 30px;
      height:30px;
      line-height: 30px;
      text-align: center;
      margin: 10px;
      cursor: pointer;

    }
    .seatInfo {
      padding: 20px;
      span {
        color: $blue;
        font-size: 60px;
        font-weight: 700;
      }
      p {
        color: $light;
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
      .addRoom,
      .createRoom {
        border: 2px solid $blue;
        border-radius: 10px;
        width: 110px;
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        cursor: pointer;
        &:hover{
          transform: translateY(-3px)
        }
        img {
          width: 80px;
          height: 80px;
        }
        p{
          color: $light;
        }
      }
    }
  }
}
</style>

