<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <div class="list-con"  v-for="(item,index) in tableData" :key="index">
    <div v-if="item.date" class="apply noSee">
      <div  class="list-photo">
        <img src="../assets/img/pic/userPhoto-default.png" alt="">
      </div>
      <div class="list-left">
        <div class="list-left-up">
          <span>{{item.name}}</span> /
          <span>{{item.school}}</span> /
          <span>{{item.major}}</span>
        </div>
        <div class="list-left-down">
          <span>申请加入：</span>
          <span class="list-date">{{item.roomInfo.moon}}月{{item.roomInfo.day}}日，在</span>
          <span class="list-build">{{item.roomInfo.build}} {{item.roomInfo | roomNumber}} 的自习。</span>
        </div>
        <div class="list-left-action">
          <!-- <span>详细信息：</span><br> -->
          <span class="list-title">标题为：{{item.roomInfo.title}}</span><br>
          <span>简介：{{item.roomInfo.action}}</span>
        </div>
      </div>
      <div class="list-right">
        <a @click="agree(item)">同意</a>
        <a class="del" @click="disagree(item)">拒绝</a>
        <!-- <a class="del" @click="disagree(item)">找TA</a> -->
      </div>
    </div>
    <div v-else :class={chat:true,noSee:item.noSee} >
      <div  class="list-photo">
        <img src="../assets/img/pic/userPhoto-default.png" alt="">
      </div>
      <div class="list-left">
        <div class="list-left-up">
          <span>{{item.chater.name}}</span> /
          <span>{{item.chater.school}}</span> /
          <span>{{item.chater.major}}</span>
        </div>
        <div class="list-left-down">
          <span>给您发来了新消息</span>
        </div>
        <div class="list-left-action">
          <span>{{item.lastlist.content}}</span>
        </div>
      </div>
      <div class="list-right">
        <a @click="chatTo(item)">回复</a>
      </div>

    </div>


    </div>
      <blank-img v-if="!tableData.length" content='啊哦，您还没有待处理的信息'></blank-img>
  </div>
</template>

<script>
import blankImg from "../components/blanik-img";
export default {
  props: {
    remindLists: {
      type: Array
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  filters: {
    roomNumber(room) {
      if (room.number < 10) {
        return room.floor + "0" + room.number;
      } else {
        return room.floor + "" + room.number;
      }
    }
  },
  created() {
    this.getRemindLists();
  },
  components: {
    blankImg
  },
  methods: {
    agree(room) {
      console.log(room);

      this.$http
        .get("/agree", {
          params: {
            roomId: room.roomInfo.roomId,
            remindId: room._id,
            addId: room.stuId,
            seatIndex: room.seatIndex
          }
        })
        .then(res => {
          this.getRemindLists();
        });
    },
    disagree(room) {
      this.$http
        .get("/disagree", {
          params: {
            roomId: room.roomInfo.roomId,
            remindId: room._id,
            addId: room.stuId
          }
        })
        .then(res => {
          this.getRemindLists();
        });
    },
    getRemindLists() {
      let self = this;
      this.$http.get("/remindLists").then(res => {
        console.log(res);
        self.tableData = res.data;
      });
    },
    chatTo(item) {
      this.$router.push({
        path: "/user",
        query: { index: "first", nav: 2, chaterId: item.chater.stuId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/common.scss";
.isselected {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  min-height: 450px;
  .list-con {
    width: 100%;
    height: 120px;
    border: 1px solid $blank;
    border-radius: 5px;
    background: #fff;
    margin: 10px 0;
    overflow: hidden;
    cursor: pointer;
    .apply,
    .chat {
      height: 100%;
      display: flex;
      align-items: center;
    }
    // 未看的样式
    .noSee {
      // background: rgba($color: $light, $alpha: 0.1);
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 10px;
        top: 10px;
        width: 10px;
        height: 10px;
        background: $red;
        border-radius: 50%;
      }
    }
    &:hover {
      border: 1px solid $blue;
    }
    .list-photo {
      height: 80px;
      width: 80px;
      padding: 0 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .list-left {
      flex: 0 1 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .list-left-up {
        font-size: 16px;
        color: $blue;
        span {
          display: inline-block;
          font-weight: 600;
        }
      }
      .list-left-down {
        height: 25px;
        width: 100%;
        font-size: 16px;
        margin: 2px 0;
        color: $black;
      }
      .list-left-action {
        font-size: 12px;
        color: $light;
        height: 34px;
      }
    }
    .list-right {
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      a {
        display: block;
        width: 80px;
        height: 35px;
        line-height: 35px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
        font-size: 15px;
        &:hover {
          opacity: 0.8;
        }
      }
      .del {
        background: $red;
        // width: 60px;
      }
    }
  }
}
</style>
