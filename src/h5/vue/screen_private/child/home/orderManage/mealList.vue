<template>
    <div class="meal-list">
        <div v-if="dataList.length">
            <div class="item" v-for="item in dataList" @click="goToDetailPage(item.id)">
                <div class="top">
                    <span class="name">{{item.storeName}}</span>
                    <span class="icon icon-arrow-more"></span>
                </div>
                <div class="center">
                    <span class="price">￥{{Number(item.price).toFixed(2)}}</span>
                    <span class="time">{{getOrderTime(item.closedAt)}}</span>
                </div>
                <span class="bottom">订单完成</span>
                <span class="left-circle"></span>
                <span class="right-circle"></span>
            </div>
        </div>
        <div v-if="!dataList.length" class="no-data">
            <span class="history-no bgd bg-history-no"></span>
            <span class="no-text">您还没有点过餐哦~</span>
        </div>
    </div>

</template>

<script>
    import REQ from '../../../comm/request'
    import DateFormat from '../../../comm/date_format'

    const roomInfo = window.RINFO

    export default {
        props: [],

        data() {
            return {
                dataList: []
            }
        },

        computed: {},

        mounted() {
            this.getHistoryData()
        },

        methods: {
            getHistoryData() {
                const params = {
                    order: {
                        custId: roomInfo.clientId,
                        isClosed: true,
                    }
                }

                REQ.reqDiningHistoryOrder(params,
                    (res) => {
                        this.dataList = res.data.rows
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getOrderTime(time) {
                return DateFormat.YMDHMS(time)
            },

            goToDetailPage(orderId) {
                this.$router.push({
                    name: 'OrderDetail',
                    params: {orderId}
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .meal-list {
        width: 100%;
        @include layout-flex-c;
        padding-bottom: 15px;

        .no-data {
            padding-top: 40%;
            @include layout-flex-c;
            align-items: center;

            .history-no {
                @include set-width-height(200px, 136px);
            }

            .no-text {
                color: #8D888F;
                @include font-dpr(15px);
                margin-top: 20px;
            }
        }

        .item {
            @include layout-flex-c;
            margin: 15px 15px 0 15px;
            background: #322831;
            border-radius: 4px;
            padding: 0 15px;
            position: relative;

            .top {
                @include layout-flex-r-sb;
                @include set-height(44px);
                align-items: center;
                border-bottom: 1px solid #3A3039;

                .name {
                    @include font-dpr(15px);
                    color: #01B695;
                }
            }

            .center {
                @include layout-flex-r-sb;
                @include set-height(41px);
                border-bottom: 1px solid #3A3039;
                align-items: center;

                .price {
                    color: #D8D854;
                    @include font-dpr(15px)
                }

                .time {
                    color: #8D888F;
                    @include font-dpr(15px)
                }
            }

            .bottom {
                @include layout-flex-r;
                @include set-height(40px);
                align-items: center;
                color: #8D888F;
                @include font-dpr(14px)
            }

            .left-circle {
                width: 10px;
                height: 20px;
                border-radius: 0 10px 10px 0;
                background: $second-background;
                position: absolute;
                top: 76px;
                left: 0;
            }

            .right-circle {
                width: 10px;
                height: 20px;
                border-radius: 10px 0 0 10px;
                background: $second-background;
                position: absolute;
                top: 76px;
                right: 0;
            }
        }
    }
</style>