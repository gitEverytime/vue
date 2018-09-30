<template>
    <div class="input-box">
        <div class="line">
            <span>*活动名称</span>
            <input type="text" placeholder="请输入活动名称" v-model="selectData.name" maxlength="8">
        </div>

        <div class="line">
            <span>*参与方式</span>
            <div class="radio" @click="selectMode(0)">
                <div class="icon" :class="selectData.mode == 0 ? 'icon-12-14' : 'icon-12-15'"
                     style="margin-left: 10px"></div>
                <div class="scan">扫码</div>
            </div>

            <div class="radio" @click="selectMode(1)">
                <div class="icon" :class="selectData.mode == 1 ? 'icon-12-14' : 'icon-12-15'"></div>
                <div class="scan">抓取用户</div>
            </div>
        </div>

        <!--<div class="line" v-if="selectData.mode == 1">-->
            <!--<span>*抓取用户起始时间</span>-->
            <!--<input type="time" v-model="selectData.startTime">-->
        <!--</div>-->

        <!--<div class="line" v-if="selectData.mode == 1">-->
            <!--<span>*抓取用户截止时间</span>-->
            <!--<input type="time" v-model="selectData.endTime">-->
        <!--</div>-->

        <div v-for="item in domData" :key="item.key" class="content">
            <div class="line">
                <span>{{item.title}}</span>
                <input type="text" v-bind:placeholder="item.placeHolder"
                       v-model="selectData.reward[item.key].rewardDesc">
            </div>
            <div class="line">
                <span>{{item.subTitle}}</span>
                <select v-model="selectData.reward[item.key].count">
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
                    createdBy: GameInfo.cId,
                    storeId: GameInfo.storeId,
                    gameIndex: GameInfo.gameIndex,
                    name: '',
                    reward: [
                        {rewardDesc: '', count: 0, level: 1},
                        {rewardDesc: '', count: 0, level: 2},
                        {rewardDesc: '', count: 0, level: 3},
                        {rewardDesc: '', count: 0, level: 4},
                    ],
                    startTime: '',
                    endTime: '',
                    mode: 1
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
                if (!this.selectData.name) {
                    this.$toast.center('请填写活动名称')
                    return
                }
                // if (this.selectData.mode == 1) {
                //     if (!this.selectData.startTime) {
                //         this.$toast.center('请填写抓取用户起始时间')
                //         return
                //     }
                //     if (!this.selectData.endTime) {
                //         this.$toast.center('请填写抓取用户截止时间')
                //         return
                //     }
                // }
                if (!this.selectData.reward[0].rewardDesc) {
                    this.$toast.center('请填写一等奖奖品名称')
                    return
                }
                if (!this.selectData.reward[0].count) {
                    this.$toast.center('请填写一等奖获奖人数')
                    return
                }
                this.$emit('confirm', {
                    ...this.selectData,
                    startTime: +new Date() - 24 * 3600 * 1000,
                    endTime: +new Date()
                })
            },

            selectMode(mode) {
                if (mode == 0) {
                    this.$toast.center('此方式暂不支持')
                    return
                }
                this.selectData.mode = mode
            },

            getTimeStamp(time) {
                const a = new Date
                return new Date(`${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${time}`).getTime()
            }
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