<template>
    <div class="home bgd bg-private-bg">
        <div class="panel">
            <Title title="心心相印" @leftClick="backHandler"/>
            <div class="content">
                <img :src="getTextSrc" class="heart-text">
                <img :src="getIconSrc" class="heart-icon">
                <span class="rule-title">游戏规则</span>
                <p class="rule-text">每组2人，测一测你们俩的默契程度，每组抽取一名，自行选择伙伴，一个比划一个猜，不得说出
                    与题目一样的字眼，否则视为违规，比计入成绩。每道题目限时15s，15s内自动跳转下一题，总游戏限时2分钟，猜不出
                    可以PASS。最终以猜对题目数量判定名次。</p>
                <span class="btn-create" v-on:click="createHandler">创建活动</span>
                <span class="btn-back" v-on:click="backHandler">返回</span>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'

    export default {
        props: [],

        components: {Title},

        data() {
            return {}
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
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            createHandler() {
                this.$router.replace({name: 'Create'})
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .home {
        @include window;
        z-index: 99;

        .panel {
            @include game-panel;
            align-items: center;

            .content {
                @include content;
                @include layout-flex-c;
                align-items: center;

                .heart-text {
                    @include set-width-height(163px, 47px);
                    margin-top: 30px;
                }

                .heart-icon {
                    @include set-width-height(71px, 63px);
                    margin-top: 32px;
                }

                .rule-title {
                    @include font-dpr(17px);
                    color: #dddddd;
                    margin-top: 30px;
                }

                .rule-text {
                    text-indent: 28px;
                    @include font-dpr(14px);
                    color: #dddddd;
                    margin-top: 15px;
                    padding: 0 19px;
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
    }

</style>