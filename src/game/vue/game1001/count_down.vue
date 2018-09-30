<template>
    <div class="count-down bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <span class="time">{{this.time}}</span>
            <span class="count">总参与人数：{{this.count}}人</span>
            <div class="line" v-for="item in resultData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
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
                count: 0,
                time: 5,
            }
        },

        components: {Title},

        computed: {},

        mounted() {
            this.countDown()
            this.getUserCount()
            this.getRewardData()
        },

        methods: {
            backHandler() {
                const params = {
                    storeId: GameInfo.storeId,
                    gameIndex: GameInfo.gameIndex,
                }
                REQ.reqGameBack(params,
                    () => {
                        this.$router.back()
                    },
                    (complete) => {
                    },
                    () => {
                        this.$router.back()
                    }
                )
            },

            countDown() {
                this.timer = setInterval(() => {
                    this.time--;
                    if (this.time === 0) {
                        clearInterval(this.timer)
                        this.$router.replace({name: 'progress'})
                    }
                }, 1000)
            },

            getUserCount() {
                REQ.reqGetUserCount({
                        gameIndex: GameInfo.gameIndex,
                        storeId: GameInfo.storeId
                    },
                    (response) => {
                        this.count = response.data.count || 0
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            getRewardData() {
                REQ.reqGetRewardData({
                        gameIndex: GameInfo.gameIndex,
                        storeId: GameInfo.storeId
                    },
                    (response) => {
                        this.formatRewardData(response.data.reward || [])
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            formatRewardData(data) {
                let resultData = []
                const levelNames = ['一等奖', '二等奖', '三等奖', '幸运奖']
                data.forEach((item, idx) => {
                    if (item.count > 0) {
                        resultData.push({
                            key: idx,
                            reward: levelNames[idx] + '：' + item.rewardDesc,
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

    .count-down {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .shake {
                color: #FFFFFF;
                @include font-dpr(40px);
                margin-top: 25px;
            }

            .time {
                color: #FFFFFF;
                @include font-dpr(60px);
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border: 3px solid #fff;
                padding: 10px;
                border-radius: 50%;
                margin: 10%;
            }

            .count {
                color: #eeeeee;
                @include font-dpr(16px);
                margin: 15px 0;
            }

            .line {
                @include layout-flex-r-sb;
                width: 70%;

                span {
                    color: #bbb;
                    @include font-dpr(14px)
                }
            }
        }
    }

</style>