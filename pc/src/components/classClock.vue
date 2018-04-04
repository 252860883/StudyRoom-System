<template>
  <div class="classClock">
      <div class="class-left">
          <img v-if="todayData" :src="require('../assets/img/pic/clock-yes.png')">
          <img v-else :src="require('../assets/img/pic/clock-no.png')">
      </div>
      <div class="class-right">
            <p class="class-title">
                <span class="class-no" v-if="!todayData">
                    <span class="class-up">啊哦,</span>
                    <span>今天没有已经预约的自习信息哦！</span>
                    <a @click="toHoom">前往大厅</a>
                </span>

                <span class="class-yes" v-else>
                    <span class="class-up">童鞋，今天有自习安排呦</span>
                    <span>{{todayData | roomFormate }}</span>
                    <a @click='toDetail'>查看详情</a>
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
  filters: {
    roomFormate(room) {
      console.log(room);
      let roomInfo = room.roomRecord;
      let number =
        roomInfo.number > 9 ? roomInfo.number : "0" + roomInfo.number;
      return `${roomInfo.build} / ${roomInfo.floor}${number} / 座位${
        room.seatIndex
      }号 / ${roomInfo.title}`;
    }
  },
  created() {
    let self = this;
    this.$http.get("/getTodayHasRoom", {
      params: {
        stuId: 1411651103
      }
    }).then(res => {
      if (res.data.length) {
        self.todayData = res.data[0];
      }
    });
  },
  methods: {
    toHoom() {
      this.$router.push("/");
    },
    toDetail() {
      // console.log(room);
      this.$router.push({
        path: "/roomdetail",
        query: { roomId: this.todayData.roomRecord._id, empty: false }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.classClock {
  padding: 10px;
  width: 650px;
  margin: 0 auto;
  .class-left {
    // float: left;
    width: 100%;

    img {
      width: 250px;
      margin: 0 auto;
      display: block;
      margin-top: -30px;
    }
  }
  .class-right {
    // float: right;
    .class-title {
      .class-no {
        text-align: center;
        color: $light;
        margin-top: -20px;
        font-weight: 600;
        .class-up {
          color: $orange;
        }
        display: block;
        font-size: 20px;
        a {
          margin-top: 15px;
        }
      }
      .class-yes {
        text-align: center;
        font-size: 20px;
        color: $light;
        margin-top: -20px;
        display: block;
        span {
          display: block;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .class-up {
          display: block;
          font-size: 26px;
          color: #ea9518;

          margin-top: 5px;
          margin-bottom: 5px;
        }
      }
      a {
        display: block;
        width: 110px;
        margin: 20px auto;
        height: 40px;
        line-height: 40px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin-top: 6px;
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


