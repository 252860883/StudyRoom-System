const mongoose = require('mongoose');
const Room = mongoose.model('hasroom');
const RoomInfo = mongoose.model('room');

//  获取自习室列表
module.exports.getRoomLists = async (params) => {

    let roomIdLists = await Room.find({
        moon:params.moon,
        day:params.day
    }).populate('roomInfo','number build floor');

    return roomIdLists;

    // let roomIdArr = [];
    // roomIdLists.forEach(element => {
    //     roomIdArr.push(Number(element.roomId));
    // });

    // let roomLists = await Room.find({ roomId: { $in: roomIdArr }, moon: params.moon, day: params.day },'-_id -__v');
    // return roomLists.forEach(element=>{
    //     element['floor']=params.floor;
    //     element['build']=params.build;
    // })
}

// 创建自习室
module.exports.creatRoom = async (params) => {
    let hasRoom = await RoomInfo.findOne({
        build: params.build,
        floor: params.floor,
        number: params.number
    }, '_id');
    // console.log(hasRoom.roomId);
    params['roomId'] = hasRoom._id;
    let create = new Room(params);
    let err = await create.save();
    console.log(err);

    // 如果自习室没有被创建
    // if (!hasRoom.length) {
    //     params['hasSeats'] = 1;
    //     let create = new Room(params);
    //     let err = await create.save();
    //     if (err) {
    //         return {
    //             success: true,
    //             msg: "创建自习成功"
    //         }
    //     } else {
    //         return {
    //             success: false,
    //             msg: err
    //         }
    //     }
    // } else {
    //     return {
    //         success: false,
    //         msg: "自习室已经被创建"
    //     }
    // }
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