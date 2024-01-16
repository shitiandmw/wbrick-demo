const Router = require('koa-router');
const { koaBody } = require('koa-body');
const LWTool = require('lwtool');
const responseHandler = require('../middleware/api_handler');
const session = require('koa-session');
const SessionStore = require('../lib/session_store')

module.exports = (app) => {
    const router = new Router();
    // router.prefix('/api')
    const { controller } = app;

    // 添加session中间件
    const session_config = {
        key: 'plugins:manager',
        store: new SessionStore(app.redis),   // session存储策略
        maxAge: LWTool.D1 * 1000,             // session过期时间1天    
    }

    router.use(async (ctx, next) => {
        const app = {
            use: () => { },
            context: ctx
        }
        await session(session_config, app)(ctx, next);
    });

    // 添加工具类
    router.all('(.*)', async (ctx, next) => {
        ctx.tool = LWTool;
        await next();
    });

    // // 数据响应中间件
    router.all('(.*)', (ctx, next) => responseHandler(ctx, next, app.logger));
    // body参数解析中间件
    router.post('(.*)', koaBody({
        multipart: true,                        // 解析多个文件
        formidable: {
            maxFileSize: 100 * 1024 * 1024,     // 设置上传文件大小最大限制，默认2M
        }
    }));

    router.get('/', controller.user.handle);
    router.get('/test', controller.user.testService);
    router.get('/testcache', async (ctx) => {
        await app.redis.cSet('testCache', 'testCache', 10);
        ctx.body = "testCache"
    });
    router.get('/account/logintest', controller.account.loginTest);
    router.post('/account/login', controller.account.login);
    // 其他路由...
    return router;
}
