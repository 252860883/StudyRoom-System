const mongoose = require('mongoose');
const Chat = mongoose.model('chat');
const Student = mongoose.model('student');

// 存储信息记录
module.exports.drawChatdb = async function (data) {
    // 查找有没有已经存在的数据
    // 规定，前面的id大于后面的id
    let aId, bId;
    if (data.sendId > data.saveId) {
        bId = data.sendId;
        aId = data.saveId;
    } else {
        aId = data.sendId;
        bId = data.saveId;
    }
    console.log(aId, bId)
    let chatNum = await Chat.find({
        chatNumber: [aId, bId]
    });
    if (chatNum.length > 0) {
        // 向数组里添加聊天记录
        console.log('zhixing');

        await Chat.update({
            chatNumber: [aId, bId]
        }, {
            $push: {
                chatLists: {
                    stuId: data.sendId,
                    content: data.content,
                    date: data.date
                }
            }
        })
    } else {
        Chat.create({
            chatNumber: [aId, bId],
            chatLists: [{
                stuId: data.sendId,
                content: data.content,
                date: data.date
            }]
        })
    }
}
// 获取聊天消息详情
module.exports.getChatInfo = async function (params) {
    let aId, bId;
    if (params.chaterId > global.stuId) {
        bId = params.chaterId;
        aId = global.stuId;
    } else {
        aId = params.chaterId;
        bId = global.stuId;
    }
    let chatInfoLists = await Chat.findOne({
        chatNumber: [aId, bId]
    }).lean();
    delete chatInfoLists.chatNumber;
    let cheaterInfo = await Student.findOne({
        stuId: params.chaterId
    }, "stuId name major school -_id");

    return {chatInfoLists,cheaterInfo};
}

// 获取聊天消息列表
module.exports.getChatLists = async function () {
    let chatLists = await Chat.find({});
    // 存储最后的数据
    let selfChatList = [];
    for (chatItem of chatLists) {
        if (chatItem.chatNumber.indexOf(global.stuId) >= 0) {
            let anotherStuId = chatItem.chatNumber[0] == global.stuId ? chatItem.chatNumber[1] : chatItem.chatNumber[0]
            let anotherInfo = await Student.findOne({
                stuId: anotherStuId
            }, "stuId name major school -_id");
            selfChatList.push({
                lastlist: chatItem.chatLists.pop(),
                chater: anotherInfo
            })
        }
    }
    return selfChatList;
}

// 删除聊天列表
// 添加一个标识字段还是直接删除？ 直接删除
module.exports.delchatLists = async function () {

}