<template>
    <div class="confirm-detail">
        <PayWay :show="payWayShow" @close="closePayWay" @confirm="confirmPayWay"/>
        <div class="panel">
            <Title :title="getTableName" :history="true" @leftClick="backHandler"
                   style="position: absolute; z-index: 9"/>
            <div class="content">
                <div class="top">
                    <div class="status-line" v-show="getOrderState === 1">
                        <span class="icon icon-11-10"></span>
                        <span class="status" style="color: #01b695">等待商家确认</span>
                    </div>
                    <div class="status-line" v-show="getOrderState === 1">
                        <span class="icon icon-11-11"></span>
                        <span class="status">后厨正在制作</span>
                    </div>
                    <div class="status-line" v-show="getOrderState === 2">
                        <span class="icon icon-11-12"></span>
                        <span class="status" style="color: #01b695">后厨正在制作</span>
                    </div>
                    <div class="status-line" v-show="getOrderState === 2">
                        <span class="icon icon-11-13"></span>
                        <span class="status">结单确认金额</span>
                    </div>
                </div>
                <div class="center">
                    <div class="state-name">未结明细</div>
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
                    <div class="total-price">未结金额：￥
                        <span class="number">{{Number(totalPrice).toFixed(2)}}</span>
                    </div>

                    <div class="state-name" v-if="confirmedFirstBatch.count">已结明细</div>
                    <div class="group" v-if="confirmedFirstBatch.count">
                        <SubTitle :title="'订单明细' + (confirmedFirstBatch.count ? `（共${confirmedFirstBatch.count}份）` : '')"/>
                        <FoodLine v-if="confirmedFirstBatch.records" v-for="item in confirmedFirstBatch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div v-for="(batch, index) in confirmedAddBatch" class="group">
                        <SubTitle :title="'加菜'+ (index + 1) + (batch.count ? `（共${batch.count}份）` : '')"/>
                        <FoodLine v-if="batch.records" v-for="item in batch.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div class="group" v-if="cancels.count">
                        <SubTitle :title="'退菜明细' + (cancels.count ? `（共${cancels.count}份）` : '')"/>
                        <FoodLine v-if="cancels.records" v-for="item in cancels.records" :info="item"
                                  :key="Date.now() * Math.random()"/>
                    </div>
                    <div class="total-price" v-if="confirmedFirstBatch.count">已结金额：￥
                        <span class="number">{{Number(confirmedTotalPrice).toFixed(2)}}</span>
                    </div>

                    <div class="order-info">
                        <SubTitle title="订单信息"/>
                        <InfoLine left="订单编号" :right="getOrderId"/>
                        <InfoLine left="下单时间" :right="getOrderTime"/>
                        <InfoLine left="桌号号码" :right="getTableInfo"/>
                        <InfoLine left="未结金额总计" :right="'￥ ' + totalPrice"/>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="price-cover">
                    <div class="final-price">会员价：￥<span class="number">{{Number(totalPrice).toFixed(2)}}</span></div>
                    <div class="original-price">原价：￥{{Number(totalPrice).toFixed(2)}}</div>
                </div>
                <div class="btn-add" @click="addFood">加菜</div>
                <div class="btn-pay" @click="wantPay" v-if="getPayState !== 1">我要买单</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './child/title.vue'
    import SubTitle from './child/sub-title.vue'
    import PayWay from './child/pay-way.vue'
    import REQ from '../../comm/request'
    import FoodLine from './child/food-line.vue'
    import InfoLine from './child/info-line.vue'
    import DateFormat from '../../comm/date_format'
    import WeChatPay from '../../comm/wechat_pay'
    import SSEType from "../../comm/sse_type"

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, PayWay, SubTitle, FoodLine, InfoLine},

        data() {
            return {
                payWayShow: false,
                firstBatch: {},
                addBatch: [],
                orderInfo: {},
                totalPrice: 0,

                confirmedFirstBatch: {},
                confirmedAddBatch: {},
                confirmedTotalPrice: 0,
                cancels: []
            }
        },

        computed: {
            getTableName() {
                return '确认详情-' + this.$store.getters.getDiningTableName + '桌'
            },

            getOrderState() {
                return this.$store.getters.getOrderState
            },

            getOrderId() {
                return this.$store.getters.getDiningOrderId
            },

            getTableInfo() {
                return this.$store.getters.getDiningTableName
            },

            getOrderTime() {
                if (this.orderInfo.createdAt) {
                    return DateFormat.YMDHMS(this.orderInfo.createdAt)
                } else {
                    return ''
                }
            },

            getPayState() {
                return this.$store.getters.getPayState
            }
        },

        mounted() {
            this.getOrderDetail()
            this.getConfirmDetail()
            this.$root.notify.$on("operateFood", () => {
                this.backHandler()
            })
            this.$root.notify.$on("OrderResult", () => {
                this.$router.replace({name: 'OrderResult'})
            })
        },

        destroyed() {
            this.$root.notify.$off("operateFood")
            this.$root.notify.$off("OrderResult")
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            wantPay() {
                this.payWayShow = true
            },

            closePayWay() {
                this.payWayShow = false
            },

            confirmPayWay(payWay) {
                this.closePayWay()
                if (payWay === 2) {
                    this.$toast.center('请到前台支付')
                } else if (payWay === 1) {
                    this.$toast.center('微信支付')
                    const params = {
                        orderId: this.$store.getters.getDiningOrderId,
                        paymentMethod: 1,
                        micropay: {
                            custId: roomInfo.clientId,
                        }
                    }
                    REQ.reqDiningPayWeChat(params,
                        (res) => {
                            WeChatPay.startPay(res.data)
                                .then(() => {
                                    this.payFinish()
                                })
                                .catch((err) => {
                                    this.$logger.error("支付失败", err)
                                    this.payFinish()
                                })
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$logger.error(err)
                        }
                    )
                }
            },

            payFinish() {
                REQ.reqDiningPayFinish({orderId: this.$store.getters.getDiningOrderId},
                    () => {
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            addFood() {
                this.backHandler()
            },

            getOrderDetail() {
                REQ.reqDiningOrderDetail({orderId: this.$store.getters.getDiningOrderId},
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
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getConfirmDetail() {
                REQ.reqDiningHistoryOrderDetail({orderId: this.$store.getters.getDiningOrderId},
                    (res) => {
                        const data = res.data
                        if (data.batches.length) {
                            this.confirmedFirstBatch = data.batches[0]
                        }
                        if (data.batches.length > 1) {
                            this.confirmedAddBatch = data.batches.slice(1)
                        }
                        this.confirmedTotalPrice = data.price
                        this.cancels = data.cancels
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

    .confirm-detail {
        @include window;

        .panel {
            @include panel;

            .content {
                padding: 49px 0;
                @include content;

                .top {
                    @include layout-flex-c;
                    margin: 10px 10px 0 10px;
                    border-radius: 4px;
                    background: #322831;

                    .status-line {
                        @include set-h(45px);
                        padding-left: 12px;
                        @include layout-flex-r;
                        align-items: center;

                        .status {
                            @include font-dpr(14px);
                            color: #8D888F;
                            margin-left: 12px;
                        }
                    }
                }

                .center {
                    @include layout-flex-c;
                    width: 100%;
                    
                    .state-name {
                        @include set-h(45px);
                        border-radius: 4px;
                        background: #322831;
                        margin: 10px 10px 5px 10px;
                        @include layout-flex-c;
                        align-items: center;
                        color: #01B695;
                        font-weight: bold;
                        @include font-dpr(15px)
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

            .bottom {
                position: fixed;
                bottom: 0;
                width: 100%;
                z-index: 99;
                @include set-height(49px);
                background: #221821;
                @include box-shadow(0px 0px 10px #241010);
                @include layout-flex-r;
                padding-left: 10px;

                .price-cover {
                    flex: 1;
                    @include layout-flex-c-center;

                    .final-price {
                        color: #01B695;
                        @include font-dpr(14px);

                        .number {
                            @include font-dpr(19px);
                        }
                    }

                    .original-price {
                        @include font-dpr(12px);
                        color: #007C64;
                        text-decoration: line-through;
                        margin-bottom: 8px;
                    }
                }

                .btn-add {
                    @include set-width(100px);
                    border-radius: 20px 0 0 0;
                    @include layout-flex-c-center;
                    align-items: center;
                    @include font-dpr(15px);
                    color: #221821;
                    background: #D8D854;
                }

                .btn-pay {
                    @include set-width(100px);
                    @include layout-flex-c-center;
                    align-items: center;
                    @include font-dpr(15px);
                    color: #ffffff;
                    background: #CD533E;
                }
            }
        }

    }

</style>