/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-11 15:38:39
 * @数据缓存
 */


import REQ from "../comm/request.js";
import MsgType from "../comm/msg_type.js";

class CatchControl {
    constructor() {
        this.apiWebDomain = "http://192.168.2.112:3001";
        this.apiCloudDomain = "http://cloud.ibigtop.com";
    }

    init(eventOrigin) {
        this.onScreenGiftData = null;
        this.userList = [];
        this.rewordGiftData = null;
        this.rewordRealData = {};
        this.actorList = [];

        this.screenList = [];

        this.eventOrigin = eventOrigin;
    }


    catchScreenData(data) {
        let len = this.screenList.length;
        if (len >= 10) {
            this.screenList.shift();
        }
        this.screenList.push(data);
    }

    getScreenList() {
        return this.screenList;
    }

    getAllOnScreenGiftData() {
        return this.onScreenGiftData;
    }

    catchOnScreenGiftData(postData) {
        var _this = this;
        REQ.reqOnScreenGiftData(postData,
            function (data) {
                var list = data.data.rows;
                var themeDic = {1: [], 2: [], 3: []};
                var obj = null;
                var result = [];
                var cate = 0;
                for (var i = 0; i < list.length; i++) {
                    obj = list[i];
                    cate = obj.cate;
                    switch (cate) {
                        case '1':
                            themeDic[2].push(obj);
                            break
                        case '2':
                            themeDic[1].push(obj);
                            break
                        default:
                            themeDic[cate].push(obj);
                            break
                    }
                }
                _this.onScreenGiftData = themeDic;
            },
            function (data) {
            },
            function (data) {
            }
        )

    }

    getAllRewordGiftData() {
        return this.rewordGiftData;
    }

    getAllRewardRealData() {
        return this.rewordRealData
    }

    catchRewordGiftData(postData) {
        REQ.reqRewordGiftData(postData, (data) => {
                let list = data.data.rows;
                let rewordData = {1: [], 2: [], 3: []};
                list.forEach((itemData) => {
                    const cate = itemData.cate
                    rewordData[cate].push(itemData)
                })
                this.rewordGiftData = rewordData
            },
            (data) => {
            },
            (data) => {
            }
        )
    }

    catchRewardRealData(params) {
        REQ.reqRewordRealData(params,
            (response) => {
                this.rewordRealData = response.data
            },
            (complete) => {
            },
            (err) => {
                console.error(err)
            })
    }


    getOnScreenGiftById(giftType, giftId) {
        var gList = this.onScreenGiftData[giftType];
        if (!gList && !gList.length) return null;
        var gItem = null;
        for (var i = 0; i < gList.length; i++) {
            gItem = gList[i];
            if (gItem.id == giftId) {
                return gItem;
            }
        }
        return null;
    }

    //缓存用户
    catchUser(data) {
        var _this = this;
        REQ.reqUserList(data,  //获取用户列表
            function (data) {
                _this.userList = data.data;
            },
            function (data) {
            },
            function (err) {
                console.error(err)
            }
        );
    }

    //添加用户到缓存
    addUserToCatch(posData) {
        REQ.reqUserInfo(posData,
            function (data) {
                _this.userList.push(data.data);
            },
            function (data) {
            },
            function (data) {
                //todo error
            }
        );
    }


    getUserById(clientId) {
        var uInfo = null;
        var len = this.userList.length;
        for (var i = 0; i < len; i++) {
            uInfo = this.userList[i];
            if (clientId == uInfo.clientId) {
                return uInfo;
            }
        }
        return null;
    }


    getAllUser() {
        return this.userList;
    }

    //缓存艺人列表
    catchActorList(params) {
        REQ.reqActorInStore({storeId: params.storeId},
            (data) => {
                this.actorList = data.data
            },
            (data) => {
            },
            (data) => {
            }
        );
    }

    //获取艺人列表
    getActorList() {
        return this.actorList
    }

    getActorById(actorId) {
        let actor = this.actorList.filter(item => item.actorId === actorId)[0] || {}
        return actor
    }


}

export default new CatchControl();