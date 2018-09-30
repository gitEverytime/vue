/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-02 17:44:38
 * @所有请求接口 
 */


import $ from 'jquery';

import U from '../../../../libs/util.js';

const apiCloudDomain = "http://cloud.ibigtop.com";
const apiWebDomain   = "http://web.ibigtop.com";

class Request{
    constructor(){ }

    /**
     * 获取平台艺人列表
     */
    reqCloudActorList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/approval/sysTList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /**
     * 商家登录
     */
    reqStoreLogin( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/login";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家登录
     */
    reqStoreReg( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/login";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 取店信息
     */
    reqStoreInfo( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/one";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 取店内用户列表
     */
    reqAllUserFromStore( data, cabSuccess, cabComplete,cabError ){
        var url    = apiWebDomain+"/web/api/chat/getById";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 商家信息更新
     */
    reqStoreInfoUpdate( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 获取用户聊天记录
     */
    reqChatInStore( data, cabSuccess, cabComplete,cabError ){
        var url    = apiWebDomain+"/web/api/chat/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 处理平台， 商家艺人申请
     */
    reqDoActorApply( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/approval/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }



    /**
     * 获取商户待申请驻演列表
     */
    reqStoreActorApplyList( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/approval/storeDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取商户已驻演列表
     */
    reqStoreActorList( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/approval/storeTList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }
    

    
    


  


}




export default new Request();


    
    
    
    
    