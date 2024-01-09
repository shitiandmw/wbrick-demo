const Router = require('koa-router');
const backend = require('./backend/routes');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const history = require('connect-history-api-fallback');

// const staticCache = require('koa-static-cache')

module.exports = (app,pluginPrefix) => {

    const vueHistory = () => {
        const middleware = history();
        return async (ctx, next) => {
            middleware(ctx, null, () => { });
            await next();
        };
    };
    const router = new Router();
    const backendRoutes = backend(app);

    // router.get('(.*)',staticCache(path.join(__dirname, 'public'), {
    //     maxAge: 365 * 24 * 60 * 60,
    //     prefix: '/manager',
    //     buffer:true,
    //   }));
    router.get('(.*)', mount(pluginPrefix, serve(path.join(__dirname, './public'), { maxage: 10000 })));
    router.use('/api', backendRoutes.routes(), backendRoutes.allowedMethods());

    return router;
}

