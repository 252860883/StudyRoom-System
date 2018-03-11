const mongoose = require('mongoose');
const Room = mongoose.model('room');

//  获取自习室列表
// params:{build,floor,moon,day}
module.exports.getRoomLists = async (params) => {
    let roomLists = await Room.find(params);
    // console.log(roomLists);
    return roomLists;
}

// 创建自习室
module.exports.creatRoom = async (params) => {
    let hasRoom = await Room.find({
        number: params.number,
        build: params.build,
        floor: params.floor,
        moon: params.moon,
        day: params.day
    });
    if (!hasRoom.length) {
        let create = new Room(params);
        await create.save();
        return {
            success: true,
            msg: "创建自习成功"
        }
    } else {
        return {
            success: false,
            mag: "自习室已经被创建"
        }
    }
}

// 加入自习室
module.exports.addRoom = async (params) => {

}

// 收藏自习室
module.exports.saveRoom = async (params) => {

}

// 审核通过加入自习室
module.exports.accept = async (params) => {

}
// 获取已加入的自习室列表
module.exports.getHasRoomLists = async (params) => {

}

// 获取已收藏的自习室列表
module.exports.getSaveRoomLists = async (params) => {

}

// 删除已经加入的自习室
module.exports.deleteRoom = async (params) => {

}