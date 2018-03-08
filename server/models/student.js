var mongoose = require('mongoose');
console.log('学校');
// 学生信息 学号、头像、姓名、学校、专业、密码、已预约自习室信息、收藏夹
var studentSchema = new mongoose.Schema({
    stuId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatorUrl: {
        type: String
    },
    school: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    collectRoomLists: {
        type: Array
    },
    hasRoomLists: {
        type: Array
    },
    createRoomLists: {
        type: Array
    },
    remind: {
        type: Object
    }
});

mongoose.model('student', studentSchema);