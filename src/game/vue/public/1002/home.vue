<template>
    <div class="home">
        <div class="home_left">
            <div class="draw_wrap">
                <TempDrawLeft></TempDrawLeft>
            </div>
        </div>
        <div class="home-footer">
            <div class="startBtn" @click="beginDrawBtn">点击开始/Enter</div>
            <div class="copyRight">
                &copy;2018-2020&nbsp;&nbsp;毕果科技
            </div>
        </div>
    </div>
</template>

<script>
    import REQ from '../../common/request'
    import ConstValue from '../../common/const_value'
    import TempDrawLeft   from  './draw_left.vue'
    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {
            TempDrawLeft
        },

        data() {
            return {
                count: 0,
            }
        },

        computed: {},

        mounted() {

        },

        beforeDestroy() {

        },

        methods: {
            beginDrawBtn(){
                window.location.href="#/draw/page"
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';

    .home {
        @include layout-flex-c;
        align-items: center;
        position: relative;
        @include set-width-height(100%,100%);
        background-image: url(http://static.ibigtop.com/static/img/public/game/choujiangbg.webp);
        background-repeat: no-repeat;
        background-size: cover;
        .home_left{
            position: absolute;
            width: 30%;
            top: 0;
            left: 0;
            bottom: 0;
            overflow: hidden;
            .draw_wrap{
                position: relative;
                height: 100%;
                width: 100%;
                overflow: hidden;
            }
        }
        .home-footer{
            position: absolute;
            @include box-center(99%,50%);
            text-align: center;
            .startBtn{
                @include set-width-height(252px,72px);
                background: url("http://static.ibigtop.com/static/img/public/game/btn_bg.png") no-repeat;
                background-size: 100% 100%;
                text-align: center;
                line-height: 72px;
                color: #FFFFFF;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
            }
            .copyRight{
                margin-top: 5px;
                font-size: 14px;
                color: #FFFFFF;
            }
        }
    }
</style>