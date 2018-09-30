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
        this.stayTime = 15;  //单位s  停留时间
        this.effDom = null;
    }


    getState(){
        return this.state;
    }

    play( effectLayer ){
        vm.$store.commit('setCreatedAt',String(this.effectData.createdAt));
        let detail = this.effectData.detail;
        if(detail){
            this.effectData['actorName'] = JSON.parse(detail).actorName;
            this.effectData['actorType'] = JSON.parse(detail).actorType;
        }
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
        var html = [
            `<div class="songWrap">
                <div class="song_container" id="container">
                    <video id="EFF-video" autoplay="autoplay" type="video/webm" loop="loop" muted class="effect_video" style="width: 100%; height: 100%;object-fit: fill;">
                        <source src="${LinkType.LINK_INTERACTION_SONG_VIDEO}back_video.webm" type="video/webm" />
                    </video>
                </div>
                <div class="songHead">
                    <div class="re_songHead">
                        <img src="${this.effectData.headimg}" class="headWrap" >
                        <img src="${LinkType.LINK_INTERACTION_SONG_IMG}song_head.png" class="ringImg">
                        <p>
                            ${this.effectData.cname}
                        </p>
                    </div>
                </div>
                <div class="songFooter">
                    <div class="songText">
                        <span class="song">点歌</span>&nbsp;&nbsp;&nbsp;${this.effectData.mediaTitle}——${this.effectData.actorName}(${ConstValue.getActorType(this.effectData.actorType)})
                    </div>
                    <span class="content">
                        ${this.effectData.content}
                    </span>
                </div>
            <div>`

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
                $(".songWrap").show();
            }
        );
    }

    stop(){
        this.state = 0;
    }

    destroy(){
        this.effDom.remove();
        this.effDom = null;
    }

    

}




export default EffectType1;


    