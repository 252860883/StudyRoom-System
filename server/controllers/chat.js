const mongoose = require('mongoose');
const Chat = mongoose.model('chat');
const Student = mongoose.model('student');

// 存储信息记录
module.exports.drawChatdb = async function (data) {
    // 查找有没有已经存在的数据
    // 规定，前面的id大于后面的id
    try {
        let aId, bId;
        if (data.sendId > data.saveId) {
            bId = data.sendId;
            aId = data.saveId;
        } else {
            aId = data.sendId;
            bId = data.saveId;
        }

        let chatNum = await Chat.find({
            chatNumber: [aId, bId]
        });
        if (chatNum.length > 0) {
            // 向数组里添加新的聊天记录
            await Chat.update({
                chatNumber: [aId, bId]
            }, {
                    $push: {
                        chatLists: {
                            stuId: data.sendId,
                            content: data.content,
                            date: data.date
                        },
                        chatNoSeeMumber: data.saveId
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
    } catch (error) {
        throw error;
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
    let cheaterInfo = await Student.findOne({
        stuId: params.chaterId
    }, "stuId name major school avatorUrl -_id");

    let createrInfo = await Student.findOne({
        stuId: global.stuId
    }, "stuId name major school avatorUrl -_id");

    let chatInfoLists = await Chat.findOne({
        chatNumber: [aId, bId]
    }).lean();

    // 把未读状态改为已读
    await Chat.update({
        chatNumber: [aId, bId]
    }, {
            $pull: {
                chatNoSeeMumber: global.stuId.toString()
            }
        })

    if (chatInfoLists) {
        delete chatInfoLists.chatNumber;
        return {
            chatInfoLists,
            cheaterInfo,
            createrInfo
        };
    } else {
        // 如果第一次聊天需要将信息写入
        await Chat.create({
            chatNumber: [aId, bId],
            chatLists: []
        })

        return { cheaterInfo, chatInfoLists: [], createrInfo }
    }
}

// 获取聊天消息列表
module.exports.getChatLists = async function () {
    let chatLists = await Chat.find({}).lean();
    chatLists.reverse();
    // 存储最后的数据
    let selfChatList = [];
    for (chatItem of chatLists) {

        if (chatItem.chatNumber.indexOf(global.stuId) >= 0) {
            let anotherStuId = chatItem.chatNumber[0] == global.stuId ? chatItem.chatNumber[1] : chatItem.chatNumber[0]
            let anotherInfo = await Student.findOne({
                stuId: anotherStuId
            }, "stuId name major school avatorUrl -_id");

            let noSee = chatItem.chatNoSeeMumber && chatItem.chatNoSeeMumber.indexOf(global.stuId) >= 0 ? true : false

            selfChatList.push({
                lastlist: chatItem.chatLists.pop(),
                chater: anotherInfo,
                noSee
            })
        }
    }
    
    selfChatList.sort(function (a, b) {
        return b.lastlist.date - a.lastlist.date
    })

    return selfChatList;
}

// 删除聊天列表
// 添加一个标识字段还是直接删除？ 直接删除
module.exports.delchatLists = async function () {
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
}