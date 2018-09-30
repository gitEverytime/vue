/**
 * 组件路由配置
 * author:yongcheng.lian
 */

import VueRouter from 'vue-router';

/** import component */
import login from "../vue/screen_proxy/child/login.vue"
import storeList from '../vue/screen_proxy/child/store-list.vue'
import addStore from '../vue/screen_proxy/child/add-store.vue'

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "login", component: login},
            {path: '/storeList', name: "storeList", component: storeList},
            {path: '/addStore', name: "addStore", component: addStore},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

