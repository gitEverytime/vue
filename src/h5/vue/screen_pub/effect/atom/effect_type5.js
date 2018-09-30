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
import setVideoDimensions from '../../comm/max_screen.js'
let vm = new Vue({
    store:MainStore,
});

class EffectType5{
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
            `<div class="songWrap">
                <div class="song_container" id="container">
                    <video id="EFF-video" autoplay="autoplay" muted type="video/webm" loop="loop"style="object-fit: fill; height: 100%; width: 100%;">
                        <source src="${LinkType.LINK_RED_PAPER_VIDEO}red_paper.webm" type="video/webm" />
                    </video>
                </div>
                <div class="redPaperHead">
                    <div class="re_bmHead">
                        <img src="${this.effectData.headimg}" class="headWrap" >
                        <img src="${LinkType.LINK_INTERACTION_SONG_IMG}song_head.png" class="ringImg">
                        <p>
                            ${this.effectData.cname}
                        </p>
                    </div>
                </div>
                <div class='redPaper'  style=''   id='"+this.domId+"'>
                    <img src='${LinkType.LINK_RED_PAPER}/red_paper.gif'>
                </div>
                <p class="redPaperCont">
                大金链子小手表！<br>
                抢了红包吃烧烤！
                </p>
            </div>
             `
        ].join("");

        this.effDom = $(html);
        this.parentDom.append( this.effDom );
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
                $(".songWrap").show();
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



export default EffectType5;






