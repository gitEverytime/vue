import Vue   from 'vue';
import Vuex  from 'vuex';

import VuexProgram    from "./model/store_program.js";
import VuexGlobal     from "./model/store_global.js";
import VuexChat       from "./model/store_chat.js"
import VuexPublic     from './model/store_public.js'
import VuexDining     from './model/store_dining'

Vue.use( Vuex );

export default new Vuex.Store({
    modules:{
        VuexProgram, VuexGlobal, VuexChat, VuexPublic, VuexDining
    }

});