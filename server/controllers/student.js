const mongoose = require('mongoose');
const Student = mongoose.model('student');

/**
 * 封装一系列和用户有关的方法
 */

// 登陆
module.exports.login = async function (params) {
    let docs = await Student.find({
        stuId: params.stuId,
        password: params.password
    });
    return docs.length ? true : false;
}

// 注册
module.exports.register = async function (params) {
    let isNew = await Student.find({
        stuId: params.stuId
    });
    if (!isNew.length) {
        let docs = await Student.create(params);
        return true;
    } else {
        return false;
    }
}

// 修改个人资料
module.exports.modify = async function (params) {
    // 如果学号存在则修改信息
    let hasStudent = await Student.find({ stuId: params.stuId });

    if (hasStudent.length) {
        let hasSave = await Student.update({ stuId: params.stuId }, { $set: params });
        return hasSave;
    } else {
        return false;
    }
}

// 获取用户资料
module.exports.getUser = async (params) => {
    let getInfo = await Student.findOne({ stuId: params.stuId })
        .populate([{
            path: 'hasRoomLists.roomRecord collectRoomLists.roomRecord ',
            model: 'hasroom',
            populate: ({
                path: 'roomInfo',
                select: '-_id'
            })
        }, {
            path: 'remind.stuInfo',
            select: 'stuId name '

        }, {
            path: 'remind.roomInfo',
            select:'-stuInfo',
            populate:{
                path:'roomInfo'
            }
        }]);

    return getInfo;
}

// 获取提示数量，0表示没有提示
module.exports.remind = async (params) => {
    try {
        let stuInfo = await this.getUser(params);
        return stuInfo.remind.length;
    } catch (err) {
        throw err;
    }

}




