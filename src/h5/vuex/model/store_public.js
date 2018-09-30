var state = {
    //当前聊天的数组
    publicUserInfo:[],
    //
    popoverShow:false,
    //存贮商家基本信息
    storeInfo:{},

    //判断是否正在进行打赏环节
    isReward:false,

    //获取当前进入公屏的用户信息
    userList:[],
    onScreenPic:'',
    paremInfo:'',

    /**
     * 存贮当前播放的时间戳
     */
    createdAt:''


};


var getters = {

    getPublicUserInfo(state){
        return state.publicUserInfo;
    },
    getPopoverShow(state){
        return state.popoverShow;
    },
    getStoreInfo(state){
        return state.storeInfo;
    },
    getIsReward(state){
        return state.isReward;
    },
    getUserList(state){
        return state.userList;
    },
    getOnScreenPic(state){
        return state.onScreenPic;
    },
    getParemInfo(state){
        return state.paremInfo;
    },
    getCreatedAt(state){
        return state.createdAt;
    },

}

var actions = {}

var mutations = {
    setChatUserInfo(state, data) {
        state.publicUserInfo = data;
    },
    setPopoverShow(state, data) {
        state.popoverShow = data;
    },
    setStoreInfo(state, data) {
        state.storeInfo = data;
    },
    setIsReward(state, data) {
        state.isReward = data;
    },
    setUserList(state, data) {
        state.userList = data;
    },
    setOnScreenPic(state, data) {
        state.onScreenPic = data;
    },
    setParemInfo(state, data) {
        state.paremInfo = data;
    },
    setCreatedAt(state, data) {
        state.createdAt = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}