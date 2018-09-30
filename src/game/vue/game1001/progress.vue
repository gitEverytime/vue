<template>
    <div class="progress bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <span class="count">参与人数{{getCount}}人</span>
            <img class="img" :src="getImgSrc">
            <div class="time">游戏已进行：<span class="number">{{this.time}}</span>s</div>
            <span class="text">【{{this.title}}】</span>
            <div class="line" v-for="item in resultData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
            <span class="btn" @click="endGame">结束游戏</span>
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
                resultData: [],
                time: 0,
                title: '',
            }
        },

        components: {Title},

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/shake.gif'
            },

            getCount() {
                return this.$store.getters.getUserCount
            }
        },

        mounted() {
            REQ.reqGetGameResult({
                    storeId: GameInfo.storeId,
                    userId: GameInfo.cId,
                    gameIndex: GameInfo.gameIndex,
                },
                (response) => {
                    this.title = response.data.name
                    this.formatResult(response.data.reward)
                },
                (complete) => {
                },
                (err) => {
                })

            this.timer = setInterval(() => {
                this.time++;
            }, 1000)
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {

            backHandler() {
                window.history.back()
            },

            endGame() {
                REQ.reqEndGame({
                        storeId: GameInfo.storeId,
                        userId: GameInfo.cId,
                        gameIndex: GameInfo.gameIndex,
                    },
                    (response) => {
                        console.log("结束游戏response", response)
                        this.$router.replace({name: 'result'})
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            formatResult(data) {
                let resultData = []
                const levelNames = ['一等奖', '二等奖', '三等奖', '幸运奖']
                data.forEach((item, idx) => {
                    if (item.count > 0) {
                        resultData.push({
                            key: idx,
                            reward: levelNames[idx] + ':' + item.rewardDesc,
                            count: item.count
                        })
                    }
                })
                this.resultData = resultData
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .progress {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .shake {
                color: #FFFFFF;
                @include font-dpr(40px);
                margin-top: 25px;
            }

            .count {
                color: #eeeeee;
                @include font-dpr(16px);
                margin-top: 10px;
            }

            .img {
                @include set-width-height(155px, 155px);
                margin: 15px 0;
            }

            .time {
                color: #eeeeee;
                @include font-dpr(16px)

                .number {
                    color: #fff;
                    @include font-dpr(25px);
                }
            }

            .line {
                @include layout-flex-r-sb;
                width: 60%;

                span {
                    color: #ddd;
                    @include font-dpr(14px)
                }
            }

            .btn {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 10%;
                text-align: center;
            }

            .text {
                color: #eeeeee;
                @include font-dpr(14px);
                margin: 10px;
            }
        }
    }
</style>