/*********************************************************/
import '../../style/css/base.css';
/*********************************************************/
import Vue               from 'vue';
import VueRouter         from 'vue-router';

import TemReg  from '../vue/platform/login/reg.vue';

Vue.use( VueRouter );

new Vue({
    el:'#B-body',
    render:render => render( TemReg )
});
