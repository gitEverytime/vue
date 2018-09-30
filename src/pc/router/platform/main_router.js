
/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';

/** import component */
import TemData             from '../../vue/platform/shop/data/data_index.vue';
import TemShopInteractive  from '../../vue/platform/shop/interactive/interactive.vue';
import TemFood             from '../../vue/platform/shop/food/shop_food.vue';
import TemAccount          from '../../vue/platform/shop/account/account.vue';
import TemModule           from '../../vue/platform/shop/module/module.vue';
import TemNameList         from '../../vue/platform/shop/namelist/namelist_index.vue';
import TemActor            from '../../vue/platform/shop/actor/actor_index.vue';
import TemBarInfo          from '../../vue/platform/shop/infomation/bar_index.vue';

import TemVerifyActor      from '../../vue/platform/platform/actor/actor_varify_index.vue';

class MainMenuLeft{
    constructor(){

        this.routerList = null;

        this.comRouter  = null;

        this.initRouter();
    }


    initRouter(){

       this.routerList = [
            { path: '/',                 name:'/',                 component: TemData },
            { path: '/dataSet',          name: 'dataSet',          component: TemData },
            { path: '/interactiveSet',   name: 'interactiveSet',   component: TemShopInteractive },
            { path: '/foodSet',          name: 'foodSet',          component: TemFood },
            { path: '/accountSet',       name: 'accountSet',       component: TemAccount },
            { path: '/moduleSet',        name: 'moduleSet',        component: TemModule },
            { path: '/namelistSet',      name: 'namelistSet',      component: TemNameList },
            { path: '/actorSet',         name: 'actorSet',         component: TemActor },
            { path: '/barSet',           name: 'barSet',           component: TemBarInfo },
            { path: '/verifyActor',      name: 'verifyActor',      component: TemVerifyActor },
        ];

        this.comRouter = new VueRouter( {routes:this.routerList} );
    }

    getRouter(){
        return this.comRouter;
    }




}

export default new MainMenuLeft();

