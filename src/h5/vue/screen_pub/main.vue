<template>
    <div class="screen">
        <!--  socket 组件  -->
        <CommSocket></CommSocket>

        <TempHeader  v-bind="getPublicCfg" v-show="!$store.getters.getIsReward"></TempHeader>

        <el-container style="height:100%;" v-show="!$store.getters.getIsReward">
            <el-aside width="380px" class="aside">
                <!--大屏左边部分-->
                <TempLeft @setPic="getPic"></TempLeft>
                <!--<TempBoxLeft @setPic="getPic"></TempBoxLeft>-->
            </el-aside>
            <el-main>
                <!--大屏右边部分-->
                <TempBoxRight></TempBoxRight>
            </el-main>
        </el-container>

        <!-- 背景幕布 -->
        <TempBackdrop v-bind="getPublicCfg"></TempBackdrop>

        <!--中间图片/字幕显示-->
        <TempPublicPicture v-show="!$store.getters.getIsReward"></TempPublicPicture>
        <TempPublicMsg v-show="!$store.getters.getIsReward"></TempPublicMsg>

        <!-- 特效 -->
        <div class="layer-effect"></div>
        <!--二维码弹出层-->
        <TempPopover
                :wxpic="wxpic"
        ></TempPopover>

        <!--&lt;!&ndash;	/*包裹所有元素的容器*/&ndash;&gt;-->
        <TempEffect3D></TempEffect3D>
        <TempScreenUserInfo></TempScreenUserInfo>
    </div>
</template>

<script>
    import $ from 'jquery';
    import CommSocket from './comm/comm_socket.vue';
    import TempHeader from './child/header/header_box.vue'
    import TempBoxRight from "./child/right/box_right.vue";
    import TempBackdrop from "./child/backdrop/backdrop.vue";
    import TempPublicPicture from './child/middle/public_picture.vue';
    import TempPublicMsg from './child/middle/public_msg.vue';
    import TempPopover from './child/left/popover.vue';
    import TempLeft    from   './child/left/left.vue'
    //
    import EffectControl from "./effect/effect_control.js";
    import CatchControl from "./comm/catch_control.js";
    import MsgType from './comm/message_type'
    import REQ from './comm/request'
    import TempEffect3D from './effect/effect_3d.vue'
    import TempScreenUserInfo   from './effect/screen_userInfo.vue'
    import cookie from './comm/cookie.js'

    var CFG = window.CFG;
    var roomInfo = window.RINFO;

    // document.querySelector('video').muted=true;

    export default {

        components: {
            CommSocket,
            TempHeader,
            TempBoxRight,
            TempBackdrop,
            TempPublicPicture,
            TempPublicMsg,
            TempPopover,
            TempEffect3D,
            TempScreenUserInfo,
            TempLeft
        },

        data() {
            return {
                publicCfg: {},
                wxpic:''
            }
        },
        computed: {
            getPublicCfg(){
                return this.publicCfg
            },
            isReward(){
                return this.$store.getters.getIsReward;
            }
        },

        mounted() {
            var _this = this;
            //缓存 霸屏礼物数据
            CatchControl.catchOnScreenGiftData({storeId: roomInfo.storeId});
            //缓存 用户数据
            CatchControl.catchUser({storeId: roomInfo.storeId});

            EffectControl.start(_this.$root.notify, $(".layer-effect"));

            // 跳转到游戏公屏
            this.$root.notify.$on(MsgType.E_JUMP_TO_GAME, function (data) {
                 const result  = data.gameIndex;
                 let createdAt = _this.$store.getters.getCreatedAt;
                 cookie.set('createdAt',createdAt,60*10*1000);
                 switch (result) {
                     case '1001':
                         window.location.href = `http://game.ibigtop.com/game/render/public/1001?storeId=${data.storeId}&isPrivate=1#/`;
                         break;
                     case '1002':
                         window.location.href = `http://game.ibigtop.com/game/render/public/1002?storeId=${data.storeId}&isPrivate=1#/draw/page`;
                         break;
                     case '1003':
                         window.location.href = `http://game.ibigtop.com/game/render/public/2001?storeId=${data.storeId}&isPrivate=1#/`;
                         break;
                 }
            });
            this.resizeFunc();    //等比缩放触发事件
            this.getPublicScreenCfg();
        },
        methods: {
            getPublicScreenCfg() {
                REQ.reqPublicScreenCfg({storeId: roomInfo.storeId},
                    (response) => {
                        this.publicCfg = response.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },
            getPic(val){
                this.wxpic = val;
            },
            resizeFunc(){
                let vm = this;
                vm.setZoom();     //初始化触发
                /**
                 * 当浏览器窗口大小发生变化时触发
                 */
                $(window).bind('resize',function(){
                    vm.setZoom();
                });
            },
            setZoom(obj){
                obj = obj||$('.B-main');
                var w = $(window).width();
                var h = $(window).height();
                var maxWidth = 1920;
                var maxHeight = 1080;
                window.zoom = 1;

                if(h>w+150){
                    // zoom = w/maxWidth;
                    // obj.css({zoom:zoom});
                    // $(".aside").css({zoom:zoom});
                }else{
                    zoom = h/maxHeight;
                    if(w/h>3&&w/maxWidth>2){
                        zoom += 0.1;
                    }
                    obj.css({zoom:zoom});
                    // $(".aside").css({zoom:zoom});
                }
            },
        },

    }
</script>


<style lang='scss' scoped>
    @import '../../../style/sass/mixin.scss';
    .screen {
        height: 100%;
        position: relative;
        min-height: 813px;
        overflow: hidden;
        .el-container{
            height:100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1001;
            .aside{
                overflow: hidden;
                height: 100%;
            }
        }
        .el-main{
            padding: 0 !important;
        }
    }
    .screen .layer-effect {
        @include layout-flex-c-center;
        position:absolute;
        top:0;
        left:0;
        margin: auto;
        width: 100%;
        height: 100%;
        text-align:center;
        overflow: hidden;
        z-index: 10;
        .G-effect{
            @include set-width-height(100%,100%);
            @include box-center(-50%,-50%);
            .effect_video{
                @include set-width-height(100%,100%);
                object-fit: fill;
            }
        }
    }
    .screen .header {
        margin: auto;
        width: 100%;
        height: 10%;
    }

    .screen .content {
        @include layout-flex-r;
        margin: auto;
        width: 100%;
        height: 80%;
    }

    .screen .content .left {
        width: 15%;
        height: 100%;
        box-sizing: border-box;
    }

    .screen .content .meddle {
        @include layout-flex-c-sb;
        padding: 0 10px;
        width: 750px;
        height: 100%;
        box-sizing: border-box;
    }

    .screen .content .right {
        width: 610px;
        height: 100%;
        overflow: hidden;
        padding: 0 10px;
    }

    .footer {
        width: 100%;
        height: 10%;
    }
</style>




