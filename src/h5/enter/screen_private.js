/*******************全局样式*************************** */
import '../../style/css/global.css';
import '../../libs/emoji/emoji.css';
import '../../style/sass/icon.scss'
import "../../libs/toast/toast.css"
// import "vue2-animate/dist/vue2-animate.min.css"
/********************************************* */
import Vue              from 'vue';
import VueRouter        from 'vue-router';
import TemScreenPre     from '../vue/screen_private/main.vue';
import MainRouter       from "../router/router_screen_private.js";
import MainStore        from "../vuex/main_store.js";
import DB               from '../../libs/localStorage.js'

import Toast from "../../libs/toast"
import Logger from "../../libs/logger"

Vue.use( VueRouter );

Vue.use(Toast)

Vue.use(Logger)

Vue.use(DB)

new Vue({
    el:'#B-body',
    router:MainRouter.getRouter(),
    store:MainStore,
    render:render => render( TemScreenPre ),
    data:{
        notify:new Vue()  //统一事件派发
    }
});

