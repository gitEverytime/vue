/*******************全局样式*************************** */
import '../../style/css/global.css';
import '../../style/css/base.css';
/********************************************* */
import Vue              from 'vue';
import VueRouter        from 'vue-router';
import RouterPublic      from "../router/route_public1001.js";
// import MainStore        from "../vuex/main_store.js";

import TempMain      from "../vue/public/1001/main.vue";


Vue.use( VueRouter );
new Vue({
    el:'#B-body',
    router:RouterPublic.getRouter(),
    // store:MainStore,
    render:render => render( TempMain ),
    data:{
        notify:new Vue()  //统一事件派发
    }
});