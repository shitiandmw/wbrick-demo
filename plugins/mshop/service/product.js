const { Service } = require('wbrick');
class ProductService extends Service {
    async test() {
        return this.ctx.user;
    }
}

module.exports = ProductService;
