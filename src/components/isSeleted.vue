<template>
<!-- 已经选择的课程 -->
  <div class="isselected">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="150px"></el-table-column>
        <el-table-column prop="address" label="地点" width="180px"></el-table-column>
        <el-table-column prop="class" label="教室" width="150px"></el-table-column>
        <el-table-column prop="title" label="自习主题" width="150px"></el-table-column>
        <el-table-column prop="creater" label="创建者" width="150px"></el-table-column>
        <el-table-column label="操作" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          address: "一公教A座",
          class: "101",
          title: "英语复习",
          creater: "死学霸"
        },
        {
          date: "2016-05-02",
          address: "一公教A座",
          class: "101",
          title: "英语复习",
          creater: "死学霸"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/common.scss";
.isselected {
  width: 1000px;
  margin: 0 auto;
}
.el-table_1_column_1 is-leaf {
  background: $blank;
}
</style>
