<template>
    <div class="prepare-player bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <img class="img" :src="getImgSrc">
            <p class="no-start">活动未开始</p>
            <p class="wait">请等待主持人开启游戏</p>
            <span class="btn" @click="backHandler">返回</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        data() {
            return {
                state: '',
                rewardData: [],
            }
        },

        components: {Title},

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/shake.gif'
            }
        },

        mounted() {
            this.$root.notify.$on("START_GAME", () => {
                this.$router.replace({name: 'countDownPlayer'})
            })
        },

        methods: {
            backHandler() {
                window.history.back()
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .prepare-player {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .shake {
                color: #FFFFFF;
                @include font-dpr(40px);
                margin-top: 36px;
            }

            .img {
                @include set-width-height(155px, 155px);
                margin: 20px 0;
            }

            .no-start {
                color: #eeeeee;
                @include font-dpr(25px);
                margin-top: 20%;
            }

            .wait {
                color: #eeeeee;
                margin-top: 8px;
                @include font-dpr(16px)
            }

            .btn {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 5%;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
                margin-bottom: 30px;
            }
        }
    }
</style>