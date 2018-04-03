<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <div class="list-con" v-for="(item,index) in tableData" :key="index">
      <div  class="list-photo">
        <img src="../assets/img/pic/userPhoto-default.png" alt="">
      </div>
      <div class="list-left">
        <div class="list-left-up">
          <span>{{item.name}}</span> /
          <!-- <span>{{item.stuId}}</span> -->
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
      tableData: [
        // {
        //   roomInfo: {
        //     roomInfo: {
        //       build: ""
        //     }
        //   }
        // }
      ]
    };
  },
  watch: {
    remindLists: function(n, o) {
      // console.log(n);
      this.tableData = n;
    }
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
  components: {
    blankImg
  },
  methods: {
    agree(room) {
      console.log(room);

      this.$http
        .get("/agree", {
          params: {
            roomId: room.roomInfo._id,
            stuId: 1411651103,
            remindId: room._id,
            addId: room.stuId,
            seatIndex: room.seatIndex
          }
        })
        .then(res => {
          this.$emit("updateData");
        });
    },
    disagree(room) {
      this.$http
        .get("/disagree", {
          params: {
            roomId: room.roomInfo._id,
            stuId: 1411651103,
            remindId: room._id,
            addId: room.stuId
          }
        })
        .then(res => {
          this.$emit("updateData");
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
  height: 450px;
  .list-con {
    width: 100%;
    height: 120px;
    border: 1px solid $blank;
    border-radius: 5px;
    background: #fff;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      border: 1px solid $blue;
    }
    .list-photo {
      float: left;
      height: 100%;
      width: 80px;
      position: relative;
      padding: 0 20px;

      img {
        position: absolute;
        top: 50%;
        margin-top: -40px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .list-left {
      float: left;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .list-left-up {
        font-size: 16px;
        color: $blue;
        span{
          display: inline-block;
          font-weight: 600;

        }
      }
      .list-left-down {
        height: 25px;
        width: 100%;
        font-size: 16px;
        margin:2px 0;
        color: $black;
      }
      .list-left-action{
        font-size: 12px;
        color: $light;
      }
    }
    .list-right {
      float: right;
      height: 120px;
      a {
        display: inline-block;
        width: 90px;
        height: 40px;
        line-height: 40px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin-top: 40px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 15px;
        &:hover {
          opacity: 0.8;
        }
      }
      .del {
        background: $red;
        width: 60px;
      }
    }
  }
}
</style>
