<template>
    <!-- 排行榜 -->
    <div class="rank">
      <div class="title">段位排行榜</div>
      <div class="nav">
        <span class="index">排名</span>
        <span class="name" >姓名</span>
        <span class="school">学校/专业</span>
        <span class="number">自习数</span>
        <span class="level">段位</span>
        <span class="praise">操作</span>
      </div>

      <div :class="{selfItem:index==userRank,rankItem:true}" v-for="(item,index) in rankLists" :key="item.stuId">
        <span class="index">{{index+1}}</span>
        <span class="name">{{item.name}}</span>
        <span class="school">{{item.school}}{{item.major}}</span>
        <span class="number">{{item.hasNumber}}</span>
        <span class="level">{{item.hasNumber | judgeLevel}}</span>
        <div class="praise">
          <span v-if="!item.isPraise" @click="clickPraise(item)">点赞</span>
          <span v-else>已点</span>
          <span>({{item.praise|| 0}})</span>
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
      let self=this;
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
  width: 1000px;
  margin: 10px auto;
  padding: 20px;
  background: $blank;
  border-radius: 5px;
  .title {
    color: $blue;
    text-align: center;
    font-weight: bold;
    font-size: 35px;
    padding-bottom: 10px;
  }
  .index {
    flex: 0 1 100px;
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
    height: 50px;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: $black;
    font-size: 14px;
  }
  .selfItem{
    background: rgba($color: $orange, $alpha: 0.8);
    border-radius: 5px;
    color: #fff;
  }
}
</style>


