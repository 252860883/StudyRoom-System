<template>
  <div class="room-detail">
    <div class="seats">
      <div class="desk">讲台</div>
      <div class="seats-border">
        <div class="seats-one" v-for="i in room.hasNum" :key="i">
          <img :src="require('../assets/img/seat-on.png')" alt="">
        </div>
        <div class="seats-one" v-for="i in (room.allNum-room.hasNum)" :key="i">
          <img :src="require('../assets/img/seat-off.png')" alt="">
        </div>
      </div>
    </div>
    <!-- 右侧信息 -->
    <div class="detail">
        <div class="title">{{room.build}}{{room.roomId}}</div>
        <div><span>创建者：</span><span>{{room.created ||'暂无'}}</span></div>
        <div>简介：{{room.content || '暂无'}}</div>
        <!-- 按钮区 -->
        <div class="btn-group">
          <div class="addClass">
            <div class="yes" v-if="room.created">
              <img :src="require('../assets/img/btn-addClass.png')" alt="">
              <p>加入我们</p>
            </div>
            <div class="no" v-if="!room.created">
              <img :src="require('../assets/img/btn-addClass-no.png')" alt="">
              <p>加入自习</p>
            </div>
          </div>
          <div class="create">
            <img :src="require('../assets/img/btn-save.png')" alt="">
            <p>加入收藏</p>
          </div>
          <div class="createClass">
            <div class="create-yes" v-if="!room.created">
              <img :src="require('../assets/img/btn-addCreate.png')" alt="">
              <p>成为管理员</p>
            </div>
            <div class="create-no" v-if="room.created"> 
              <img :src="require('../assets/img/btn-addCreate-no.png')" alt="">
              <p>成为管理员</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: {}
    };
  },
  created() {
    //这里刷新数据就会消失
    this.room = this.$route.query.room;
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss"  scoped>
@import "../assets/common.scss";

.room-detail {
  width: 1200px;
  margin: 0 auto;
  .seats {
    width: 500px;
    height: 500px;
    background: $blank;
    margin-top: 10px;
    box-sizing: border-box;
    float: left;
    .desk {
      width: 500px;
      margin: 0 auto;
      height: 30px;
      background: #ccc;
      color: $blank;
      text-align: center;
      line-height: 30px;
    }
    .seats-border {
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      .seats-one {
        float: left;
        width: 40px;
        height: 40px;
        padding: 8px;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .detail {
    float: right;
    width: 500px;
    // height: 200px;
    margin-top: 10px;
    text-align: center;

    .title {
      font-size: 40px;
      color: $blue;
      width: 280px;
      margin: 0 auto;
    }

    .btn-group {
      text-align: center;
      width: 400px;
      margin: 50px auto;
      .addClass,.createClass {
        float: left;
        cursor: pointer;
        position: relative;
        margin: 0 20px;
        text-align: center;
        width: 90px;
        height: 100px;
        .yes,.create-yes{
          position: absolute;
          top: 0;
          width: 90px;
          height: 100px;
          border: 1px solid $blue;
          border-radius: 5px;
          background: #fff;
          img {
            margin-top: 10px;
            width: 50px;
          }
          p {
            margin-top: 5px;
            font-size: 12px;
          }
        }
        .no,.create-no {
          position: absolute;
          top: 0;
          width: 90px;
          height: 100px;
          border: 1px solid $blank;
          border-radius: 5px;
          background: #ddd;
          img {
            margin-top: 10px;
            width: 50px;
          }
          p {
            margin-top: 5px;
            font-size: 12px;
            color: $light;
          }
        }
      }
      .create {
        cursor: pointer;
        float: left;
        width: 90px;
        height: 100px;
        margin: 0 20px;
        border: 1px solid $blue;
        background: #fff;
        border-radius: 5px;
        text-align: center;
        img {
          margin-top: 10px;
          width: 50px;
        }
        p {
          margin-top: 5px;
          font-size: 12px;
        }
      }

      .create-yes:hover,
      .create:hover,
      .addClass .yes:hover {
        transform: translateY(-2px);
      }
    }
  }
}
</style>

