<template>
    <div class="result bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <div class="content">
                <p class="top-title">【{{title}}】最终排名</p>
                <p class="number">总参与人数：{{getCount}}人</p>
                <div class="line" v-for="item in resultData" :key="item.key">
                    <span>{{item.reward}}</span>
                    <div class="user-content">
                        <TempUserItem class="user-item" v-for="user in item.userList"
                                      v-bind="user"
                                      :key="Date.now() * Math.random()"></TempUserItem>
                    </div>
                </div>
                <div class="luck" v-if="luckGift.content">
                    <span class="luck-name">{{luckGift.title}}</span>
                    <span class="luck-content">{{luckGift.content}}</span>
                </div>
            </div>
            <span class="btn" @click="backHandler">返回互动</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import TempUserItem from './user_item.vue'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        data() {
            return {
                resultData: [],
                title: '',
                luckGift: {
                    title: '',
                    content: ''
                },
            }
        },

        components: {Title, TempUserItem},

        computed: {
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

        },

        beforeDestroy() {
            clearInterval(this.timer)
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

            formatResult(data) {
                let resultData = []
                const levelNames = ['一等奖', '二等奖', '三等奖']
                data.forEach((item, idx) => {
                    if (item.count > 0 && idx < 3) {
                        resultData.push({
                            key: idx,
                            reward: levelNames[idx] + ' ' + item.rewardDesc,
                            count: item.count,
                            userList: item.userList
                        })
                    }
                })
                this.resultData = resultData

                if (data[3].count > 0) {
                    const gift = data[3]
                    this.luckGift.title = '幸运奖 ' + gift.rewardDesc
                    let content = []
                    gift.userList.forEach(item => {
                        content.push(item.userName)
                    })
                    this.luckGift.content = content.join('、')
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .result {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .content {
                flex: 1;
                width: 100%;
                @include layout-flex-c;
                align-items: center;
                overflow-y: scroll;

                .top-title {
                    color: #eeeeee;
                    @include font-dpr(16px);
                    margin-top: 15px;
                }

                .number {
                    color: #bbbbbb;
                    margin: 10px 0 20px 0;
                }

                .line {
                    @include layout-flex-c;
                    margin: 5px;
                    width: 85%;
                    border-bottom: 1px solid #333;

                    span {
                        color: #eee;
                        @include font-dpr(16px)
                    }

                    .user-content {
                        @include layout-flex-r-wrap;
                        margin: 8px 0;

                        .user-item {
                            width: 33%;
                        }
                    }
                }

                .luck {
                    @include layout-flex-c;
                    margin: 5px;
                    width: 85%;

                    .luck-name {
                        color: #eee;
                        @include font-dpr(16px)
                    }

                    .luck-content {
                        @include font-dpr(14px);
                        color: #ddd;
                        font-size: 14px;
                        margin: 5px 0;
                    }
                }
            }

            .btn {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                text-align: center;
                margin: 20px 0;
            }
        }
    }
</style>