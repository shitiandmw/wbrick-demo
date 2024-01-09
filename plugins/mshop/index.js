const path = require('path');
const { Plugin } = require('wbrick');
const routes = require('./routes');

module.exports = class ManagerPlugin extends Plugin {

    async initialize() {
        try {
            this.modelPath = path.join(__dirname, 'model');
            this.controllerPath = path.join(__dirname, 'controller');
            this.servicePath = path.join(__dirname, 'service');

            this.loadModel();
            this.LoadController();
            this.loadService();
            this.loadRouter(routes(this.app));

        } catch (error) {
            this.app.logger.error(error);
        }
    }

};