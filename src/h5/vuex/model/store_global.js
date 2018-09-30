import REQ from "../../vue/screen_private/comm/request.js";
import UItype from "../../vue/screen_private/comm/ui_type"

var state = {
    //当前进入房间的用户
    currEnterUser: {},
    //屏幕展示消息数据
    screenDataList: [],
    //艺人列表
    actorList: [],
    //当前游戏邀请参数
    gameInviteInfo: {},
    currTabIndex: 1, //底部栏当前处于tab
    privateCfg: {},  //私屏配置信息
    rightTabIndex: 0, //右侧菜单index
    footMenuShow: true, //底部菜单是否显示
    homeTabIndex: 1,   //home页tabIndex
    orderManageIndex: 1, //订单管理tab页index
    isOnDiningPage: false, //是否在点餐页面
    fileIsUploading: false,  //文件是否正在上传中
    previewImages: [],       //要预览的图片列表
    previewImageIndex: 0,    //当前预览图片index
    originalMsgTimeStamp: 0,  //公聊消息里最早消息的时间戳
    pubChatHasData: true,            //公聊消息是否还有更多需要加载
}


var getters = {
    getCurrEnterUser: state => state.currEnterUser,
    getScreenDataList: state => state.screenDataList,
    getActorList: state => state.actorList,
    getGameInviteInfo: state => state.gameInviteInfo,
    getCurrTabIndex: (state) => state.currTabIndex,
    getPrivateCfg: state => state.privateCfg,
    getRightTabIndex: state => state.rightTabIndex,
    getFootMenuShow: state => state.footMenuShow,
    getHomeTabIndex: state => state.homeTabIndex,
    getOrderManageIndex: state => state.orderManageIndex,
    getIsOnDiningPage: state => state.isOnDiningPage,
    getFileIsUploading: state => state.fileIsUploading,
    getPreviewImages: state => state.previewImages,
    getPreviewImageIndex: state => state.previewImageIndex,
    getPubChatHasData: state => state.pubChatHasData,
}

var actions = {}

var mutations = {

    storeCurrEnterUser(state, data) {
        state.currEnterUser = data;
    },

    storeAddScreenData(state, data) {
        data.liked = false
        data.likedNumber = data.favorCount || 0
        state.screenDataList.push(data);
        if (state.screenDataList.length > 120) {
            state.screenDataList.shift()
        }
    },

    storeHistoryPubChat: (state, callback) => {
        let data = []
        REQ.reqGetPubChat({createdAt: state.originalMsgTimeStamp},
            (res) => {
                res.data.reverse().forEach(item => {
                    switch (item.type) {
                        case '0':  //发言
                            item.uiType = UItype.UI_CHAT_PUB
                            break;
                        case '1':  // 节目，点歌
                        case '2':  // 节目，点舞
                            item.uiType = UItype.UI_PROGRAM
                            break;
                        case '3':  //霸屏
                            item.uiType = UItype.UI_ON_SCREEN_THEME
                            break;
                        case '4':  // 私人红包
                        case '5':  // 全店红包
                        case '6':  // 礼物打赏
                        case '7':  // 实物打赏
                            item.uiType = UItype.UI_REWARD
                            break;
                        case '8':   //霸麦真心话
                        case '9':  //霸麦好声音
                            item.uiType = UItype.UI_BM
                            break;
                    }
                    if (item.detail) {
                        const detail = JSON.parse(item.detail)
                        item = {
                            ...item,
                            ...detail
                        }
                    }
                    item.likedNumber = item.favorCount
                    item.mid = item.id
                    item.liked = item.isFavor == 1 ? true : false
                    data.push(item);
                })

                if (data.length < 20) {
                    state.pubChatHasData = false
                }
                state.screenDataList = data.concat(state.screenDataList)

                if (state.screenDataList.length) {
                    state.originalMsgTimeStamp = state.screenDataList[0].createdAt
                }

                if (state.screenDataList.length >= 100) {
                    state.pubChatHasData = false
                }

                callback("success")
            },
            (complete) => {
            },
            (err) => {
                console.error(err)
            }
        )
    },

    //缓存艺人列表
    storecActorList(state, params) {
        REQ.reqActorInStore({storeId: params.storeId},
            (data) => {
                state.actorList = data.data
            },
            (data) => {
            },
            (data) => {
            }
        );
    },

    storeGameInviteInfo(state, data) {
        state.gameInviteInfo = data
    },

    removeFromScreenData(state, mid) {
        state.screenDataList.some((item, idx) => {
            if (item.mid === mid) {
                state.screenDataList.splice(idx, 1)
                return true
            }
        })
    },

    updateScreenDataLike(state, {mid, liked, likedNumber}) {
        state.screenDataList.some(item => {
            if (item.mid === mid) {
                item.liked = liked
                item.likedNumber = likedNumber
                return true
            }
        })
    },

    storeCurrTabIndex: (state, index) => {
        state.currTabIndex = index
    },

    storePrivateCfg: (state, cfg) => {
        state.privateCfg = cfg
    },

    storeRightTabIndex: (state, index) => {
        state.rightTabIndex = index
    },

    storeFootMenuShow: (state, showOrNot) => {
        state.footMenuShow = showOrNot
    },

    storeHomeTabIndex: (state, index) => {
        state.homeTabIndex = index
    },

    storeOrderManageIndex: (state, index) => {
        state.orderManageIndex = index
    },

    storeIsOnDiningPage: (state, isOn) => {
        state.isOnDiningPage = isOn
    },

    storeFileIsUploading: (state, isUploading) => {
        state.fileIsUploading = isUploading
    },

    storePreviewImages: (state, images) => {
        state.previewImages = images
    },

    storePreviewImageIndex: (state, index) => {
        state.previewImageIndex = index
    },

    storeClearPubChat: state => {
        state.screenDataList = []
        state.originalMsgTimeStamp = +new Date()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}