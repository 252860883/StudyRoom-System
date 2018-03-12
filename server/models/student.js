var mongoose = require('mongoose');

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
    // 收藏的自习室id列表
    collectRoomLists: {
        type: Array
    },
    // 已经预约的自习室列表
    hasRoomLists: {
        type: Array
    }
});

mongoose.model('student', studentSchema);