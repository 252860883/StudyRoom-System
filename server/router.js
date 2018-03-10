"use strict";

let student = require('./controllers/student');
const Router = require('koa-router');

let router = new Router();

// 登陆接口
router.post('/login', async (ctx, next) => {
    let params=ctx.query;
    let isOk = await student.login(params);
    // let isOk=true;
    if (isOk) {
        ctx.body = "登陆成功";
    } else {
        ctx.body = "登录失败";
    }
});

// 注册接口
router.post('/register', async (ctx, next) => {
    
    let hasReg=await student.register(ctx.query);
    if(hasReg){
        ctx.body = {
            sucess:true,
            msg:"注册成功"
        }
    }else{
        ctx.body={
            sucess:false,
            msg:"注册失败，账号已存在"
        }
    }
});


// 修改个人信息
router.post('/modify', async (ctx, next) => {
    
    let hasModify=await student.modify(ctx.query);

    if(hasModify){
        ctx.body = {
            sucess:true,
            msg:"修改成功"
        }
    }else{
        ctx.body={
            sucess:false,
            msg:"修改失败"
        }
    }
});

// 自习室列表信息
router.get('/roomlist', (ctx, next) => {
    ctx.body = '自习室列表信息';
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

// 成为管理员
router.get('/addAdmin', (ctx) => {
    ctx.body = "成为管理员";
})

// 用户信息
router.get('/user', (ctx) => {
    ctx.body = "用户信息";
})

// 已预约自习室
router.get('/hasRoomlists', (ctx) => {
    ctx.body = "已预约自习室";
})

module.exports.router = router;