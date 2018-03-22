<template>
  <div class="room-detail">
   <!-- 信息 -->
    <div class="detail">
      <div class="detail-con">
        <div class="title">{{room.roomInfo.build}}{{room.roomInfo.floor}}{{room.roomInfo.number | numberJudge}}</div>
        <div>
          <span>创建者：</span><span>{{room.createName ||'暂无'}}</span>
          <span style="margin-left:20px;">简介：{{room.action || '暂无'}}</span> 
        </div>
        <!-- 按钮区 -->
        <div class="btn-group">
          <div class="addClass">
            <div class="yes" v-if="room.title && !room.isHas">
              <img :src="require('../assets/img/btn-addClass.png')" alt="">
              <p>加入自习</p>
            </div>
            <div class="no" v-else>
              <img :src="require('../assets/img/btn-addClass-no.png')" alt="">
              <p>加入自习</p>
            </div>
          </div>
          <!-- 这里需要一个灰色的状态 -->
          <div class="create">
            <img :src="require('../assets/img/btn-save.png')" alt="">
            <p>加入收藏</p>
          </div>

          <div class="createClass">
            <div class="create-yes" v-if="!room.title">
              <img :src="require('../assets/img/btn-addCreate.png')" alt="">
              <p>成为管理员</p>
            </div>
            <div class="create-no" v-else> 
              <img :src="require('../assets/img/btn-addCreate-no.png')" alt="">
              <p>成为管理员</p>
            </div>
          </div>
        </div>
      </div>
    </div> 

    <!-- 座位 -->
    <div class="seats">
      <div class="title">
        <img :src="require('../assets/img/login/seat-on.png')" alt="">
        <span>已选座位</span>
        <img :src="require('../assets/img/login/seat-off.png')" alt="">
        <span>可选座位</span>
      </div>
      <div class="desk">讲台</div>
      <div class="seats-border">
        
        <div class="seats-one" v-for="i in room.roomInfo.allSeats" :key="i">

          <img v-if="room.title &&(room.seatsLists.indexOf(String(i))!=-1 || istouch==i) " @mouseout="istouch=-1"  :src="require('../assets/img/login/seat-on.png')" alt="">
          <img v-if="!room.title &&istouch==i" @mouseout="istouch=-1"  :src="require('../assets/img/login/seat-on.png')" alt="">
          <img v-else :src="require('../assets/img/login/seat-off.png')" @mouseover="istouch=i"  @mouseout="istouch=-1" alt="">
        </div>

      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      istouch: false,
      room: {
        roomInfo: ""
      }
    };
  },
  created() {
    let self = this;
    console.log(!this.$route.query.roomId);
    // 如果自习室为空

    this.$http
      .get("/getRoom", {
        params: {
          roomId: this.$route.query.roomId,
          stuId: 1411651103,
          isblank: this.$route.query.empty
        }
      })
      .then(res => {
        self.room = res.data;
        console.log(self.room.roomInfo.allSeats);
      });
  },

  filters: {
    numberJudge(num) {
      if (num < 10) {
        return "0" + num;
      }
    }
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss"  scoped>
@import "../assets/common.scss";

.room-detail {
  width: 1200px;
  margin: 0 auto;
  // 信息
  .detail {
    width: 820px;
    margin: 20px auto;
    text-align: center;
    .detail-con {
      border: 2px solid $blue;
      border-radius: 5px;
      padding: 10px;
      // padding-bottom: 40px;
    }
    .title {
      font-size: 40px;
      color: $blue;
      width: 280px;
      margin: 0 auto;
    }
  }
  // 座位图
  .seats {
    width: 820px;
    margin: 0 auto;
    padding-bottom: 22px;
    background: rgba(200, 200, 200, 0.2);
    border: 2px solid $blue;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;

    .title {
      width: 150px;
      margin: 0 auto;
      margin-top: 5px;
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        color: $light;
        font-size: 12px;
        // font-weight: bold;
        margin-right: 2px;
      }
    }
    .desk {
      margin: 0 auto;
      margin-top: 5px;
      height: 40px;
      background: $blue;
      color: $blank;
      text-align: center;
      line-height: 40px;
    }
    .seats-border {
      width: 100%;
      padding: 26px 100px;
      box-sizing: border-box;
      .seats-one {
        float: left;
        width: 40px;
        height: 40px;
        padding: 8px;
        box-sizing: border-box;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(14n + 5),
        &:nth-of-type(14n + 11) {
          margin-left: 20px;
        }
        &:hover {
          transform: translateY(-1px);
        }
      }
    }
  }

  .btn-group {
    text-align: center;
    width: 430px;
    height: 30px;
    margin: 0 auto;
    margin-top: 20px;

    .addClass,
    .createClass {
      float: left;
      cursor: pointer;
      position: relative;
      margin: 0 20px;
      text-align: center;
      width: 100px;
      height: 30px;
      .yes,
      .create-yes {
        position: absolute;
        top: 0;
        width: 100px;
        // height: 40px;
        padding: 5px 0;
        border: 1px solid $blue;
        border-radius: 5px;
        background: #fff;
        img {
          width: 20px;
          vertical-align: middle;
        }
        p {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: $blue;
          font-weight: bold;
        }
      }
      .no,
      .create-no {
        position: absolute;
        top: 0;
        width: 100px;
        padding: 5px 0;
        border: 1px solid $blank;
        border-radius: 5px;
        background: #ddd;
        img {
          vertical-align: middle;
          width: 20px;
        }
        p {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .create {
      cursor: pointer;
      float: left;
      width: 100px;
      padding: 5px 0;
      margin: 0 20px;
      border: 1px solid $blue;
      background: #fff;
      border-radius: 5px;
      text-align: center;
      img {
        width: 20px;
        vertical-align: middle;
      }
      p {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: $blue;
        font-weight: bold;
      }
    }

    .create-yes:hover,
    .create:hover,
    .addClass .yes:hover {
      transform: translateY(-2px);
    }
  }
}
</style>

