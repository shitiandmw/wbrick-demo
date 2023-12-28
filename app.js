const Koa = require('koa');
const { PluginLoader } = require('wbrick');

const pluginLoader = new PluginLoader();
pluginLoader.initialize().then(() => {
    const app = new Koa();
    app.use(pluginLoader.getRouteMiddleware());
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});