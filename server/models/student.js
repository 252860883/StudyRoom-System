var mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;
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
        type: String,
        default:"http://p6tfuzc6r.bkt.clouddn.com/userPhoto-default.png"
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
            type: ObjectId,
            ref: 'hasroom'
        }
    }],
    // 已经预约的自习室和座位列表
    hasRoomLists: [{
        roomRecord: {
            type: ObjectId,
            ref: 'hasroom'
        },
        seatIndex: {
            type: Number
        },
        isCreater: {
            type: Boolean,
            default: false
        }
    }],
    // 审核中的自习室
    reviewRoomLists: [{
        roomRecord: {
            type: ObjectId,
            ref: 'hasroom'
        },
        seatIndex: {
            type: Number
        },
        reject: {
            type: Boolean,
            default: false
        }
    }],
    // 创建的自习室
    remind: [{
        stuInfo: {
            type: ObjectId,
            ref: 'student'
        },
        roomInfo: {
            type: ObjectId,
            ref: 'hasroom'
        },
        seatIndex: {
            type: Number
        },
        date:{
            type:Number
        }
    }],
    // 点赞
    praise:{
        type:Number,
        default:0
    },
    // 点赞的用户信息
    praiseStuLists:[]
});

mongoose.model('student', studentSchema);