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
import TempMain from '../vue/game1001/game_main.vue'
import TempCreate from '../vue/game1001/create.vue'
import TempPrepare from '../vue/game1001/prepare.vue'
import TempPreparePlayer from '../vue/game1001/prepare_player.vue'
import TempPlay from '../vue/game1001/play.vue'
import TempProgress from '../vue/game1001/progress.vue'
import TempResult from '../vue/game1001/result.vue'
import TempResultPlayer from '../vue/game1001/result-player.vue'
import TempCountDown from '../vue/game1001/count_down.vue'
import TempCountDownPlayer from '../vue/game1001/count_down_player.vue'
/** import component */

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "main", component: TempMain},
            {path: '/create', name: "create", component: TempCreate},
            {path: '/prepare', name: "prepare", component: TempPrepare},
            {path: '/preparePlayer', name: "preparePlayer", component: TempPreparePlayer},
            {path: '/play', name: "play", component: TempPlay},
            {path: '/progress', name: "progress", component: TempProgress},
            {path: '/result', name: "result", component: TempResult},
            {path: '/resultPlayer', name: "resultPlayer", component: TempResultPlayer},
            {path: '/countDown', name: "countDown", component: TempCountDown},
            {path: '/countDownPlayer', name: "countDownPlayer", component: TempCountDownPlayer},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

