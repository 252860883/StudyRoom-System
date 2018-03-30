const Koa = require('koa');
const session = require('koa-session');
const koaBody = require('koa-bodyparser');
const passport = require('./lib/passport');

let app = new Koa();

// websocket 全双工通信,聊天功能
var server = require('http').Server(app.callback());
require('./controllers/chat')(server);

// koa解析body中间件
app.use(koaBody());

// 连接数据库
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo');

// 引入 schema
require('./models/student');
require('./models/hasroom');
require('./models/room');
require('./models/chat');

// 中间件，登陆拦截，拦截请求中是否有 stuId 的cookie，否则返回 unlogin
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

// 绑定端口号
server.listen(4000, () => {
    console.log('server is running at 4000');
});




