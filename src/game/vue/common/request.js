
import U from '../../../libs/util'

class Request {
    constructor() {
        //this.apiGameDomain = "http://game.ibigtop.com";
        this.apiGameDomain = 'http://game-dev.ibigtop.com';
        // this.apiGameDomain = 'http://192.168.0.100:3106';
        this.apiWebDomain   = "http://web.ibigtop.com";

        this.apiStaticDomain = "http://static.ibigtop.com";

        this.gameSocketDomain = "http://game.ibigtop.com:3006";
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
     * 提交游戏设置数据
     */
    reqSubmitGameSettings(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/addRule";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *获取当前游戏参与者数量
     * gameIndex: 1001
     * storeId: 1
     */
    reqGetUserCount(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/getUserCount"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *获取当前游戏奖品等级和奖品信息
     */
    reqGetRewardData(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/getRule";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *开始游戏
     */
    reqStartGame(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/start"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *汇报游戏数据
     */
    reqSendGameData(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/gameData"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *结束游戏
     */
    reqEndGame(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/stop"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *获取游戏结果
     */
    reqGetGameResult(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/gameResult"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     *获取当前游戏排名前10的数据
     */
    reqGetGameTop10(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/top10"
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /*****************************************************
     *                 抽奖
     */

    /**
     * 玩家列表
     */
    reqGetGamePlay(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/play";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 开始游戏
     */
    reqGameStart(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/start";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 抽奖
     */
    reqGamePlay(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/play";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 游戏奖项
     */
    reqGetGameInfo(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/play";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取游戏结果
     */
    reqGetGameResult(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/gameResult";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取游戏规则
     */
    reqGetRule(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/getRule";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 结束游戏
     */
    reqGameStop(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/stop";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 返回游戏公屏
     */
    reqGameBack(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiGameDomain + "/game/api/returnPublic";
        var method = "post";  //get or post
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 获取店铺信息
     */
    reqStoreGetById( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getStoreInfo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }



    /*******************************  心心相印  **********************************/
    reqPlayCurrent( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiGameDomain+"/play/current";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }



}


export default new Request();