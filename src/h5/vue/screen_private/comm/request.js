/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-06-04 16:04:56
 * @所有请求接口 
 */


import $ from 'jquery';

import U from '../../../../libs/util.js';
import UJ from '../../../../libs/util-json'

class Request {
    constructor() {
        this.apiWebDomain   = "http://web.ibigtop.com";

        this.apiCloudDomain = "http://cloud.ibigtop.com";

        this.apiGameDomain = "http://game.ibigtop.com";

        this.apiGameDomain1003 = "http://g.ibigtop.com";

        this.apiStaticDomain = "http://static.ibigtop.com"

        this.apiDiningDomain = "http://dining.ibigtop.com"

        this.commSocketDomain = "http://59.110.217.82:3004"

        this.commSseDomain = "http://59.110.217.82:3009"
    }


    /**
     * 取用户列表
     */
    reqUserList(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/interaction/room/clientList";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 取用户信息
     */
    reqChatList(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/room/manList";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 取商吧信息
     */
    reqStoreInfo(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/store/one";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 取用户信息
     */
    reqUserInfo(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/client/one";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 获取艺人权限信息
     */
    reqActorAuth(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/auth";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /****
     * 获取礼物列表
     */
    reqRewordGiftData(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/gift/listGift";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /****
     * 获取实物打赏数据
     */
    reqRewordRealData(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/food/list";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    reqOnScreenGiftData(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/gift/listTheme";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /********************************消息记录留存********************************** */
    /**
     * 添加公聊记录
     */
    reqChatAdd(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 添加私聊记录
     */
    reqPrivAdd(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/chat/addPriv";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /******************************************************************* */
    /**
     * 添加霸屏记录
     */
    reqScreenOnAdd(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 添加打赏记录
     */
    reqReworAdd(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 申请为平台艺人
     */
    reqApplyCloudActor(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/approval/sysApply";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 申请为商家艺人
     */
    reqApplyStoreActor(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/approval/storeApply";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 艺人状态查询
     */
    reqActorState(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/status";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 艺人当前签到状态查询
     */
    reqActorSignState(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/sign/signType";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 艺人签到
     */
    reqActorSignIn(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/sign/signIn";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 艺人签退
     */
    reqActorSignOut(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/sign/signOut";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 获取店内艺人
     * {storeId:"xxxx"}
     */
    reqActorInStore(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/signInList";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 获取平台节目单
     * {actorId:"xxxx", pageNo:"1/2", limit:"20"}
     */
    reqActorProgramInCloud(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/program/mylist";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 获取艺人商家节目单
     * {storeId:"xxxx", actorId:"xxxx"}
     */
    reqActorProgramInStore(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/actor/program/listByActor";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 艺人添加节目单
     * {actorId:xxx, type:1/2/3,  title:"xxxx", remarks:"xxxxx"}
     */
    reqActorAddProgram(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/program/add";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 艺人更新节目
     * {id:xxx, type:1/2/3,  title:"xxxx", remarks:"xxxxx"}
     */
    reqActorUpdateProgram(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/program/update";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 艺人删除节目    暂无
     * {actorId:xxx, type:1/2/3,  title:"xxxx", remarks:"xxxxx"}
     */
    reqActorDeleteProgram(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/v1/actor/program/del";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 艺人当日演出单
     * {actorId:xxx, storeId:xxx}
     */
    reqProgramOrderInStore(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/performance/listByActor";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    //

    /**
     * 艺人确认接单演出
     */
    reqConfirmTakeOrder(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiWebDomain + "/web/api/v1/performance/confirmByActor";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 参加游戏
     *
     */
    reqJoinGame(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/game/api/join"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取当前是否有正在进行的游戏
     *
     */
    reqHasPlayingGame(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/game/api/currentGame"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取关注ta人的状态
     * cid: 1
     * tid: 2
     */
    reqGetFollowStatus(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/follow/getFollowStatus"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 关注/取消关注
     * cid: 1
     * tid: 2
     * type: 0 :取消关注 1：关注
     */
    reqFollowOrNot(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/follow/followByType"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取我已关注列表
     * cid: 1
     */
    reqGetMyFollowList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/follow/listMyFollow"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取关注我的列表
     * cid: 1
     */
    reqGetFollowMeList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/follow/listFollowMe"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 果宝注册
     * cid,phone,wechat,favorFood,favorDrink,hobby,hasCar,carBrand,carModel,favorBrand,motto
     */
    reqClientRegister(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/client/regVip"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 添加公聊消息
     * "cid","storeId","cname","content","pic","sex","city","headimg"
     */
    reqAddPubChat(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/detail/addPub"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取公聊消息
     */
    reqGetPubChat(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/detail/list/pubList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 添加私聊消息
     */
    reqAddPriChat(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/detail/addPriv"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点赞，取消点赞
     * cid, id, status
     */
    reqChatFavor(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/detail/list/favor"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 公聊撤回消息
     * cid, id
     */
    reqChatCancel(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/detail/list/recall"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 微信支付
     * "descr"，,"detail" : "{'type':'bp', 'client':'1', 'detail':{'mediaId:'1','mediaNmae':'酷炫霸屏'}}",
     "amount","cid","storeId","cname","sex","headimg","content","mediaId","mediaTitle"
     */
    reqWeixinPay(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/interaction/pay"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 订单查询接口
     * oid
     */
    reqOrderQueryStatus(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/order/queryStatus"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 平台艺人申请
     */
    reqActorSysApply(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/approval/actorSysApply"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 商家艺人申请
     */
    reqActorStoreApply(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/approval/actorStoreApply"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取聊天室用户
     */
    reqGetUserById(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/interaction/room/getById"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取用户钱包信息
     */
    reqGetUserAccountInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/account/getById"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 抢红包
     */
    reqTakeRedPackage(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/redpacket/take"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 用户个人中心首页信息
     */
    reqGetUserCenterInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/center/getInfo"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 用户个人动态已读
     */
    reqSetUserCenterActReaded(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/center/readAct"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 道具已读
     */
    reqSetUserCenterToolReaded(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/center/readTool"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 道具列表
     */
    reqGetUserCenterToolList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/center/getToolList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取商家私屏配置信息
     */
    reqGetPrivateCfg(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/storeCfg/getPrivateCfg"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点播订单列表
     */
    reqGetPerformanceOrderList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/performance/orderList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取动态列表
     */
    reqGetUserCenterNews(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/client/center/getActList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取用户基本信息
     */
    reqGetClientUserInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/client/getInfo"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 修改用户基本信息
     */
    reqUpdateClientUserInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/client/update"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 设置用户头像
     */
    reqSetUserAvatar(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/client/setImg"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取会员卡列表
     */
    reqGetCardList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/store/card/cardList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 会员卡账单列表
     */
    reqGetCardBillList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/store/card/billList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 用户账单列表
     */
    reqGetBillList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiCloudDomain + "/admin/api/v1/bill/clientBillList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取商家霸麦信息
     */
    reqGetBmConfig(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/storeCfg/getBmInfo"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取商家基本信息
     */
    reqGetBusinessInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiWebDomain + "/web/api/v1/store/getInfo"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐获取餐桌列表信息
     */
    reqGetDiningTableList(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/table/list"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 点餐获取分类菜品列表信息
     */
    reqGetDiningMenuData(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/carte/categoryList"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐获取订单相关信息
     */
    reqGetDiningInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/table/participateOrder"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐更新订单相关信息
     */
    reqUpdateDiningInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/update"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐加减菜IM (普通用户)
     */
    reqDiningAddFood(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/plusMinusDishIM"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐加减菜 (服务员)
     */
    reqDiningAddFoodWaiter(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/plusMinusDish"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 订单详情-购物车
     */
    reqDiningShopcarDetail(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/detailForCart"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 下单
     */
    reqDiningConfirmOrder(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/confirm"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 订单详情
     */
    reqDiningOrderDetail(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/detailForMake"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 历史订单详情
     */
    reqDiningHistoryOrderDetail(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/detailForOrder"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 微信支付
     */
    reqDiningPayWeChat(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/pay"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 预定
     */
    reqDiningOrderTable(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/book/create"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 历史订单
     */
    reqDiningHistoryOrder(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/list"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }


    /**
     * 点餐 微信支付完成（成功和失败）
     */
    reqDiningPayFinish(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/payFinish"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 订单详情-商家取消
     */
    reqDiningDetailForCancel(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/order/detailForCancel"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 获取预定信息
     */
    reqDiningOrderGetInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/book/list"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 点餐 更新预定信息
     */
    reqDiningOrderUpdateInfo(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/book/update"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 服务员点餐 开台
     */
    reqDiningWaiterOpen(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiDiningDomain + "/dining/api/v1/table/open"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取游戏当前场次
     */
    getGameCurrent(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain1003 + "/play/current"
        const method = "post"
        UJ.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 加入游戏1003
     */
    joinGame1003(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain1003 + "/play/1003/playerJoin"
        const method = "post"
        UJ.request(method, url, data, cabSuccess, cabComplete, cabError)
    }
}

export default new Request();