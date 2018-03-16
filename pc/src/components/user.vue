<template>
  <div class="user">
      <div class="user-left">
        <user-show :userdata='userData'></user-show>
      </div>
      <div class="user-right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="自习提醒" name="first">
              <class-clock ></class-clock>
            </el-tab-pane>
            <el-tab-pane label="已预约的自习" name="second">
                <is-select-page :hasRoomLists='userData.hasRoomLists'></is-select-page>
            </el-tab-pane>
            <el-tab-pane label="收藏夹" name="third">
                <!-- <is-select-page></is-select-page> -->
            </el-tab-pane>
            <el-tab-pane label="申请消息" name="forth">
              <!-- <class-clock></class-clock> -->
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import isSelectPage from "../components/isSeleted";
import userShow from "../components/userShow";
import classClock from "../components/classClock";
export default {
  data() {
    return {
      activeName: "second",
      userData:{}
    };
  },
  components: {
    isSelectPage,
    userShow,
    classClock
  },
  created() {
    let self = this;
    this.activeName = this.$route.query.index;
    this.$http
      .get("/user", {
        params: {
          stuId: 1411651101
        }
      })
      .then(res => {
        self.userData = res.data.data;
      });
  },
  watch: {
    "$route.query.index": function(val) {
      this.activeName = this.$route.query.index;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/common.scss";
.user {
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  .user-left {
    width: 280px;
    height: 300px;
    background: rgba($color: #eee, $alpha: 0.5);
    border-radius: 5px;
    margin: 10px;
    float: left;
  }
  .user-right {
    width: 780px;
    // height: 500px;
    border-radius: 5px;
    margin: 10px;
    float: right;
    background: rgba($color: #eee, $alpha: 0.5);
    .el-tabs__nav {
      height: 50px;
    }
    .el-tabs__nav {
      margin-left: 20px;
      margin-top: 10px;
    }
  }
}
</style>

