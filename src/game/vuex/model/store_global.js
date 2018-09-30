import REQ from "../../vue/common/request"

var state = {
    userList: [],// 用户列表
    userCount: 0, //参与游戏的人数
}


var getters = {
    getUserById: (state) => (id) => {
        return state.userList.filter(item => item.clientId === id)[0] || {}
    },

    getUserCount: state => state.userCount
}

var actions = {}

var mutations = {
    storeUserList(state, params) {
        REQ.reqUserList(params,
            (data) => {
                state.userList = data.data;
            },
            (complete) => {
            },
            (err) => {
            }
        );
    },

    storeUserCount: (state, count) => {
        state.userCount = count
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}