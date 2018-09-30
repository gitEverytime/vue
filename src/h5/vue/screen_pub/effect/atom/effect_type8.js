/*
 * @Author: jgg
 * @Date: 2018-04-08 15:49:19
 * @Last Modified by: jgg
 * @Last Modified time: 2018-07-15 16:12:33
 * @Describe  特效
 */

import $ from 'jquery';
import LinkType from '../../comm/link_type.js';
import ConstValue from '../../comm/const_value.js'
import Vue from 'vue'
import MainStore        from "../../../../vuex/main_store.js";
import setVideoDimensions from '../../comm/max_screen.js'
let vm = new Vue({
    store:MainStore,
});
class EffectType1{
    constructor( effectData ){
        this.domId = "EFF-"+Date.now();
        this.effectData = effectData;
        this.state = 0;  //0:播放完毕 1:播放中
        this.parentDom = null;
        this.startTime = 0;
        this.stayTime = 20;  //单位s  停留时间
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
        // vm.$store.commit('setIsReward',true);
        this.addEffectToStage();
    }

    render(){
        if( (Date.now() -  this.startTime)/1000 >= this.stayTime ){
            this.state = 0;
        }

    }
    addEffectToStage(){
        let _this = this;
        var html1 = [
            `<div class='G-effect-bm' id='"+this.domId+"'>
                <div class="bm_container" id="container">
                    <video id="EFF-video"  class="EFF_video bmRealTalkVideo" muted autoplay="autoplay" type="video/webm" loop="loop"  style="object-fit: fill; width: 100%; height: 100%;">
                        <source src="${LinkType.LINK_INTERACTION_BM_VIDEO}real_talk.webm" type="video/webm" />
                    </video>
                </div>
                <div class="bmRealTalkHead">
                    <div class="re_bmHead">
                        <img src="${this.effectData.headimg}" class="headWrap" >
                        <img src="${LinkType.LINK_INTERACTION_SONG_IMG}song_head.png" class="ringImg">
                        <p>
                            ${this.effectData.cname}
                        </p>
                    </div>
                </div>
                <img  class="bmRealTalkGif" src="${LinkType.LINK_INTERACTION_BM_IMG}real_talk.gif">
            <div>`

        ].join("");

        var html2 =  [
            `<div class='G-effect-bm' id='"+this.domId+"'>
                <div class="bm_container" id="container">
                    <video id="EFF-video"  class="EFF_video bmGoodVoiceVideo" muted autoplay="autoplay" type="video/webm" loop="loop"  style="object-fit: fill; width: 100%; height: 100%;">
                        <source src="${LinkType.LINK_INTERACTION_BM_VIDEO}good_voice.webm" type="video/webm" />
                    </video>
                </div>
                 <div class="bmGoodVoiceHead">
                    <div class="re_bmHead">
                        <img src="${this.effectData.headimg}" class="headWrap" >
                        <img src="${LinkType.LINK_INTERACTION_SONG_IMG}song_head.png" class="ringImg">
                        <p>
                            ${this.effectData.cname}
                        </p>
                    </div>
                </div>
                <img  class="bmGoodVoiceGif" src="${LinkType.LINK_INTERACTION_BM_IMG}good_voice.gif">
            <div>`

        ].join("");
        switch (_this.effectData.type){
            case ConstValue.INTERACTION_BM_HEART:              //霸麦真心话
                this.effDom = $(html1);
                this.parentDom.append( this.effDom );
                break;
            case ConstValue.INTERACTION_BM_VOICE:              //霸麦好声音
                this.effDom = $(html2);
                this.parentDom.append( this.effDom );
                break;
        }
        /**
         * 全屏视频
         * @type {Element | null}
         */
        var video = document.querySelector('#EFF-video');
        //     , container = document.querySelector('#container');
        // video.addEventListener('loadedmetadata', setVideoDimensions(video,container), false);
        // window.addEventListener('resize', setVideoDimensions(video,container), false);
        /**
         * 视频加载完成可以播放的回调
         */
        video.addEventListener("canplaythrough", function()
            {
                // vm.$store.commit('setIsReward',true);
                $(".layer-effect").css("z-index",9999);
                $(".G-effect-bm").show();
            }
        );

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




export default EffectType1;


