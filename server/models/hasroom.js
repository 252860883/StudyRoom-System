var mongoose = require('mongoose');

// 已经开放的自习室
var roomSchema = new mongoose.Schema({
    // _id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     index:true
    // },
    roomInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'room'
    },
    moon: {
        type: Number
    },
    day: {
        type: Number
    },
    seatsLists: {
        type: Array
    },
    // 创建者id
    stuInfo: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'student'
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
    // 是否开启审核
    isSelectBar:{
        type:Boolean
    }

});
mongoose.model('hasroom', roomSchema);

// roomSchema.index({ name: 1, type: -1 });

