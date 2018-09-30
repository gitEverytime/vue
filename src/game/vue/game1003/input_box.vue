<template>
    <div class="input-box">
        <div class="line">
            <span>*每组几题</span>
            <select v-model="selectData.questionCount">
                <option v-for="i in [3,4,5,6,7,8]" v-bind:value="i" :key="i">{{i}}</option>
            </select>
        </div>

        <div v-for="item in domData" :key="item.key" class="content">
            <div class="line">
                <span>{{item.title}}</span>
                <input type="text" v-bind:placeholder="item.placeHolder" maxlength="8"
                       v-model="selectData.awards[item.key].content">
            </div>
            <div class="line">
                <span>{{item.subTitle}}</span>
                <select v-model="selectData.awards[item.key].count">
                    <option :value="0" :key="0">{{0}}</option>
                    <option v-for="i in 10" v-bind:value="i" :key="i">{{i}}</option>
                </select>
            </div>
        </div>

        <span class="btn" v-on:click="createConfirm">确定创建</span>

    </div>

</template>

<script>
    const GameInfo = window.GameInfo
    export default {
        props: [],

        data() {
            return {
                domData: [
                    {
                        key: 0,
                        title: '*一等奖',
                        subTitle: '*中奖人数',
                        placeHolder: '请输入奖品及数量',
                    },
                    {
                        key: 1,
                        title: '二等奖',
                        subTitle: '中奖人数',
                        placeHolder: '请输入奖品及数量',
                    },
                    {
                        key: 2,
                        title: '三等奖',
                        subTitle: '中奖人数',
                        placeHolder: '请输入奖品及数量',
                    },
                    {
                        key: 3,
                        title: '幸运奖',
                        subTitle: '中奖人数',
                        placeHolder: '不输入则默认没有',
                    }
                ],

                selectData: {
                    metaId: GameInfo.gameIndex,
                    storeId: GameInfo.storeId,
                    questionCount: 3,
                    awards: [
                        {content: '', count: 0, index: 1, name: '一等奖'},
                        {content: '', count: 0, index: 2, name: '二等奖'},
                        {content: '', count: 0, index: 3, name: '三等奖'},
                        {content: '', count: 0, index: 4, name: '幸运奖'},
                    ],
                }
            }
        },

        computed: {},

        mounted() {
            if (!this.isIphone()) {
                Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(item => {
                    item.onclick = () => {
                        setTimeout(() => {
                            item.scrollIntoView(false)
                        }, 600)
                    }
                })
            }
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },

            createConfirm() {
                if (!this.selectData.awards[0].content) {
                    this.$toast.center('请填写一等奖奖品名称')
                    return
                }
                if (!this.selectData.awards[0].count) {
                    this.$toast.center('请填写一等奖获奖人数')
                    return
                }
                this.$emit('confirm', this.selectData)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .input-box {
        @include layout-flex-c;
        align-items: center;
        padding: 20px;

        .line {
            @include layout-flex-r-sb;
            margin: 5px 0;
            width: 100%;
            border: 1px solid #555;
            padding: 5px 0;
            border-radius: 5px;

            span {
                @include font-dpr(15px);
                flex: 4;
                color: #ccc;
                padding: 3px 5px;
            }

            input {
                color: #aaa;
                background: transparent;
                padding: 3px 15px;
                flex: 10;
                border-color: transparent;
                @include font-dpr(15px);
            }

            input:active {
                border-color: transparent;
            }

            select {
                color: #aaa;
                background: transparent;
                padding: 3px 15px;
                flex: 10;
                border-color: transparent;
                @include font-dpr(15px);
            }

            .radio {
                @include layout-flex-r;
                align-items: center;
                flex: 5;

                .scan {
                    color: #aaa;
                    @include font-dpr(15px);
                    margin: 0 30px 0 5px;
                }
            }
        }

        .content {
            @include layout-flex-c;
            width: 100%;
        }

        .btn {
            color: #F5F5F5;
            background: #CD533E;
            margin-top: 5%;
            padding: 10px 0;
            font-size: 15px;
            border-radius: 5px;
            width: 100%;
            text-align: center;
        }
    }

</style>