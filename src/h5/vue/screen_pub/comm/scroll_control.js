/*
 * @Author: jgg
 * @Date: 2018-07-02 15:49:19
 * @Describe  动画管理
 */
import $ from 'jquery'
import MsgType from "../comm/message_type.js";
import Scroll  from '../comm/scroll.js';
import Vue  from 'vue';
import MainStore  from "../../../vuex/main_store.js";
import REQ from "./request";
import dateFormat from './date_format.js';
var roomInfo = window.RINFO;
let vm = new Vue({
    store:MainStore,
});

let timer;
let isVisible = true;

class EffectControl{
    constructor(){
        this.notify     = null;
        this.tick       = null;
        this.currEffect = null;
        this.effectList = [];
        // this.timer = null;
        this.effectLayer = null;
        this.setTimer = null;
        this.stayList = [];
        this.totalDataPool = [];
        this.newDataPool = [];
        this.oldDataPool = [];
        this.catchList = [
            {
                cid:"2",
                cname:"╮Empress人来疯 ン",
                content:"有的人，该忘就忘了吧！所谓的念念不忘，在自己眼里，是爱；在对方眼里，是烦；在别人眼里，是贱。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg6.jpg",
                mid:"eb731250769211e8b540ad4bc62239cb1",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"1",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'5',
                id:'1'
            },
            {
                cid:"2",
                cname:"℡朂孰悉哋ノ帞泩亾",
                content:"人生就像呼吸，呼是为了争一口气，吸是为了出一口气。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg7.jpg",
                mid:"eb731250769211e8b540ad4bc62239cb2",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"0",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'3',
                id:'2'
            },
            {
                cid:"2",
                cname:"|-|依恋|-|",
                content:"活在别人的掌声中，最易迷失自己；处在别人的关爱中，最易弱化自己。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg8.jpeg",
                mid:"eb731250769211e8b540ad4bc62239cb3",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"1",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'5',
                id:'3'
            },
            {
                cid:"2",
                cname:"碎落荒凉！",
                content:"我能理解你，是因为我能在你身上看到我自己，同时在我身上也看到了你。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg1.jpeg",
                mid:"eb731250769211e8b540ad4bc62239cb4",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"0",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'0',
                id:'4'
            },
            {
                cid:"2",
                cname:"那被甩了一耳光的梦。",
                content:"简单的活着，善良率直坦荡，去品位人生的韵味。享受人生的乐趣。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg2.jpg",
                mid:"eb731250769211e8b540ad4bc62239cb5",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"1",
                storeId:"",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'4',
                id:'5'
            },
            {
                cid:"2",
                cname:"雷迪嘎嘎-",
                content:"从现在开始，不沉溺幻想，不庸人自扰，好好生活，做一个接近幸福的人",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg3.jpeg",
                mid:"eb731250769211e8b540ad4bc62239cb6",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"0",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'1',
                id:'6'
            },
            {
                cid:"2",
                cname:"「鱼记忆不止七秒」″",
                content:"人生充满了起起落落。关键在于，在顶端时好好享受；在低谷时不失勇气。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg4.jpg",
                mid:"eb731250769211e8b540ad4bc62239cb7",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"1",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'3',
                id:'7'
            },
            {
                cid:"2",
                cname:"ヴ小狐狸未成精",
                content:"把微笑挂在脸上，时时拥有美好的心情，去面对生活，学习，才不会有困难。",
                headimg:"http://static.ibigtop.com/static/img/public/touxiang/headimg5.jpg",
                mid:"eb731250769211e8b540ad4bc62239cb8",
                pic:"",
                sId:"/room1#wIW8xutxmXEO1_uTAAAQ",
                sex:"0",
                storeId:"1",
                type:"0",
                uiType:"UI_CHAT_PUB",
                favorCount:'2',
                id:'8'
            },
        ]
    }

    /**
     * 启动特效管理器
     */
    start(notify, effectLayer ){
        var _this    = this;
        this.notify = notify;
        this.effectLayer = effectLayer;
        if(_this.tick != null){
            clearInterval( this.tick );
            _this.tick = null;
        }
        this.tick = setInterval(function(){
            _this.render();
        }, 100);
        this.windowVisible();
        this.getHistoryData();
        this.listener();
    }

    windowVisible(){
        let _this = this;
        /**
         * 判断当前浏览器是否处于关闭/开启状态
         */
        document.onvisibilitychange = function(){
            if(document.visibilityState === "visible" && _this.effectList.length<1){       //如果当前浏览器打开状态   &&   执行动画的length为零
                clearInterval(timer);     //先清空自动播放的定时器，再开启自动轮播
                timer = null;
                _this.startTimer();
                isVisible = true;         //显示状态
                /**
                 * 如果当前浏览器处于显示状态，把等待队列里面的list赋到播放队列
                 * @type {Array|*}
                 */
                _this.effectList = _this.stayList;
                _this.stayList = [];
            }else{
                clearInterval(timer);      //清除定时器
                timer = null;
                isVisible = false;         //隐藏状态
                /**
                 * 如果当前浏览器处于关闭状态，把当前排队的动画list清空，暂存到等待队列里面
                 * @type {Array|*}
                 */
                _this.stayList = _this.effectList;
                _this.effectList = [];
            }
        };
    }

    listener(){
        let _this = this;
        this.notify.$on(MsgType.DISPATCH_DOWN_SCREEN_ON, function(data){           //霸屏
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_REWARD, function(data){              //打赏
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_PUB_CHAT, function(data){            //聊天
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_PROGRAM_BUY, function(data){         //点歌
            _this.addEffect( data );
        });
        this.notify.$on(MsgType.DISPATCH_DOWN_BM, function(data){                  //霸麦
            _this.addEffect( data );
        });
        this.notify.$on( MsgType.DISPATCH_DOWN_PUB_MSG_CANCEL, data => {           //撤回
            _this.cancelUserInfo(data);
        });
        this.notify.$on( MsgType.DISPATCH_DOWN_PUB_MSG_LIKE, data => {             //点赞
            _this.updateLike(data);
        });
    }
    
    /**
     * 特效加入队列
     * @param {} effectData
     */
    addEffect( effectData ){
        // console.log(effectData);
        let effectItem = this.getEffectItem(effectData);
        if(!effectData.Dtime){
            effectData.createdAt ? effectData['Dtime'] = dateFormat.MDHM(effectData.createdAt) : effectData['Dtime'] = dateFormat.MDHM(Date.parse(new Date()))
        }
        if(effectData.isOld){                              //如果是历史数据，则按次序插入播放队列中
            this.effectList.push(effectItem);
        }else {
            this.effectList.unshift(effectItem);           //如果是新数据，则插入播放队列的第一个进行播放；
            this.totalDataPool.push(effectData);           //把插完播放队列的数据加入历史数据
            this.newDataPool.push(effectData);             //并且也插入到新的数据池
            this.deleteCatchDataPool();                    //检测新数据是否大于8条并且是否可以删除假数据
            this.detleteTotalDataPool();                   //检测总数据池是否大于50条并且是否可以标记删除
            this.deleteScrollDataPool();                   //检测滚动数据池是否有被标记的数据
        }
    }

    /**
     * 新数据池大于8个则删除假数据池的
     */
    deleteCatchDataPool() {
        if (this.newDataPool.length > 8 && this.catchList.length > 0) {
            this.catchList.some((item, index) => {    //循环找到没有标记删除的数据，找到并标记为删除，跳出循环
                if (!item.isDelete) {
                    item['isDelete'] = true;
                    this.newDataPool.shift();
                    return true;
                }
            });
        }
    }

    /**
     * 总数据池大于50条删除第一条数据
     */
    detleteTotalDataPool(){
        let _this = this;
        if (_this.totalDataPool.length > 50) {
            let data = _this.oldDataPool[0];
            _this.totalDataPool.some((item) => {
                if(item.id === data.id) {
                    item['isDelete'] = true;
                    _this.oldDataPool.shift();
                    return true;
                }
            })
        }
    }

    /**
     * 滚动数据删除有被标记删除的数据
     */
    deleteScrollDataPool(){
        this.effectList.forEach((item,key) => {
            if(item.effectData.isDelete) this.effectList.splice(key,1);
        })
    }

    /**
     * 老数据循环5s滚一次
     */
    startTimer(){
        let _this = this;
        timer = setInterval(() =>{
            _this.totalDataPool.some((item,index) => {
                if(!item.isDelete) {                                //如果没有删除标记
                    let oldData = _this.totalDataPool[0];           //获取总数据池的第一个数据，并且插入到播放队列
                    oldData['isOld'] = true;                        //标记为老数据
                    _this.addEffect(oldData);                       //插入
                    _this.totalDataPool.push(oldData);              //添加到总数据池最后一个
                    _this.totalDataPool.shift();                    //删除总数据池的第一个
                    return true;                                    //跳出循环
                }else{
                    _this.totalDataPool.splice(index,1);            //否则有标记就删除该数据并继续轮询直到找到没有标记的数据
                }
            })
        },10000);
    }

      /**
     * 历史数据拉取
     */
    getHistoryData(){
        let _this = this;
        let pubScreenList = [];
        REQ.reqGetChatList({
                storeId: roomInfo.storeId
            },
            function(result){
                let length = result.data.length;                            //获取到历史数据的长度
                _this.oldDataPool = result.data;                            //老数据池
                if(length>8){                                               //如果历史数据大于8条，渲染前八条数据
                    pubScreenList = result.data.slice(0,8);                 //历史数据前八条
                    _this.appendStaff(result.data.slice(0,8));
                    length > 50 ? _this.totalDataPool = result.data.slice(0,50) : _this.totalDataPool = result.data;
                }else{
                    if(length === 0) {                                      //如果历史数据一条都没有，渲染假数据
                        pubScreenList = _this.catchList;
                        _this.appendStaff(_this.catchList);
                        _this.totalDataPool = _this.catchList;              //总数据池
                    }
                    if(length > 0) {                                        //如果0<历史数据<8,历史数据和假数据拼8条,再渲染数据
                        let index = 8 - length;
                        let newCatchList = _this.catchList.slice(0,index).concat(result.data); //合并数组
                        pubScreenList = newCatchList;
                        _this.appendStaff(newCatchList);
                        _this.totalDataPool = newCatchList;                 //总数据池
                    }
                }
                vm.$store.commit('setChatUserInfo', pubScreenList.slice(0));//轮播数据池：vuex管理
                _this.startTimer();                                         //开启定时轮询滚动
            },
            function(data){},
            function(data){}
        );
    }

    /**
     * 插入DOM操作
     */
    appendStaff(catchList){
        let _this = this;
        catchList.forEach((item,key)=>{
            if(!item.Dtime){
                item.createdAt ? item['Dtime'] = dateFormat.MDHM(item.createdAt) : item['Dtime'] = dateFormat.MDHM(Date.parse(new Date()))
            }
            $(".scrollWrap").append(_this.appendHtml(item));
            //  man/woman icon show
            item.sex === '1'? $(`.scrollWrap li:eq(${key})`).find(".iconMan").show() : $(`.scrollWrap li:eq(${key})`).find(".iconWoman").show()
        });
    }

    /**
     * 删除操作
     */
    cancelUserInfo(data){
        let _this = this;
        _this.totalDataPool.some((item,index) => {
            if(data.id === item.mid) {
                item['isDelete'] = true;        //如果监听到im删除该数据的消息，循环找到该数据并且标记为删除
                return true
            }
        })
    }

    /**
     *  更新点赞数目
     */
    updateLike(data){

        let canceList = this.totalDataPool;
        /**
         * 点赞数目更新展示
         */
        for (let i=0; i<8; i++){
            if($(`.scrollWrap li:eq(${i})`).attr("id") === data.id){
                $(`.scrollWrap li:eq(${i})`).find(".G_num").text(data.favorCount);
            }
        }
        /**
         * 更新vuex存贮的数据
         */
        canceList.forEach((val)=>{
            if(val.mid === data.id){
                val.favorCount = data.favorCount
            }
        });
    }


    /**
     * 虚拟DOM
     * @param item
     * @returns {string}
     */
    appendHtml(item){
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

    /**
     * 渲染特效
     */
    render(){
        let _this = this;
        if(_this.currEffect == null){
            if( _this.effectList.length <= 0 ) return;
            _this.currEffect = _this.effectList.shift();
            if(_this.currEffect == null) return;
            _this.currEffect.play( _this.effectLayer );
        }else{
            _this.currEffect.render();
            if(_this.currEffect.getState() === 0){
                _this.currEffect.stop();
                _this.currEffect.destroy();
                _this.currEffect = null;
            }
        }

    }

    /**
     * 通过特效数据类型匹配相应动画解析器
     * @param {} effData
     */
    getEffectItem(effData){
        return new Scroll(effData);
    }
}




export default new EffectControl();






