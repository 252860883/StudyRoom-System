<template>
<div class="userShow">
  <div class="photo">

  </div>
  <p class="name">{{user.name}}</p>
  <p class="school"><span>{{user.school}}</span> | <span>{{user.major}}</span> </p>
  <div class="award-con">
    <img :src="require('../assets/img/award.png')">
    <div class="award-text">
      <span class="award-title">自习室达人</span>
      <span class="award-num">您已经累计20课时自习</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
      return{
        user:{
          name:"杜小辉",
          photo:"",
          school:"天津工业大学",
          major:"软件工程"
        }
      }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.userShow{
  width: 100%;
  margin: 0 auto;
  .photo{
    width: 100px;
    height: 100px;
    background: $light;
    border-radius: 50%;
    margin: 20px auto;
  }
  .name{
    text-align: center;
    font-size: 20px;
    color: $black;
    font-weight: bold;
  }
  .school{
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
    color: $black;
  }
  .award-con{
    width: 180px;
    margin: 20px auto;
    img{
      float: left;
      width: 50px;
    }
    .award-text{
      span{
        display: block;
      }
      .award-title{
        font-size: 25px;
        font-weight: bold;
        color: #e16531;
      }
      .award-num{
        font-size: 12px;
        color: #ea9518;
      }
    }
  }
}

</style>
