var mongoose = require('mongoose');

// 固定自习室的信息，这个表只能查询不能修改
var roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    build: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    allSeats: {
        type: Number,
        required: true
    }
});
mongoose.model('room', roomSchema);