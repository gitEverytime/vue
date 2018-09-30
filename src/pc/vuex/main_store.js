import Vue from 'vue';
import Vuex from 'vuex';

import VuexPlatform   from "./model/platform_store.js";

Vue.use( Vuex );

export default new Vuex.Store({
    modules:{
        VuexPlatform
    }

});