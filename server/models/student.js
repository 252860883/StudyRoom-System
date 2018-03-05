var mongoose = require('mongoose');

// 学生信息 学号、头像、姓名、学校、专业、密码、已预约自习室信息、收藏夹
var studentSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    avatorUrl:{
        type:String
    },
    school:{
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    },
    collectRoomLists:{
        type:Array
    },
    hasRoomLists:{
        type:Array
    },
    remind:{
        type:Object
    }
});

mongoose.model('Student', studentSchema);

