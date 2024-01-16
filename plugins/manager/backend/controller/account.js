const { Controller } = require('wbrick');

class AccountController extends Controller {
    async login() {
        const { ctx, app } = this;
        const input = ctx.request.body;
        const {errors, isValid} = app.validator.account.login(input);

        ctx.body = { test: ctx.tool.md5("111111") };
    }

    async loginTest() {
        const uuid = this.ctx.tool.uuid();
        this.app.logger.info("uuid:"+uuid);
        this.ctx.session.user = {
            id:1111,
            user:"shitian",
            uuid:uuid
        };
        this.ctx.body = "success";
    }
}

module.exports = AccountController;