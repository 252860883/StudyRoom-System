<template>
  <div class="user">
      <div class="user-left"></div>
      <div class="user-right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="自习提醒" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="已预约的自习" name="second">
                <is-select-page></is-select-page>
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import isSelectPage from '../components/isSeleted';
export default {
  data() {
    return {};
  },
  components:{
      isSelectPage
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
  .user-left {
    width: 300px;
    height: 300px;
    background: rgba($color: #eee, $alpha: 0.5);
    // border: 1px solid $blank;
    border-radius: 5px;
    margin: 10px;
    float: left;
  }
  .user-right {
    width: 760px;
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

