var state = {
    //当前聊天的对象
    applyInfo: {},
}


var getters = {
    getApplyInfo(state){
        return state.applyInfo;
    },

}

var actions = {};

var mutations = {
    setApplyInfo(state, data) {
        state.applyInfo = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}