/*******************全局样式*************************** */
import '../../style/sass/icon.scss'

/********************************************* */
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterGame2001 from "../router/router_game2001.js";

import TempGame from "../vue/game2001/game_main.vue";
Vue.use(VueRouter);

new Vue({
    el: '#B-body',
    router: RouterGame2001.getRouter(),
    render: render => render(TempGame),
    data: {
        notify: new Vue()  //统一事件派发
    }
});