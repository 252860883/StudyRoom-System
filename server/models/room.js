var mongoose = require('mongoose');

// 学生信息 学号、头像、姓名、学校、专业、密码、已预约自习室信息、收藏夹
var roomSchema = new mongoose.Schema({
    number: {
        type: Number
    },
    build: {
        type: String
    },
    floor: {
        type: Number
    },
    moon: {
        type: Number
    },
    day: {
        type: Number
    },
    allSeats: {
        type: Number
    },
    hasSeats: {
        type: Number
    },
    // 创建者id
    createrId: {
        type: Number
    },
    createrName: {
        type: String
    },
    title: {
        type: String
    },
    action: {
        type: String
    },
    // 已经预约的人员id统计
    isSelectIdLists: {
        type: Array
    },
    // 已经收藏的人员id统计
    saveIdLists: {
        type: Array
    }

});
mongoose.model('room', roomSchema);