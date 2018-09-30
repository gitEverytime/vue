/*********************************************************/
import '../../style/css/base.css';
/*********************************************************/
import Vue               from 'vue';
import VueRouter         from 'vue-router';
import VueAreaLinkage    from 'vue-area-linkage';
import TemIndex          from "../vue/platform/platform_index.vue";
import MainRouter        from '../router/platform/main_router.js';
import StoreMain         from '../vuex/main_store.js';


Vue.use( VueRouter );
Vue.use( VueAreaLinkage );

new Vue({
    el:'#B-enter',
    router:MainRouter.getRouter(),
    store:StoreMain,
    render:render => render( TemIndex )
});


