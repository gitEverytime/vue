/*
 * @Author: jgg 
 * @Date: 2018-04-17 11:31:29 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-18 14:31:02
 * @Describe  私屏路由
 */

/**
 * 组件路由配置
 * author:mj
 */

import VueRouter from 'vue-router';

/** import component */
import TemInteractive      from "../vue/screen_private/child/box/box_interactive.vue";
import TempAgreement       from "../vue/screen_private/child/actor/agreement.vue";
import TempAcForm          from "../vue/screen_private/child/actor/actor_form.vue";
import TempAcWait          from "../vue/screen_private/child/actor/apply_wait.vue";
import TempUserProgram     from "../vue/screen_private/child/user/program.vue";
import TempActorProgram    from "../vue/screen_private/child/actor/program_main.vue";
import TempGame            from "../vue/screen_private/child/game/game.vue";
import TempProgramOrder    from "../vue/screen_private/child/actor_center/program_order.vue";
import TempChatRoom        from "../vue/screen_private/child/chat/chat_room.vue";
import TempChatList        from "../vue/screen_private/child/chat/chat_list.vue";
import TempHome            from "../vue/screen_private/child/home/home.vue";
import TempInvite          from "../vue/screen_private/child/game/invite.vue";
import TempFollow          from "../vue/screen_private/child/home/follow/follow.vue"
import TempRegister        from "../vue/screen_private/child/home/register/register.vue"
import TempPreRegister     from "../vue/screen_private/child/home/register/pre_register.vue"
import ApplyNotes          from "../vue/screen_private/child/actor/apply/apply_notes.vue"
import ApplyForm           from "../vue/screen_private/child/actor/apply/apply-form.vue"
import ApplySuccess        from "../vue/screen_private/child/actor/apply/apply_success.vue"
import OrderManage         from "../vue/screen_private/child/home/orderManage/order_manage.vue"
import knapsackExplain     from "../vue/screen_private/child/home/knapsack/knapsack_explain.vue"
import Tool                from "../vue/screen_private/child/home/knapsack/tool.vue"
import Microphone          from "../vue/screen_private/child/microphone/microphone.vue"
import CashExplain         from "../vue/screen_private/child/home/wallet/cash_explain.vue"
import PersonInfo          from "../vue/screen_private/child/home/personInfo/personInfo.vue"
import MembershipCard      from "../vue/screen_private/child/home/knapsack/membership_card.vue"
import HistoryBill         from "../vue/screen_private/child/home/knapsack/history_bill.vue"
import Bill                from "../vue/screen_private/child/home/wallet/bill.vue"

import Actor               from "../vue/screen_private/child/actor/box_actor.vue"
import Onscreen            from "../vue/screen_private/child/onscreen/gift_index.vue"
import Reward              from "../vue/screen_private/child/reward/reward.vue"

import Dining              from "../vue/screen_private/child/dining/dining.vue"
import SelectNumber        from "../vue/screen_private/child/dining/select-number.vue"
import OrderMeal           from "../vue/screen_private/child/dining/order-meal.vue"
import ConfirmOrder        from "../vue/screen_private/child/dining/confirm-order.vue"
import WriteRemark         from "../vue/screen_private/child/dining/write-remark.vue"
import ConfirmDetail       from "../vue/screen_private/child/dining/confirm-detail.vue"
import OrderResult         from "../vue/screen_private/child/dining/order-result.vue"
import HistoryOrder        from "../vue/screen_private/child/dining/history-order.vue"
import Business            from "../vue/screen_private/child/dining/business.vue"
import OrderTable          from "../vue/screen_private/child/dining/order-table.vue"
import OrderDetail         from "../vue/screen_private/child/dining/order-detail.vue"

import ChooseTable         from "../vue/screen_private/child/waiter/choose-table.vue"
import WaiterOrderMeal     from "../vue/screen_private/child/waiter/waiter-order-meal.vue"
import WaiterConfirmOrder  from "../vue/screen_private/child/waiter/waiter-confirm-order.vue"
import WaiterWriteRemark   from "../vue/screen_private/child/waiter/waiter-write-remark.vue"
import WaiterOrderResult   from "../vue/screen_private/child/waiter/waiter-order-result.vue"
import WaiterHistoryOrder  from "../vue/screen_private/child/waiter/waiter-history-order.vue"
import WaiterOrderDetail   from "../vue/screen_private/child/waiter/waiter-order-detail.vue"

import TempInvite1003      from "../vue/screen_private/child/game/invite1003.vue";

class MainScreenPrivate{
    constructor(){

        this.routerList = null;

        this.comRouter  = null;

        this.initRouter();
    }


    initRouter(){
        this.routerList = [
            { path: '/',                   name:"talk",               component:TemInteractive  },
            { path: '/talk',               name:"talk",               component:TemInteractive },
            { path: '/agreement',          name:"agreement",          component:TempAgreement },
            { path: '/actorForm',          name:"actorForm",          component:TempAcForm },
            { path: '/actorWait',          name:"actorWait",          component:TempAcWait },
            { path: '/uProgram',           name:"uProgram",           component:TempUserProgram },
            { path: '/aProgram',           name:"aProgram",           component:TempActorProgram },
            { path: '/game',               name:"game",               component:TempGame },
            { path: '/programOrder',       name:"programOrder",       component:TempProgramOrder },
            { path: '/chatRoom',           name:"chatRoom",           component:TempChatRoom },
            { path: '/chatList',           name:"chatList",           component:TempChatList },
            { path: '/home',               name:"home",               component:TempHome },
            { path: '/invite',             name:"invite",             component:TempInvite },
            { path: '/follow',             name:"follow",             component:TempFollow },
            { path: '/register',           name:"register",           component:TempRegister },
            { path: '/pre-register',       name:"pre-register",       component:TempPreRegister },
            { path: '/applyNotes',         name:"applyNotes",         component:ApplyNotes },
            { path: '/ApplyForm',          name:"ApplyForm",          component:ApplyForm },
            { path: '/ApplySuccess',       name:"ApplySuccess",       component:ApplySuccess },
            { path: '/OrderManage',        name:"OrderManage",        component:OrderManage },
            { path: '/knapsackExplain',    name:"knapsackExplain",    component:knapsackExplain },
            { path: '/tool',               name:"tool",               component:Tool },
            { path: '/microphone',         name:"microphone",         component:Microphone },
            { path: '/CashExplain',        name:"CashExplain",        component:CashExplain },
            { path: '/PersonInfo',         name:"PersonInfo",         component:PersonInfo },
            { path: '/MembershipCard',     name:"MembershipCard",     component:MembershipCard },
            { path: '/HistoryBill',        name:"HistoryBill",        component:HistoryBill },
            { path: '/Bill',               name:"Bill",               component:Bill },

            { path: '/Actor',              name:"Actor",              component:Actor },
            { path: '/Onscreen',           name:"Onscreen",           component:Onscreen },
            { path: '/Reward',             name:"Reward",             component:Reward },

            { path: '/Dining',             name:"Dining",             component:Dining },
            { path: '/SelectNumber',       name:"SelectNumber",       component:SelectNumber },
            { path: '/OrderMeal',          name:"OrderMeal",          component:OrderMeal },
            { path: '/ConfirmOrder',       name:"ConfirmOrder",       component:ConfirmOrder },
            { path: '/WriteRemark',        name:"WriteRemark",        component:WriteRemark },
            { path: '/ConfirmDetail',      name:"ConfirmDetail",      component:ConfirmDetail },
            { path: '/OrderResult',        name:"OrderResult",        component:OrderResult },
            { path: '/HistoryOrder',       name:"HistoryOrder",       component:HistoryOrder },
            { path: '/Business',           name:"Business",           component:Business },
            { path: '/OrderTable',         name:"OrderTable",         component:OrderTable },
            { path: '/OrderDetail',        name:"OrderDetail",        component:OrderDetail },

            { path: '/ChooseTable',        name:"ChooseTable",        component:ChooseTable },
            { path: '/WaiterOrderMeal',    name:"WaiterOrderMeal",    component:WaiterOrderMeal },
            { path: '/WaiterConfirmOrder', name:"WaiterConfirmOrder", component:WaiterConfirmOrder },
            { path: '/WaiterWriteRemark',  name:"WaiterWriteRemark",  component:WaiterWriteRemark },
            { path: '/WaiterOrderResult',  name:"WaiterOrderResult",  component:WaiterOrderResult },
            { path: '/WaiterHistoryOrder', name:"WaiterHistoryOrder", component:WaiterHistoryOrder },
            { path: '/WaiterOrderDetail',  name:"WaiterOrderDetail",  component:WaiterOrderDetail },

            { path: '/invite1003',         name:"invite1003",         component:TempInvite1003 },
        ];

        this.comRouter = new VueRouter( {routes:this.routerList} );
    }

    getRouter(){
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

