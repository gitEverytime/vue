 /*
 * @Author: jgg 
 * @Date: 2018-04-08 15:49:19 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-08 11:37:10
 * @Describe  特效
 */

import $ from 'jquery';
import LinkType from '../../comm/link_type.js';
import Vue from 'vue'
import MainStore        from "../../../../vuex/main_store.js";
import setVideoDimensions from '../../comm/max_screen.js'
let vm = new Vue({
 store:MainStore,
});
let noPlayTimer = null;


class EffectType3{
    constructor( effectData ){
        this.domId      = "EFF-"+Date.now();
        this.effectData = effectData;
        this.state      = 0;  //0:播放完毕 1:播放中
        this.parentDom  = null;
        this.startTime  = 0;
        this.stayTime = 10;  //单位s  停留时间
        // this.stayTime = 2000;
        this.duration = effectData.duration;
        this.effDom = null;
        this.timer = null;
        this.downNum = effectData.duration;
        this.isPlay = false;
        this.isCanplay = false;
    }


    getState(){
        return this.state;
    }

    play( effectLayer ){
        vm.$store.commit('setCreatedAt',String(this.effectData.createdAt));
        this.parentDom = effectLayer;
        this.state = 1;
        this.noPlayBack();
        this.addEffectToStage();                                       //加载不同class的视频
    }

    render(){
        if(this.isPlay){     //如果可以播放，进入霸屏总计时的时间
            if( (Date.now() -  this.startTime)/1000 >= this.stayTime){
                this.state = 0;
            }
        }
    }

    /**
     * 如果10s还没有加载出来视频则关闭当前队列
     */
    noPlayBack(){
        let _this = this;
        let stayTime = 10;
        noPlayTimer = setInterval(() =>{
            if(stayTime === 0) {
                _this.state = 0;
                clearInterval(noPlayTimer);
            }else{
                stayTime--;
            }
        },1000)
    }

    addEffectToStage(){
        var _this = this;
        var html = [
            `<div class='G-effect' id='"+this.domId+"'>
                <div class="screen_container" id="container">
                    <video id="video" class="firstScreenBack" muted autoplay="autoplay" type="video/webm" loop="loop" class="effect_video" style="width: 100%; height: 100%; overflow: hidden; object-fit: fill;">
                        <source src="${LinkType.LINK_ON_SCREEN_THEME_VIDEO}${_this.effectData.mediaId}.webm" type="video/webm" />
                    </video>
                    <video class="secondScreenBack" id="EFF-video" muted autoplay="autoplay" type="video/webm" loop="loop" class="effect_video" style="width: 100%; height: 100%; overflow: hidden; object-fit: fill;">
                        <source src="${LinkType.LINK_ON_SCREEN_THEME_VIDEO}${_this.effectData.mediaId}_1.webm" type="video/webm" />
                    </video>
                </div>
               
            <div>`
            

        ].join("");
        _this.effDom = $(html);
        _this.parentDom.append( _this.effDom );    //渲染DOM
        /**
         * 全屏视频处理
         * @type {Element | null}
         */
        var video = document.querySelector('#video')
            , container = document.querySelector('#container');
        var oVideo = document.querySelector('#EFF-video');
        video.addEventListener('loadedmetadata', setVideoDimensions(video,container), false);
        window.addEventListener('resize', setVideoDimensions(video,container), false);
        _this.canPlayFunc();
    }

    stop(){
        this.state = 0;
    }
    canPlayFunc(){
        let _this = this;
        video.addEventListener("canplaythrough", function()
            {
                /**
                 * 判断当前视频能不能播放 && 有没有播放过
                 */
                if(!_this.isCanplay){
                    _this.isCanplay = true;          //置为可以播放
                    _this.isPlay = true;             //置为要播放

                    _this.startTime = Date.now();    //初始时间戳
                    clearInterval(noPlayTimer);      //清除未加载出来视频的倒计时效果
                    noPlayTimer = null;              //清除值

                    let duration = Math.round(video.duration-1);      //获取片头视频的时长，-1：解决脚本延迟造成视频重复播放视频的bug
                    _this.stayTime = _this.duration + duration + 2;   //霸屏时间 = 霸屏片头时间 + 霸屏信息持续的时间 +2:解决视频倒计时未到0就结束的bug

                    $(".layer-effect").css("z-index",9999);           //提升霸屏div的层级
                    $(".firstScreenBack").show();                     //显示片头视频

                    _this.downNumFunc(duration);                      //执行显示的视频（片头时间+霸屏信息时间）总时间倒计时计算
                }
            }
        );
    }

    /**
     * 片头播完之后，然后显示霸屏人的信息
     */
    downNumFunc(duration){
        let stayTime = this.downNum+duration;
        this.timer = setInterval(() => {
            if(stayTime === this.duration){                        //如果总时间 = 霸屏信息的时间
                let data = JSON.stringify(this.effectData);        //转化为字符串
                $(".secondScreenBack").show();                     //霸屏信息div显示
                $(".firstScreenBack").hide();                      //片头div关闭
                /**
                 * 把当前的霸屏信息存起来，对当前霸屏信息里面的文字，图片信息做特效处理,详询页面effect_3d.vue
                 */
                vm.$store.commit('setOnScreenPic',data);
            }
            if(stayTime === 0){        //关闭当前定时器并返回
                clearInterval(this.timer);
                this.timer = null;
                return
            }
            stayTime --;
        },1000);
    }
    destroy(){
        vm.$store.commit('setOnScreenPic','');                 //删除存贮的霸屏信息
        $(".firstScreenBack,.secondScreenBack").hide();        //隐藏霸屏div
        this.effDom.remove();                                  //删除DOM
        this.effDom = null;
    }
}



export default EffectType3;


    
    
    
    
    