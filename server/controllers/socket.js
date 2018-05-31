let chat = require('./chat')

module.exports = async function (server) {
    var io = require('socket.io')(server);
    io.sockets.on('connection', function (socket) {
        // socket.on('conect', function () {
            // 收到的消息
            socket.on('chatInfo', function (data) {
                chat.drawChatdb(data);
                // 如果chatId 当前用户匹配，则响应数据返回
                // console.log('6666:' + JSON.stringify(data));
                socket.emit('1411651103', '666这个消息');
            });
        // })
    });

}