<template>
  <div class="user">
      <div class="user-left">
        <user-show :userdata='userData' @showUserChange="showUserChange=true;"></user-show>
        <!-- 导航 -->
        <div class="nav">
          <p><i v-if="navNo==1"></i>个人中心</p>
          <p @click="toChat"><i v-if="navNo==2" ></i>对话/申请</p>
          <p @click="editClick"><i v-if="navNo==3"></i>退出账号</p>
        </div>
      </div>
      <div class="user-right">
        <!-- 导航页 -->
        <el-tabs v-if="!showUserChange" v-model="activeName">
            <el-tab-pane label="自习提醒" name="first">
              <class-clock ></class-clock>
            </el-tab-pane>
            <el-tab-pane label="已预约" name="second" >
                <is-select-page :hasRoomLists='userData.hasRoomLists' @updateData="getUserData"></is-select-page>
            </el-tab-pane>
            <el-tab-pane label="待审核" name="third">
              <is-review :reviewRoomLists="userData.reviewRoomLists" @updateData="getUserData"></is-review>
            </el-tab-pane>
            <el-tab-pane label="收藏夹" name="forth">
                <is-collect-page :hasCollectLists='userData.collectRoomLists' @updateData="getUserData"></is-collect-page>
            </el-tab-pane>
            <el-tab-pane label="消息" name="fifth">
              <remind :remindLists="userData.remind" @updateData="getUserData"></remind>
            </el-tab-pane>
        </el-tabs>
        <!-- 修改个人信息 -->
        <el-tabs v-else v-model="userchangeIndex" >
          <el-tab-pane label="修改资料" name="first" >
              <user-change @returnBack='showUserChange=false' @modifyBack="getUserData" ></user-change>
          </el-tab-pane>
        </el-tabs>

      </div>

      <!-- 弹框 -->
      <toast content="确定要退出登录吗？" v-if="showToast" @reset="showToast=false" @promise="edit"></toast>
  </div>
</template>
<script>
import isSelectPage from "../components/isSeleted";
import isCollectPage from "../components/isSave";
import userShow from "../components/userShow";
import isReview from "../components/isreview";
import classClock from "../components/classClock";
import remind from "../components/remind";
import toast from "../components/toast";
import userChange from "../pages/userChange";
import io from "socket.io-client";
export default {
  data() {
    return {
      activeName: "second",
      userchangeIndex:'first',
      userData: {},
      navNo: 1,
      showToast: false,
      showUserChange:false,
      
    };
  },
  components: {
    isSelectPage,
    userShow,
    classClock,
    isCollectPage,
    isReview,
    remind,
    toast,
    userChange
  },
  created() {
    let self = this;
    this.activeName = this.$route.query.index;
    this.getUserData();
  },
  watch: {
    "$route.query.index": function(val) {
      this.activeName = this.$route.query.index;
    }
  },
  methods: {
    getUserData() {
      let self = this;
      this.showUserChange=false;
      this.$http
        .get("/user", {
          params: {
            stuId: 1411651103
          }
        })
        .then(res => {
          self.userData = res.data.data;
        });
    },
    // 退出登陆
    editClick() {
      this.showToast = true;
    },
    // 聊天
    toChat() {
      let serverPath = `${location.protocol}//${location.host}:4000`;
      // const socket = io(serverPath);
      const socket = io("http://localhost:4000");
      socket.on("name", function(data) {
        alert(data.username);
        socket.emit("my other event", { my: "爱你哦" });
      });
    },
    // 退出账号
    edit() {
      let self = this;
      this.$http.post("/edit").then(res => {
        self.$router.replace("/login");
      });
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
    width: 250px;
    // height: 300px;
    // background: rgba($color: #eee, $alpha: 0.5);
    border-radius: 5px;
    margin: 10px;
    float: left;

    .nav {
      background: rgba($color: #eee, $alpha: 0.5);
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
      p {
        height: 50px;
        line-height: 50px;
        text-align: center;
        // padding-left: 50px;
        color: $blue;
        border-bottom: 1px solid $blank;
        cursor: pointer;
        position: relative;
        &:last-child {
          border: 0;
        }
        &:hover {
          background: $blue;
          color: #fff;
        }

        i {
          position: absolute;
          display: block;
          width: 5px;
          height: 36px;
          top: 7px;
          left: 0;
          background: $blue;
        }
      }
    }
    .isnav {
      color: red;
    }
  }
  .user-right {
    width: 810px;
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

