const mongoose = require('mongoose');
const Student = mongoose.model('student');

/**
 * 封装一系列和用户有关的方法
 */

// 登陆
module.exports.login = async function (params, ctx) {
    let docs = await Student.find({
        stuId: params.stuId,
        password: params.password
    }, '-password');
    console.log(docs);
    if (docs.length) {
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;
        return {
            sucess: true,
            msg: '登陆成功'
        }
    } else {
        return {
            sucess: false,
            msg: '账号或密码错误'
        }
    }
}

// 注册
module.exports.register = async function (params) {
    try {
        let isNew = await Student.find({
            stuId: params.stuId
        });
        if (!isNew.length) {
            let docs = await Student.create(params);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
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
            path: 'hasRoomLists.roomRecord',
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
            select: '-stuInfo',
            populate: {
                path: 'roomInfo'
            }
        }, {
            path: 'hasRoomLists.roomRecord',
            populate: ({
                path: 'stuInfo',
                select: 'stuId -_id'
            })
        }, {
            path: "reviewRoomLists.roomRecord",
            populate: ([
                {
                    path: 'stuInfo',
                    select: 'stuId -_id'
                }, {
                    path: 'roomInfo',
                    select: '-stuInfo'
                }
            ])

        }, {
            path: "collectRoomLists.roomRecord",
            populate: ([
                {
                    path: 'stuInfo',
                    select: 'stuId -_id'
                }, {
                    path: 'roomInfo',
                    select: '-stuInfo'
                }
            ])
        }]).lean();
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




