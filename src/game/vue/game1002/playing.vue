<template>
    <div class="playing bgd bg-private-bg">
        <Modal :show="modalShow" @confirm="stopPlay"/>
        <div class="panel">
            <Title title="幸运抽奖" @leftClick="backHandler"/>
            <div class="content">
                <span class="name">【{{gameName}}】</span>
                <div v-for="item in rewardData" v-if="Number(item.count) > 0" class="line">
                    <span>{{getDesc(item)}}</span>
                    <span>{{item.count}}名</span>
                </div>

                <div class="menu-line" v-if="rewardData[0] && Number(rewardData[0].count) > 0">
                    <span class="left">抽取一等奖</span>
                    <div class="btn-cover">
                        <span class="btn" :class="{'btn-active': count[0].left}"
                              @click="playGame(rewardData[0].level, 1, count[0].left)">单个抽取</span>
                        <span class="btn" :class="{'btn-active': count[0].left}"
                              @click="playGame(rewardData[0].level, count[0].left, count[0].left)">一次性抽取</span>
                    </div>
                </div>
                <div class="result-line">
                    <div class="item" v-for="item in result[0].winners">
                        <Imag :src="item.headimg"/>
                        <span>{{item.nickname}}</span>
                    </div>
                </div>

                <div class="menu-line" v-if="rewardData[1] && Number(rewardData[1].count) > 0">
                    <span class="left">抽取二等奖</span>
                    <div class="btn-cover">
                        <span class="btn" :class="{'btn-active': count[1].left}"
                              @click="playGame(rewardData[1].level, 1, count[1].left)">单个抽取</span>
                        <span class="btn" :class="{'btn-active': count[1].left}"
                              @click="playGame(rewardData[1].level, count[1].left, count[1].left)">一次性抽取</span>
                    </div>
                </div>
                <div class="result-line">
                    <div class="item" v-for="item in result[1].winners">
                        <Imag :src="item.headimg"/>
                        <span>{{item.nickname}}</span>
                    </div>
                </div>

                <div class="menu-line" v-if="rewardData[2] && Number(rewardData[2].count) > 0">
                    <span class="left">抽取三等奖</span>
                    <div class="btn-cover">
                        <span class="btn" :class="{'btn-active': count[2].left}"
                              @click="playGame(rewardData[2].level, 1, count[2].left)">单个抽取</span>
                        <span class="btn" :class="{'btn-active': count[2].left}"
                              @click="playGame(rewardData[2].level, count[2].left, count[2].left)">一次性抽取</span>
                    </div>
                </div>
                <div class="result-line">
                    <div class="item" v-for="item in result[2].winners">
                        <Imag :src="item.headimg"/>
                        <span>{{item.nickname}}</span>
                    </div>
                </div>

                <div class="menu-line" v-if="rewardData[3] && Number(rewardData[3].count) > 0">
                    <span class="left">抽取幸运奖</span>
                    <div class="btn-cover">
                        <span class="btn" :class="{'btn-active': count[3].left}"
                              @click="playGame(rewardData[3].level, 1, count[3].left)">单个抽取</span>
                        <span class="btn" :class="{'btn-active': count[3].left}"
                              @click="playGame(rewardData[3].level, count[3].left, count[3].left)">一次性抽取</span>
                    </div>
                </div>
                <div class="lucky" v-if="luckText">{{luckText}}</div>

                <span class="back" v-on:click="backHandler">返回互动</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import Imag from "../component/Image.vue"
    import Modal from "./modal.vue"

    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {Title, Imag, Modal},

        data() {
            return {
                rewardData: [],
                gameName: '',
                count: [
                    {left: 0},
                    {left: 0},
                    {left: 0},
                    {left: 0},
                ],
                result: [
                    {winners: []},
                    {winners: []},
                    {winners: []},
                    {winners: []},
                ],
                luckText: '',
                modalShow: false,
                params: {},
            }
        },

        computed: {},

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

            getDesc(item) {
                const levels = {1: '一等奖：', 2: '二等奖：', 3: '三等奖：', 4: '幸运奖：'}
                return levels[item.level] + item.rewardDesc
            },

            getRewardData() {
                const params = {
                    storeId: GameInfo.storeId,
                    gameIndex: GameInfo.gameIndex,
                    play: {
                        action: 'rewards'
                    }
                }
                REQ.reqGamePlay(params,
                    (res) => {
                        this.rewardData = res.data.reward
                        this.rewardData.forEach((item, key) => {
                            this.count[key].left = Number(item.count)
                        })
                        this.gameName = res.data.name
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            playGame(level, count, canPress) {
                if (!canPress) {
                    return
                }

                const param = {
                    storeId: GameInfo.storeId,
                    gameIndex: GameInfo.gameIndex,
                    play: {
                        action: 'lottoStart',
                        data: {level, count}
                    }
                }

                REQ.reqGamePlay(param,
                    () => {
                        this.modalShow = true
                        this.params = {
                            storeId: GameInfo.storeId,
                            gameIndex: GameInfo.gameIndex,
                            play: {
                                action: 'lotto',
                                data: {level, count}
                            }
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            stopPlay() {
                REQ.reqGamePlay(this.params,
                    (res) => {
                        res.data.count.forEach((item, index) => {
                            this.count[index].left = Number(item.left)
                        })
                        this.getGameResult()
                        this.modalShow = false
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getGameResult() {
                const params = {
                    storeId: GameInfo.storeId,
                    gameIndex: GameInfo.gameIndex,
                }
                REQ.reqGetGameResult(params,
                    (res) => {
                        this.result = res.data
                        const textArray = []
                        res.data[3].winners.forEach(item => {
                            textArray.push(item.nickname)
                        })
                        this.luckText = textArray.join('、')
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .playing {
        @include window;

        .panel {
            @include game-panel;

            .content {
                @include content;

                .name {
                    color: #DDDDDD;
                    @include font-dpr(15px);
                    text-align: center;
                    padding: 15px 0;
                    @include layout-flex-r-center;
                    align-items: center;
                }

                .line {
                    padding: 3px 20%;
                    @include layout-flex-r-sb;
                    align-items: center;

                    span {
                        color: #9B989C;
                        @include font-dpr(15px);
                    }
                }

                .menu-line {
                    @include set-height(84px);
                    padding: 0 15px;
                    @include layout-flex-r-sb;
                    align-items: center;
                    background: rgba(50, 49, 49, 0.7);
                    margin-top: 15px;

                    .left {
                        @include font-dpr(15px);
                        color: #F5F5F5;
                    }

                    .btn-cover {
                        @include layout-flex-r;
                        align-items: center;

                        .btn {
                            color: #69636B;
                            background: #392E38;
                            padding: 10px 15px;
                            border-radius: 4px;
                            @include font-dpr(15px);
                            margin-left: 15px;
                        }

                        .btn-active {
                            color: #F5F5F5;
                            background: #CD533E;
                        }

                    }
                }

                .result-line {
                    @include layout-flex-r-wrap;
                    background: #322831;

                    .item {
                        width: 20%;
                        @include layout-flex-c;
                        align-items: center;

                        img {
                            @include set-width-height(44px, 44px);
                            border-radius: 50%;
                            margin-top: 15px;
                        }

                        span {
                            color: #8D888F;
                            @include font-dpr(15px);
                            margin-bottom: 15px;
                            margin-top: 5px;
                            text-align: center;
                        }
                    }
                }

                .lucky {
                    background: #322831;
                    padding: 15px;
                    color: #8D888F;
                    @include font-dpr(14px);
                    word-wrap: break-word;
                    word-break: break-all;
                    margin-bottom: 30px;
                }

                .back {
                    @include layout-flex-r-center;
                    color: #F5F5F5;
                    background: #CD533E;
                    margin-top: 5%;
                    margin-bottom: 15px;
                    padding: 10px 0;
                    font-size: 15px;
                    border-radius: 5px;
                    width: 90%;
                    margin-left: 5%;
                    text-align: center;
                }
            }
        }
    }

</style>