const mongoose = require('mongoose');
const Student = mongoose.model('student');
const chat=require('./chat');

/**
 * 封装一系列和用户有关的方法
 */

// 登陆
module.exports.login = async function (params, ctx) {
    // console.log(params);
    let docs = await Student.find({
        stuId: params.stuId,
        password: params.password
    }, '-password');
    // console.log(docs);
    if (docs.length) {
        ctx.cookies.set('stuId', params.stuId);
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
    let hasStudent = await Student.find({ stuId: global.stuId });
    if (hasStudent.length) {
        let hasSave = await Student.update({ stuId: global.stuId }, { $set: params });
        return hasSave;
    } else {
        return false;
    }
}

// 获取用户资料
module.exports.getUser = async (params) => {
    // console.log(global.stuId);
    let getInfo = await Student.findOne({ stuId: global.stuId })
        .populate([{
            path: 'hasRoomLists.roomRecord',
            model: 'hasroom',
            populate: ({
                path: 'roomInfo',
                select: '-_id'
            })
        }, {
            path: 'remind.stuInfo',
            select: 'stuId name major school'

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
        }])
        .lean();

    let remind = getInfo.remind.map(item => {

        item.roomInfo['roomId'] = item.roomInfo._id;
        delete item.roomInfo._id;
        delete item.stuInfo._id;
        for (var key in item.roomInfo.roomInfo) {
            item.roomInfo[key] = item.roomInfo.roomInfo[key];
        }
        for (let key in item.stuInfo) {
            item[key] = item.stuInfo[key];
        }
        delete item.roomInfo.roomInfo
        delete item.stuInfo
        return item;
    })
    delete getInfo.remind
    getInfo['remind'] = remind;

    let hasRoomLists = getInfo.hasRoomLists.sort(compare('roomRecord', 'day')).sort(compare('roomRecord', 'moon'));
    delete getInfo.hasRoomLists;
    getInfo['hasRoomLists'] = hasRoomLists;
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

// 退出登陆接口
module.exports.edit = async (params) => {
}

// 获取排行榜列表和自己的排行榜名次
module.exports.rankLists = async (params) => {
    let selfRank, selfInfo;
    let stuInfo = await Student.find({}, "stuId name major school hasRoomLists praise praiseStuLists")
        .populate({
            path: 'hasRoomLists',
        }).lean();
    let rankLists = stuInfo.sort(function (a, b) {
        return b.hasRoomLists.length - a.hasRoomLists.length
    }).map((stu, index) => {
        if (stu.stuId == global.stuId) {
            selfRank = index;
            selfInfo = stu;
        }
        stu['hasNumber'] = stu.hasRoomLists.length;
        delete stu.hasRoomLists;
        // 判断是否已经点赞
        if(stu.praiseStuLists && stu.praiseStuLists.indexOf(global.stuId)>=0){
            stu['isPraise']=true;
        }else{
            stu['isPraise']=false;            
        };
        delete stu.praiseStuLists;
        return stu;
    });
    return {
        rankLists: rankLists,
        selfRank: selfRank,
        selfInfo: selfInfo
    }
}
// 排行榜点赞
module.exports.clickPromise = async (params) => {
    // 被点赞者 praise +1 ，lists里面加入点击者id
    try {
        await Student.update({ stuId: params.stuId }, { $push: { praiseStuLists: global.stuId }, $set: { praise: params.praise } });
        return {
            msg: "点赞成功"
        }
    } catch (error) {
        throw error;
    }
}

// 获取提醒的列表信息
module.exports.remindLists = async (params) => {
    try {
        // 获取申请的消息
        let stuInfo = await this.getUser(params);
        // 获取新的消息
        let chatLists = await chat.getChatLists();

        let newArr =stuInfo.remind.concat(chatLists);

        let newArr2=newArr.sort(function(a,b){
            let newA=a.date? a.date :a.lastlist.date;
            let newB=b.date? b.date :b.lastlist.date;
            return newB-newA;
        })

        return newArr2;
    } catch (err) {
        throw err;
    }
}

// 按照对象内部排序
// 第一个是主属性，后面是子属性
function compare(property, child) {
    return function (obj1, obj2) {
        var value1 = child ? obj1[property][child] : obj1[property];
        var value2 = child ? obj2[property][child] : obj2[property];
        return value2 - value1;// 降序
    }
}




