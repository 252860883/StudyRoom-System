<template>
<div class="home">
    <div class="banner">
      <!-- <img :src="require('../assets/img/banner.jpg')" alt=""> -->
    </div>
    <div class="home-top">
        <div class="home-top-title">
            <p>
                <span class="con">选择自习地点</span> 
                <el-select v-model="buildName" placeholder="请选择">
                    <el-option v-for="item in buildLists" :key="item" :value="item">
                    </el-option>
                </el-select>
                <span class="con">选择楼层</span>
                <el-select v-model="vFloor" placeholder="请选择">
                    <el-option v-for="item in floorLists" :key="item" :value="item">
                    </el-option>
                </el-select>
                <span class="con">选择时间</span>
                <el-date-picker v-model="time" type="date" :clearable="false" :editable="false"></el-date-picker>
                <!-- <span class="con">查看已创建的房间</span> -->
                <button>确定</button>
            </p>
        </div>
    </div>
    <!-- 教室情况 -->
    <div class="home-seats">
        <div  v-for="room in roomLists" :key="room.roomId">
            <div v-if="room.created" class="room-border" @click="toDetail(room)">
                <span class="roomId">{{room.roomId}}</span>
                <span>容纳：{{room.allNum}}人 已预约：{{room.hasNum}}人</span>
                <span>创建者：{{room.created}}</span>
                <p>详情：{{room.content || '暂无详情介绍'}}</p>
            </div>
            <div v-if="!room.created" class="room-border-no" @click="toDetail(room)">
                <span class="roomId">{{room.roomId}}</span>
                <span>容纳：{{room.allNum}}人 已预约：{{room.hasNum}}人</span>
                <span>创建者：暂无</span>
                <p>详情：{{room.content || '暂无详情介绍'}}</p>
            </div>
        </div>
    </div>
</div>
  
</template>
<script>
export default {
  data() {
    return {
      buildName: "一公教A座",
      buildLists: ["一公教A座", "一公教B座", "一公教C座", "二公教A座", "二公教B座", "二公教C座"],
      vFloor: "1L",
      floorLists: ["1L", "2L", "3L", "4L", "5L"],
      time: new Date(),
      roomLists: [
        {
          roomId: "101",
          build:"一公教A座",
          created: "管理员",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 32,
          content: "复习英语四级和听力 ，希望大家可以踊跃报名参加，么么哒~"
        },
        {
          roomId: "102",
          build:"一公教A座",          
          created: "死学霸",
          time: "8:00-10:00",
          allNum: 100,
          hasNum: 59,
          content: "敢不敢和我决一死战，学到最晚"
        },
        {
          roomId: "103",
          build:"一公教A座",          
          created: "",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: ""
        },
        {
          roomId: "104",
          build:"一公教A座",          
          created: "",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: ""
        },
        {
          roomId: "105",
          build:"一公教A座",
          
          created: "",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: ""
        },
        {
          roomId: "106",
          build:"一公教A座",
          created: "",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: ""
        },
        {
          roomId: "107",
          build:"一公教A座",          
          created: "张晓梅",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: "快来吧哈哈哈哈哈哈哈"
        },
        {
          roomId: "108",
          build:"一公教A座",
          created: "",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: ""
        },
        {
          roomId: "109",
          build:"一公教A座",          
          created: "张晓梅",
          time: "8:00-10:00",
          allNum: 60,
          hasNum: 0,
          content: "快来吧哈哈哈哈哈哈哈"
        }
      ]
    };
  },
  watch:{
    time(val){
      let today= new Date();
      if(val<new Date() || ((val.getMonth()-today.getMonth())*30+val.getDate()-today.getDate())>5){
        alert('只能预约未来五天的自习哟~');
        this.time=new Date();
      }
    }
  },
  methods:{
      toDetail(room){
          this.$router.push({path:'/roomDetail',query:{room:room}});
      }
  }
};
</script>

<style lang="scss">
@import "../assets/common.scss";
.home {
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  .banner{
    width: 100%;
    background: $blank;
    img{
      display: block;
      width: 1200px;
      margin: 0 auto;
      padding: 5px;
      box-sizing: border-box;
    }
  }
  .home-top {
    height: 80px;
    width: 100%;
    background: $blank;
    text-align: center;
    .home-top-title {
      p {
        line-height: 80px;
        display: inline-block;
        color: $black;
        vertical-align: text-top;
        margin-left: -30px;
        .con {
          font-weight: bold;
          padding-left: 40px;
          padding-right: 10px;
        }
        .el-select-dropdown__item {
          text-align: center;
        }
        button{
          height: 40px;
          width: 100px;
          background: $blue;
          border: 0;
          color:$blank;
          border-radius: 4px;
          margin-left: 40px;
          cursor: pointer;
        }
      }
    }
  }
  .home-seats {
    width: 1220px;
    margin: 0 auto;
    box-sizing: border-box;
    .room-border {
      cursor: pointer;
      width: 200px;
      height: 200px;
      margin: 20px;
      border: 2px solid $blue;
      border-radius: 5px;
      text-align: center;
      color: $black;
      float: left;
      span {
        display: block;
        font-size: 14px;
        margin-top: 5px;
      }
      .roomId {
        font-size: 40px;
        color: $blue;
        margin: 10px;
      }
      p {
        color: $light;
        padding: 0 15px;
        font-size: 14px;
        margin-top: 20px;
        text-align: left;
      }
    }
    .room-border-no {
      cursor: pointer;
      float: left;
      width: 200px;
      height: 200px;
      margin: 20px;
      border: 2px solid $light;
      border-radius: 5px;
      text-align: center;
      color: $black;
      span {
        display: block;
        font-size: 14px;
        margin-top: 5px;
      }
      .roomId {
        font-size: 40px;
        color: $black;
        margin: 10px;
      }
      p {
        color: $light;
        padding: 0 15px;
        font-size: 14px;
        margin-top: 20px;
        text-align: left;
      }
    }
    .room-border,
    .room-border-no {
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
      }
    }
  }
}
</style>
