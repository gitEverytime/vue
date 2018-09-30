/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-19 17:24:10
 * @所有请求接口 
 */


import $ from 'jquery';

import U from './util.js';

const apiCloudDomain = "http://cloud.ibigtop.com";
// const apiCloudDomain = "http://192.168.0.222:3000";
const apiWebDomain   = "http://web.ibigtop.com";
const apiDiningDomain = "http://dining.ibigtop.com";
// const apiDiningDomain = "http://dining.ibigtop.com";


class Request{
    constructor(){ }

    /**
     * 是否登录
     */
    reqPageMain( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/page/main";
        var method = "get";  //get or post
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
     * 商家注册
     */
    reqStoreReg( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/reg";
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
     * 平台艺人待审批列表
     */
    reqCloudActorApplyList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/sysDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /**
     * 获取平台艺人列表
     */
    reqCloudActorList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/approval/sysTList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }



    /**
     * 艺人申请处理（系统、商家）
     */
    reqDoActorApply( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/approval/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }


    /**
     * 获取申请驻演商家艺人列表
     */
    reqStoreActorApplyList( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/approval/storeDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取商家艺人已通过列表
     */
    reqStoreActorList( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/approval/storeTList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取商家设置艺人 节目是否可点  节目数量上线， 分成比例
     */

    reqGetStoreModuleActorSet(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/findByStoreId";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家设定点歌价格
     */

    reqSetStoreSongPrice(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/songPrice";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /**
     * 商家设定点歌价格
     */
    reqSetStoreDancePrice(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/dancePrice";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }
    

    /**
     * 商家设定点歌数量上线
     */
    reqSetStoreMaxSong(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/songCount";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家设定点舞数量上线
     */
    reqSetStoreMaxDance(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/danceCount";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

  
    /**
     * 开启 or 关闭 商家点歌模块
     * {storeId:xxx, status:0/1}   0:开启  1:关闭
     */
    reqSwitchSongModule(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/songStatus";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /**
     * 开启 or 关闭 商家点舞模块
     * {storeId:xxx, status:0/1}   0:开启  1:关闭
     */
    reqSwitchDanceModule(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeSet/danceStatus";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 
     * @param {*} data = {storeId;xx}
     * @param {*} cabSuccess 
     * @param {*} cabComplete 
     * @param {*} cabError 
     */
    reqGetStoreProgramRate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/scale/findProgramScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    reqSetStoreProgramRate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/scale/setProgramScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /*****************
     *    互动模块
     ****************/

    /**
     * 免费聊天设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetFreeChatApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setChat";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 霸麦好声音设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetBmvApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setVoice";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    reqSetBmrApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setHert";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 霸屏设置
     */
    reqSetBpApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setBp";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 顶栏文本设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetDLWBApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setStoreTitle";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 纯色背景设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetBgColorApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setBgColor";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 视频背景设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetBgVoiceApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setBgVideo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 图片背景设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetBgPictureApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setBgPicture";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 透明背景设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetBgLucencyApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setBgLucency";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * wifi设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqSetWifiApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/setWifi";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * wifi设置
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqGetCfg(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/storeCfg/getCfg";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /********************
     *    白名单模块
     *******************/

    /**
     *  商家白名单列表
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqWhiteListApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/web/api/v1/store/whitelist/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  商家黑名单列表
     * @param data
     * @param cabSuccess
     * @param cabComplete
     * @param cabError
     */
    reqBlackListApi(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/web/api/v1/store/blacklist/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  商家艺人待审核列表
     */
    reqActorStoreDList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/storeDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  艺人申请处理（系统、商家）
     */
    reqApprovalDoApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/approval/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家艺人权限列表
     */
    reqActorAuthList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/authList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家艺人权限设置
     */
    reqActorSetAuth(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/setAuth";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家艺人申请
     */
    reqActorStoreApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/actorStoreApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家艺人冻结、解冻
     */
    reqActorSetFreeze(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/setFreeze";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 艺人申请删除
     */
    reqActorApprovalDel(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/del";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取艺人配置信息
     */
    reqActorGetCfg(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/getCfg";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 修改艺人配置信息
     */
    reqActorSetCfg(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/setCfg";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 平台艺人列表
     */
    actorSysList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/sysList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家艺人列表
     */
    actorStoreList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/actor/storeList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取商家分成比例
     */
    reqGetActorScale(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/scale/getActorScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 设置点播分成比例
     */
    reqSetProgramScale(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/scale/setProgramScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 设置商户方分成比例
     */
    reqSetStoreScale(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/scale/setStoreScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  商家注册
     */
    reqRegister(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/apply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 平台管理员注册
     */
    reqEnterReg(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/enter/reg";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  平台登录
     */
    reqLogin(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/enter/login";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 平台管理员退出
     */
    reqLogout(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/enter/logout";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }
    /**
     * 获取登录者权限
     */
    reqGetAllPerms( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/getAllPerms";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     * 获取登录者信息
     */
    reqGetCurInfo( data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/getCurInfo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  )
    }

    /**
     *  商家基本信息获取
     */
    reqGetStoreMeg(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/getByUid";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家信息更新
     */
    reqStoreUpdate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 更新管理员信息
     */
    reqUserUpdate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  商家信息添加
     */
    reqStoreAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商户入驻申请
     */
    reqStoreApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/storeApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商户审批列表
     */
    reqStoreTodoList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/storeTodoList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商户审批
     */
    reqStoreDoApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 代理入驻申请
     */
    reqProxyApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/proxyApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取默认分成比例
     */
    getDefaultScale(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/scale/getDefaultScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取商户方分成比例
     */
    getStoreScale(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/scale/getStoreScale";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 开设代理
     */
    reqProxyAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/proxy/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 代理待审批列表
     */
    reqProxyTodoList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/proxyTodoList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 代理审批
     */
    reqProxyDoApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/store/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /***
     * 代理列表
     */
    reqProxyList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/proxy/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商户列表
     */
    reqStoreList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 设置商家后台显示平台商品广告
     */
    reqGoodsRecomd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/goods/recomd";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家经济收入总览
     */
    reqIncomeSum(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/income/sum";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 开设商铺
     */
    reqApprovalStoreAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加服务人员（系统中无此用户，平台、代理和商户都可用）
     */
    reqAddWithoutClient(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/addWithoutClient";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 平台服务人员待审批列表
     */
    reqStaffSysDList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/sysDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员列表
     */
    reqStaffAllList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /*****************************************************************
     *                           菜品管理(fanwenqiang)
     *****************************************************************/
    /**
     * 添加/创建
     */
    reqCarteType(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carteType/create";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 菜品类型列表
     */
    reqCarteTypeList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carteType/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加/创建菜品类型
     */
    reqCarteTypeCreate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carteType/create";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 更新菜品类型
     */
    reqCarteTypeUpdate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carteType/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 删除菜品类型
     */
    reqCarteTypeDelete(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carteType/delete";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 品类列表
     */
    reqCarteList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carte/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  添加/创建菜品
     */
    reqCarteCreate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carte/create";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 删除菜品
     */
    reqCarteDelete(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carte/delete";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 更新菜品
     */
    reqCarteUpdate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/carte/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加实物打赏
     */
    reqFoodAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/food/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 实物打赏物品列表
     */
    reqFoodList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/food/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 删除打赏的菜品
     */
    reqFoodDel(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/food/delBatch";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取餐桌类型列表
     */
    reqTableTypes(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/table/types";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 布局
     */
    reqTableLayout(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/table/layout";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取已填写楼层餐桌列表
     */
    reqTableList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/table/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  楼层列表
     */
    reqRoomList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/room/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 创建楼层
     */
    reqRoomCreate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/room/create";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 删除楼层
     */
    reqRoomdelete(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/room/delete";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商户桌位二维码
     */
    qrcodeForStore(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/table/qrcodeForStore";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 指定桌位二维码
     */
    qrcodeForTable(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/dining/api/v1/table/qrcodeForTable";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**************************************************************
     *                       互动模块
     ************************************************************/
    /**
     * 获取商家公聊列表
     */
    reqInteractionPubList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/detail/pubList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  超级名单列表
     */
    reqAuthWhiteList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/whiteList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 黑名单列表
     */
    reqAuthBlackList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/blackList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  超级名单设置
     */
    reqAuthWhiteListSet(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/whiteListSet";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 超级名单\黑名单批量删除
     */
    reqAuthDelBatch(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/delBatch";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 黑名单设置
     */
    reqAuthBlackListSet(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/blackListSet";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加超级名单
     */
    reqAuthAddWhiteList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/addWhiteList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加黑名单
     */
    reqAuthAddBlackList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/addBlackList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 公聊信息删除
     */
    reqAuthDetailDel(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/detail/delBatch";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取公屏用户权限信息
     */
    reqAuthGetByCid(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/store/auth/getByCid";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  设置游戏规则
     */
    reqGameAddRule(data, cabSuccess, cabComplete,cabError ){
        var url    = apiDiningDomain+"/game/api/addRule";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /*************************************************************
     *                         人员管理
     ************************************************************/
    /**
     * 获取商家服务人员待审批列表
     */
    reqStaffStoreDList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/storeDList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员审批
     */
    reqApprovalDoApply(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/doApply";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 商家服务人员权限列表
     */
    reqStaffAuthList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/authList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员权限设置
     */
    reqApprovalAuthSet(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/authSet";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员申请删除
     */
    reqApprovalDel(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/approval/del";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员冻结
     */
    reqStaffFreeze(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/freeze";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员解冻
     */
    reqStaffUnfreeze(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/unfreeze";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 服务人员列表
     */
    reqStaffList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 待添加服务人员列表（商户用）
     */
    reqStaffAddList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/addList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }


    /**
     * 添加服务人员到商户（商家用）
     */
    reqStaffAddToStore(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/staff/addToStore";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /***************************************添加账号**************************************/

    /**
     * 添加管理员
     */
    reqUserAddMgr(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/addMgr";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 管理员列表
     */
    reqUserListMgr(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/listMgr";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  管理员删除
     */
    reqUserDelBatch(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/delBatch";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 管理员解冻/冻结
     */
    reqUserSetFreeze(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/sys/user/setFreeze";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /***********************************************************
     *                      财务管理模块
     ************************************************************/
    /**
     *交易订单列表
     */
    reqFinanceOrderList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/orderList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 根据区域查询商铺名称列表
     */
    reqStoreFindByAC(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/findByAC";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 未结订单列表
     */
    reqFinanceUnPayOrderList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/unPayOrderList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加结算单
     */
    reqFinanceAddSettleBill(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/addSettleBill";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 结算单列表
     */
    reqFinanceSettleList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/settleList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 使用商家id获取商家信息
     */
    reqStoreGetById(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/store/getById";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 全部银行卡列表
     */
    reqBankcardFindAll(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/bankcard/findAll";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 确认结算
     */
    reqFinanceMakeSettle(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/makeSettle";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加银行卡
     */
    reqBankcardAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/bankcard/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 获取单个银行卡信息
     */
    reqBankcardFindOne(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/bankcard/findOne";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 更新银行卡信息
     */
    reqBankcardUpdate(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/bankcard/update";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 订单详情
     */
    reqFinanceIncomeDetail(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/incomeDetail";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 导出订单
     */
    reqFinanceExportIncomes(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/exportIncomes";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 发送短信验证码
     */
    reqSmsSendVerify(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/sms/sendVerify";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 结算单信息
     */
    reqFinanceSettleInfo(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/settleInfo";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 申请退款
     */
    reqFinanceRefund(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/refund";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 退款互动公聊列表
     */
    reqDetailRefundList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/interaction/detail/refundList";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 退款详情
     */
    reqFinanceRefundDetail(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/finance/refundDetail";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 添加广告图
     */
    reqPicAdd(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/ad/pic/add";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     *  商户广告图列表
     */
    reqPicList(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/ad/pic/list";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

    /**
     * 删除广告图
     */
    reqPicDel(data, cabSuccess, cabComplete,cabError ){
        var url    = apiCloudDomain+"/admin/api/v1/ad/pic/del";
        var method = "post";  //get or post
        U.request(  method, url, data, cabSuccess, cabComplete, cabError  );
    }

}




export default new Request();


    
    
    
    
    