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
    collectRoomLists: [{
        roomRecord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hasroom'
        }
    }],
    // 已经预约的自习室和座位列表
    hasRoomLists: [{
        roomRecord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hasroom'
        },
        seatIndex: {
            type: Number
        }
    }],
    // 创建的自习室
    // createRoomLists: {
    //     type: Array
    // }
});

mongoose.model('student', studentSchema);