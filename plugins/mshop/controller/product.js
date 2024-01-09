const { Controller } = require('wbrick');

class ProductController extends Controller {
    
    async test()
    {
        this.ctx.user = "shitian";
        this.ctx.body = 'Response from ProductController,Test service.ctx:'+await this.ctx.service.product.test();
    }
}

module.exports = ProductController;
