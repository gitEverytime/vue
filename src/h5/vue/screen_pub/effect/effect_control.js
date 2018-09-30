/*
 * @Author: jgg 
 * @Date: 2018-04-08 15:49:19 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-08 11:38:30
 * @Describe  特效管理
 */

import $       from 'jquery';

import MsgType from "../comm/message_type.js";

import Effect1 from "./atom/effect_type1.js";
import Effect3 from "./atom/effect_type3.js";
import Effect5 from './atom/effect_type5.js';
import Effect6 from "./atom/effect_type6.js";
import Effect7 from "./atom/effect_type7.js";
import Effect8 from "./atom/effect_type8.js";
import UiType  from '../comm/ui_type.js';
import ConstValue from '../comm/const_value.js'
import Vue from 'vue'
import REQ from '../comm/request'
import cookie from '../comm/cookie.js'
import MainStore        from "../../../vuex/main_store.js";
var CFG = window.CFG;
var roomInfo = window.RINFO;
let vm = new Vue({
    store:MainStore,
});
/**
 * 监听当前页面要刷新
 */
window.onbeforeunload = function() {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (!(b && window.event.clientY < 0 || window.event.altKey)) {   //开始要刷新了，存贮时间戳
        let createdAt = vm.$store.getters.getCreatedAt;
        if(!createdAt) createdAt = Date.now();
        cookie.set('createdAt',createdAt,60*10*1000);
    }
};

class EffectControl{
    constructor(){
        this.notify     = null;
        this.tick       = null;
        this.currEffect = null;
        this.effectList = [];

        this.effectLayer = null;
        this.isOnline = true;
    }

    /**
     * 启动特效管理器
     */
    start(notify, effectLayer ){
        var _this    = this;
        let createdAt = cookie.get('createdAt');
        this.notify = notify;
        this.effectLayer = effectLayer;
        if(_this.tick != null){
            clearInterval( this.tick );
            _this.tick = null;
        }
        this.tick = setInterval(function(){
            _this.render();
        }, 100);
        if(createdAt){
            this.getWaitPlayList(createdAt);
        }
        this.navigatorIsOnline(createdAt);
        this.listener();
    }



    listener(){
        var _this = this;
        this.notify.$on(MsgType.DISPATCH_DOWN_SCREEN_ON, function(data){   //霸屏
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_REWARD, function(data){      //打赏
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_PROGRAM_BUY, function(data){ //点歌
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_BM, function(data){          //霸麦
            _this.addEffect( data );
        });
    }




    /**
     * 特效加入队列
     * @param {} effectData 
     */
    addEffect( effectData ){
        console.log("/effect data=/", effectData );
        var effectItem = this.getEffectItem(effectData);
        this.effectList.push(effectItem);
    }


    /**
     * 渲染特效
     */
    render(){
        if(this.currEffect == null){
            $(".layer-effect").css("z-index",10);
            if( this.effectList.length <= 0 ) return;
            this.currEffect = this.effectList.shift();
            if(this.currEffect == null) return;
            this.currEffect.play( this.effectLayer );
        }else{
            this.currEffect.render();
            if(this.currEffect.getState() === 0){
                this.currEffect.stop();
                this.currEffect.destroy();
                this.currEffect = null;
                vm.$store.commit('setCreatedAt','');
            }
        }

    }

    /**
     * 检测系统是否处于脱机模式
     */
    navigatorIsOnline(){
        let _this = this;
        setInterval(() => {
            if(navigator.onLine){
                if(cookie.get('createdAt') && !_this.isOnline){       //_this.isOnline = false:防止有网的瞬间重复请求接口
                    _this.isOnline = true;                            //立马变为true
                    const timer = setTimeout(() => {                  //延时5s去请求未播放的历史数据
                        _this.getWaitPlayList(cookie.get('createdAt'));
                        clearTimeout(timer);
                    },5000)
                }
            }else{
                if(_this.isOnline){                                  //如果断网的瞬间第一次this.isOnline = true才会执行
                    let createdAt = vm.$store.getters.getCreatedAt;
                    if(!createdAt) createdAt = Date.now();
                    cookie.set('createdAt',createdAt,60*10*1000);
                    _this.effectList = [];                            //清空队列中的动画
                    _this.isOnline = false;                           //立马变为false
                }
            }
        },100)
    }

    /**
     * 获取历史未播放的数据
     */
    getWaitPlayList(createdAt) {
        let _this = this;
        REQ.reqGetWaitPlayList({
                storeId: roomInfo.storeId,
                createdAt:Number(createdAt)
            },
            (response) => {
                let noplayHistoryList = response.data;
                noplayHistoryList.forEach((item) => {
                    let detail = item.detail;
                    if(detail){
                        item['duration'] = JSON.parse(detail).duration;
                        item['onScreenType'] = JSON.parse(detail).onScreenType;
                    }
                    _this.addEffect(item);
                });
                cookie.delCookie('createdAt');
            },
            (complete) => {
            },
            (err) => {
                console.error(err)
            })
    }

    /**
     * 通过特效数据类型匹配相应动画解析器
     * @param {} effData 
     */
    getEffectItem(effData){
        switch(effData.type) {
            case ConstValue.INTERACTION_ONSCREEN:          //霸屏
                return new Effect3(effData);
                break;
            case ConstValue.INTERACTION_GIVE_GIFT:         //礼物打赏
                return new Effect6(effData);
                break;
            case ConstValue.INTERACTION_REDPACKET_ALL:     //全场红包打赏
                return new Effect5(effData);
                break;
            case ConstValue.INTERACTION_REDPACKET_ONE:     //个人红包打赏
                return new Effect5(effData);
                break;
            case ConstValue.INTERACTION_GIVE_REAL:         //实物打赏
                return new Effect7(effData);
                break;
            case ConstValue.INTERACTION_SONG:              //点歌
            case ConstValue.INTERACTION_DANCE:             //点舞
                return new Effect1(effData);
                break;
            case ConstValue.INTERACTION_BM_HEART:          //霸麦真心话
                return new Effect8(effData);
                break;
            case ConstValue.INTERACTION_BM_VOICE:          //霸麦好声音
                return new Effect8(effData);
                break;
            default :
            break;

        }
        return null;
    }
}
export default new EffectControl();


    
    
    
    
    