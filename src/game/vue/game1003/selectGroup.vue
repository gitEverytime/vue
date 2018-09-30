<template>
    <div class="select-group bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <span class="group">第{{getGroup}}组</span>
            <Imag :src="avatar" classes="avatar"/>
            <span class="name">{{name}}</span>
            <div class="group-list">
                <span class="item" v-for="item in firstLine" @click="clickItem(item)">{{item.name}}</span>
            </div>
            <div class="group-list">
                <span class="item" v-for="item in secondLine" @click="clickItem(item)">{{item.name}}</span>
            </div>
            <span class="btn-back" v-on:click="drawPlayer">重新抽取</span>
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
                avatar: '',
                name: '',
                index: 0,
                firstLine: [
                    {name: '电器', type: 0},
                    {name: '动物', type: 1},
                    {name: '食物', type: 2},
                ],
                secondLine: [
                    {name: '动作', type: 3},
                    {name: '日用品', type: 4},
                    {name: '动漫人物', type: 5},
                ]
            }
        },

        computed: {
            getGroup() {
                const text = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
                    '十一', '十二', '十三', '十四', '十五', '十六','十七','十八','十九','二十']
                return text[this.index]
            }
        },

        mounted() {
            this.drawPlayer()
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            drawPlayer() {
                REQ.drawPlayer({playId: storage.getValue('playId')},
                    (res) => {
                        const data = res.data
                        this.avatar = data.avatar
                        this.name = data.nickname
                        this.index = data.index
                        storage.setValue('user', data)
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            clickItem(item) {
                const params = {
                    playId: storage.getValue('playId'),
                    questionType: item.type
                }
                REQ.setQuestionType(params,
                    () => {
                        this.$router.replace({name: 'Play'})
                        storage.setValue("type", item.name)
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .select-group {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .group {
                @include font-dpr(15px);
                color: #dddddd;
                margin-top: 15px;
                width: 100%;
                padding-right: 30px;
                text-align: right;
            }

            .avatar {
                @include set-width-height(120px, 120px);
                border-radius: 50%;
                margin-top: 25px;
            }

            .name {
                @include font-dpr(15px);
                color: #8D8890;
                margin-top: 15px;
                margin-bottom: 35px;
            }

            .group-list {
                @include layout-flex-r;
                padding: 0 8px;
                width: 100%;
                box-sizing: border-box;

                .item {
                    flex: 1;
                    box-sizing: border-box;
                    margin: 8px;
                    padding: 8px 0;
                    @include font-dpr(17px);
                    font-weight: bold;
                    color: #dddddd;
                    background: #174648;
                    border-radius: 5px;
                    @include layout-flex-c-center;
                    align-items: center;
                }
            }

            .btn-back {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 5%;
                text-align: center;
            }
        }
    }
</style>