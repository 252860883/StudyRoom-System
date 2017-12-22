<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <div class="list-con" v-for="item in tableData">
      <div class="list-left">
        <span class="list-date">{{item.date}}</span>
        <span class="list-build">{{item.build}}{{item.roomId}}</span>
        <span class="list-title">{{item.title}}</span>
      </div>
      <div class="list-right">
        <a @click="toDetail(item)">查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          build: "一公教A座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        },
        {
          date: "2016-05-02",
          build: "一公教C座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        },
        {
          date: "2016-05-02",
          build: "一公教C座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        },
        {
          date: "2016-05-02",
          build: "一公教C座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        },
        {
          date: "2016-05-02",
          build: "一公教C座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        },
        {
          date: "2016-05-02",
          build: "一公教C座",
          roomId: "101",
          title: "英语复习",
          created: "死学霸",
          allNum: 60,
          hasNum: 10
        } 
      ]
    };
  },
  methods: {
    toDetail(room) {
      this.$router.push({ path: "/roomdetail", query: {room:room }});
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
      .list-date {
        font-size: 30px;
        line-height: 100px;
        color: $light;
        margin-left: 10px;
      }
      .list-build {
        font-size: 30px;
        line-height: 100px;
        color: $light;
        margin-left: 50px;
      }
      .list-title {
        font-size: 30px;
        line-height: 100px;
        color: $light;
        margin-left: 50px;
      }
    }
    .list-right {
      float: right;
      height: 100px;
      a {
        display: block;
        width: 100px;
        height: 45px;
        line-height: 45px;
        background: $blue;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin-top: 26px;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
