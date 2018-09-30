<template>
    <div class="comm-socket">
    </div>
</template>

<script>

    import Vue from 'vue';
    import VueSocketio from 'vue-socket.io';
    import MsgType from "./msg_type.js";
    import UIType from "./ui_type.js";
    import REQ from './request'
    import CatchControl from '../comm/catch_control'

    const CFG = window.CFG;

    // Vue.use(VueSocketio, CFG.IM_DOMAIN+'/room'+window.RINFO.storeId);
    var roomInfo = window.RINFO;
    Vue.use(VueSocketio, REQ.commSocketDomain + '/room' + roomInfo.storeId);

    export default {

        components: {},


        data() {
            return {}
        },
        computed: {},

        mounted() {
            var _this = this;
            //监听进场
            this.$socket.on(MsgType.SOCKET_E_ENTER, function (data) {
                _this.$store.commit("storeCurrEnterUser", data);
                clearTimeout(_this.timer)
                _this.timer = setTimeout(() => {
                    _this.$store.commit("storeCurrEnterUser", {userName: ''});
                }, 7000)
                CatchControl.catchUser({storeId: roomInfo.storeId});
            });

            //公聊
            this.$socket.on(MsgType.SOCKET_E_TALK_PUBLIC, function (data) {
                data.uiType = UIType.UI_CHAT_PUB;
                _this.$store.commit("storeAddScreenData", data);
                _this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
            });

            //私聊
            this.$socket.on(MsgType.SOCKET_E_TALK_PRIVATE,(data) => {
                data.isMe = roomInfo.clientId === data.cid;
                this.$store.commit("storeAddSecretChatData", data);
                this.$db.setItem("secretChatDic", this.$store.getters.getChatDic)
                this.$root.notify.$emit(MsgType.DISPATCH_DOWN_PRI_CHAT);
            });

            //监听霸屏响应
            this.$socket.on(MsgType.SOCKET_E_SCREEN_ON, function (data) {
                data.uiType = UIType.UI_ON_SCREEN_THEME;
                _this.$store.commit("storeAddScreenData", data);
                _this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
            });

            //监听霸麦响应
            this.$socket.on(MsgType.SOCKET_E_BM, function (data) {
                data.uiType = UIType.UI_BM;
                _this.$store.commit("storeAddScreenData", data);
                _this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
            });

            //监听打赏响应
            this.$socket.on(MsgType.SOCKET_E_REWARD, function (data) {
                data.uiType = UIType.UI_REWARD;
                _this.$store.commit("storeAddScreenData", data);
                _this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
            });

            //监听艺人签到
            this.$socket.on(MsgType.SOCKET_E_SIGIN_IN, function (data) {
                _this.$store.commit("storecActorList", {storeId: roomInfo.storeId});
            });

            //监听艺人签退
            this.$socket.on(MsgType.SOCKET_E_SIGIN_OUT, function (data) {
                _this.$store.commit("storecActorList", {storeId: roomInfo.storeId});
            });

            //监听点节目
            this.$socket.on(MsgType.SOCKET_E_PROGRAM_BUY, function (data) {
                data.uiType = UIType.UI_PROGRAM
                _this.$store.commit("storeAddScreenData", data);
                _this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
            });

            //监听游戏邀请
            this.$socket.on(MsgType.E_SYS_GAME_INVITE, function (data) {
                _this.$root.notify.$emit(MsgType.E_OPEN_INVITE_PANEL, data)
            });

            //监听消息点赞
            this.$socket.on(MsgType.SOCKET_E_CLICK_POINT, function (data) {
                _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_PUB_MSG_LIKE, data)
            });

            //监听消息撤回
            this.$socket.on(MsgType.SOCKET_E_UNDO, function (data) {
                _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_PUB_MSG_CANCEL, data)
            });

            //监听红包消息 世界
            this.$socket.on(MsgType.SOCKET_E_PACKAGE_PUBLIC, function (data) {
                _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_RED_PACKAGE_PUB, data)
            });

            //监听红包消息 个人
            this.$socket.on(MsgType.SOCKET_E_PACKAGE_PRIVATE, function (data) {
                _this.$root.notify.$emit(MsgType.DISPATCH_DOWN_RED_PACKAGE_PRI, data)
            });


            /***************************************上行****************************************************** */

            //上行 广播 霸屏
            _this.$root.notify.$on(MsgType.DISPATCH_UP_SCREEN_ON, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_SCREEN_ON, data);
            });

            //上行 广播 霸麦
            _this.$root.notify.$on(MsgType.DISPATCH_UP_BM, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_BM, data);
            });

            //上行 广播 公聊
            _this.$root.notify.$on(MsgType.DISPATCH_UP_PUB_CHAT, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_TALK_PUBLIC, data);
            });

            //上行 广播 打赏
            _this.$root.notify.$on(MsgType.DISPATCH_UP_REWARD, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_REWARD, data);
            });

            //上行 签到
            _this.$root.notify.$on(MsgType.DISPATCH_UP_SIGN_IN, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_SIGIN_IN, data);
            });

            //上行 签退
            _this.$root.notify.$on(MsgType.DISPATCH_UP_SIGN_OUT, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_SIGIN_OUT, data);
            });

            //上行 点节目
            _this.$root.notify.$on(MsgType.DISPATCH_UP_PROGRAM_BUY, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_PROGRAM_BUY, data);
            });

            //上行 私聊
            _this.$root.notify.$on(MsgType.DISPATCH_UP_PRI_CHAT, function (data) {
                _this.$socket.emit(MsgType.SOCKET_E_TALK_PRIVATE, data);
            });

            //上行 点赞
            _this.$root.notify.$on(MsgType.DISPATCH_UP_PUB_MSG_LIKE, (data) => {
                _this.$socket.emit(MsgType.SOCKET_E_CLICK_POINT, data)
            })

            //上行 撤回消息
            _this.$root.notify.$on(MsgType.DISPATCH_UP_PUB_MSG_CANCEL, (data) => {
                _this.$socket.emit(MsgType.SOCKET_E_UNDO, data)
            })

            //上行 红包 世界
            _this.$root.notify.$on(MsgType.DISPATCH_UP_RED_PACKAGE_PUB, data => {
                _this.$socket.emit(MsgType.SOCKET_E_PACKAGE_PUBLIC, data)
            })


            //上行 红包 个人
            _this.$root.notify.$on(MsgType.DISPATCH_UP_RED_PACKAGE_PRI, data => {
                _this.$socket.emit(MsgType.SOCKET_E_PACKAGE_PRIVATE, data)
            })
        },

        methods: {},

        sockets: {
            connect: function (data) {
                window.RINFO.sId = this.$socket.id;
                var data = {cid: roomInfo.clientId, userName: roomInfo.nickName}
                this.$socket.emit(MsgType.SOCKET_E_ENTER, data);
                data = null;
            }
        }


    }
</script>


<style scoped>
    .comm-socket {
        width: 1px;
        height: 1px;
        position: absolute;
    }
</style>