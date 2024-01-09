const Router = require('koa-router');

module.exports = (app) => {
    const router = new Router();
    const { controller } = app;
    router.get('/test', controller.product.test);
    // 其他路由...
    return router;
}