var state = {
    //当前聊天的对象
    chatUserInfo: {},
    //私聊数据
    secretChatDic: {},

    myRoomInfo : window.RINFO,

    unReadMessageNumber: 0,
}


var getters = {

    getCurrChatUserInfo(state){
        return state.chatUserInfo;
    },

    getChatDic(state){
        return state.secretChatDic;
    },

    getChatListByToUserId(state){
        return function(toUserId){
            if(!state.secretChatDic) return [];
            if(!state.secretChatDic[toUserId]) return[]

            return state.secretChatDic[toUserId];
        }
    },

    getUnReadMessageNumber: state => state.unReadMessageNumber

}

var actions = {}

var mutations = {
    setChatUserInfo(state, data) {
        state.chatUserInfo = data;
    },

    storeAddSecretChatData(state, data) {
        var dicKey = data.cid == state.myRoomInfo.clientId? data.tid: data.cid;

        if(!state.secretChatDic){
            state.secretChatDic = {};
        }

        if(!state.secretChatDic[dicKey]){
            state.secretChatDic[dicKey] = [];
        }

        state.secretChatDic[dicKey].push(data);
        state.unReadMessageNumber ++;
    },

    storeClearUnReadMessageNumber: (state) => {
        state.unReadMessageNumber = 0
    },

    storeChatDic: (state, chatDic) => {
        state.secretChatDic = chatDic
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}