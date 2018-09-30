<template>
    <div class="game_public_2001 box">
        <TempGameSocket
                @getAward="award"
        ></TempGameSocket>
        <div class="title"></div>
        <p class="num">
            当前参与人数&nbsp;<span>{{num}}</span>&nbsp;人
        </p>
        <div class="qr-container" >
            <div class="qr-back">
                <div id="qrcode" ref="qrcode" @click="$store.commit('setPopoverShow',true)"></div>
            </div>
            <span>扫码参与</span>
        </div>
        <div class="prize">
            <p v-for="item in awardList" v-if="item.content && item.count">
                <span>{{item.name}}：</span>
                <span class="prizeName">{{item.content}}</span>
                <span>{{item.count}}名</span>
            </p>
        </div>
        <TempPopover :wxpic="pic"></TempPopover>
    </div>
</template>

<script>
    const GameInfo = window.GameInfo
    import $                 from  'jquery'
    import TempPopover   from '../1001/popover.vue'
    import TempGameSocket  from './game_socket.vue'
    import REQ   from "./request.js";
    import setZoom           from  '../../common/setZoom.js'
    import QRCode from 'qrcodejs2'
    export default {
        components:{
            TempPopover,
            TempGameSocket
        },
        data(){
            return{
                num:'0',
                pic:'',
                awardList:[]
            }
        },
        mounted(){

            setZoom();     //初始化触发
            /**
             * 当浏览器窗口大小发生变化时触发
             */
            $(window).bind('resize',function(){
                setZoom();
            });
            //参与人数
            this.$root.notify.$on("USER_JOIN", (data) => {
                this.num = data.playerCount
            });
            //抽取玩家
            this.$root.notify.$on("START_GAME", (data) => {
                this.$store.commit('setExtractInfo',JSON.stringify(data));
                window.location.href = "#/extract/result"
            });
            this.getStoreInfo();
        },
        methods:{
            getStoreInfo() {
                REQ.reqStoreGetById({storeId: GameInfo.storeId},
                    (res) => {
                        this.$nextTick (() => {
                            this.qrcode(res.data.pubCode);
                            this.pic = res.data.pubCode;
                        })
                    },
                    (complete) => {
                    },
                    (err) => {

                    }
                )
            },
            qrcode(url) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 设置宽度
                    height: 200, // 设置高度
                    text: url
                });
            },
            award(data){
                this.awardList = data;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .box{
        background: url("http://static.ibigtop.com/static/img/public/game/game_2001.png") top center;
        background-size: 100% 100%;
        @include set-width-height(100%,100%);
        overflow: hidden;
        position: relative;
        .title{
            @include set-width-height(510px,156px);
            background: url("http://static.ibigtop.com/static/img/public/game/game_logo.png") top center;
            background-size: 100% 100%;
            position: absolute;
            @include box-center(11%,50%);
        }
        .num{
            position: absolute;
            @include box-center(40%,50%);
            font-size:50px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            text-shadow:2px 0px 4px rgba(185,110,123,1);
            span{
                font-size: 100px;
            }
        }
        .qr-container {
            @include layout-flex-c;
            align-items: center;
            padding: 25px;
            position: absolute;
            left: 5%;
            top: 30%;
            border-radius: 5px;
            background:rgba(34,24,33,0.3);
            .qr-back {
                background: #FFFFFF;
                border-radius: 5px;
                padding: 25px;
            }
            span {
                color: #FFFFFF;
                @include font-dpr(20px);
                margin-top: 10px;
            }
        }
        #qrcode{
            padding: 5px;
            cursor: pointer;
        }
        .prize{
            position: absolute;
            @include box-center(80%,50%);
            p{
                font-size:38px;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow:0px 2px 2px rgba(21,4,5,0.3);
                .prizeName{
                    display: inline-block;
                    width: 250px;
                }
            }
        }
    }

</style>