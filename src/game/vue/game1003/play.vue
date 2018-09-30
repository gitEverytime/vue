<template>
    <div class="play bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <div class="top">
                <span class="order">{{type}}——第 {{index + 1}} 题</span>
                <span class="group">第{{getGroup}}组</span>
            </div>
            <Imag :src="avatar" classes="avatar"/>
            <span class="name">{{name}}</span>
            <span class="subject">{{question}}</span>
            <span class="time">还剩：{{time}}s</span>
            <span class="right">已回答对{{rightCount}}道题</span>
            <span class="btn-create" v-on:click="getQuestion(false, true)">回答正确</span>
            <span class="btn-back" v-on:click="getQuestion(false, false)">过</span>
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
                timeInterval: 15,
                time: 0,
                avatar: '',
                name: '',
                rightCount: 0,
                index: 0,
                question: '',
                type: '',
                allCount: 0,

            }
        },

        computed: {
            getGroup() {
                const text = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
                    '十一', '十二', '十三', '十四', '十五', '十六','十七','十八','十九','二十']
                const user = storage.getValue('user')
                this.type = storage.getValue('type')
                this.avatar = user.avatar
                this.name = user.nickname
                return text[user.index]
            }
        },

        mounted() {
            this.getQuestion(true)
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            getQuestion(firstQuestion, rightOrNot) {
                const params = {
                    playId: storage.getValue('playId')
                }
                if (!firstQuestion) {
                    params.lastAnswer = rightOrNot
                }
                REQ.nextQuestion(params,
                    (res) => {
                        const data = res.data
                        this.index = data.index
                        this.question = data.question
                        this.rightCount = data.right
                        this.allCount = data.count
                        if (data.index === data.count) {
                            clearInterval(this.timer)
                            this.$router.replace({name: 'Rank'})
                        } else {
                            this.setTimer()
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            setTimer() {
                clearInterval(this.timer)
                this.time = this.timeInterval
                this.timer = setInterval(() => {
                    this.time --
                    if (this.time === 0) {
                        clearInterval(this.timer)
                        this.getQuestion(false, false)
                    }
                }, 1000)
            }
        },
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .play {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .top {
                @include layout-flex-r-sb;
                width: 100%;
                box-sizing: border-box;
                padding: 0 25px;
                margin-top: 15px;

                .order {
                    @include font-dpr(15px);
                    color: #dddddd;
                    font-weight: bold;
                }

                .group {
                    @include font-dpr(15px);
                    color: #dddddd;
                    font-weight: bold;
                }
            }

            .avatar {
                @include set-width-height(60px, 60px);
                border-radius: 50%;
                margin-top: 20px;
            }

            .name {
                @include font-dpr(15px);
                color: #8D8890;
                margin-top: 12px;
            }

            .subject {
                @include font-dpr(70px);
                color: #dddddd;
                font-weight: bold;
                margin-top: 30px;
            }

            .time {
                @include font-dpr(15px);
                color: #dddddd;
                margin-top: 15px;
            }

            .right {
                @include font-dpr(15px);
                color: #dddddd;
                margin-top: 15px;
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 5%;
                text-align: center;
            }

            .btn-back {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin: 5% 0;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
            }
        }
    }
</style>