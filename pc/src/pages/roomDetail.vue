<template>
  <div class="room-detail">
   <!-- 信息 -->
    <div class="detail">
      <div class="detail-con">
        <div class="title">
          {{room.roomInfo.build}}
          {{room.roomInfo.floor}}{{room.roomInfo.number | numberJudge}}
        </div>
        <div class="main-info" @click="chatToCreater">
          <div class="user-main" style="display:inline-block;">
            <img src="../assets/img/login/user.png" alt="">
            <span>{{room.createName ||'暂无'}}</span>
          </div>

          <img src="../assets/img/login/name.png" alt="">
          <span v-if="room.title">{{room.moon}}月{{room.day}}日</span>       
          <span v-else>{{this.$route.query.moon}}月{{this.$route.query.day}}日</span>      
          <img src="../assets/img/login/title.png" alt=""> 
          <span>{{room.title || '暂无'}}</span> 
        </div>
        <p class="action" v-if="room.action">{{room.action}}</p>
      </div>
    </div> 

    <!-- 座位 -->
    <div class="seats">
      <div class="desk">讲台</div>
      <div class="seats-border">
        <div :class="{ownSeat:room.ownSeat==i ||selectSeat==i}" class="seats-one" v-for="i in room.roomInfo.allSeats" :key="i">
          <!-- 已经选择的 -->
          <img  
            v-if="room.title &&(room.seatsLists.indexOf(String(i))!=-1 ) " 
            @mouseout="istouch=-1"
            :src="require('../assets/img/login/seat-on.png')">
            <!-- 没有选择触碰时候的显示 -->
          <img 
            v-else-if="istouch==i" 
            @mouseout="istouch=-1" 
            @click="seatClick(i)" 
            :src="require('../assets/img/login/seat-on.png')">
          <img  v-else :src="require('../assets/img/login/seat-off.png')" @mouseover="istouch=i"  @mouseout="istouch=-1" alt="">
        </div>
      </div>

      <div class="title">
        <img :src="require('../assets/img/login/seat-on.png')" alt="">
        <span>已选座位</span>
        <img :src="require('../assets/img/login/seat-off.png')" alt="">
        <span>可选座位</span>
        <div class="own-Sample"></div>
        <span>您的座位</span>
      </div>
    </div>

    <!-- 弹框 -->
    <select-seat 
      :room="room" 
      @closeprompt="closePrompt" 
      @getRoomDetail='getRoomDetail'
      v-if="promptShow" 
      :seatIndex="selectSeat"
    ></select-seat>

    <show-callback @fadeCallback='callbackShow=false' :show="callbackShow" :content='callbackContent'></show-callback>
  </div>
</template>

<script>
import selectSeat from "../components/selectSeat.vue";
import showCallback from "../components/showCallback.vue";
export default {
  data() {
    return {
      istouch: false,
      isPrompt: true,
      room: {
        roomInfo: ""
      },
      selectSeat: "",
      title: "这是一个标题",
      action: "这是一个简介",
      promptShow: false,
      callbackContent: "回调显示",
      callbackShow: false
    };
  },
  created() {
    console.log('created')
    this.getRoomDetail(this.$route.query.roomId, this.$route.query.empty);
  },
  components: {
    selectSeat,
    showCallback
  },
  filters: {
    numberJudge(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }
  },
  methods: {
    // 获取自习室的信息
    getRoomDetail(roomId, isblank) {
      console.log('getroom')
      let self = this;
      // 如果自习室为空,还需要知道日期
      this.$http
        .get("/getRoom", {
          params: {
            roomId: roomId,
            isblank: isblank
          }
        })
        .then(res => {
          self.room = res.data;
        });
    },
    seatClick(i) {
      this.promptShow = true;
      this.selectSeat = i;
      console.log("is");
    },
    closePrompt(msg) {
      console.log(msg);
      this.promptShow = false;
      this.selectSeat = false;
      this.callbackContent = msg;
      this.callbackShow = true;
    },
    chatToCreater(){
      if(this.room.isCreater) return;
      this.$router.push({path:'/user',query:{index:'first',nav:2,chaterId:this.room.createdStuId}});
    }
  }
};
</script>
<style lang="scss"  scoped>
@import "../assets/common.scss";
.room-detail {
  // width: 1200px;
  margin: 0 auto;
  // 信息
  .detail {
    width: 820px;
    margin: 20px auto;
    margin-bottom: 10px;
    text-align: center;
    .detail-con {
      border-radius: 5px;
      padding: 10px;
      background: $blank;
      color: $light;
    }
    .title {
      font-size: 30px;
      font-weight: 700;
      color: $blue;
      margin: 0 auto;
    }
    .main-info {
      margin-top: 5px;
      .user-main{
        cursor: pointer;
        span{
          color: $orange;
        }
        &:hover{
          opacity: 0.9
          // border-bottom: 2px solid $light;
        }
      }
      img {
        vertical-align: middle;
        width: 22px;
        height: 22px;
        margin: 0 3px 0 15px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-weight: 600;
      }
    }
    .action {
      background: #fff;
      border-radius: 20px;
      display: inline-block;
      margin-top: 10px;
      padding: 2px 15px;
    }
  }
  // 座位图
  .seats {
    width: 820px;
    margin: 0 auto;
    padding-bottom: 15px;
    background: $blank;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;

    .title {
      width: 270px;
      margin: 0 auto;
      padding: 5px 0;
      position: relative;
      top: 15px;
      clear: both;
      background: #ddd;
      border-radius: 10px 10px 0 0;
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-left: 10px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        color: $light;
        font-size: 12px;
        margin-right: 10px;
        box-sizing: border-box;
      }
    }
    .own-Sample {
      width: 12px;
      height: 12px;
      display: inline-block;
      background: #f39800;
      border-radius: 50%;
      vertical-align: middle;
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
        padding: 5px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(14n + 5),
        &:nth-of-type(14n + 11) {
          margin-left: 30px;
        }
        &:hover {
          transform: translateY(-1px);
        }
      }
      .ownSeat {
        background: #f39800;
        border-radius: 50%;
        border: 2px solid $blank;
        padding: 3px;
      }
    }
  }
  // 按钮区
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

