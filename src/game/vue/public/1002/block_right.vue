<template>
    <div class="block_right">
        <h2 class="title" v-if="pageType === 1">获奖名单</h2>
        <TempAwardList v-if="pageType === 1"
                       :getList="getList"
                       :info="info"
        ></TempAwardList>

        <div class="ongoing" v-if="pageType === 2">
            <span class="title">{{levelName + ': '+ rewardDesc}}</span>
            <span class="title">中奖人数: {{ count + '人'}}</span>
            <img src="http://static.ibigtop.com/static/img/public/game/award-head.gif">
        </div>

        <div class="result" v-if="pageType === 3">
            <span class="title">{{levelName + ': '+ rewardDesc + ' '}}</span>
            <div class="people animated bounceInDown" v-for="(item, index) in winners" v-if="index === currWinnerIndex">
                <img :src="item.headimg">
                <span>{{item.nickname}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import TempAwardList from './award_list.vue'
    import REQ from '../../common/request'

    const roomInfo = window.GameInfo

    export default {
        components: {
            TempAwardList
        },
        props: {
            setActive: {
                type: String
            },
            winList: {
                type: Array
            },
            info: {
                type: Array
            }
        },
        data() {
            return {
                getList: [],
                active: this.setActive,
                pageType: 1,
                rewardDesc: '', // 奖品名称
                levelName: '',  //奖项等级名称
                winners: [],    //当前抽取批次中奖人
                count: '',      //当前抽取奖品的人数
                currWinnerIndex: 0 //当前展示中奖用户的index
            }
        },
        watch: {
            setActive(val) {
                this.active = val;
            },
            winList(val) {
                this.getList = val
            }
        },
        mounted() {
            this.$root.notify.$on("LOTTO_START", (data) => {
                this.pageType = 2
                const levelNames = {
                    1: '一等奖',
                    2: '二等奖',
                    3: '三等奖',
                    4: '幸运奖',
                }
                this.rewardDesc = data.reward.rewardDesc
                this.levelName = levelNames[data.level]
                this.count = data.count
            })

            this.$root.notify.$on("LOTTO_SYNC", (data) => {
                this.winners = data.winners
                if (this.winners.length) {
                    this.pageType = 3
                    const timer = setInterval(() => {
                        this.currWinnerIndex++
                        if (this.currWinnerIndex > this.winners.length - 1) {
                            clearInterval(timer)
                            this.currWinnerIndex = 0
                            this.pageType = 1
                            this.playGame()
                        }
                    }, 3000)
                } else {
                    this.pageType = 1
                    this.playGame()
                }
            })
        },
        methods: {
            playGame() {
                let _this = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    gameIndex: roomInfo.gameIndex,
                };
                REQ.reqGetGameResult(posData,
                    function (result) {
                        let winners = result.data;
                        _this.winnersItem(winners);
                    },
                    function (data) {
                    },
                    function (data) {
                        //todo error
                    }
                );
            },
            /**
             * 拿到获奖的item
             */
            winnersItem(winners) {
                let _this = this;
                let array = [];
                winners.forEach((item) => {
                    if (item.winners.length > 0) {
                        let level = item.level;
                        switch (level) {
                            case 1:
                                item.winners.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '一等奖';
                                    array.push(col)
                                });
                                break;
                            case 2:
                                item.winners.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '二等奖';
                                    array.push(col)
                                });
                                break;
                            case 3:
                                item.winners.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '三等奖';
                                    array.push(col)
                                });
                                break;
                            case 4:
                                item.winners.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '幸运奖';
                                    array.push(col)
                                });
                                break;
                        }
                    }
                })
                _this.$store.commit('setWinners', array)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';

    .block_right {
        @include layout-flex-c-center;
        .title {
            color: rgba(254, 243, 205, 1);
            padding-top: 50px;
            font-size: 30px;
        }

        .ongoing {
            @include layout-flex-c;
            align-items: center;

            img {
                margin-top: 15%;
            }
        }

        .result {
            @include layout-flex-c;
            align-items: center;

            .people {
                @include layout-flex-c;
                align-items: center;

                img {
                    @include set-width-height(150px, 150px);
                    border-radius: 50%;
                    margin-top: 50%;
                }

                span {
                    font-size: 30px;
                    color: #e3d37c;
                    margin-top: 20px;
                }
            }

            @-webkit-keyframes bounceInDown {
                from,
                60%,
                75%,
                90%,
                to {
                    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                }

                0% {
                    opacity: 0;
                    -webkit-transform: translate3d(0, -3000px, 0);
                    transform: translate3d(0, -3000px, 0);
                }

                60% {
                    opacity: 1;
                    -webkit-transform: translate3d(0, 25px, 0);
                    transform: translate3d(0, 25px, 0);
                }

                75% {
                    -webkit-transform: translate3d(0, -10px, 0);
                    transform: translate3d(0, -10px, 0);
                }

                90% {
                    -webkit-transform: translate3d(0, 5px, 0);
                    transform: translate3d(0, 5px, 0);
                }

                to {
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                }
            }

            @keyframes bounceInDown {
                from,
                60%,
                75%,
                90%,
                to {
                    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                }

                0% {
                    opacity: 0;
                    -webkit-transform: translate3d(0, -3000px, 0);
                    transform: translate3d(0, -3000px, 0);
                }

                60% {
                    opacity: 1;
                    -webkit-transform: translate3d(0, 25px, 0);
                    transform: translate3d(0, 25px, 0);
                }

                75% {
                    -webkit-transform: translate3d(0, -10px, 0);
                    transform: translate3d(0, -10px, 0);
                }

                90% {
                    -webkit-transform: translate3d(0, 5px, 0);
                    transform: translate3d(0, 5px, 0);
                }

                to {
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                }
            }

            .bounceInDown {
                -webkit-animation-name: bounceInDown;
                animation-name: bounceInDown;
            }

            .animated {
                -webkit-animation-duration: 1s;
                animation-duration: 1s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
            }
        }
    }

</style>