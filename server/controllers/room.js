const mongoose = require('mongoose');
const Room = mongoose.model('hasroom');
const RoomInfo = mongoose.model('room');
const Student = mongoose.model('student');
let student = require('./student');
const stu = require('./student');

//  获取自习室列表
module.exports.getRoomLists = async (params) => {
    let roomIdLists, roomInfoLists;

    async function searchRoomLists(matchParams) {
        roomIdLists = await Room.find({
            moon: params.moon,
            day: params.day
        }).populate([{
            path: 'roomInfo ',
            // match: { build: params.build, floor: params.floor },
            match: matchParams,
            select: 'number build floor allSeats'
        }, {
            path: 'stuInfo',
            select: 'name stuId -_id'
        }]);
        // 过滤不符合的自习室，同时按照教室号排序,这是已经有的自习室 
        roomIdLists = roomIdLists.filter((value) => {
            return value.roomInfo != null;
            // }).sort(compare('roomInfo', 'number'));
        }).sort(function (a, b) {
            // compare('roomInfo', 'number')
            let aBuild = a.roomInfo.build == '一公教' ? 1 : 2
            let bBuild = b.roomInfo.build == '一公教' ? 1 : 2
            if (aBuild == bBuild) {
                if (a.roomInfo.floor == b.roomInfo.floor) {
                    return a.roomInfo.number > b.roomInfo.number
                } else {
                    return a.roomInfo.floor > b.roomInfo.floor
                }
            } else {
                return aBuild > bBuild
            }
        });
        // console.log(roomIdLists)
        // 查询出对应的固定自习室信息
        roomInfoLists = await RoomInfo.find(matchParams);
    }

    if (params.build == "不限" && params.floor == "不限") {
        await searchRoomLists({})
    } else if (params.build == "不限") {
        await searchRoomLists({ floor: params.floor })
    } else if (params.floor == "不限") {
        await searchRoomLists({ build: params.build })
    } else {
        await searchRoomLists({ build: params.build, floor: params.floor })
    }

    let resultLists = [];//存放结果

    roomInfoLists.map((roomInfo, index) => {
        // console.log(roomInfo, roomIdLists[0].roomInfo.number == roomInfo.number, roomIdLists[0].roomInfo.build == roomInfo.build, roomIdLists[0].roomInfo.floor == roomInfo.floor)
        // console.log(roomInfo, roomIdLists[0].roomInfo.number, roomInfo.number, roomIdLists[0].roomInfo.build, roomInfo.build, roomIdLists[0].roomInfo.floor, roomInfo.floor)
        if (roomIdLists.length && roomIdLists[0].roomInfo.number == roomInfo.number && roomIdLists[0].roomInfo.build == roomInfo.build && roomIdLists[0].roomInfo.floor == roomInfo.floor) {
            resultLists.push(roomIdLists.shift());
        } else {
            resultLists.push({ roomInfo });
        }
    })

    // resultLists = resultLists.sort(function (a, b) {
    //     if (a.roomInfo.build == b.roomInfo.build) {
    //         if (a.roomInfo.floor == b.roomInfo.floor) {
    //             return a.roomInfo.number - b.roomInfo.number
    //         } else {
    //             return a.roomInfo.floor > b.roomInfo.floor
    //         }
    //     } else if (a.roomInfo.build == '一公教') {
    //         return true
    //     } else {
    //         return false
    //     }
    // })

    return resultLists;
}

// 创建自习室
module.exports.creatRoom = async (params) => {
    try {
        // 判断是否已经被创建 
        let noBlank = await Room.findOne({ roomInfo: params.roomId, moon: params.moon, day: params.day });

        if (!noBlank) {
            // 查询创建者信息
            let stuInfo = await stu.getUser(params);
            let isToadyHas = false, isToadyReview = false;
            if (stuInfo.hasRoomLists.length != 0) {
                stuInfo.hasRoomLists.map(room => {
                    if (room.roomRecord.moon == params.moon && room.roomRecord.day == params.day) {
                        isToadyHas = true;
                    }
                })
            }
            if (stuInfo.reviewRoomLists.length != 0) {
                stuInfo.reviewRoomLists.map(room => {
                    if (room.roomRecord.moon == params.moon && room.roomRecord.day == params.day) {
                        isToadyReview = true;
                    }
                })
            }

            if (isToadyHas) {
                return {
                    sucess: false,
                    msg: '您今天已经拥有一节自习，不可重复添加',
                }
            }
            if (isToadyReview) {
                return {
                    sucess: false,
                    msg: '您今天已经提交了一个自习申请，如需更换情先删除',
                }
            }

            // id绑定到hasroom上
            params['roomInfo'] = params.roomId;
            params['seatsLists'] = [];
            params.seatsLists.push(params.seatIndex);
            params['stuInfo'] = stuInfo._id;

            // 创建教室记录
            let createRoom = new Room(params);
            let roomrecord = await createRoom.save();

            // 用户信息记录写入加入自习列表
            let newHasroom = {
                roomRecord: roomrecord._id,
                seatIndex: params.seatIndex,
                isCreater: true
            }
            let a = await Student.update({ stuId: global.stuId }, { $push: { hasRoomLists: newHasroom } });

            return {
                sucess: true,
                msg: '自习室创建成功',
                roomId: roomrecord._id
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
        let isHas = await Student.findOne({ stuId: global.stuId, hasRoomLists: { $elemMatch: { roomRecord: params.roomId } } });
        if (isHas) return { sucess: false, msg: '已经加入该自习室' }

        // 获取房间和申请者的信息
        let roomInfo = await Room.findOne({ _id: params.roomId }).populate('stuInfo');
        let addStu = await student.getUser({ stuId: global.stuId });

        // 判断是否已经提交申请了
        let isRemind = await Student.findOne({ stuId: roomInfo.stuInfo.stuId, remind: { $elemMatch: { roomInfo: params.roomId, stuInfo: addStu._id } } });
        if (isRemind) return { sucess: false, msg: '已经提交申请，请耐心等待管理员审核通过' }

        // 判断今天是否已经加入自习了
        let stuInfo = await stu.getUser(params);
        let isToadyHas = false, isToadyReview = false;

        stuInfo.hasRoomLists.map(room => {
            if (room.roomRecord.moon == roomInfo.moon && room.roomRecord.day == roomInfo.day) {
                isToadyHas = true;
            }
        })

        stuInfo.reviewRoomLists.map(room => {
            if (room.roomRecord.moon == roomInfo.moon && room.roomRecord.day == roomInfo.day) {
                isToadyReview = true;
            }
        })

        if (isToadyHas) {
            return {
                sucess: false,
                msg: '您今天已经拥有一节自习，不可重复添加',
            }
        }
        if (isToadyReview) {
            return {
                sucess: false,
                msg: '您今天已经提交了一个自习申请，如需更换情先删除',
            }
        }

        // 没有问题，写入管理员remind，用户添加到review中
        await Student.update(
            { stuId: roomInfo.stuInfo.stuId },
            {
                $push: {
                    remind:
                        { roomInfo: params.roomId, stuInfo: addStu._id, seatIndex: params.seatIndex, date: new Date().getTime() }
                }
            });
        await Student.update({ stuId: global.stuId }, { $push: { reviewRoomLists: { roomRecord: params.roomId, seatIndex: params.seatIndex } } })
        return {
            sucess: true,
            msg: '加入自习室审核已成功发送至管理员'
        }

    } catch (err) {
        console.log(err);
    }
}

// 收藏自习室
module.exports.saveRoom = async (params) => {

    try {

        // 查询用户是否已经收藏该自习室
        let isSave = await Student.findOne({
            stuId: global.stuId,
            collectRoomLists: { $elemMatch: { roomRecord: params.roomId } }
        });

        if (!isSave) {
            await Student.update(
                { stuId: global.stuId },
                {
                    $push: { collectRoomLists: { roomRecord: params.roomId } }
                });

            return {
                sucess: true,
                msg: '收藏成功',
                roomId: params.roomId
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
}

// 审核通过加入自习室
module.exports.agree = async (params) => {
    try {
        // 删除管理员的 remind信息
        await Student.update(
            { stuId: global.stuId, },
            {
                $pull: { remind: { _id: params.remindId } }
            });
        // 添加信息到加入者的 hasRoom，移除其review信息
        await Student.update(
            { stuId: params.addId },
            { $pull: { reviewRoomLists: { roomRecord: params.roomId } } }
        );
        let isPush = await Student.find(
            { stuId: params.addId, hasRoomLists: { $elemMatch: { roomRecord: params.roomId } } }
        )
        // console.log(!isPush.length)
        if (!isPush.length) {
            await Student.update(
                { stuId: params.addId },
                { $push: { hasRoomLists: { roomRecord: params.roomId, seatIndex: params.seatIndex } } },
            );
        }

        // 更新自习室的信息
        await Room.update(
            { _id: params.roomId },
            { $push: { seatsLists: params.seatIndex } }
        )
        return {
            sucess: true,
            msg: '审核完成'
        }
    } catch (error) {
        throw error;
    }

}

// 审核不通过
module.exports.disagree = async (params) => {
    try {
        // 删除管理员的 remind信息
        await Student.update(
            { stuId: global.stuId },
            {
                $pull: { remind: { _id: params.remindId } }
            });

        // 修改用户的字段为 reject ：true 信息
        await Student.update(
            {
                stuId: params.addId,
                reviewRoomLists: { $elemMatch: { roomRecord: params.roomId } }
            }, {
                $set: { 'reviewRoomLists.$.reject': true }
            }
        )
        return {
            sucess: true,
            msg: '拒绝加入自习室成功'
        }

    } catch (error) {
        throw error;
    }
}

// 删除已经加入的自习室
module.exports.deleteHasRoom = async (params) => {
    // 删除用户的 has字段
    try {
        await Room.find({
            roomId: params.roomId
        })
        // 删除用户has列表的信息
        await Student.update(
            { stuId: global.stuId },
            { $pull: { hasRoomLists: { roomRecord: params.roomId } } }
        )
        // 删除room记录的座位表
        await Room.update(
            { _id: params.roomId },
            { $pull: { seatsLists: params.seatIndex } }
        )

        return {
            sucess: true,
            msg: '删除成功'
        }
    } catch (error) {
        console.log(error);
    }

}

// 删除收藏的自习室
module.exports.deleteCollectRoom = async (params) => {
    // 删除用户的 collect字段
    try {
        await Student.update(
            { stuId: global.stuId },
            { $pull: { collectRoomLists: { roomRecord: params.roomId } } }
        )
        return {
            sucess: true,
            msg: '删除成功'
        }
    } catch (error) {
        console.log(error);
    }
}

// 删除正在审核的自习室
module.exports.delReviewList = async (params) => {
    try {
        // 删除用户review的信息
        await Student.update(
            { stuId: global.stuId },
            { $pull: { reviewRoomLists: { roomRecord: params.roomId } } }
        )
        // 删除管理员的remind的信息
        await Student.update(
            { stuId: params.addId },
            { $pull: { remind: { roomInfo: params.roomId } } }
        )
        return {
            sucess: true,
            mag: "删除成功"
        }
    } catch (e) {
        console.log(e);
    }
}

// 获取自习室详情
module.exports.getRoom = async (params) => {
    try {
        if (params.isblank == 'true') {
            let room = await RoomInfo.findOne({
                _id: params.roomId
            })
            let roomInfo = {
                roomInfo: room
            }
            return roomInfo;

        } else {
            let room = await Room.findOne({
                _id: params.roomId
            }).populate([{
                path: 'stuInfo',
                select: 'name stuId -_id'
            }, {
                path: 'roomInfo'
            }]).lean();

            let student = await stu.getUser(params);
            // console.log(student);

            // 判断用户是否已经 加入/收藏/审核中..
            console.log(student.hasRoomLists.length)
            if (student.hasRoomLists.length) {
                student.hasRoomLists.map(item => {
                    if (item.roomRecord._id == params.roomId) {
                        room['isHas'] = true;
                        room['ownSeat'] = item.seatIndex;
                    }
                })
            }
            if (student.collectRoomLists.length) {
                student.collectRoomLists.map(item => {
                    if (item.roomRecord && item.roomRecord._id == params.roomId) {
                        room['isCollect'] = true;
                    }
                })
            }
            if (student.reviewRoomLists.length) {
                student.reviewRoomLists.map(item => {
                    if (item.roomRecord && item.roomRecord._id == params.roomId) {
                        room['isReview'] = true;
                    }
                })
            }

            // 添加自习室创建者
            room['createdStuId'] = room.stuInfo.stuId;
            room['createName'] = room.stuInfo.name;

            // 判断是否是本人创建
            if (room.stuInfo.stuId == global.stuId) {
                room['isCreater'] = true;
            }
            delete room.stuInfo;
            return room;
        }
    } catch (error) {
        throw error
    }


}

// 获取今天是否有自习安排
module.exports.getTodayHasRoom = async (params) => {
    let moon = new Date().getMonth() + 1;
    let day = new Date().getDate();

    let Rooms = await stu.getUser(params);
    let todayHasRooms = [];
    console.log(Rooms);
    Rooms.hasRoomLists.map(room => {
        if (room.roomRecord.moon == moon && room.roomRecord.day == day) {
            for (let key in room.roomRecord.roomInfo) {
                room.roomRecord[key] = room.roomRecord.roomInfo[key];
            }
            delete room.roomRecord.roomInfo;
            todayHasRooms.push(room);
        }
    })
    // console.log(todayHasRooms);
    return todayHasRooms;
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