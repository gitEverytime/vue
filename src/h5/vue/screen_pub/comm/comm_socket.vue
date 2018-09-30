<template>
    <div class="comm-socket">
    </div>
</template>

<script>

import Vue         from 'vue';
import VueSocketio from 'vue-socket.io';
import MsgType     from "../comm/message_type.js";
import UIType      from "../comm/ui_type.js";
import REQ from './request'
const CFG = window.CFG;
const roomInfo = window.RINFO;
Vue.use(VueSocketio, 'http://59.110.217.82:3004/room'+window.RINFO.storeId);

export default {
    components:{ },
    data(){
        return{
        }
    },
    computed:{
        
    },

    mounted(){
        var _this = this;

        //监听进场
        this.$socket.on( MsgType.SOCKET_E_ENTER, function(data){
            console.log("欢迎【"+data.userName+"】光临!");
            _this.getUserList();
        });
        //发言
		this.$socket.on( MsgType.SOCKET_E_TALK_PUBLIC, function(data){
            data.uiType = UIType.UI_CHAT_PUB;
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_PUB_CHAT, data);
        });
        //监听霸屏响应
        this.$socket.on( MsgType.SOCKET_E_SCREEN_ON, function(data){
          data.uiType = UIType.UI_ON_SCREEN_THEME;
            _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_SCREEN_ON, data); 
        });

        //监听打赏响应
        this.$socket.on( MsgType.SOCKET_E_REWARD,function(data){
            data.uiType = UIType.UI_REWARD;
            _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_REWARD, data);
        });

        //监听点节目
        this.$socket.on( MsgType.SOCKET_E_PROGRAM_BUY,function(data){
            data.uiType = UIType.UI_PROGRAM;
            _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_PROGRAM_BUY, data);
        });

        //监听游戏邀请
        this.$socket.on( MsgType.E_SYS_GAME_INVITE,function(data){
            _this.$root.notify.$emit( MsgType.E_JUMP_TO_GAME, data)
        });

        //监听点赞消息
        this.$socket.on( MsgType.SOCKET_E_CLICK_POINT,function(data){
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_PUB_MSG_LIKE, data)
        });

        //监听撤回消息
        this.$socket.on( MsgType.SOCKET_E_UNDO,function(data){
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_PUB_MSG_CANCEL, data)
        });

        //监听霸麦消息
        this.$socket.on( MsgType.SOCKET_E_BM,function(data){
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_BM, data)
        });

        //监听红包消息 世界
        this.$socket.on( MsgType.SOCKET_E_PACKAGE_PUBLIC, function(data){
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_RED_PACKAGE_PUB, data)
        });

        //监听红包消息 个人
        this.$socket.on( MsgType.SOCKET_E_PACKAGE_PRIVATE, function(data){
            _this.$root.notify.$emit( MsgType.DISPATCH_DOWN_RED_PACKAGE_PRI, data)
        });

        _this.getUserList();
    },
    
    methods:{
        getUserList() {
            REQ.reqUserList({storeId: roomInfo.storeId},
                (result) => {
                    this.$store.commit('setUserList',result.data)
                },
                (complete) => {
                },
                (err) => {
                    console.error(err)
                })
        },
    },

    sockets:{
	    connect: function(data){
            window.RINFO.sId = this.$socket.id;
	    }
	  }


}
</script>


<style  scoped>
.comm-socket{ width: 1px; height: 1px; position: absolute;}
</style>