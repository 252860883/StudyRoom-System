var mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
// 已经开放的自习室
var chatSchema = new mongoose.Schema({
    chatNumber: [],//聊天的成员
    chatNoSeeMumber:[],//还没有看的人信息
    chatLists: [{
        stuId: {
            type:Number
        },
        content:{
            type:String,
            require:true
        },
        date:{
            
        }
    }]
});
mongoose.model('chat', chatSchema);