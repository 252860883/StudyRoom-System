<template>
  <div class="classClock">
      <div class="class-left">
          <img :src="require('../assets/img/clock-img.png')">
      </div>
      <div class="class-right">
            <p class="class-title">
                <span class="class-no" v-if="hasClass">
                    <span class="class-up">哇哦,</span>
                    <span>今天暂时还没有自习通知哦！</span>
                </span>
                <span class="class-yes" v-if="!hasClass">
                    <span class="class-up">童鞋，有自习安排呦</span>
                    <span>2018-05-02 / 一公教C座101 / 英语复习</span>
                    <a>查看详情</a>
                </span>
            </p>
          <p class="class-con"></p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasClass: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.classClock {
  padding: 20px;
  width: 650px;
  margin: 0 auto;
  .class-left {
    float: left;
    img {
      width: 250px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
  }
  .class-right {
    float: right;
    .class-title {
      .class-no {
        text-align: center;
        color: $blue;
        .class-up {
          display: block;
          font-size: 30px;
        }
        display: block;
        font-size: 25px;
        margin-top: 80px;
      }
      .class-yes {
        text-align: center;
        font-size: 20px;
        color: $light;
        .class-up {
          display: block;
          font-size: 30px;
          color: #ea9518;
          margin-top: 40px;
          margin-bottom: 15px;
        }
        a {
          display: block;
          width: 100px;
          margin: 0 auto;
          height: 40px;
          line-height: 40px;
          background: $blue;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          margin-top: 26px;
          cursor: pointer;
          font-size: 15px;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>


