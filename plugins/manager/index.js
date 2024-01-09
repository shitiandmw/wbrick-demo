const path = require('path');
const { Plugin } = require('wbrick');
const router = require('./router');

module.exports = class ManagerPlugin extends Plugin {

    async initialize() {
        try {
            this.modelPath = path.join(__dirname, './backend/model');
            this.controllerPath = path.join(__dirname, './backend/controller');
            this.servicePath = path.join(__dirname, './backend/service');

            this.loadModel();
            this.LoadController();
            this.loadService();
            this.loadRouter(router(this.app,this.routerInterface.getPluginPrefix()));

            // 初始化超级管理员
            await this.app.service.user.initUser();

        } catch (error) {
            this.app.logger.error(error);
        }
    }

};