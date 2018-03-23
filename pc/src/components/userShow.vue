<template>

<div class="userShow">
  <img @click="userInfoClick" class="rename" :src="require('../assets/img/rename.png')">
  <div class="photo"></div>
  <p class="name">{{user.name}}</p>
  <p class="school"><span>{{user.school}}</span> | <span>{{user.major}}</span> </p>
  <div class="award-con"> 
    <img :src="require('../assets/img/award.png')">
    <div class="award-text">
      <span class="award-title">自习室小白</span>
      <span class="award-num">您已经累计{{user.hasRoomLists.length}}课时自习</span>
    </div>
  </div>
</div>

</template>
<script>
export default {
  props: {
    userdata: {
      type: Object
    }
  },
  data() {
    return {
      user: {
        hasRoomLists: []
      }
    };
  },
  watch: {
    userdata: function(n, o) {
      this.user = n;
    }
  },
  methods: {
    userInfoClick() {
      this.$router.push({ path: "/userinfo" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.userShow {
  width: 100%;
  margin: 0 auto;
  padding: 5px 0;
  position: relative;
  background: rgba($color: #eee, $alpha: 0.5);
  border-radius: 5px;
  .rename {
    position: absolute;
    width: 20px;
    top: 10px;
    right: 8px;
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  }
  .photo {
    width: 100px;
    height: 100px;
    background: $light;
    border-radius: 50%;
    margin: 20px auto;
  }
  .name {
    text-align: center;
    font-size: 20px;
    color: $black;
    font-weight: bold;
  }
  .school {
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
    color: $black;
  }
  .award-con {
    width: 180px;
    margin: 20px auto;
    img {
      float: left;
      width: 50px;
    }
    .award-text {
      span {
        display: block;
      }
      .award-title {
        font-size: 25px;
        font-weight: bold;
        color: #e16531;
      }
      .award-num {
        font-size: 12px;
        color: #ea9518;
      }
    }
  }
}
</style>
