/*
 * @Author: jgg 
 * @Date: 2018-04-26 21:00:38 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-07 16:47:42
 * @数据缓存
 */


import REQ from "../comm/request.js";
import MainStore        from "../../../vuex/main_store.js";
import Vue from 'vue'
let vm = new Vue({
    store:MainStore,
});

class CatchControl{
    constructor(){
    }


    init(){
        this.onScreenGiftData   = null;
        this.userList = [];
        this.actorList = [];
    }


    getAllOnScreenGiftData(){
        return this.onScreenGiftData;
    }

    catchOnScreenGiftData( postData ){
        var _this = this;

        REQ.reqOnScreenGiftData(postData, 
            function(data){
                var list = data.data.rows;
                var themeDic = {1:[], 2:[], 3:[]};
                var obj = null;
                var result =[];
                var cate = 0;
                for (var i = 0; i < list.length; i++) {
                    obj  = list[i];
                    cate = obj.cate;
                    themeDic[cate].push( obj );
                }

                _this.onScreenGiftData = themeDic;
            },
            function(data){},
            function(data){}
        )

    }


    getOnScreenGiftById(giftType, giftId){
        var gList = this.onScreenGiftData[giftType];
        if(!gList && !gList.length) return null;
        var gItem = null;
        for(var i=0; i<gList.length; i++){
            gItem = gList[i];
            if(gItem.id == giftId){
                return gItem;
            }
        }
        return null;
    }

    //缓存用户
    catchUser(data){
        var _this = this;
        REQ.reqUserList(data,  //获取用户列表
            function(result){
                _this.userList = data.data;
                vm.$store.commit('setUserList',result.data)
            },
            function(data){},
            function(data){
                //todo  error
            }
        );
    }

    //添加用户到缓存
    addUserToCatch(posData){
        REQ.reqUserInfo(posData, 
            function(data){
                _this.userList.push( data.data );
            },
            function(data){},
            function(data){
                //todo error
            }
        );
    }


    getUserById(clientId){
        var uInfo = null;
        var len   = this.userList.length;
        for(var i=0; i<len; i++){
            uInfo = this.userList[i];
            if(clientId == uInfo.clientId){
                return uInfo;
            }
        }

        return null;
    }

    // //缓存艺人列表
    // catchActorList(params) {
    //     REQ.reqActorInStore({storeId:params.storeId},
    //         (data) => {this.actorList = data.data},
    //         (data) => {},
    //         (data) => {}
    //     );
    // }

    //获取艺人列表
    // getActorList() {
    //     return this.actorList
    // }

    getActorById(actorId) {
        let actor = this.actorList.filter(item => item.actorId === actorId)[0] || {}
        return actor
    }
}




export default new CatchControl();


    
    
    
    
    