/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-08 10:01:34
 * @所有请求接口 
 */


import $ from 'jquery';

import U from '../../../../libs/util.js';

class Request{
    constructor(){ 
        //this.apiWebDomain   = "http://192.168.2.112:3001";
         this.apiWebDomain   = "http://web.ibigtop.com";
        // this.apiWebDomain = "http://192.168.0.222:3001";
      //   this.apiCloudDomain = "http://cloud.ibigtop.com"
        // this.apiCloudDomain = "http://192.168.0.222:3000";
    }


    /**
     * 取用户列表
     */
    reqUserList( data, cabSuccess, cabComplete,cabError ){
        var url = this.apiWebDomain + "/web/api/pub/clientList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 取用户信息
     */
    reqChatList( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/room/manList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取公屏配置信息
     */
    reqPublicScreenCfg( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getStoreCfg";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 取商吧信息
     */
    reqStoreInfo( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiCloudDomain+"/admin/api/store/one";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    
    /**
     * 取用户信息
     */
    reqUserInfo( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/client/one";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }
    
    /****
     * 获取礼物列表
     */
    reqRewordData( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/gift/listGift";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    reqOnScreenGiftData( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getThemeList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /********************************消息记录留存********************************** */
    /**
     * 添加公聊记录
     */
    reqChatAdd( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }
    /**
     * 添加私聊记录
     */
    reqPrivAdd( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/chat/addPriv";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }




    /******************************************************************* */
      /**
     * 添加霸屏记录
     */
    reqScreenOnAdd( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }
     /**
     * 添加打赏记录
     */
    reqReworAdd( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/chat/addPub";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取店内艺人
     * {storeId:"xxxx"}
     */
    reqActorInStore( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/v1/actor/signInList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取公屏广告
     */
    reqStoreCfgStoreBill( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/v1/storeCfg/storeBill";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取店铺信息
     */
    reqStoreGetById( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getStoreInfo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取历史信息
     */
    reqGetChatList( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getChatList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取未播放的列表
     */
    reqGetWaitPlayList( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getWaitPlayList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取公屏广告图列表
     */
    reqPubGetAdPics( data, cabSuccess, cabComplete,cabError ){
        var url    = this.apiWebDomain+"/web/api/pub/getAdPics";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


}




export default new Request();


    
    
    
    
    