
module.exports = function (server) {
    var io = require('socket.io')(server);
    io.sockets.on('connection', function (socket) {
        socket.emit('name', { username: 'litingting ' + new Date() });
        socket.on('my other event', function (data) {
            console.log(data.my + new Date());
        });
    });
}