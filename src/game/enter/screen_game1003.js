/*******************全局样式*************************** */
import '../../style/sass/icon.scss'
import "../../libs/toast/toast.css"
/********************************************* */
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterGame1003 from "../router/router_game1003.js";
import Toast from "../../libs/toast"
import Logger from "../../libs/logger"

import TempGame from "../vue/game1003/main.vue";

Vue.use(VueRouter);
Vue.use(Toast)
Vue.use(Logger)

new Vue({
    el: '#B-body',
    router: RouterGame1003.getRouter(),
    render: render => render(TempGame),
    data: {
        notify: new Vue()  //统一事件派发
    }
});