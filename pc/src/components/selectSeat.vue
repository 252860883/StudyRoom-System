<template>
  <div class="prompt" >
    <div class="mask"></div>
    <div class="content">
      <div class="title">
        请确认信息
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.prompt {
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .content {
    position: fixed;
    z-index: 21;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -190px;
    width: 600px;
    height: 380px;
    background: #fff;
    border-radius: 8px;
  }
}
</style>

