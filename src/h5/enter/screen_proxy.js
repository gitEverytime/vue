/*******************全局样式*************************** */
import "../../libs/toast/toast.css"
import 'element-ui/lib/theme-chalk/index.css';
import '../../style/sass/screen_proxy.scss'
/********************************************* */
import Vue              from 'vue';
import VueRouter        from 'vue-router';
import TemScreen     from '../vue/screen_proxy/main.vue';
import MainRouter       from "../router/router_screen_proxy.js";
import {InputNumber, Switch, Icon} from 'element-ui'

import Toast from "../../libs/toast"


Vue.use( VueRouter );

Vue.use(Toast)

Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Icon)

new Vue({
    el:'#B-body',
    router:MainRouter.getRouter(),
    render:render => render( TemScreen ),
    data:{
        notify:new Vue()  //统一事件派发
    }
});

