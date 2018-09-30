<template>
    <div class="right_box">
        <div class="reward">
            <ul class="scrollWrap">
                <!--      动画DOM添加区域         -->
            </ul>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ScrollControl  from '../../comm/scroll_control.js'
    export default {
        components:{},
        data(){
            return{}
        },
        computed:{},
        created(){
            let _this = this;
            ScrollControl.start(_this.$root.notify, $(".scrollWrap"));       //    进入轮播渲染脚本
        },
        mounted(){},
        methods:{}
    }
</script>

<style lang='scss' >
    @import '../../../../../style/sass/mixin.scss';

    $h_53:53px;
    .right_box{
        height: 100%;
        position:relative;
        .reward{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            width: 700px;
            z-index: 10;
            p{
                font-size: 22px;
                color: #FFFFFF;
                span{
                    display: inline-block; float: left;
                }
                label{
                    display: inline-block; float: right;
                }
                .sex{
                    display: none;
                }
            }
        }
        .scrollWrap{
            background: transparent !important;
            position: relative;
            height: 100% !important;
        }
        .scrollWrap {
            li{
                margin-bottom: 20px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                position:absolute;
                color: #FFFFFF;
                /*background: #201720;*/
                .head_img{
                    border-radius: 50%;
                    position: absolute;
                }
                p{
                    .cname{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            li:nth-last-child(8){
                top:-67px;
                right: 0;
                width:284px;
                height:88px;
                background:rgba(34,24,33,0.2);
                opacity:0.2;
                .head_img{
                    @include set-width-height(57px,57px);
                    margin-top: 16px;
                    margin-left: -29px;
                }
                p{
                    padding-left: 41px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 16px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(9px,15px);
                    }
                    .good{

                        @include set-width-height(15px,15px);
                    }
                    .cname{width: 100px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 16px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 21px;
                    padding-bottom: 11px;
                }
            }
            li:nth-last-child(7){
                top:41px;
                right: 0;
                width:355px;
                height:110px;
                background:rgba(34,24,33,0.3);
                opacity:0.3;
                .head_img{
                    @include set-width-height(71px,71px);
                    margin-top:21px;
                    margin-left:-35.5px;
                }
                p{
                    padding-left: 52px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 19px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(13px,19px);
                    }
                    .good{

                        @include set-width-height(19px,19px);
                    }
                    .cname{width: 120px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 19px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 25px;
                    padding-bottom: 17px;
                }
            }
            li:nth-last-child(6){
                top:171px;
                right: 0;
                width:440px;
                height:136px;
                background:rgba(34,24,33,0.7);
                opacity:0.7;
                .head_img{
                    @include set-width-height(88px,88px);
                    margin-top:24px;
                    margin-left:-44px;
                }
                p{
                    padding-left: 64px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 24px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(16px,24px);
                    }
                    .good{

                        @include set-width-height(24px,24px);
                    }
                    .cname{width: 170px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 24px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 32px;
                    padding-bottom: 20px;
                }
            }
            li:nth-last-child(5){
                top:327px;
                right: 0;
                width:550px;
                height:170px;
                background: rgba(32,23,32,0.7);
                .head_img{
                    @include set-width-height(110px,110px);
                    margin-top:30px;
                    margin-left:-55px;
                }
                p{
                    padding-left: 80px;
                    padding-right: 12px;
                    color: #FFFFFF;
                    font-size: 30px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(20px,30px);
                    }
                    .good{

                        @include set-width-height(30px,30px);
                    }
                    .cname{width: 220px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 30px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 40px;
                    padding-bottom: 27px;
                }
            }
            li:nth-last-child(4){
                top:517px;
                right: 0;
                width:440px;
                height:136px;
                background:rgba(34,24,33,0.7);
                opacity:0.7;
                .head_img{
                    @include set-width-height(88px,88px);
                    margin-top:24px;
                    margin-left:-44px;
                }
                p{
                    padding-left: 64px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 24px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(16px,24px);
                    }
                    .good{

                        @include set-width-height(24px,24px);
                    }
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .cname{width: 170px}
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 24px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 32px;
                    padding-bottom: 20px;
                }
            }
            li:nth-last-child(3){
                top:673px;
                right: 0;
                width:355px;
                height:110px;
                background:rgba(34,24,33,0.3);
                opacity:0.3;
                .head_img{
                    @include set-width-height(71px,71px);
                    margin-top:21px;
                    margin-left:-35.5px;
                }
                p{
                    padding-left: 52px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 19px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(13px,19px);
                    }
                    .good{

                        @include set-width-height(19px,19px);
                    }
                    .cname{width: 120px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 19px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 25px;
                    padding-bottom: 17px;
                }

            }
            li:nth-last-child(2){
                top:803px;
                right: 0;
                width:284px;
                height:88px;
                background:rgba(34,24,33,0.2);
                opacity:0.2;
                .head_img{
                    @include set-width-height(57px,57px);
                    margin-top: 16px;
                    margin-left: -29px;
                }
                p{
                    padding-left: 41px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 16px;
                    overflow: hidden;
                    .sex{
                        @include set-width-height(9px,15px);
                    }
                    .good{

                        @include set-width-height(15px,15px);
                    }
                    .cname{width: 100px}
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .date{
                        flex: 1;
                        text-align: right;
                        font-size: 16px;
                    }
                }
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    padding-top: 21px;
                    padding-bottom: 11px;
                }
            }
            li:nth-last-child(1){
                top:911px;
                right: 0;
                width:227px;
                height:70px;
                background:rgba(34,24,33,1);
                opacity:0.2;
                display: none;
                .head_img{
                    @include set-width-height(30px,30px);
                    margin-top:13px;
                    margin-left:-15px;
                }
                p{
                    padding-left: 23px;
                    padding-right: 12px;
                    color: #8d888f;
                    font-size: 9.15px;
                    overflow: hidden;
                    .sex{
                        margin-top: 3px;
                        @include set-width-height(8px,11px);

                    }
                    .good{
                        margin-top: 1px;
                        @include set-width-height(11px,11px);
                    }
                    .cname{
                        width: 50px;
                        overflow: hidden;/*超出部分隐藏*/
                        white-space: nowrap;/*不换行*/
                        text-overflow:ellipsis;/*超出部分文字以...显示*/
                    }
                    .cname,.G_num,.H_num{
                        margin-left: 10px;
                    }
                    .H_num{
                        font-size: 7px;
                    }
                }
                p:nth-of-type(1){
                    padding-top: 10px;
                    padding-bottom: 7px;
                }
            }
        }
        .iconGood{
            background: url("http://static.ibigtop.com/static/img/icon/icon_good_on.png") no-repeat top center;
            background-size: 100% 100%;
        }
        .iconMan{
            background: url("http://static.ibigtop.com/static/img/icon/icon_man.png") no-repeat top center;
            background-size: 100% 100%;
        }
        .iconWoman{
            background: url("http://static.ibigtop.com/static/img/icon/icon_woman.png") no-repeat top center;
            background-size: 100% 100%;
        }
        .reward_msg{
            position: relative;
            height: 100%;
        }
    }
</style>