"use strict";

let student = require('./controllers/student');
let room = require('./controllers/room');
const Router = require('koa-router');

let router = new Router();

// 登陆接口
// params: stuId,password
router.post('/login', async (ctx, next) => {
    let params = ctx.query;
    let isOk = await student.login(params);
    if (isOk) {
        ctx.body = "登陆成功";
    } else {
        ctx.body = "登录失败";
    }
});

// 注册接口
router.post('/register', async (ctx, next) => {

    let hasReg = await student.register(ctx.query);
    if (hasReg) {
        ctx.body = {
            sucess: true,
            msg: "注册成功"
        }
    } else {
        ctx.body = {
            sucess: false,
            msg: "注册失败，账号已存在"
        }
    }
});

// 修改个人信息
router.post('/modify', async (ctx, next) => {

    let hasModify = await student.modify(ctx.query);

    if (hasModify) {
        ctx.body = {
            sucess: true,
            msg: "修改成功"
        }
    } else {
        ctx.body = {
            sucess: false,
            msg: "修改失败"
        }
    }
});

// 用户信息
router.get('/user', async (ctx) => {
    let userInfo = await student.getUser(ctx.query);
    ctx.body = {
        sucess: true,
        data: userInfo
    };
})

// 获取自习室列表信息
// params:{build,floor,moon,day}
router.get('/getRoomLists', async (ctx, next) => {
    let roomLists= await room.getRoomLists(ctx.query);
    console.log(roomLists);
    ctx.body = {
        sucess:true,
        data:roomLists
    };
});

// 成为管理员,创建自习室
router.get('/addAdmin', async (ctx) => {
    let callback = await room.creatRoom(ctx.query);
    ctx.body = callback;
});

// 提醒
router.get('/remind', (ctx, next) => {  
    ctx.body = '提醒';
});

// 加入自习
router.get('/addRoom', (ctx, next) => {
    ctx.body = '加入自习';
})

// 加入收藏
router.get('/addStar', (ctx, next) => {
    ctx.body = '加入收藏';
})

// 已预约自习室
router.get('/hasRoomlists', (ctx) => {
    ctx.body = "已预约自习室";
})

module.exports.router = router;