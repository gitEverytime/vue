<template>
    <div class="rank bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <div style="height: 15px"></div>
            <div class="game-line" v-for="item in rewardData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
            <div style="height: 15px"></div>
            <div class="content">
                <div class="line" v-for="item in result">
                    <Imag classes="avatar" :src="item.player.avatar"/>
                    <span class="name">{{item.player.nickname}}</span>
                    <span class="right">正确{{item.right}}题</span>
                </div>
            </div>
            <span class="btn-create" v-on:click="backToInteraction">返回互动</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import Imag from '../component/Image.vue'
    import storage from './storage'
    import REQ from './request'

    export default {
        props: [],

        components: {Title, Imag},

        data() {
            return {
                rewardData: [],
                result: []
            }
        },

        computed: {},

        mounted() {
            const params = storage.getValue('params')
            this.formatRewardData(params.awards || [])
            this.getResult()
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            backToInteraction() {
                REQ.termGame({playId: storage.getValue('playId')},
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

            getResult() {
                REQ.billboard({playId: storage.getValue('playId'), sort: true},
                    (res) => {
                        this.result = res.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            formatRewardData(data) {
                let rewardData = []
                data.forEach((item, idx) => {
                    if (item.count > 0) {
                        rewardData.push({
                            key: idx,
                            reward: item.name + ' : ' + item.content,
                            count: item.count
                        })
                    }
                })
                this.rewardData = rewardData
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .rank {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .game-line {
                @include layout-flex-r-sb;
                width: 70%;

                span {
                    color: #bbb;
                    @include font-dpr(14px);
                    line-height: 18px;
                }
            }

            .content {
                @include content;

                .line {
                    @include set-height(74px);
                    width: 100%;
                    @include layout-flex-r;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 15px;

                    .avatar {
                        @include set-width-height(44px, 44px);
                        border-radius: 50%;
                    }

                    .name {
                        flex: 2;
                        @include font-dpr(15px);
                        color: #8D8890;
                        text-indent: 15px;
                    }

                    .right {
                        flex: 1;
                        @include font-dpr(15px);
                        color: #dddddd;
                        font-weight: bold;
                        text-align: right;
                    }
                }
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin: 15px 0;
                text-align: center;
            }
        }
    }
</style>