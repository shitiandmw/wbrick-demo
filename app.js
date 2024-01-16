const Koa = require('koa');
const { PluginLoader } = require('wbrick');


const pluginLoader = new PluginLoader();
pluginLoader.initialize().then(() => {
    const app = new Koa();
    // 设置cookie签名密钥
    app.keys = ["d609c5d520c70e29997f2acb0eb84277f92fcfdc63c70650d069d2544d6bd94d","277f8186d5c06223a5b78a3ef7256f8fedb938313919a594b6d0bb02c07d6a5a"];
    // 插件路由中间件
    app.use(pluginLoader.getRouteMiddleware());
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});