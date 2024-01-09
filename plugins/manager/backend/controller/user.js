const { Controller } = require('wbrick');

class UserController extends Controller {
    async handle() {
        let count = await this.app.model.user.countDocuments();
        // 获得请求参数
        const { name, email } = this.ctx.query;
        // 现在可以使用 this.ctx 访问上下文
        this.ctx.body = `Response from UserController,Test app.model:${count},name:${name},email:${email}`;
    }
    async testService()
    {
        this.ctx.user = "shitian";
        let user = await this.ctx.service.user.test();
        this.ctx.body = 'Response from UserController,Test service.ctx:'+user;
    }
}

module.exports = UserController;
