let chat=require('./chat')

module.exports = async function (server) {
    var io = require('socket.io')(server);
    io.sockets.on('connection', function (socket) {

        // 收到的消息
        socket.on('chatInfo', function (data) {

            chat.drawChatdb(data);
            // 如果chatId 当前用户匹配，则响应数据返回
            if (data.chatId == global.stuId) {
                socket.emit('name', "有人和您聊天啦！");
            }
        });

    });

}
