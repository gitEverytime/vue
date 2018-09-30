<template>
    <div class="prepare bgd bg-private-bg">
        <div class="panel">
            <Title title="幸运抽奖" @leftClick="backHandler"/>
            <span class="name">幸运大抽奖</span>
            <img :src="getImgSrc" class="image">
            <span class="text">当前进入人数：{{getCount}}人</span>
            <span class="btn-create" v-on:click="startGame">开始游戏</span>
            <span class="btn-back" v-on:click="backHandler">返回</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {Title},

        data() {
            return {}
        },

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/turntable.gif'
            },

            getCount() {
                return 5
            }
        },

        mounted() {
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            startGame() {
                REQ.reqStartGame({storeId: GameInfo.storeId, gameIndex: GameInfo.gameIndex},
                    () => {
                        this.$router.replace({name: 'Playing'})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.data)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .prepare {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .name {
                color: white;
                @include font-dpr(30px);
                margin-top: 10%;
            }

            .image {
                @include set-width-height(180px, 180px);
                margin-top: 10%;
            }

            .text {
                @include font-dpr(15px);
                color: #8d888f;
                margin-top: 10%;
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 15%;
                text-align: center;
            }

            .btn-back {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 5%;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
            }
        }
    }

</style>