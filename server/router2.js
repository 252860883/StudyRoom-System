const Koa = require('koa');
const Router = require('koa-router');
var app = new Koa();
var router = new Router();

// mongoose ODM 对象文档映射
// 进行数据库连接
var mongoose = require('mongoose');
// 连接到 demo1 数据库
mongoose.connect('mongodb://localhost:27017/demo2');

// 创建 User的文档对象

// 文档验证
// required: 数据必须填写
// default: 默认值 
// validate: 自定义匹配
// min: 最小值(只适用于数字)
// max: 最大值(只适用于数字)
// match: 正则匹配(只适用于字符串)
// enum:  枚举匹配(只适用于字符串)
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var User = mongoose.model('users', schema);

/**
 * 登陆接口
 */

router.get('/login', (ctx, next) => {

    // 设置响应头部
    ctx.set({
        // 设置允许跨域
        'Access-Control-Allow-Origin': '*'
    })

    // 获取请求的参数
    var params = ctx.query;

    // 异步查询验证
    let docs =  User.find({
        name: params.name,
        password: params.password
    });

    if (docs.length) {
        ctx.body = {
            msg: "登陆成功"
        };
    } else {
        ctx.body = {
            msg: "用户名或密码错误"
        };
    }
})

/**
 * 注册接口
 */

router.get('/register',(ctx, next) => {

    // 设置响应头部
    ctx.set({
        // 设置允许跨域
        'Access-Control-Allow-Origin': '*'
    })

    // 获取请求的参数
    var params = ctx.query;

    // 异步执行查询 
    let docs =  User.find({
        name: params.name
    });

    if (docs.length) {
        ctx.body = {
            msg: "用户名已存在！"
        };
    } else {
        // 创建一个属性 
        var user = new User({
            name: params.name,
            password: params.password
        });
        // 存储注册信息到记录到数据库
        let err =  user.save();

        if (err) {
            ctx.body = {
                msg: "注册失败！"
            };
        } else {
            ctx.body = {
                msg: "注册成功！"
            };
        }
    }
})

// 把路由注册到app
app.use(router.routes());
// 监听服务
app.listen(4000);