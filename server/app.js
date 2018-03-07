const Koa = require('koa');
let app = new Koa();

// 连接数据库
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo');

// 引入 schema
require('./models/student');
require('./models/room');

// 注册路由
let Router =require('./router');
app.use(Router.router.routes());

app.listen(4000, () => {
    console.log('server is running at 4000');
});

