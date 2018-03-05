const Koa = require('koa');
let app = new Koa();
let Router =require('./router');
app.use(Router.router.routes());

app.listen(4000, () => {
    console.log('server is running at 4000');
});

