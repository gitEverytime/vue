<template>
    <div class="rank bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <div class="content">
                <div class="line" v-for="item in result">
                    <span class="group">第{{getGroup(item.index)}}组</span>
                    <Imag classes="avatar" :src="item.player.avatar"/>
                    <span class="name">{{item.player.nickname}}</span>
                    <span class="right">正确{{item.right}}题</span>
                </div>
            </div>
            <span class="btn-create" v-on:click="getNextOne">抽取下一位</span>
            <span class="btn-back" v-on:click="endGame">游戏结束</span>
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
                result: []
            }
        },

        computed: {
        },

        mounted() {
            this.getResult()
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            getGroup(index) {
                const text = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
                    '十一', '十二', '十三', '十四', '十五', '十六','十七','十八','十九','二十']
                return text[index]
            },

            getResult() {
                REQ.billboard({playId: storage.getValue('playId'), sort: false},
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

            getNextOne() {
                const user = storage.getValue('user')
                if (user.left === 0) {
                    this.$toast.center('没有更多参与的玩家了！')
                    return
                }
                this.$router.replace({name: 'SelectGroup'})
            },

            endGame() {
                this.$router.replace({name: 'Result'})
            }
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

            .content {
                @include content;

                .line {
                    @include set-height(74px);
                    width: 100%;
                    @include layout-flex-r;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 15px;

                    .group {
                        flex: 1;
                        @include font-dpr(15px);
                        color: #dddddd;
                    }

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
                margin-top: 15px;
                text-align: center;
            }

            .btn-back {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin: 15px 0;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
            }
        }
    }
</style>