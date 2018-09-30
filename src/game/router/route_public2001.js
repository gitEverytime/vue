/*
 * @Author: jgg
 * @Date: 2018-04-17 11:31:29
 */

/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';
import TempHome from '../vue/public/2001/home.vue';
import TempExtractResult   from '../vue/public/2001/extract_result.vue'
import TempResult          from  '../vue/public/2001/result.vue'

class MainScreenPrivate {
    constructor() {
        this.routerList = null;
        this.comRouter = null;
        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "main", component: TempHome},
            // {path: '/home', name: "home", component: TempHome},
            {path: '/extract/result', name: "extractResult",  component: TempExtractResult},
            {path: '/result', name: "result", component: TempResult},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

