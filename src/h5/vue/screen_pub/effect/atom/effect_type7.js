/*
 * @Author: jgg
 * @Date: 2018-04-08 15:49:19
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-08 11:37:10
 * @Describe  特效
 */

import $ from 'jquery';
import { setInterval } from 'timers';
import LinkType from '../../comm/link_type.js';
import FoodType from '../../comm/food_type.js'
import Vue from 'vue'
import MainStore        from "../../../../vuex/main_store.js";
let vm = new Vue({
    store:MainStore,
});

class EffectType7{
    constructor( effectData ){
        this.domId      = "EFF-"+Date.now();
        this.effectData = effectData;
        this.state      = 0;  //0:播放完毕 1:播放中
        this.parentDom  = null;

        this.startTime  = 0;
        this.stayTime   = 20;  //单位s  停留时间

        this.effDom = null;
    }


    getState(){
        return this.state;
    }

    play( effectLayer ){
        vm.$store.commit('setCreatedAt',String(this.effectData.createdAt));
        this.parentDom = effectLayer;
        this.state     = 1;
        this.startTime = Date.now();
        if(this.effectData.detail){
            let detail = JSON.parse(this.effectData.detail);
            this.effectData['tableName'] = detail.tableName;
            this.effectData['count'] = detail.count;
        }
        this.addEffectToStage();
    }

    render(){
        if( (Date.now() -  this.startTime)/1000 >= this.stayTime ){
            this.state = 0;
        }

    }
    addEffectToStage(){
        var _this = this;

        var html1 = [
            `<div class="giftRewardWrap">
                <div class="giftReward_container" id="container">
                    <video id="EFF-video" autoplay="autoplay" muted type="video/webm" loop="loop"style="object-fit: fill; width: 100%; height: 100%;">
                        <source src="${LinkType.LINK_RED_PAPER_VIDEO}store_reward_gift.webm" type="video/webm" />
                    </video>
                </div>
                <div class="giftHead">
                    <div class="re_bmHead">
                        <img src="${this.effectData.headimg}" class="headWrap" >
                        <img src="${LinkType.LINK_INTERACTION_SONG_IMG}song_head.png" class="ringImg">
                        <p>
                            ${this.effectData.cname}
                        </p>
                    </div>
                </div>
                <div class='barWrap'  style=''   id='"+this.domId+"'>
                    <img src='${LinkType.LINK_RED_PAPER}/bar.gif'>
                </div>
                <div class='eatWrap'  style=''   id='"+this.domId+"'>
                     <img src='${LinkType.LINK_RED_PAPER}/eat.gif'>
                </div>
                <div class="giftFooter">
                    <div class="rewardText">
                       <p>
                           <label class="reward_name">${_this.effectData.cname}</label> 
                           打赏给
                           <span>
                               <label class="tableName">${_this.effectData.tableName}桌&nbsp;</label>
                               ${_this.effectData.tname}
                           </span>
                               ${_this.effectData.mediaTitle}<label class="count">x${_this.effectData.count}</label>
                       </p>
                    </div>
                    <p class="giftCont">
                        ${_this.effectData.content}
                    </p>
                </div>
            </div>
            `
        ].join("");
        /**
         * 实物打赏显示区分啤酒类和烧烤类
         */
        this.effDom = $(html1);
        this.parentDom.append( this.effDom );
        var video = document.querySelector('#EFF-video');
        /**
         * 视频加载完成可以播放的回调
         */
        video.addEventListener("canplaythrough", function()
            {
                // vm.$store.commit('setIsReward',true);
                $(".layer-effect").css("z-index",9999);
                $(".giftRewardWrap").show();
            }
        );
        switch (_this.effectData.foodType) {
            case FoodType.FOOD_TYPE_BAR:
                $(".barWrap").show();
                break;
            default :
                $(".eatWrap").show();
                break;
        }
        if(_this.effectData.tableName){
            $(".tableName").show();
        }
        if(_this.effectData.count){
            $(".count").show();
        }
    }

    stop(){
        this.state = 0;
    }

    destroy(){
        // vm.$store.commit('setIsReward',false);
        this.effDom.remove();
        this.effDom = null;
    }
}



export default EffectType7;






