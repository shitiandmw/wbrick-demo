// 导入router所需的方法
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 导入路由页面的配置
import routes from './map'

const getBasePath = () => {
    // 这里的逻辑根据实际部署结构确定
    // 例如，提取 URL 的一部分作为 base 路径
    const pathArray = window.location.pathname.split('/');
    const basePath = pathArray.length > 1 ? `/${pathArray[1]}/` : '/';
    return basePath;
};

// 设置路由base路径为环境变量配置
const basePath = import.meta.env.VITE_DEPLOY_PATH || getBasePath()
// 路由参数配置
const router = createRouter({
    history: createWebHistory(basePath),
    // history: createWebHashHistory(),
    routes: routes
})

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
    // 继续前进 next()
    // 返回 false 以取消导航
    next()
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
})

// 导出默认值
export default router
