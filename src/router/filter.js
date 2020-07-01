// 该文件记得在main.js中引入
import nprogress from "nprogress";
import "nprogress/nprogress.css";

import router from "./index";
// import { getToken } from '@/utils/token'
import store from '@/store'

// 进度条配置
nprogress.configure({ minimum: 0.01, trickle: false });

// 无需token的路由白名单
const whiteList = ["/account", "/404"];

// 全局前置守卫
// 确保要调用 next 方法，否则钩子就不会被 resolved
// 可以在这里加入页面加载进度条、登陆判断等等...
router.beforeEach(async (to, form, next) => {
    // 开启进度条
    nprogress.start();
    // title设置
    to.meta.title && (document.title = !to.meta.title ? process.env.VUE_APP_PAGE_TITLE_BASE : (to.meta.title + " - " + process.env.VUE_APP_PAGE_TITLE_BASE));

    // 过滤路由白名单
    if (whiteList.indexOf(to.path) !== -1) {
        // next();
        // nprogress.done();

        if (to.path === "/404") {
            const res = await store.dispatch("getUserInfo");
            if (res) {
                next(); // =404
            } else {
                next(to.redirectedFrom ? `/account?redirect=${to.redirectedFrom}` : `/account`);
            }
        } else if (to.path === "/account") {
            if (store.state.token)
                next(`/my?t=${Date.now()}`);
            else
                next();
        } else {
            next();
        }
        nprogress.done();
    } else {
        // 获取token
        const token = store.state.token;
        // token过滤
        if (token) {
            next();
        } else {
            next(`/account?redirect=${to.path}`);
        }
        nprogress.done();
    }

});


// 全局后置钩子
// 这些钩子不会接受 next 函数也不会改变导航本身
// 我们可以在这里结束页面加载进度条
router.afterEach((to, from) => {
    nprogress.done();
});