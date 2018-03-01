"use strict";

const Koa = require('koa');
const Router = require('koa-router');
let app = new Koa();
let router = new Router();

let mongoose =require('mongoose');
// 连接数据库
// mongoose.connect('mogondb://localhost:27017')

// 登陆接口
router.post('/login', (ctx, next) => {
    ctx.body = "这是登陆接口"
});

// 注册接口
router.post('/register', (ctx, next) => {
    ctx.body = "这是注册接口"
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
router.get('/addAdmin',(ctx)=>{
    ctx.body="成为管理员";
})

// 用户信息
router.get('/user',(ctx)=>{
    ctx.body="用户信息";
})

// 已预约自习室
router.get('/hasRoomlists',(ctx)=>{
    ctx.body="已预约自习室";
})

app.use(router.routes());
app.listen(4000, () => {
    console.log('server is running at 4000');
});