const Router = require('koa-router');

module.exports = (app) => {
    const router = new Router();
    const { controller } = app;
    router.get('/', controller.user.handle);
    router.get('/test', controller.user.testService);
    // 其他路由...
    return router;
}