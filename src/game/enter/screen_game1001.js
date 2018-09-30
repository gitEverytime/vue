/*******************全局样式*************************** */
import '../../style/sass/icon.scss'
import "../../libs/toast/toast.css"
/********************************************* */
import Vue              from 'vue';
import VueRouter        from 'vue-router';
import RouterGame1      from "../router/router_game1001.js";
import MainStore        from "../vuex/main_store.js";
import Toast from "../../libs/toast"
import Logger from "../../libs/logger"

import TempGame1      from "../vue/game1001/game_main.vue";


Vue.use( VueRouter );
Vue.use(Toast)
Vue.use(Logger)

new Vue({
    el:'#B-body',
    router:RouterGame1.getRouter(),
    store:MainStore,
    render:render => render( TempGame1 ),
    data:{
        notify:new Vue()  //统一事件派发
    }
});