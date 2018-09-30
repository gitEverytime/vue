var state = {
    //
    id: '',
    type:'1'
}


var getters = {
    getCarteTypeInfo(state){
        return state.id;
    },
    getCarteType(state){
        return state.type;
    },

}

var actions = {}

var mutations = {
    setCarteTypeInfo(state, data) {
        state.id = data;
    },
    setCarteType(state, data) {
        state.type = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}