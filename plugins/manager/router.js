const Router = require('koa-router');
const backend = require('./backend/routes');
const { LRUCache } = require('lru-cache')
const staticCache = require('koa-static-cache')
const fs = require('fs');
const path = require('path');

module.exports = (app, pluginPrefix) => {

    const router = new Router();
    const backendRoutes = backend(app);


    // 静态资源缓存策略
    const fileCache = new LRUCache({
        max: 1000,      // 最大缓存文件数量
        ttl: 10000      // 每个缓存的最大生命周期（单位毫秒）
    })
    const staticCacheOpts = {
        prefix: pluginPrefix, // 访问前缀
        maxAge: 100,          // 返回给浏览器的过期时间（单位秒）
        buffer: true,         // 是否在第一次访问文件的时候缓存到内存
        dynamic: true,        // 缓存过期后动态加载文件
        files: fileCache,     // 缓存文件列表(引用lru_cache模块，可以自定义缓存策略)
    };
    const staticDir = "./public";
    const staticMid = staticCache(path.join(__dirname, staticDir), staticCacheOpts);
    router.get('(.*)', async (ctx, next) => {

        // 默认访问index.html路由
        if(ctx.path === `${pluginPrefix}/` || ctx.path === `${pluginPrefix}`)
            ctx.path = path.join(ctx.path, 'index.html');

        // 静态文件管理
        await staticMid(ctx, next);

        /**
         * 支持vue的history模式路由
         * 目前存在问题：
         * 现在实现的方式是在vue项目打包的时候设置环境变量VITE_DEPLOY_PATH=/插件名/，不够灵活，无法使用到主应用传入的pluginPrefix，一旦插件名改变，需要重新打包，对使用者也不友好（因为本系统设计的目标客户是小白，系统和插件都应该支持一键启动）
         * 解决思路：
         * 1、vue打包设置的环境变量VITE_DEPLOY_PATH统一为%pluginPrefix%,在koa路由中间件中替换为真实的pluginPrefix，这种方式有两个问题
         *    + 问题1：影响性能
         *    + 问题2：要把html和js中的%pluginPrefix%都替换掉，还是影响性能
         * 2、在插件动态加载的时候打包vue项目，在打包的时候将pluginPrefix传入，也存在问题：
         *    + 问题1：加载插件插件需要先安装依赖，然后打包，这个过程比较耗时，启动项目的时间就很长
         *    + 问题2：如果在插件配置后台动态配置了插件的路由前缀，插件打包的路径pluginPrefix就会发生变化，需要重载插件
         */
        if (ctx.status === 404 && !ctx.path.startsWith(`${pluginPrefix}/api`)) {
            const indexPath = path.join(__dirname, staticDir, 'index.html');
            // 检查缓存
            let fileBuffer = fileCache.get(indexPath);
            if (!fileBuffer) {
                // 缓存不存在时读取文件并添加到缓存
                fileBuffer = fs.readFileSync(indexPath);
                fileCache.set(indexPath, fileBuffer);
            }
            ctx.type = 'html';
            ctx.body = fileBuffer;
        }
    });


    // router.get('(.*)', mount(pluginPrefix, serve(path.join(__dirname,staticDir), { maxage: 10000 })));
    // api路由
    router.use('/api', backendRoutes.routes(), backendRoutes.allowedMethods());

    return router;
}

