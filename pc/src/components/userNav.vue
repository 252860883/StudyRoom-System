<template>
  <div>
    <el-tabs  v-model="activeName">
        <el-tab-pane label="自习提醒" name="first">
            <!-- <class-clock ></class-clock> -->
        </el-tab-pane>
        <!-- <el-tab-pane label="已预约" name="second" >
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
        </el-tab-pane> -->
    </el-tabs>

  </div>
</template>
<script>
// import isSelectPage from "./isSeleted";
// import isCollectPage from "./isSave";
// import isReview from "./isreview";
// import classClock from "./classClock";
// import remind from "./remind";

export default {
  data() {
    return {
      userData: "",
      activeName: "first"
    };
  },
  components: {
    // isSelectPage,
    // classClock,
    // isCollectPage,
    // isReview,
    // remind
  },
  created() {
    // this.activeName = this.$route.query.index;
    this.getUserData();
  },
  methods: {
    getUserData() {
      let self = this;
      this.showUserChange = false;
      this.$http.get("/user", {}).then(res => {
        self.userData = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>


