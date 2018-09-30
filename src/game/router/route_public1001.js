/*
 * @Author: jgg
 * @Date: 2018-04-17 11:31:29
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-14 16:16:38
 * @Describe 游戏公屏
 */

/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';
import TempHome from '../vue/public/1001/home.vue'
import TempCountDown from '../vue/public/1001/count_down.vue'
import TempProgress from '../vue/public/1001/progress.vue'
import TempResult from '../vue/public/1001/result.vue'

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "main", component: TempHome},
            {path: '/countDown', name: "countDown", component: TempCountDown},
            {path: '/progress', name: "progress", component: TempProgress},
            {path: '/result', name: "result", component: TempResult},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

