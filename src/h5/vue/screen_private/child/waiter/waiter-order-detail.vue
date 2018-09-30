<template>
    <div class="order-detail">
        <div class="panel">
            <Title :title="getTableName" @leftClick="backHandler"
                   style="position: absolute; z-index: 9"/>
            <div class="content">
                <div class="center">
                    <div class="state-name">吧台未确认明细</div>
                    <div class="group" v-if="unconfirmedFirstBatch.count">
                        <SubTitle :title="'订单明细' + (unconfirmedFirstBatch.count ? `（共${unconfirmedFirstBatch.count}份）` : '')"/>
                        <FoodLine v-if="unconfirmedFirstBatch.records" v-for="item in unconfirmedFirstBatch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div v-for="(batch, index) in unconfirmedAddBatch" class="group">
                        <SubTitle :title="'加菜'+ (index + 1) + (batch.count ? `（共${batch.count}份）` : '')"/>
                        <FoodLine v-if="batch.records" v-for="item in batch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div class="total-price">未确认金额：￥
                        <span class="number">{{Number(unconfirmedTotalPrice).toFixed(2)}}</span>
                    </div>

                    <div class="state-name">吧台已确认明细</div>
                    <div class="group" v-if="firstBatch.count">
                        <SubTitle :title="'订单明细' + (firstBatch.count ? `（共${firstBatch.count}份）` : '')"/>
                        <FoodLine v-if="firstBatch.records" v-for="item in firstBatch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div v-for="(batch, index) in addBatch" class="group">
                        <SubTitle :title="'加菜'+ (index + 1) + (batch.count ? `（共${batch.count}份）` : '')"/>
                        <FoodLine v-if="batch.records" v-for="item in batch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div class="group" v-if="cancels.count">
                        <SubTitle :title="'退菜明细' + (cancels.count ? `（共${cancels.count}份）` : '')"/>
                        <FoodLine v-if="cancels.records" v-for="item in cancels.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div class="total-price">已确认金额：￥
                        <span class="number">{{Number(totalPrice).toFixed(2)}}</span>
                    </div>
                    <div class="order-info">
                        <SubTitle title="订单信息"/>
                        <InfoLine left="订单编号" :right="getOrderId"/>
                        <InfoLine left="下单时间" :right="getOrderTime"/>
                        <InfoLine left="桌号号码" :right="getTableInfo"/>
                        <InfoLine left="消费总计" :right="'￥ ' + totalPrice"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './child/title.vue'
    import SubTitle from './child/sub-title.vue'
    import REQ from '../../comm/request'
    import FoodLine from './child/food-line.vue'
    import InfoLine from './child/info-line.vue'
    import DateFormat from '../../comm/date_format'

    export default {
        props: [],

        components: {Title, SubTitle, FoodLine, InfoLine},

        data() {
            return {
                firstBatch: {},
                addBatch: [],
                orderInfo: {},
                totalPrice: 0,
                cancels: {},

                unconfirmedFirstBatch: {},
                unconfirmedAddBatch: [],
                unconfirmedTotalPrice: 0,
            }
        },

        computed: {
            getTableName() {
                return this.$route.params.tableName + "-点菜明细"
            },

            getTableInfo() {
                return this.$route.params.tableName
            },

            getOrderTime() {
                if (this.orderInfo.createdAt) {
                    return DateFormat.YMDHMS(this.orderInfo.createdAt)
                } else {
                    return ''
                }
            },

            getOrderId() {
                return this.$route.params.orderId || ''
            },
        },

        mounted() {
            this.getConfirmOrderDetail()
            this.getUnconfirmedOrderDetail()
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            getConfirmOrderDetail() {
                if (!this.$route.params.orderId) return
                REQ.reqDiningHistoryOrderDetail({orderId: this.$route.params.orderId},
                    (res) => {
                        const data = res.data
                        if (data.batches.length) {
                            this.firstBatch = data.batches[0]
                        }
                        if (data.batches.length > 1) {
                            this.addBatch = data.batches.slice(1)
                        }
                        this.orderInfo = data.order
                        this.totalPrice = data.price
                        this.cancels = data.cancels
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getUnconfirmedOrderDetail() {
                if (!this.$route.params.orderId) return
                REQ.reqDiningOrderDetail({orderId: this.$route.params.orderId},
                    (res) => {
                        const data = res.data
                        if (data.batches.length) {
                            this.unconfirmedFirstBatch = data.batches[0]
                        }
                        if (data.batches.length > 1) {
                            this.unconfirmedAddBatch = data.batches.slice(1)
                        }
                        this.unconfirmedTotalPrice = data.price
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .order-detail {
        @include window;

        .panel {
            @include panel;

            .content {
                padding: 49px 0 0 0;
                @include content;

                .center {
                    @include layout-flex-c;
                    width: 100%;

                    .state-name {
                        @include layout-flex-r-center;
                        color: #f5f5f5;
                        @include font-dpr(15px);
                        @include set-height(35px);
                        align-items: center;
                        margin-top: 10px;
                    }

                    .group {
                        width: 100%;
                        border-bottom: 1px solid #322831;
                        padding-bottom: 5px;
                        padding-top: 3px;
                    }

                    .total-price {
                        @include layout-flex-r-center;
                        align-items: baseline;
                        color: #D8D854;
                        @include font-dpr(15px);
                        border-bottom: 1px solid #322831;

                        .number {
                            @include font-dpr(19px);
                            @include set-h(48px);
                            align-items: baseline;
                        }
                    }

                    .order-info {
                        width: 100%;
                        padding-bottom: 15px;
                    }
                }
            }
        }

    }

</style>