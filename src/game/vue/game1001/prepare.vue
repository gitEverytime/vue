<template>
    <div class="prepare bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <img class="img" :src="getImgSrc">
            <span class="count">总参与人数：{{getCount}}人</span>
            <div class="line" v-for="item in rewardData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
            <span class="btn-create" @click="startGameHandler">开始游戏</span>
            <span class="btn-back" @click="backHandler">返回互动</span>
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
                rewardData: [],
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
                let rewardData = []
                const levelNames = ['一等奖', '二等奖', '三等奖', '幸运奖']
                data.forEach((item, idx) => {
                    if (item.count > 0) {
                        rewardData.push({
                            key: idx,
                            reward: levelNames[idx] + ':' + item.rewardDesc,
                            count: item.count
                        })
                    }
                })
                this.rewardData = rewardData
            },

            startGameHandler() {
                let leastUserCount = 0
                this.rewardData.forEach(item => {
                    leastUserCount += Number(item.count)
                })
                if (this.getCount < leastUserCount) {
                    this.$toast.center('参与人数太少')
                    return
                }
                this.startGame()
                this.$router.replace({name: 'countDown'})
            },

            startGame() {
                REQ.reqStartGame({
                        storeId: GameInfo.storeId,
                        userId: GameInfo.cId,
                        gameIndex: GameInfo.gameIndex,
                    },
                    (response) => {
                        console.log("开始游戏response", response)
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
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

            .shake {
                color: #FFFFFF;
                @include font-dpr(40px);
                margin-top: 25px;
            }

            .img {
                @include set-width-height(155px, 155px);
                margin: 15px 0;
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
                    @include font-dpr(14px);
                    line-height: 18px;
                }
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            }

            .btn-back {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 20px;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
                margin-bottom: 10px;
            }
        }
    }
</style>