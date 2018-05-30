<template>

<div class="userShow">
  <img @click="userInfoClick" class="rename" :src="require('../assets/img/rename.png')">
  <div class="photo">
    <img  :src="user.avatorUrl" alt="">
  </div>
  <p class="name">{{user.name}}</p>
  <p class="school"><span>{{user.school}}</span> | <span>{{user.major}}</span> </p>
  <div class="award-con"> 
    <img :src="require('../assets/img/award.png')">
    <div class="award-text">
      <span class="award-title">{{level}}</span>
    </div>
  </div>

  <div class="award-rank" @click="toRankList">
    <img src="../assets/img/rank-icon.png" alt="">
      <span class="award-num">段位排行榜</span>
  </div>

</div>

</template>
<script>
import { judgeLevel } from "../lib/level";
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
      },
      level: "自习萌新"
    };
  },
  watch: {
    userdata: function(n, o) {
      this.user = n;
      // console.log(judgeLevel);
      this.level = judgeLevel(n.hasRoomLists.length);
    }
  },
  methods: {
    userInfoClick() {
      this.$emit("showUserChange");
    },
    toRankList() {
      this.$router.push({ path: "/ranklists" });
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
  margin-bottom: 60px;
  position: relative;
  background: rgba($color: #eee, $alpha: 0.5);
  border-radius: 5px;
  color: $light;
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
    // background: $light;
    border-radius: 50%;
    margin: 20px auto;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .school {
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
  }

  .award-con {
    width: 180px;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 22px;
    }
    .award-text {
      span {
        display: block;
      }
      .award-title {
        font-size: 18px;
        font-weight: bold;
        color: #ea9518;
      }
    }
  }
  .award-rank {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba($color: #eee, $alpha: 0.8);
    border-radius: 5px;
    width: 100%;
    height: 50px;
    bottom: -55px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 35px;
      height: 35px;
    }
    .award-num {
      font-size: 18px;
      font-weight: bold;
      color: $orange;
      margin-left: 8px;
    }
  }
}
</style>
