<template>
<!-- 待审核的课程 -->
  <div class="isselected">
    <div class="list-con" v-for="(item,index) in tableData" :key="index">
      <div class="list-left">
        <div class="list-left-up">
          <span class="list-date">{{item.roomRecord.moon}}月{{item.roomRecord.day}}日</span>/
          <span class="list-build">{{item.roomRecord.roomInfo.build}} {{item.roomRecord|roomNumber}}</span>/
          <span class="list-title">座位{{item.seatIndex}}号</span>
        </div>
        <div class="list-left-down">
          <span>标题：{{item.roomRecord.title}}</span>
          <span>简介：{{item.roomRecord.action}}</span>
        </div>
      </div>
      <div class="list-right">
        <a @click="toDetail(item)">查看详情</a>
        <a class="del" @click="deleteReview(item)">删除</a>
      </div>
    </div>
    <blank-img v-if="!tableData.length" content='啊哦，您还没有待审核的自习信息'></blank-img>
  </div>
</template>

<script>
import blankImg from "../components/blanik-img";
export default {
  props: {
    reviewRoomLists: {
      type: Array
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  components: {
    blankImg
  },
  watch: {
    reviewRoomLists: function(n, o) {
      this.tableData = n;
    }
  },
  filters: {
    roomNumber(room) {
      if (room.roomInfo.number < 10) {
        return room.roomInfo.floor + "0" + room.roomInfo.number;
      } else {
        return room.roomInfo.floor + "" + room.roomInfo.number;
      }
    }
  },
  methods: {
    toDetail(room) {
      this.$router.push({
        path: "/roomdetail",
        query: { roomId: room.roomRecord._id, empty: false }
      });
    },
    deleteReview(room) {
      console.log(room);
      this.$http
        .get("/delReviewList", {
          params: {
            addId: room.roomRecord.stuInfo.stuId,
            roomId: room.roomRecord._id
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
  .list-con {
    width: 100%;
    height: 100px;
    border: 1px solid $blank;
    border-radius: 5px;
    background: #fff;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      border: 1px solid $blue;
    }
    .list-left {
      float: left;
      line-height: 60px;
      padding-left: 20px;
      .list-left-up {
        height: 30px;
        font-size: 20px;
        color: $black;
        margin: 0 7px;
        span {
          margin: 0 8px;
        }
      }
      .list-left-down {
        width: 100%;
        color: $light;
        margin-left: 15px;
        margin-top: 13px;
        span {
          display: block;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    .list-right {
      float: right;
      height: 100px;
      a {
        display: inline-block;
        width: 90px;
        height: 40px;
        line-height: 40px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin-top: 26px;
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
