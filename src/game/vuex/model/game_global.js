var state = {
    awardInfo:{},
    isOver:false,
    winners:[],
    count:'0',
    popoverShow:false,
    extractInfo:'',
    playId:'',
};


var getters = {
    getAwardInfo(state){
        return state.awardInfo;
    },
    getIsOver(state){
        return state.isOver;
    },
    getWinners(state){
        return state.winners;
    },
    getCount(state){
        return state.count;
    },
    getPopoverShow(state){
        return state.popoverShow;
    },
    getExtractInfo(state){
        return state.extractInfo;
    },
    getPlayId(state){
        return state.playId;
    },

}

var actions = {}

var mutations = {
    setAwardInfo(state, data) {
        state.awardInfo = data;
    },
    setIsOver(state, data) {
        state.isOver = data;
    },
    setWinners(state, data) {
        state.winners = data;
    },
    setCount(state, data) {
        state.count = data;
    },
    setPopoverShow(state, data) {
        state.popoverShow = data;
    },
    setExtractInfo(state, data) {
        state.extractInfo = data;
    },
    setPlayId(state, data){
        state.playId = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}