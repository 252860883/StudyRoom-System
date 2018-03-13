var mongoose = require('mongoose');

// 已经开放的自习室
var roomSchema = new mongoose.Schema({
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
    stuId: {
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
    }

});
mongoose.model('hasroom', roomSchema);

