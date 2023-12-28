const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
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

    }

    initialize() {
        this.setupRoutes();
        this.loadRouter();
        this.loadModel();
    }
    /**
     * 加载路由
     */
    loadRouter()
    {
        this.routerInterface && this.routerInterface.registerRoutes(this.router);
    }

    /**
     * 加载模型
     * @returns 
     */
    loadModel(){
        if (!this.mongoInterface) 
        {
            this.app.logger.info("modelFactoryInterface is null");
            return;
        }
        
        this.model = {};
        // 遍历当前目录下的所有模型文件
        fs.readdirSync(__dirname + '/model').forEach(file => {
            if (path.extname(file) === '.js') {
                // 获得模型名称
                const modelName = path.basename(file, '.js');
                // 读取模型文件
                const model = require(__dirname + '/model/' + file);
                // 使用 this.mongooseWrapper.createModel 创建模型
                this.model[modelName] = model(this.mongoInterface);
            }
        });

        this.app.model = this.model;
    }

    setupRoutes() {
        this.router.get('/', async ctx => {
            this.app.logger.info('Plugin A is handling the request , path: '+ ctx.path);
            ctx.body = 'Response from Plugin A';
        });
        // 其他路由...
    }
};