

var state = {
    //msgList:[]
    accountState:1
}


var getters = {

    getAccountState(state){
        return state.accountState;
    }
    /*
    getMsgList(state){
        return state.msgList;
    }
    */
}

var actions = {
    
}

var mutations = {
    setAccountState(state, val){
        state.accountState = val;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}