/*
 * @Author: jgg 
 * @Date: 2018-04-17 11:31:29 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-14 16:16:38
 * @Describe  私屏路由
 */

/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';
import Main from '../vue/game1002/game_main.vue'
import Create from '../vue/game1002/create.vue'
import Prepare from '../vue/game1002/prepare.vue'
import Playing from '../vue/game1002/playing.vue'

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "Main", component: Main},
            {path: '/Create', name: "Create", component: Create},
            {path: '/Prepare', name: "Prepare", component: Prepare},
            {path: '/Playing', name: "Playing", component: Playing},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

