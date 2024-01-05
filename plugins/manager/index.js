const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
module.exports = class Plugin {
    constructor(dependencies) {
        this.app = {};
        this.router = new Router();
        // 接收注入的关键模块
        this.routerInterface = dependencies.routerInterface;
        this.mongoInterface = dependencies.mongoInterface;

        this.app.logger = dependencies.loggerInterface;
        this.app.redis = dependencies.redisInterface;
        this.app.pluginApi = dependencies.apiInterface;
        this.app.pluginEvent = dependencies.eventInterface;
        this.app.hook = dependencies.hookInterface;
        this.app.model = {};

    }

    initialize() {
        try {
            this.setupRoutes();
            this.loadRouter();
            this.loadModel();
            this.initData();
        } catch (error) {
            this.app.logger.error(error);
        }
    }
    /**
     * 加载路由
     */
    loadRouter() {
        this.routerInterface && this.routerInterface.registerRoutes(this.router);
    }

    /**
     * 加载模型
     * @returns 
     */
    loadModel() {
        if (!this.mongoInterface) {
            this.app.logger.info("mongoInterface is null");
            return;
        }

        const modelDefinitions = {};
        const modelInstances = {}; // 用于存储实例化的模型
        // 遍历当前目录下的所有模型文件
        fs.readdirSync(__dirname + '/model').forEach(file => {
            if (path.extname(file) === '.js') {
                const modelName = path.basename(file, '.js');
                modelDefinitions[modelName] = __dirname + '/model/' + file;
            }
        });
        let property = 'user';
        // 使用 Proxy 实现懒加载
        this.app.model = new Proxy(modelDefinitions, {
            get: (target, property) => {
                if (!target[property]) {
                    return undefined; // 模型定义不存在
                }
                if (!modelInstances[property]) {
                    // 如果模型尚未创建，则加载并创建模型
                    const model = require(target[property])(this.mongoInterface);
                    modelInstances[property] = model; // 存储已创建的模型
                }
                return modelInstances[property];
            }
        });
    }

    setupRoutes() {
        this.router.get('/', async ctx => {
            this.app.logger.info('Plugin A is handling the request , path: ' + ctx.path);
            ctx.body = 'Response from Plugin A';
        });
        // 其他路由...
    }

    // 初始化数据
    initData() {
        // 如果user表中没有数据，则初始化一个管理员
        this.app.model.user.countDocuments().then(count => {
            this.app.logger.info(`user count: ${count}`);
            if (count === 0) {
                this.app.model.user.create({
                    name: '管理员',
                    account: 'admin',
                    password: '123456'
                });
            }
        });
    }
};