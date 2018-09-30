<template>
    <div class="prepare bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <img :src="getTextSrc" class="heart-text">
            <img :src="getIconSrc" class="heart-icon">
            <span class="count">当前进入人数：{{count}}人</span>
            <span class="number">本轮游戏每组进行{{number}}道题</span>
            <div class="line" v-for="item in rewardData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
            <span class="btn-create" v-on:click="getFirstOne">抽取第一位</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from './request'
    import storage from './storage'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {Title},

        data() {
            return {
                count: 0,
                rewardData: [],
                number: 0,
            }
        },

        computed: {
            getTextSrc() {
                return REQ.apiStaticDomain + '/static/img/new/heart-text.png'
            },

            getIconSrc() {
                return REQ.apiStaticDomain + '/static/img/new/double-heart.png'
            },
        },

        mounted() {
            const params = storage.getValue('params')
            this.formatRewardData(params.awards || [])
            this.number = params.questionCount
            this.$root.notify.$on("user-join", count => {
                this.count = count
            })
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            getFirstOne() {
                if(!this.count) {
                    this.$toast.center('当前无人参与，无法抽取玩家！')
                    return
                }
                this.$router.replace({name: 'SelectGroup'})
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

    .prepare {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .heart-text {
                @include set-width-height(163px, 47px);
                margin-top: 30px;
            }

            .heart-icon {
                @include set-width-height(71px, 63px);
                margin-top: 32px;
            }

            .count {
                @include font-dpr(17px);
                color: #dddddd;
                margin-top: 28px;
            }

            .number {
                @include font-dpr(15px);
                color: #dddddd;
                margin: 15px 0;
                font-weight: bold;
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
                margin-top: 10%;
                text-align: center;
            }
        }
    }

</style>