"use strict";

let student = require('./controllers/student');
let room = require('./controllers/room');
let chat=require('./controllers/chat');

const Router = require('koa-router');
let router = new Router();

// 登陆接口
router.post('/login', async (ctx) => {
    let params = ctx.request.body['stuId'] ? ctx.request.body : ctx.query;
    let docs = await student.login(params, ctx);
    ctx.body = docs;
});

// 注册接口
router.post('/register', async (ctx) => {
    // console.log(ctx.request.body);
    let params = ctx.request.body['stuId'] ? ctx.request.body : ctx.query;
    let hasReg = await student.register(params);

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
    let params = ctx.request.body ;
    console.log(params);
    let hasModify = await student.modify(params);

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

// 退出登陆
router.post('/edit', async (ctx) => {
    ctx.cookies.set('stuId', "");
    ctx.body = {
        msg: "注销成功"
    }
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
router.get('/agree', async (ctx) => {
    let callback = room.agree(ctx.query);
    ctx.body = callback;
})

// 拒绝加入自习
router.get('/disagree', async (ctx) => {
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
// remindLists

// 提醒数量
router.get('/remindLists', async (ctx) => {
    let callback = await student.remindLists(ctx.query);
    ctx.body = callback;
})

// 获取今天的自习
router.get('/getTodayHasRoom', async (ctx) => {
    let callback = await room.getTodayHasRoom(ctx.query);
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

// 删除正在审核的自习室
router.get('/delReviewList', async (ctx) => {
    let callback = await room.delReviewList(ctx.query);
    ctx.body = callback;
})

// 获取排行榜信息
router.get('/getRankLists', async (ctx) => {
    let callback = await student.rankLists(ctx.query);
    ctx.body = callback;
})

// 排行榜点赞
router.get('/clickPromise', async (ctx) => {
    let callback = await student.clickPromise(ctx.query);
    ctx.body = callback;
})

// 获取消息列表
router.get('/chatLists', async (ctx)=>{
    let callback =await chat.getChatLists(ctx.query);
    ctx.body = callback;
})

// 获取消息详情
router.get('/chatInfo', async (ctx)=>{
    console.log(ctx.query);
    let callback =await chat.getChatInfo(ctx.query);
    ctx.body = callback;
})

module.exports.router = router;