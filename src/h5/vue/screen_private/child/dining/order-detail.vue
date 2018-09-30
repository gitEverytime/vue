<template>
    <div class="order-detail">
        <div class="panel">
            <Title :title="getTableName" @leftClick="backHandler" style="position: absolute; z-index: 9"/>
            <div class="content">
                <div class="top">
                    <span class="icon icon-12-1"></span>
                    <span class="status">订单已完成！</span>
                    <span class="info">-欢迎下次光临-</span>
                </div>
                <div class="center">
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
                    <div class="total-price">总金额：￥
                        <span class="number">{{Number(totalPrice).toFixed(2)}}</span>
                    </div>
                    <div class="order-info">
                        <SubTitle title="订单信息"/>
                        <InfoLine left="订单编号" :right="getOrderId"/>
                        <InfoLine left="下单时间" :right="getOrderTime"/>
                        <InfoLine left="桌号号码" :right="tableName"/>
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
                payWayShow: false,
                firstBatch: {},
                addBatch: [],
                orderInfo: {},
                totalPrice: 0,
                cancels: {},
                tableName: ''
            }
        },

        computed: {
            getTableName() {
                return '订单详情'
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
            this.getOrderDetail()
        },

        methods: {
            backHandler() {
                window.history.back()
            },


            getOrderDetail() {
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
                        data.order.tables.forEach(item => {
                            this.tableName += item + '桌 '
                        })
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },
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

                .top {
                    @include layout-flex-c;
                    align-items: center;
                    border-bottom: 1px solid #322831;
                    padding: 15px 0;

                    .status {
                        color: #8D888F;
                        @include font-dpr(14px);
                        margin-top: 15px;
                    }

                    .info {
                        color: #01B695;
                        @include font-dpr(14px);
                        margin-top: 15px;
                    }
                }

                .center {
                    @include layout-flex-c;
                    width: 100%;

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