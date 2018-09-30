
import U from './util'

class Request {
    constructor() {
        //this.apiGameDomain = "http://game.ibigtop.com";
      //  this.apiGameDomain = 'http://game-dev.ibigtop.com';
        this.apiGameDomain = 'http://g.ibigtop.com';
        this.apiCloudDomain = "http://cloud.ibigtop.com";
        this.gameSocketDomain = "http://g.ibigtop.com:3016";
        this.apiWebDomain = 'http://web.ibigtop.com';
    }
    /*******************************  心心相印  **********************************/

    /**
     * 使用商家id获取商家信息
     */
    reqStoreGetById(data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getStoreInfo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 启用当前场次
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqPlayCurrent( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiGameDomain+"/play/current";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 遊戲獎項
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqAward( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiGameDomain+"/award/awards";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 排行榜
     */
    reqBillboard( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiGameDomain+"/play/1003/billboard";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }






}


export default new Request();