/*********************************************************/
import '../../style/css/base.css';
/*********************************************************/
import Vue               from 'vue';
import VueRouter         from 'vue-router';

import TemLogin  from '../vue/platform/login/login.vue';


Vue.use( VueRouter );

new Vue({
    el:'#B-body',
    render:render => render( TemLogin )
});
