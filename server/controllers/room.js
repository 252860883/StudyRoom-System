const mongoose = require('mongoose');
const Room = mongoose.model('hasroom');
const RoomInfo = mongoose.model('room');
const Student = mongoose.model('student');

//  获取自习室列表
module.exports.getRoomLists = async (params) => {

    let roomIdLists = await Room.find({
        moon: params.moon,
        day: params.day
    }).populate({
        path: 'roomInfo',
        match: { build: params.build, floor: params.floor },
        select: 'number build floor'
    })

    return roomIdLists.filter((value) => {
        return value.roomInfo != null;
    });
}

// 创建自习室
module.exports.creatRoom = async (params) => {
    try {
        // 获取到对应房间信息
        let hasRoom = await RoomInfo.findOne({
            build: params.build,
            floor: params.floor,
            number: params.number
        }, '_id');
        // 判断是否已经被创建 
        let noBlank = await Room.findOne({ roomInfo: hasRoom._id, moon: params.moon, day: params.day });

        if (!noBlank) {
            // id绑定到hasroom上
            params['roomInfo'] = hasRoom._id;
            params['seatsLists'] = [];
            params.seatsLists.push(params.seatIndex);
            // 创建教室记录
            let createRoom = new Room(params);
            await createRoom.save();

            // 用户信息记录写入加入自习列表
            let newHasroom = {
                roomInfo: hasRoom._id,
                seatIndex: params.seatIndex
            }
            let a = await Student.update({ stuId: params.stuId }, { $push: { hasRoomLists: newHasroom } });

            return {
                sucess: true,
                msg: '自习室创建成功'
            }
        } else {
            return {
                sucess: false,
                msg: "自习室已经被创建"
            }
        }

    } catch (err) {
        return {
            sucess: false,
            msg: err
        }
    }
}

// 加入自习室
module.exports.addRoom = async (params) => {

}

// 收藏自习室
module.exports.saveRoom = async (params) => {
    let findRoom = await Room.find({
        moon: params.moon,
        day: params.day,
    }).populate({
        path: 'roomInfo',
        match: { build: params.build, floor: params.floor, number: params.number },
    }).where({ roomInfo: { $ne: null } });
    console.log(findRoom);
    let a = await Student.update({ stuId: params.stuId }, { $push: { collectRoomLists: findRoom.roomInfo._id } });

    
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