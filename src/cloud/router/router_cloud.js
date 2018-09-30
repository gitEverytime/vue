/*
 * @Author: jgg 
 * @Date: 2018-04-17 11:31:29 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-18 15:33:03
 * @Describe  后台地址路由
 */

/**
 * 组件路由配置
 * author:mj
 */

import VueRouter         from 'vue-router';
import TempMiddlePage        from '../vue/global/middle_page.vue'
import TempUserCenter    from '../vue/user/user-center.vue'

import TempInteractive   from '../vue/interactive/index.vue';
import TempGameSetBox    from "../vue/interactive/game/game_set_box.vue";
import TempActor         from "../vue/worker/actor/actor_index.vue";
import TempService       from '../vue/worker/service/service_index.vue';

import TempMeal          from '../vue/meal/item/meal_index.vue';
import TempBarIndex        from '../vue/meal/bar/bar_index.vue';        //巴图管理
import TempLine          from '../vue/meal/line/lineUp.vue'
import TempDevice        from '../vue/meal/device/device_index.vue'

import TempPlatformActorApply from "../vue/platform/actor/platform_actor_apply.vue";
import TempPlatformActorList  from "../vue/platform/actor/platform_actor_list.vue";
import TempOpenDoorIndex from '../vue/openDoor/open_index.vue';
import TempModule        from '../vue/module/module_index.vue';
import TempInterlligentReport from '../vue/report/interlligent_report.vue'

import TempCapital       from '../vue/capital/capital_index.vue'

import TempAccount       from '../vue/account/account_index.vue'

import TempOpenAgent     from '../vue/agent/open_agent.vue'
import TempFreezeAgent   from '../vue/agent/freeze_agent.vue'
import TempRootAgent     from '../vue/agent/root_agent.vue'
import TempAgentList     from '../vue/agent/agent_list.vue'

import TempOpenStore     from '../vue/store/open_store.vue'
import TempStoreList     from '../vue/store/store_list.vue'

import TempActorIndex    from '../vue/hr/actor/actor_index.vue'
import TempServiceIndex  from '../vue/hr/service/service_index.vue'
import TempServiceList   from '../vue/hr/service/service_list.vue'

import TempTradeOrder  from '../vue/finance/trade_order.vue'
import TempUnFinishedOrder   from '../vue/finance/unfinished_order.vue'
import TempUnSettlementSheet  from '../vue/finance/unsettlement_sheet.vue'
import TempSettlementSheet   from '../vue/finance/settlement_sheet.vue'
import TempTradeDetail from  '../vue/finance/trade_detail.vue'
import TempUnfinishedDetail  from  '../vue/finance/unfinished_detail.vue'
import TempFundManage    from   '../vue/finance/fund_manage.vue'
import TempApplyRefund    from '../vue/finance/apply_refund.vue'
import TempSearchRefund   from '../vue/finance/search_refund.vue'

import TempAccountIndex   from '../vue/proxyAccount/account_index.vue'

import TempPublicMarket   from '../vue/market/public_market.vue'

/** import component */

class RouterMainCloud {
    constructor() {

        this.routerList = null;

        this.comRouter  = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            /**
             * 初始页面中间页
             */
            {path: '/middle/page',      component: TempMiddlePage},                //中间页
            {path: '/user/center',      component: TempUserCenter},                //用户中心

            /**
             * 商户后台路径
             */
            {path: '/', name: "/",      component: TempOpenDoorIndex},                //开门大吉
            {path: '/interacrt/index', component: TempInteractive},                   //互动管理
            {path: '/game/set/:gameId', component: TempGameSetBox},                   //游戏设置
            {path: '/worker/actor',     component: TempActor},                        //艺人
            {path: '/worker/service',     component: TempService},                    //服务员

            {path: '/meal/index',     component: TempMeal},                           //品项管理
            {path: '/meal/bar',     component: TempBarIndex},                         //吧图管理
            {path: '/meal/line/up',     component: TempLine},                         //排队管理
            {path: '/meal/device/index',     component: TempDevice},                  //设备管理

            {path: '/platform/actor/apply',     component: TempPlatformActorApply},
            {path: '/platform/actor/list',      component: TempPlatformActorList},
            {path: '/module/index',      component: TempModule},

            {path: '/interlligent/report',      component: TempInterlligentReport},   //智能报表

            {path: '/capital/index',      component: TempCapital},                    //资金管理

            {path: '/account/index',      component: TempAccount},                    //账户管理

            /**
             * 总后台路径（代理/商户）
             */
            {path: '/agent/open',      component: TempOpenAgent},                     //开设代理
            {path: '/agent/freeze',      component: TempFreezeAgent},                 //注销冻结
            {path: '/agent/root',      component: TempRootAgent},                     //管理权限
            {path: '/agent/list',      component: TempAgentList},                     //代理列表

            {path: '/store/open',      component: TempOpenStore},                     //开设商铺
            {path: '/store/list',      component: TempStoreList},                     //商户列表

            {path: '/actor/index',      component: TempActorIndex},                   //人资管理（艺人）
            {path: '/service/index',      component: TempServiceIndex},               //人资管理（服务员管理）
            {path: '/service/list',      component: TempServiceList},                 //人资管理（服务员list）

            /**
             * 财务管理路径
             */
            {path: '/trade/order',      component: TempTradeOrder},                    //交易订单
            {path: '/trade/detail/:id',      component: TempTradeDetail},              //订单详情
            {path: '/unfinished/order',      component: TempUnFinishedOrder},          //未结订单
            {path: '/unfinished/detail/:id',      component: TempUnfinishedDetail},    //未结订单详情

            {path: '/unsettlement/sheet',      component: TempUnSettlementSheet},      //结算单(未结)
            {path: '/settlement/sheet',      component: TempSettlementSheet},          //结算单(已结)
            {path: '/fund/manage',      component: TempFundManage},                    //资金管理
            {path: '/apply/refund',      component: TempApplyRefund},                  //申请退款
            {path: '/search/refund',      component: TempSearchRefund},                //查询退款
            /**
             * 代理平台路径
             */
            {path: '/total/account/index',      component: TempAccountIndex},          //代理账号

            {path: '/public/market',      component: TempPublicMarket},                //公屏营销

            /**
             * 退款路径
             */

        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }

}

export default new RouterMainCloud();

