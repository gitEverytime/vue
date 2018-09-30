import Vue   from 'vue';
import Vuex  from 'vuex';
import VuexMeal     from './model/store_meal.js'
import VuexPub      from './model/store_pub.js'
import VuexLogin    from './model/store_login.js'
import VuexOrder    from './model/store_order.js'

Vue.use( Vuex );

export default new Vuex.Store({
    modules:{
        VuexMeal,
        VuexPub,
        VuexLogin,
        VuexOrder
    }

});