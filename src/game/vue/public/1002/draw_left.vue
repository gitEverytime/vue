<template>
    <div class="draw_left">
        <div class="QRcode_wrap">
            <img src="http://static.ibigtop.com/static/img/public/QRcode.png">
            <h2>扫码参与抽奖</h2>
        </div>
        <p class="join_wrap">
            当前参数人数<span>{{count}}</span>人
        </p>
        <!--<div class="start-btn" @click="beginDrawBtn">-->
            <!--开始抽奖-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        components: {

        },

        data() {
            return {
                count: '0',
            }
        },

        computed: {},

        mounted() {

        },
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';
    .draw_left{
        position: absolute;
        @include box-center-right(50%,0);
        .QRcode_wrap{
            padding:15px 17px;
            text-align: center;
            background: rgba(0,0,0,0.3);
            border-radius: 4px;
            img{
                @include set-width-height(260px,260px);
            }
            h2{
                padding: 12px 0 0;
                font-size: 24px;
                color: #FFFFFF;
                font-weight: bold;
            }
        }
        .join_wrap{
            padding: 17px 0;
            font-size: 32px;
            color: #bc5560;
            @include layout-flex-r-center;
            line-height: 40px;
            font-weight: bold;
            span{
                font-size: 53px;
                display: inline-block;
                padding: 0 15px;
                font-weight: bold;
                color: #FFFFFF;
            }
        }
        .start-btn{
            width: 208px;
            height: 60px;
            border-radius: 30px;
            margin: 30px auto 0;
            color: #FFFFFF;
            background: #00B594;
            line-height: 60px;
            text-align: center;
        }
    }
</style>