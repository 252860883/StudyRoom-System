<template>
  <div class="toast">
    <div class="content">
      <!-- <div class="bar">提醒</div> -->
      <div class="text">{{content}}</div>
      <div class="btn_group">
        <div class="reset" @click="reset">取消</div>
        <div class="promise" @click="promise">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    content:{
      type:String
    }
  },
  data(){
    return{

    }
  },
  methods:{
    reset(){
      this.$emit('reset');
    },
    promise(){
      this.$emit('promise');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/common.scss";
.toast{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content{
    width: 340px;
    padding: 20px;
    background: #fff;
    text-align: center;
    box-shadow: 0 0 20px 8px rgba($color: #000000, $alpha: .1);
    border-radius: 6px;
    border: 1px solid $blank;
    overflow: hidden;
    .bar{
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-weight: 700;
      width:100%;
      background: $blue;
      text-align: center;
    }
    .text{
      font-size: 18px;
      color: $light;
      font-weight: 700;
      padding: 30px;
    }
    .btn_group{
      display: flex;
      justify-content: center;
      .reset,.promise{
        width: 80px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        background: $light;
        color: #fff;
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;
      }
      .promise{
        background: $blue;
      }
    }
  }
}

</style>


