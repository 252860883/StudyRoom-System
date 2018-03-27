<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <div class="list-con" v-for="(item,index) in tableData" :key="index">
      <div v-if="item.isCreater" class="creater-icon">
        <img src="../assets/img/room/creater-icon.png" alt="">
      </div>
      <div class="list-left">
        <!-- 这里要加一个管理员的标识 -->
        
        <div class="list-left-up">
          <span class="list-date">{{item.roomRecord.moon}}月{{item.roomRecord.day}}日</span> /
          <span class="list-build">{{item.roomRecord.roomInfo?item.roomRecord.roomInfo.build:""}} {{item.roomRecord|roomNumber}}</span> /
          <span class="list-title">座位{{item.seatIndex}}号</span>
        </div>
        <div class="list-left-down">
          <span>标题：{{item.roomRecord.title }}</span>
          <span>简介：{{item.roomRecord.action}}</span>
        </div>
      </div>
      <div class="list-right">
        <a @click="toDetail(item)">查看详情</a>
        <!-- 管理员不能删除自习室 -->
        <a class="del" v-if="!item.isCreater" @click="deleteRoom(item)">删除</a>
        <a class="del" v-else style="background:#bbb">删除</a>
      </div>
    </div>
      <blank-img v-if="!tableData.length" content='啊哦，还没有已选择自习的信息'></blank-img>
  </div>
</template>

<script>
import blankImg from "../components/blanik-img";

export default {
  props: {
    hasRoomLists: {
      type: Array
    }
  },
  data() {
    return {
      tableData: [
        {
          roomRecord: {
            roomInfo: {
              build: ""
            }
          }
        }
      ]
    };
  },
  components: {
    blankImg
  },
  watch: {
    hasRoomLists: function(n, o) {
      this.tableData = n;
    }
  },
  filters: {
    roomNumber(room) {
      if (!room.roomInfo) {
        return;
      }
      if (room.roomInfo.number < 10) {
        return room.roomInfo.floor + "0" + room.roomInfo.number;
      } else {
        return room.roomInfo.floor + "" + room.roomInfo.number;
      }
    }
  },
  methods: {
    // 查看详情
    toDetail(room) {
      // console.log(room);
      this.$router.push({
        path: "/roomdetail",
        query: { roomId: room.roomRecord._id, empty: false }
      });
    },
    deleteRoom(room) {
      this.$http
        .get("/delHasList", {
          params: {
            roomId: room.roomRecord._id,
            stuId: 1411651103,
            seatIndex: room.seatIndex
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
    position: relative;
    overflow: hidden;
    &:hover {
      border: 1px solid $blue;
    }
    .creater-icon {
      position: absolute;
      top: 0;
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .list-left {
      float: left;
      line-height: 50px;
      padding-left: 50px;
      max-width: 540px;
      .list-left-up {
        height: 30px;
        font-size: 20px;
        color: $blue;
        span {
          margin: 0 5px;
          line-height: 50px;
          // font-weight: 500;
        }
      }
      .list-left-down {
        width: 100%;
        height: 46px;
        overflow: hidden;
        color: $light;
        margin-left: 5px;
        margin-top: 13px;
        span {
          display: block;
          font-size: 14px;
          line-height: 23px;
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
