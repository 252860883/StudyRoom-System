const Koa = require('koa');
const session = require('koa-session');
const koaBody = require('koa-bodyparser');
const passport = require('./lib/passport');

let app = new Koa();
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    socket.emit('name', { username: 'litingting ' + new Date() });
    socket.on('my other event', function (data) {
        console.log(data + new Date());

    });
});

server.listen(4000, () => {
    console.log('server is running at 4000');
});

// koa解析body中间件
app.use(koaBody());

// 连接数据库
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo');

// 引入 schema
require('./models/student');
require('./models/hasroom');
require('./models/room');

// 中间件，拦截请求中是否有 stuId 的cookie，否则返回 unlogin
app.use(async (ctx, next) => {

    if (ctx.path != '/login' && ctx.path != '/register') {
        let stuId = "";
        ctx.request.header.cookie.split(';').map(query => {
            let key = query.split('=')[0];
            if (key.trim() == 'stuId') {
                stuId = query.split('=')[1];
            }
        })
        if (stuId) {
            global.stuId = stuId;
            await next();
        } else {
            ctx.body = {
                error: "unlogin"
            }
        }
    } else {
        await next();
    }

})

// 注册路由
let Router = require('./router');
app.use(Router.router.routes());

var io = require('socket.io')();
io.on('connection', function (client) { });
io.listen(3000);




