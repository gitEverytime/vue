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
import Main from '../vue/game2001/game_main.vue'
import Play from '../vue/game2001/play.vue'
import Adventure from '../vue/game2001/adventure.vue'
import Heart from '../vue/game2001/heart.vue'

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "Main", component: Main},
            {path: '/Play', name: "Play", component: Play},
            {path: '/Adventure', name: "Adventure", component: Adventure},
            {path: '/Heart', name: "Heart", component: Heart},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

