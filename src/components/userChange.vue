<template>
  <div class="user-change">
    <div class="user-con">
      <div class="user-row">
        <span>姓名</span>
        <input type="text" v-model="name">        
      </div>
      <div class="user-row">
        <span>学校</span>
        <input type="text" v-model="school">        
      </div>
      <div class="user-row">
        <span>专业</span>
        <input type="text" v-model="major">        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "杜杜杜",
      school: "123",
      major: "233"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.user-change {
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 60px;
  box-sizing: border-box;
  // background: $blank;
  color:$black;
  .user-con {
    .user-row{
      width: 300px;
      margin: 10px auto;
      span{
        font-size: 20px;
        margin-right:30px; 
        vertical-align: middle;
      }
      input{
        height: 30px;
        width: 200px;
        border-radius: 3px;
        border: 1px solid $light;
      }
    }
  }
}
</style>


