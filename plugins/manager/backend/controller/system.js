const { Controller } = require('wbrick');

class SystemController extends Controller {
    async menuList() {
        let manager_menus = [

        ];

        // 获得所有注册的菜单项
        const listeners = Array.from(this.app.hook.getHookListeners("register_menu"))
            .map(listener => Promise.resolve().then(listener));

        // 执行所有监听器
        const results = await Promise.allSettled(listeners);

        // 累加成功的菜单项
        const menus = results.reduce((accumulatedMenus, item) => {
            if (item.status === "rejected") {
                this.app.logger.error(item.reason);
            }
            if (item.status === "fulfilled" && item.value) {
                return accumulatedMenus.concat(item.value);
            }
            return accumulatedMenus;
        }, []);
        
        this.ctx.menus = menus;
    }
}

module.exports = SystemController;