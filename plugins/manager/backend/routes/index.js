const Router = require('koa-router');
// const serve = require('koa-static');
// const mount = require('koa-mount');
// const path = require('path');

module.exports = (app) => {
    const router = new Router();
    // router.prefix('/api')
    const { controller } = app;
    // router.get('/', async (ctx, next) => {
    //    await mount('/manager', staticMiddleware)(ctx, next);
    // });
    router.get('/', controller.user.handle);
    router.get('/test', controller.user.testService);
    // 其他路由...
    return router;
}
