var state = {
    hisOrderInfo:'',
    isSettle:false
}


var getters = {
    getHisOrderInfo(state){
        return state.hisOrderInfo;
    },
    getIsSettle(state){
        return state.isSettle;
    },
}

var actions = {}

var mutations = {
    setHisOrderInfo(state, data) {
        state.hisOrderInfo = data;
    },
    setIsSettle(state, data) {
        state.isSettle = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}