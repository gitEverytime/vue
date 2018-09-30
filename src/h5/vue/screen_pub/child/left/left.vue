<template>
    <div class="left_box">
        <img v-if='logo' :src="logo"  class="logo" @load="imageLoaded">
        <h2 class="left_title">{{title}}</h2>
        <div class="QRcode" v-if='pubCode' @click="$store.commit('setPopoverShow',true)">
            <div id="qrcode" ref="qrcode"></div>
            <h2 class="QRcode_title">扫码上墙</h2>
        </div>
        <div class="left_banner">
            <el-carousel
                    indicator-position="outside"
                    :interval= "15000"
            >
                <el-carousel-item v-for="(item,key) in dataList" >
                    <img :src="item.pic">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import REQ from '../../comm/request'
    import QRCode from 'qrcodejs2'
    // var CFG = window.CFG;
    var roomInfo = window.RINFO;

    export default {
        components:{
            QRCode
        },

        data(){
            return{
                dataList:[
                    {
                        img:'http://static.ibigtop.com/static/img/advert/ad1.webp'
                    },
                    {
                        img:'http://static.ibigtop.com/static/img/advert/ad2.webp'
                    },
                    {
                        img:'http://static.ibigtop.com/static/img/advert/ad3.webp'
                    },
                    {
                        img:'http://static.ibigtop.com/static/img/advert/ad4.webp'
                    }
                ],
                index:0,
                title:'',
                logo:'',
                pubCode:'',
                initQCode:'http://weixin.qq.com/q/02DPAt9YjcfYj1p_8qhrck'
            }
        },
        computed:{

        },
        created(){
            this.getAdPics();
        },

        mounted(){
            let _this = this;
            _this.geStoreGetByUid();
        },
        methods:{
            /**
             * 获取商家基本信息
             */
            geStoreGetByUid(){
                let _this = this;
                REQ.reqStoreGetById({storeId:roomInfo.storeId},
                    (result) => {
                        _this.title = result.data.sname;
                        _this.pubCode = result.data.pubCode;
                        _this.logo = result.data.logo;
                        _this.$emit('setPic',result.data.pubCode);
                        if(!result.data.pubCode) return;
                        _this.$nextTick (function () {
                            this.qrcode(result.data.pubCode);
                        })
                    },
                    (complete) => {
                    },
                    (err) => {
                    });
            },
            qrcode(url) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 设置宽度
                    height: 200, // 设置高度
                    text: url
                });
            },
            /**
             * 获取广告图
             */
            getAdPics(){
                let _this = this;
                REQ.reqPubGetAdPics({storeId:roomInfo.storeId},
                    (result) => {
                        _this.dataList = result.data;
                    },
                    (complete) => {
                    },
                    (err) => {
                    });
            },
            /**
             * 图片处理时的回调
             */
            imageLoaded() {
                let vm = this;
                let oW = '';
                let oH = '';
                let Img = new Image();
                Img.src = vm.logo;
                Img.onload = function ()
                {
                    oH = 100;
                    oW = parseFloat((Img.width/Img.height)*oH);
                    //赋予图片固定的比例
                    $(".logo").css({
                        'height':oH,
                        'width':oW
                    });
                }
            }
        }
    }
</script>

<style lang='scss' >
    @import '../../../../../style/sass/mixin.scss';
    #qrcode{
        padding: 20px;
        background: #fff;
        border-radius: 0.25em;
    }
    .el-carousel{
        border-radius: 6px;
        height: 100%;
    }
    .el-carousel__container{
        height: 100%;
        border-radius: 6px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .el-carousel__indicators--outside{
        position: absolute;
        list-style: none;
        bottom: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        margin: 0;
        padding: 0;
        z-index: 2;
        width: 200px;
        .is-active{
            width: 33px !important;
            height: 10px !important;
            background-color: #d8d854 !important;
            border-radius: 5px !important;
        }
        .el-carousel__indicator{
            display: inline-block;
            @include set-width-height(10px,10px);
            border-radius: 50%;
            background-color: #8d888f;
            margin-right:15px;
            padding:0;
            .el-carousel__button{
                display:none;
            }
        }
    }
    .left_box{
        text-align: center;
        padding: 0.934em 2.5em 0em;
        /*overflow-y: scroll;*/
        height: 100%;
        overflow: hidden;
        width: 100%;
        .logo{
            margin: 0.625em auto;
            @include set-width-height(18.75em,auto);
            max-height: 6.26em;
            max-width: 18.75em;
        }
        .left_title{
            color: #dddddd;
            font-size: 1.625em;
            font-weight: bold;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .QRcode{
            margin-top:10px;
            padding: 20px;
            background: rgba(0,0,0,0.5);
            border-radius: 0.375em;
            cursor: pointer;
            @include set-width-height(100%,auto);
            img{
                @include set-width-height(100%,100%);
            }
            .QRcode_title{
                color: #FFFFFF;
                font-size: 1.5em;
                padding-top:1em;
            }
        }
        .left_banner{
            margin-top: 1.25em;
            overflow: hidden;
            position: relative;
            height: 480px;
            .banner_wrap{
                    overflow: hidden;
                    position: relative;
                    li{
                    @include set-width-height(216px,390px);
                    float: left;
                    img{
                        @include set-width-height(100%,100%);
                        border-radius: 6px;
                    }
                }
            }
            .iconGroup{
                position: absolute;
                top: 164px;
                left:50%;
                -webkit-transform: translateX(-50%) translateY(200px);
                span{
                    display: inline-block;
                    @include set-width-height(10px,10px);
                    border-radius: 50%;
                    background-color: #8d888f;
                    margin-right:15px;
                }
                .light_active{
                    @include set-width-height(33px,10px);
                    background-color: #d8d854;
                    border-radius: 5px;
                }
            }
        }
    }
</style>