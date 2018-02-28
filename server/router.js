"use strict";

const Koa =require('koa');
const Router=require('koa-router');
let app=new Koa();
let router =new Router();

console.log()

router.get('/', (ctx,next)=>{
    ctx.body='默认的信息';
});

router.get('/login', (ctx,next)=>{
    ctx.body="这是登陆接口"
});

app.use(router.routes());
app.listen(4000,()=>{
    console.log('server is running at 4000');
});