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
import Vue from 'vue'
import MainStore        from "../../../../vuex/main_store.js";
let vm = new Vue({
    store:MainStore,
});
class EffectType6{
    constructor( effectData ){
        this.domId      = "EFF-"+Date.now();
        this.effectData = effectData;
        this.state      = 0;  //0:播放完毕 1:播放中
        this.parentDom  = null;
        this.startTime  = 0;
        this.stayTime   = 10;  //单位s  停留时间
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
        this.beReward();
        this.addEffectToStage();
    }

    render(){
        if( (Date.now() -  this.startTime)/1000 >= this.stayTime ){
            this.state = 0;
        }
    }

    addEffectToStage(){
        var _this = this;
        var html = [
            `<div class="rewradWrap">
                <div class="rewrad_container" id="container">
                    <video id="EFF-video" autoplay="autoplay" type="video/webm" muted  loop="loop"style="object-fit: fill; height: 100%; width: 100%">
                        <source src="${LinkType.LINK_RED_PAPER_VIDEO}gif_reward.webm" type="video/webm" />
                    </video>
                </div>
                <div class="gitReward">
                    <div class="reward">
                        <div class="reward-person">
                            <div class="beReward-head">
                                <img src="${_this.effectData.headimg}" class="head-img">
                                <img src="http://static.ibigtop.com/static/img/public/game/head_box.png" class="be-mask-img">
                                <div class="progress">
                                    <div class="progress-text">
                                        打赏'${_this.effectData.mediaTitle}'
                                    </div>
                                </div>
                                <p class="nickName">${_this.effectData.cname}</p>
                            </div>
                        </div>
        
                        <div class="beReward">
                            <div class="beReward-head">
                                <img src="${_this.effectData.rewardImg}" class="beReward-img">
                                <img src="http://static.ibigtop.com/static/img/public/game/head_box.png" class="mask-img">
                                <img src="${LinkType.LINK_RED_PAPER_IMG}full-count.png" class="full-court">
                                <p class="actorName">${_this.effectData.rewardName}</p>
                            </div>
                        </div>
                        
                        <div class="reward-chat">${_this.effectData.content}</div>
                    </div>
                </div>
                <div class='giftEffect'  style=''   id='"+this.domId+"'>
                    <img src='${LinkType.LINK_REWARD}${_this.effectData.mediaId}.gif'>
                <div>
            </div>
            `

        ].join("");

        this.effDom = $(html);
        this.parentDom.append( this.effDom );
        var video = document.querySelector('#EFF-video');
        /**
         * 视频加载完成可以播放的回调
         */
        video.addEventListener("canplaythrough", function()
            {
                $(".layer-effect").css("z-index",9999);
                $(".rewradWrap").show();
            }
        );
        if(Number(_this.effectData.tid) === 0){
            $(".full-court,.head-img").show();
        }else {
            $(".head-img,.mask-img,.beReward-img,.actorName").show();
        }
    }

    /**
     * 比对数据拿到被打赏人的信息
     */
    beReward(){
        let _this = this;
        const userList = vm.$store.getters.getUserList;
        if(Number(_this.effectData.tid) === 0){
            _this.effectData[`rewardName`] = '全场';
            return
        }
        _this.effectData[`rewardName`] = _this.effectData.tname;
        _this.effectData[`rewardImg`] = _this.effectData.theadimg;
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



export default EffectType6;






