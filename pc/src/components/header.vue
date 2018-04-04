<template>
<header v-if="this.$route.path!='/login' && this.$route.path!='/userinfo' ">
    <div class="con">
        <img :src="require('../assets/img/logo.png')" class="logo" @click="navClick('/')">
        <div class="btngroup">

            <div class="btn-border" @mouseover="iswhich=0" @mouseout="iswhich=-1" @click="navClick('/user','first',2)">
              <el-badge :value="newsNum">
                <img :src="require('../assets/img/icon-remind.png')" alt="消息通知" v-if="iswhich!=0">
                <img :src="require('../assets/img/icon-remind-on.png')" alt="消息通知" v-if="iswhich==0">    
              </el-badge>            
            </div>          

            <div class="btn-border" @mouseover="iswhich=1" @mouseout="iswhich=-1" @click="navClick('/user','second')">
                <img :src="require('../assets/img/icon-has.png')" alt="已添加的自习" v-if="iswhich!=1">
                <img :src="require('../assets/img/icon-has-on.png')" alt="已添加的自习" v-if="iswhich==1">                
            </div>

            <div class="btn-border" @mouseover="iswhich=2" @mouseout="iswhich=-1" @click="navClick('/user','first')">
                <img :src="require('../assets/img/icon-user-on.png')" alt="已添加的自习" v-if="iswhich==2">     
                <img :src="require('../assets/img/icon-user.png')" alt="个人中心" v-if="iswhich!==2">                 
            </div>

        </div>
    </div>
</header>
</template>

<script>
export default {
  data() {
    return {
      iswhich: -1,
      newsNum: 0
    };
  },
  watch: {
    iswhich: function(val, oldval) {},
    $route: function(nPath, oPath) {
      this.getRemind();
    }
  },
  mounted() {
    this.getRemind();
  },
  methods: {
    navClick(path, index, nav) {
      this.$router.push({ path: path, query: { index: index, nav: nav || 1 } });
    },
    getRemind() {
      let self = this;
      self.$http.get("/remind", {}).then(res => {
        self.newsNum = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/common.scss";
header {
  width: 100%;
  height: 48px;
  background: $blue;
  overflow: hidden;
  position: fixed;
  z-index: 100000;
  top: 0;
  .el-badge__content {
    height: 12px;
    width: 12px;
    text-align: center;
    line-height: 12px;
    padding: 1px;
  }
  .el-badge__content,.is-fixed {
    top: 15px !important;
  }
  .con {
    //   width: 1200px;
    margin: 0 auto;
    .logo {
      margin-top: 7px;
      margin-left: 30px;
      height: 34px;
      width: auto;
      cursor: pointer;
    }
    .btngroup {
      float: right;
      height: 48px;
      width: 200px;
      line-height: 18px;
      .btn-border {
        width: 60px;
        height: 48px;
        float: left;
        cursor: pointer;
        text-align: center;
        img {
          height: 20px;
          width: 20px;
          margin: 14px 0;
        }
        &:first-child {
          width: 50px;
          height: 100%;
          float: left;
          img {
            cursor: pointer;
            height: 30px;
            width: 30px;
            margin: 9px 0;
          }
        }
        &:hover {
          background: #fff;
        }
      }
    }
  }
  .el-badge__content.is-fixed {
    top: 18px;
    right: 15px;
  }
}
</style>
