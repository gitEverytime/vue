
/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';

/** import component */
import TemPublic  from '../vue/screen_public/screen_public.vue';


class MainScreenPrivate{
    constructor(){

        this.routerList = null;

        this.comRouter  = null;

        this.initRouter();
    }


    initRouter(){
        this.routerList = [
            { path: '/',        name:"/",   component:TemPublic  }
        ];

        this.comRouter = new VueRouter( {routes:this.routerList} );
    }

    getRouter(){
        return this.comRouter;
    }





}

export default new MainScreenPublic();

