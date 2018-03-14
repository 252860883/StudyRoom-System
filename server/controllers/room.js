const mongoose = require('mongoose');
const Room = mongoose.model('hasroom');
const RoomInfo = mongoose.model('room');
const Student = mongoose.model('student');
let student = require('./student');

//  获取自习室列表
module.exports.getRoomLists = async (params) => {

    let roomIdLists = await Room.find({
        moon: params.moon,
        day: params.day
    }).populate([{
        path: 'roomInfo ',
        match: { build: params.build, floor: params.floor },
        select: 'number build floor'
    }, {
        path: 'stuInfo',
        select: 'name stuId -_id'
    }]);

    // 过滤不符合的自习室，同时按照教室号排序
    roomIdLists = roomIdLists.filter((value) => {
        return value.roomInfo != null;
    }).sort(compare('roomInfo', 'number'));
    return roomIdLists;
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
            // 查询创建者信息
            let stuInfo = await Student.findOne({ stuId: params.stuId });
            console.log(stuInfo);
            // id绑定到hasroom上
            params['roomInfo'] = hasRoom._id;
            params['seatsLists'] = [];
            params.seatsLists.push(params.seatIndex);
            params['stuInfo'] = stuInfo._id;
            console.log(params);

            // 创建教室记录
            let createRoom = new Room(params);
            let roomrecord = await createRoom.save();

            // 用户信息记录写入加入自习列表
            let newHasroom = {
                roomRecord: roomrecord._id,
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
        console.log(err);
    }
}

// 申请加入自习室
module.exports.addRoom = async (params) => {
    try {
        // 判断是否已经加入这个教室
        let isHas = await Student.findOne({ stuId: params.stuId, hasRoomLists: { $elemMatch: { roomRecord: params.roomId } } });
        if (isHas) return { sucess: false, msg: '已经加入该自习室' }
        // 获取房间和申请者的信息
        let roomInfo = await Room.findOne({ _id: params.roomId }).populate('stuInfo');
        let addStu = await student.getUser({ stuId: params.stuId });
        // 判断是否已经提交申请了
        let isRemind = await Student.findOne({ stuId: roomInfo.stuInfo.stuId, remind: { $elemMatch: { roomInfo: params.roomId, stuInfo: addStu._id } } });
        if (isRemind) return { sucess: false, msg: '已经提交申请，请耐心等待管理员审核通过' }

        // 没有问题，写入管理员remind，用户添加到review中
        await Student.update({ stuId: roomInfo.stuInfo.stuId }, { $push: { remind: { roomInfo: params.roomId, stuInfo: addStu._id } } });
        await Student.update({ stuId: params.stuId }, { $push: { reviewRoomLists: { roomRecord: params.roomId, seatIndex: params.seatIndex } } })
        return {
            sucess: true,
            msg: '加入自习室审核已成功发送至管理员'
        }

    } catch (err) {
        console.log(err);
    }
}

// 收藏自习室(字段待改)
module.exports.saveRoom = async (params) => {

    try {
        // 找到符合要求的房间
        var room = await RoomInfo.findOne({
            build: params.build,
            floor: params.floor,
            number: params.number
        });

        // 查询该房间的制定日期房间id
        let findRoom = await Room.findOne({
            moon: params.moon,
            day: params.day,
            roomInfo: room._id
        });
        console.log(findRoom._id);
        // 查询用户是否已经收藏该自习室
        let isSave = await Student.findOne({ stuId: params.stuId, collectRoomLists: { $elemMatch: { roomRecord: findRoom._id } } });

        if (!isSave) {
            await Student.update({ stuId: params.stuId }, { $push: { collectRoomLists: { roomRecord: findRoom._id } } });
            return {
                sucess: true,
                msg: '收藏成功'
            };
        } else {
            return {
                sucess: false,
                msg: '已收藏'
            }
        }
    } catch (err) {
        console.log(err);
    }
    // console.log(findRoom.roomInfo);
}

// 审核通过加入自习室
module.exports.agree = async (params) => {
    // 删除管理员的 remind信息
    // await Student.update({ stuId: params.stuId }, { $pull: { remind: { _id: params.remindId } } });
    // 添加信息到加入者的 hasRoom，移除其review信息
    // let a = await Student.findOne({ stuId: params.addId, reviewRoomLists: { $elemMatch: { roomRecord: params.roomId } } },'reviewRoomLists');
    // await Student.update({ stuId: params.addId }, { $pull: { reviewRoomLists: { roomRecord: params.roomId } } });
    console.log(a);
}
// 审核不通过
module.exports.disagree = async (params) => {
    try {
        // 删除管理员的 remind信息
        await Student.update({ stuId: params.stuId }, { $pull: { remind: { _id: params.remindId } } });


    } catch (error) {
        throw error;
    }
}

// 删除已经加入的自习室
module.exports.deleteRoom = async (params) => {
}

// 按照对象内部排序
// 第一个是主属性，后面是子属性
function compare(property, child) {
    return function (obj1, obj2) {
        var value1 = child ? obj1[property][child] : obj1[property];
        var value2 = child ? obj2[property][child] : obj2[property];
        return value1 - value2;// 升序
    }
}