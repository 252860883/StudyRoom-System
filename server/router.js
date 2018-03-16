"use strict";

let student = require('./controllers/student');
let room = require('./controllers/room');
const Router = require('koa-router');
const passport = require('./lib/passport');

let router = new Router();

// 登陆接口
// params: stuId,password
router.post('/login', async (ctx) => {

    let params = ctx.request.body;
    let docs = await student.login(params,ctx);
    ctx.body=docs;
});

// 注册接口
router.post('/register', async (ctx) => {
    // console.log(ctx.request.body);
    let hasReg = await student.register(ctx.request.body);

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
router.get('/getRoomLists', async (ctx, next) => {
    let roomLists = await room.getRoomLists(ctx.query);
    ctx.set({
        'Access-Control-Allow-Origin': '*'
    });
    ctx.body = {
        sucess: true,
        data: roomLists
    };
});

// 获取自习室详情以及用户的状态
router.get('/getRoom', async (ctx) => {
    let roomInfo = await room.getRoom(ctx.query);
    ctx.body = roomInfo;
})

// 成为管理员,创建自习室
router.get('/addAdmin', async (ctx) => {
    let callback = await room.creatRoom(ctx.query);
    ctx.body = callback;
});

// 申请加入自习
router.get('/addRoom', async (ctx, next) => {
    let callback = await room.addRoom(ctx.query);
    ctx.body = callback;
})

// 同意加入自习
router.post('/agree', async (ctx) => {
    let callback = room.agree(ctx.query);
    ctx.body = callback;
})

// 拒绝加入自习
router.post('/disagree', async (ctx) => {
    let callback = await room.disagree(ctx.query);
    ctx.body = callback;
})

// 加入收藏
router.get('/addStar', async (ctx, next) => {
    let callback = await room.saveRoom(ctx.query);
    console.log(callback + '666')
    ctx.body = callback;
})

// 提醒数量
router.get('/remind', async (ctx) => {
    let callback = await student.remind(ctx.query);
    ctx.body = callback;
})

// 删除收藏的自习室
router.get('/delCollectList', async (ctx) => {
    let callback = await room.deleteCollectRoom(ctx.query);
    ctx.body = callback;
})

// 删除加入的自习室
router.get('/delHasList', async (ctx) => {
    let callback = await room.deleteHasRoom(ctx.query);
    ctx.body = callback;
})


module.exports.router = router;