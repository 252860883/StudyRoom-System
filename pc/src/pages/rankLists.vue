<template>
    <!-- 排行榜 -->
    <div class="rank">
      <div class="title">
        <img src="../assets/img/rank/rank-title-white.png" alt="">
      </div>
      <div class="nav">
        <span class="index">排名</span>
        <span class="name" >姓名</span>
        <span class="school">学校/专业</span>
        <span class="number">自习数</span>
        <span class="level">段位</span>
        <span class="praise">点赞</span>
      </div>

      <div :class="{selfItem:index==userRank,rankItem:true,golden:index<3}" v-for="(item,index) in rankLists" :key="item.stuId">
        <span class="index">
          <img v-if="index<3" src="../assets/img/rank/rank-winner-icon.png" alt="">
          {{index+1}}
        </span>
        <span class="name">{{item.name}}</span>
        <span class="school">{{item.school}} / {{item.major}}</span>
        <span class="number">{{item.hasNumber}}</span>
        <span class="level">{{item.hasNumber | judgeLevel}}</span>
        <div class="praise">
          <span  v-if="!item.isPraise" @click="clickPraise(item)">
            <img src="../assets/img/rank/promise-off2.png" alt="">
          </span>
          <span v-else>
            <img src="../assets/img/rank/promise-off.png" alt="">            
          </span>
          <span class="number">{{item.praise|| 0}}</span>
        </div>
      </div>

    </div>
</template>
<script>
import { judgeLevel } from "../lib/level";
export default {
  data() {
    return {
      rankLists: [],
      userData: "",
      userRank: ""
    };
  },
  created() {
    this.getRankLists();
  },
  filters: {
    judgeLevel(num) {
      return judgeLevel(num);
    }
  },
  methods: {
    getRankLists() {
      let self = this;
      this.$http.get("/getRankLists").then(res => {
        console.log(res.data);
        self.rankLists = res.data.rankLists;
        self.userData = res.data.selfInfo;
        self.userRank = res.data.selfRank;
      });
    },
    clickPraise(item) {
      console.log(item);
      let self = this;
      this.$http
        .get("/clickPromise", {
          params: {
            stuId: item.stuId,
            praise: ++item.praise || 1
          }
        })
        .then(() => {
          self.getRankLists();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.rank {
  width: 800px;
  margin: 10px auto;
  margin-bottom: 50px;
  padding: 20px;
  background: $blank;
  border-radius: 5px;

  .title {
    color: $blue;
    text-align: center;
    font-weight: bold;
    font-size: 35px;
    padding-bottom: 10px;
    img {
      height: 100px;
      width: 450px;
    }
  }
  .index {
    flex: 0 1 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
  }
  .name {
    flex: 0 1 150px;
  }
  .school {
    flex: 0 1 300px;
  }
  .number,
  .level,
  .praise {
    flex: 0 1 130px;
    img {
      width: 18px;
      height: 18px;
      vertical-align: top;
    }
    .number {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      text-align: left;
    }
  }
  .nav {
    width: 100%;
    height: 45px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    color: $orange;
  }
  .rankItem {
    display: flex;
    width: 100%;
    height: 45px;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #194f80;
    font-size: 14px;
    margin: 8px 0;
  }
  .selfItem {
    background: rgba($color: $orange, $alpha: 0.8);
    border-radius: 50px;
    color: #fff;
  }
  .golden {
    .index {
      color: #e3c24d;
    }
  }
}
</style>


