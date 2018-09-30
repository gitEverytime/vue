import Vue from 'vue';
import Vuex from 'vuex';

import VuexGlobal from "./model/store_global.js";
import VuexGame   from "./model/game_global.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        VuexGlobal,
        VuexGame
    }

});