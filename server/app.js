const Koa = require('koa');
const session = require('koa-session');
const koaBody = require('koa-bodyparser');
const passport = require('./lib/passport');

let app = new Koa();

// koa解析body中间件
app.use(koaBody());

//配置session信息
// const CONFIG = {
//     key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     maxAge: 86400000,
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: false, /** (boolean) signed or not (default true) */
//     rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//     renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };
// app.use(session(CONFIG, app));

// possport要在session的下面
// app.use(passport.initialize());
// app.use(passport.session());

// 连接数据库
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo');

// 引入 schema
require('./models/student');
require('./models/hasroom');
require('./models/room');

// 中间件，拦截请求中是否有 stuId 的cookie，否则返回 unlogin
app.use(async (ctx, next) => {

    // console.log(ctx.path)

    if (ctx.path != '/login' && ctx.path != '/register') {
        let stuId = "";
        ctx.request.header.cookie.split(';').map(query => {
            let key = query.split('=')[0];
            if (key.trim() == 'stuId') {
                stuId = query.split('=')[1];
            }
        })
        if (stuId) {
            global.stuId=stuId;
            await next();
        } else {
            ctx.body = {
                error: "unlogin"
            }
        }
    } else {
        console.log('ok')
        await next();
    }

})

// 注册路由
let Router = require('./router');
app.use(Router.router.routes());

app.listen(4000, () => {
    console.log('server is running at 4000');
});

