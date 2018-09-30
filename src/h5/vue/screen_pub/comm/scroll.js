/*
 * @Author: jgg
 * @Date: 2018-04-08 15:49:19
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-08 11:37:10
 * @Describe  特效
 */

import $ from 'jquery';
import Vue  from 'vue';
import MainStore        from "../../../vuex/main_store.js";
import dateFormat from  '../comm/date_format.js';
let vm = new Vue({
    store:MainStore,
});
class Scroll{
    constructor( effectData ){
        this.domId      = "EFF-"+Date.now();
        this.effectData = effectData;
        this.state      = 0;  //0:播放完毕 1:播放中
        this.parentDom  = null;
        this.pubScreenList = vm.$store.getters.getPublicUserInfo;

        this.startTime  = 0;
        this.stayTime   = 10;  //单位s  停留时间

        this.effDom = null;
    }


    getState(){
        return this.state;
    }

    play( effectLayer ){
        this.parentDom = effectLayer;
        this.state     = 1;
        this.startTime = Date.now();
        let _this = this;
        /**
         * 新增
         */
        let data = this.effectData;
        if(!data.isOld){             //新发的数据没有这两个参数故做判断是否有新数据进来
            this.newInsert(data);
        }else{
            if(_this.pubScreenList.length > 7){          //如果数据length大于7,删除第一个，再把最新数据add进去，保证有八个数据轮询
                _this.pubScreenList.shift();
            }
            _this.pubScreenList.push(data);
            vm.$store.commit('setChatUserInfo', _this.pubScreenList);          //vuex托管数据
            _this.scrollList(data);               //执行动画渲染Dom
        }
    }

    render(){
        if( (Date.now() -  this.startTime)/1000 >= this.stayTime ){
            this.state = 0;
        }

    }
    newInsert(data){
        /***
         * 新数据要把它add到屏幕最中间，做法是先替换将要到中间的那个Dom，然后替换vuex中托管的中间那条数据，再执行动画让它到中间
         * @type {Scroll}
         * @private
         */
        let _this = this;
        /********************************* 更新DOM *****************************************/
        if(!data.favorCount) data.favorCount = 0;    //如果初始化数据没有点赞数目则置为零
        $(".scrollWrap li:eq(-4)").find(".head_img").attr("src",data.headimg).end()
            .find(".cname").text(data.cname).end()
            .find(".G_num").text(data.favorCount).end()
            .find(".date").text(data.Dtime);
        $(".scrollWrap li:eq(-4)").attr("id",data.mid);
        $(".scrollWrap li:eq(-4)").find(".sex").hide();
        data.sex === '1'? $(".scrollWrap li:eq(-4)").find(".iconMan").show() : $(".scrollWrap li:eq(-4)").find(".iconWoman").show();

        /********************************* 更新数据 *****************************************/

        _this.pubScreenList.splice(_this.pubScreenList.length-4,1,data);   // 替换中间数据
        _this.pubScreenList.push(_this.pubScreenList[0]);                  // 吧第一条数据插到Array后面
        _this.scrollList(_this.pubScreenList[0]);                          // 执行动画
        if(_this.pubScreenList.length > 8){                                // 发现数据大于8再删除第一个
            _this.pubScreenList.shift();                                   // 数组大于8组删除第一组
        }
        vm.$store.commit('setChatUserInfo', _this.pubScreenList);          // vuex全局配置数据
    }

    scrollList(data){
        let vm = this;
        const timer = setTimeout(()=>{
            $(".scrollWrap li:eq(-8)").stop(true,true).animate({
                top:'-120px',
            });
            $(".scrollWrap li:eq(-8)").remove();

            $(".scrollWrap li:eq(-7)").stop(true,true).animate({
                top:'-67',
            });
            $(".scrollWrap li:eq(-6)").stop(true,true).animate({
                top:'41px',
            });
            $(".scrollWrap li:eq(-5)").stop(true,true).animate({
                top:'171px',
            });
            $(".scrollWrap li:eq(-4)").stop(true,true).animate({
                top:'327px',
            });
            $(".scrollWrap li:eq(-3)").stop(true,true).animate({
                top:'517px',
            });
            $(".scrollWrap li:eq(-2)").stop(true,true).animate({
                top:'673px',
            });
            $(".scrollWrap li:eq(-1)").stop(true,true).animate({
                top:'803px',
            });
            $(".scrollWrap").append(vm.addEffectToStage(data));
            //判断当前插入队列人的性别
            data.sex === '1'? $(".scrollWrap li:eq(-1)").find(".iconMan").show() : $(".scrollWrap li:eq(-1)").find(".iconWoman").show();
            clearTimeout(timer);
        },1000);
    }
    addEffectToStage(item){
        return `<li id="${item.mid}" class="item">
                    <div class="reward_msg">
                        <img src="${item.headimg}" class="head_img">
                        <p>
                            <span class="icon sex iconMan" ></span>
                            <span class="icon sex iconWoman "></span>
                            <span class="cname">${item.cname}</span>
                            <label class="date">${item.Dtime}</label>
                        </p>
                        <p>
                            <span class="icon iconGood good"></span>
                            <span class="G_num">${item.favorCount}</span>
                        </p>
                    </div>
                </li>`;
    }

    stop(){
        this.state = 0;
    }

    destroy(){
        this.effDom = null;
    }
}



export default Scroll;






