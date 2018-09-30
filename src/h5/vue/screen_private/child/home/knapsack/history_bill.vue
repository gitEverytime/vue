<template>
    <div class="history-bill">
        <div class="panel">
            <Title title="历史账单" @E_LEFT_CLICK="backHandler" style="position: absolute"/>
            <div class="content">
                <div class="top bgd bg-vip-bg">
                    <span class="store">{{getStoreName}}</span>
                </div>
                <div class="item" v-for="item in dataList">
                    <div class="line">
                        <span class="left">{{item.descr}}</span>
                        <span class="right">{{getTime(item)}}</span>
                    </div>
                    <span class="money" :style="{color: item.type == 0 ? '#01B695' : '#CD533E'}">{{item.amount}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from '../../component/title.vue'
    import REQ from '../../../comm/request'
    import DateFormat from '../../../comm/date_format'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title},

        data() {
            return {
                dataList: []
            }
        },

        computed: {
            getStoreName() {
                return roomInfo.card.storeTitle
            }
        },

        mounted() {
            this.getBillList()
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            getBillList() {
                REQ.reqGetCardBillList({cardNo: roomInfo.card.no},
                    (res) => {
                        this.dataList = res.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getTime(item) {
                return DateFormat.YMDHM(item.createdAt)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .history-bill {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .top {
                    width: 100%;
                    @include set-height(155px);
                    @include layout-flex-r-center;
                    align-items: flex-end;
                    border-bottom: 1px solid #322831;

                    .store {
                        margin-bottom: 45px;
                        color: #F5F5F5;
                        @include font-dpr(16px);
                    }
                }

                .item {
                    @include set-height(75px);
                    @include layout-flex-c;
                    align-items: center;
                    border-bottom: 1px solid #322831;

                    .line {
                        @include layout-flex-r-sb;
                        align-items: center;
                        @include set-height(42px);
                        width: 100%;

                        .left {
                            @include font-dpr(15px);
                            color: #cccccc;
                            margin-left: 15px;
                        }

                        .right {
                            @include font-dpr(11px);
                            color: #8D888F;
                            margin-right: 15px;
                        }
                    }

                    .money {
                        @include font-dpr(20px);
                        color: #CD533E;
                    }
                }
            }
        }
    }
</style>