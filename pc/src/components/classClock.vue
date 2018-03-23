<template>
  <div class="classClock">
      <div class="class-left">
          <img :src="require('../assets/img/clock-img.png')">
      </div>
      <div class="class-right">
            <p class="class-title">

                <span class="class-no" v-if="!todayData">
                    <span class="class-up">哇哦,</span>
                    <span>今天暂时还没有自习通知哦！</span>
                    <a>前往大厅</a>
                </span>

                <span class="class-yes" v-else>
                    <span class="class-up">童鞋，今天有自习安排呦</span>
                    <span>{{todayData | roomFormate }}</span>
                    <a>查看详情</a>
                </span>
            </p>
          <p class="class-con"></p>
      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      hasClass: false,
      todayData: ""
    };
  },
  filters:{
    roomFormate(room){
      console.log(room)
      let roomInfo=room.roomRecord;
      let number= roomInfo.number>9? roomInfo.number:'0'+roomInfo.number;
      return `${roomInfo.build} / ${roomInfo.floor}${number} / 座位${room.seatIndex}号 / ${roomInfo.title}`
    }
  },
  created() {
    let self = this;
    this.$http("/getTodayHasRoom", {
      params: {
        stuId: 1411651103
      }
    }).then(res => {
      if (res.data.length) {
        self.todayData = res.data[0];
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.classClock {
  padding: 20px;
  width: 650px;
  margin: 0 auto;
  .class-left {
    float: left;
    img {
      width: 250px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
  }
  .class-right {
    float: right;
    .class-title {
      .class-no {
        text-align: center;
        color: $light;
        .class-up {
          display: block;
          font-size: 26px;
          color: $orange;
        }
        display: block;
        font-size: 20px;
        margin-top: 50px;
      }
      .class-yes {
        text-align: center;
        font-size: 20px;
        color: $light;
        .class-up {
          display: block;
          font-size: 26px;
          color: #ea9518;
          margin-top: 50px;
          margin-bottom: 15px;
        }
      }
      a {
        display: block;
        width: 110px;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin-top: 26px;
        cursor: pointer;
        font-size: 15px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>


