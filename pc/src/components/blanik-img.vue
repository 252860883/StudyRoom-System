<template>
  <div class="blank-img">
      <img src="../assets/img/pic/nolist-img.png" alt="">
      <p>{{content}}</p>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.blank-img {
  text-align: center;
  padding: 80px;
  img {
    width: 200px;
  }
  p {
    font-size: 18px;
    color: $light;
    font-weight: 600;
  }
}
</style>

