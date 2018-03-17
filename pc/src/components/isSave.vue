<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <div class="list-con" v-for="(item,index) in tableData" :key="index">
      <div class="list-left">
        <div class="list-left-up">
          <span class="list-date">{{item.roomRecord.moon}}月{{item.roomRecord.day}}日</span>
          <span class="list-build">{{item.roomRecord.roomInfo.build}} {{item.roomRecord|roomNumber}}</span>
          <span class="list-title">{{item.roomRecord.title}}</span>
        </div>
        <div class="list-left-down">
          <span>简介：{{item.roomRecord.action}}</span>
        </div>
      </div>
      <div class="list-right">
        <a @click="toDetail(item)">查看详情</a>
        <a class="del" @click="toDetail(item)">删除</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasCollectLists: {
      type: Array
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    hasCollectLists: function(n, o) {
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
      this.$router.push({ path: "/roomdetail", query: { room: room } });
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
      line-height: 70px;
      padding-left: 20px;
      .list-left-up {
        height: 30px;
        font-size: 20px;
        color: $black;
        .list-date {
          // margin-left: 20px;
        }
        .list-build {
          margin-left: 50px;
        }
        .list-title {
          margin-left: 50px;
        }
      }
      .list-left-down {
        height: 25px;
        width: 100%;
        font-size: 16px;
        color: $light;
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
