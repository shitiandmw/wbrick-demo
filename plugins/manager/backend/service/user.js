const { Service } = require('wbrick');
class UserService extends Service {
    async test() {
        return this.ctx.user;
    }

    async initUser() {
        let userCount =  await this.app.model.user.countDocuments();
        this.app.logger.info('initUser userCount:' +  userCount);
        if (userCount === 0) {
            await this.app.model.user.create({
                name: '管理员',
                account: 'admin',
                password: '123456'
            });
        }
    }
}

module.exports = UserService;
