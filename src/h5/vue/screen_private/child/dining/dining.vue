<template>
    <div class="dining" ref="dining">
        <Carousel :data="carouselList"/>
        <SelectTable :show="showSelectTable" @close="selectTableClose" @confirm="setSelectTable"/>
        <NotOpen :show="notOpenShow" @close="closeNotOpen"/>
        <div class="info">
            <div class="line" style="margin-bottom: 5px">
                <span class="icon icon-10-7" style="margin: 0 10px"></span>
                <span>我的桌号: {{getTableName}}</span>
            </div>
            <div class="line">
                <span class="icon icon-10-8" style="margin: 0 10px"></span>
                <span>我的服务员: </span>
            </div>
        </div>

        <div class="content">
            <div class="left">
                <div class="order" @click="orderMeal(1)">
                    <img :src="getOrderImg" class="icon-order-mile">
                    <span class="text">点餐</span>
                </div>
                <div class="four-line">
                    <div class="four-item" @click="showNotOpen">
                        <span class="icon icon-10-3"></span>
                        <span class="text">会员</span>
                    </div>
                    <div class="four-item" @click="goToPage('business')">
                        <span class="icon icon-10-4"></span>
                        <span class="text">商家</span>
                    </div>
                </div>
                <div class="four-line">
                    <div class="four-item" @click="showNotOpen">
                        <span class="icon icon-10-5"></span>
                        <span class="text">发票</span>
                    </div>
                    <div class="four-item" @click="goToPage('home')">
                        <span class="icon icon-10-6"></span>
                        <span class="text">我的</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="two-line">
                    <div class="two-item" @click="showNotOpen">
                        <span class="icon icon-10-1"></span>
                        <span class="text">外卖</span>
                    </div>
                    <div class="two-item" @click="orderMeal(2)">
                        <span class="icon icon-10-2"></span>
                        <span class="text">外带</span>
                    </div>
                </div>
                <div class="one" @click="goToPage('orderTable')">
                    <img :src="getAdvanceImg" class="icon-order-advance">
                    <span class="text">霸桌</span>
                </div>
                <div class="one" @click="goToPage('history')">
                    <img :src="getFormImg" class="icon-order-form">
                    <span class="text">订单</span>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Carousel from './child/carousel.vue'
    import REQ from "../../comm/request"
    import SelectTable from "./child/select-table.vue"
    import NotOpen from './child/not-open.vue'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Carousel, SelectTable, NotOpen},

        data() {
            return {
                carouselList: [
                    {
                        key: 1,
                        src: REQ.apiStaticDomain + '/static/img/new/banner1.png.webp',
                    },
                    {
                        key: 2,
                        src: REQ.apiStaticDomain + '/static/img/new/banner2.png.webp',
                    },
                    {
                        key: 3,
                        src: REQ.apiStaticDomain + '/static/img/new/banner3.png.webp',
                    },
                ],
                showSelectTable: false,
                notOpenShow: false,
            }
        },

        computed: {
            getOrderImg() {
                return REQ.apiStaticDomain + '/static/img/icon/order.png'
            },
            getFormImg() {
                return REQ.apiStaticDomain + '/static/img/icon/order-form.png'
            },
            getAdvanceImg() {
                return REQ.apiStaticDomain + '/static/img/icon/advance.png'
            },

            getTableName() {
                if (this.$store.getters.getDiningTableName) {
                    return this.$store.getters.getDiningTableName + '桌'
                } else {
                    return ''
                }
            }

        },

        mounted() {
            this.setWindowHeight()
            this.getTableInfo()
            this.$store.commit("storeIsOnDiningPage", false)
        },

        methods: {
            setWindowHeight() {
                const dining = this.$refs.dining
                dining.style.height = window.innerHeight - 35 - 51 + 'px'
            },

            selectTableShow() {
                this.showSelectTable = true
            },

            selectTableClose() {
                this.showSelectTable = false
            },

            setSelectTable(tableId) {
                const params = {
                    storeId: roomInfo.storeId,
                    customerId: roomInfo.clientId,
                    tableId,
                }
                REQ.reqGetDiningInfo(params,
                    (res) => {
                        this.selectTableClose()
                        const info = res.data || {}
                        this.$store.commit("storeUpdateDiningInfo", info)
                        if (info.order && info.order.dinerCount) {
                            this.$router.push({name: "OrderMeal"})
                        } else {
                            this.$router.push({name: 'SelectNumber'})
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            orderMeal(type) {
                this.$store.commit("storeUpdateEatType", type)
                const info = this.$store.getters.getDiningInfo
                if (info.order) {                 //如果已经有座位信息
                    if (info.order.dinerCount) {  //已经选择过就餐人数，直接到点餐页面
                        window.location.href = "#/OrderMeal"
                    } else {                      //没有选择过就餐人数，到选人数页面
                        window.location.href = "#/SelectNumber"
                    }
                } else {                          //没有座位信息，选择座位
                    this.selectTableShow()
                }
            },

            getTableInfo() {
                const params = {
                    storeId: roomInfo.storeId,
                    customerId: roomInfo.clientId,
                }
                if (roomInfo.tableId) params.tableId = roomInfo.tableId
                REQ.reqGetDiningInfo(params,
                    (res) => {
                        this.$store.commit("storeUpdateDiningInfo", res.data || {})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            closeNotOpen() {
                this.notOpenShow = false
            },

            showNotOpen() {
                this.notOpenShow = true
            },

            goToPage(type) {
                switch (type) {
                    case 'home':
                        this.$store.commit("storeHomeTabIndex", 1)
                        this.$router.push({name: "home"})
                        break
                    case 'history':
                        this.$router.push({name: "HistoryOrder"})
                        break
                    case 'business':
                        this.$router.push({name: "Business"})
                        break
                    case 'orderTable':
                        this.$router.push({name: "OrderTable"})
                        break
                    default:
                        this.showNotOpen()
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .dining {
        width: 100%;
        padding-top: 35px;
        overflow-y: auto;
        margin-bottom: 100px;

        .info {
            margin: 0 10px;
            @include set-height(57px);
            @include layout-flex-c-center;
            background: rgba(22, 70, 72, 0.7);
            border-radius: 4px;

            .line {
                @include layout-flex-r;
                align-items: center;
                height: 18px;
            }

            span {
                @include font-dpr(14px);
                color: #ccc;
            }
        }

        .content {
            margin: 5px;
            @include layout-flex-r;
            border-radius: 10px;

            .left {
                flex: 4;
                @include layout-flex-c;

                .order {
                    margin: 5px;
                    @include layout-flex-c-center;
                    align-items: center;
                    @include set-height(142px);
                    border-radius: 4px;
                    background: rgba(205, 83, 62, 0.6);

                    .text {
                        color: #f5f5f5;
                        @include font-dpr(15px);
                        margin-top: 10px;
                    }
                }

                .four-line {
                    @include layout-flex-r;

                    .four-item {
                        flex: 1;
                        margin: 5px;
                        border-radius: 4px;
                        background: rgba(22, 70, 72, 0.6);
                        @include layout-flex-r-center;
                        @include set-height(54px);
                        align-items: center;

                        .text {
                            color: #dddddd;
                            @include font-dpr(15px);
                            width: 14px;
                            margin-left: 5px;
                            line-height: 15px;
                        }
                    }
                }
            }

            .right {
                flex: 6;
                @include layout-flex-c;

                .two-line {
                    @include layout-flex-r;

                    .two-item {
                        flex: 1;
                        margin: 5px;
                        border-radius: 4px;
                        background: rgba(22, 70, 72, 0.6);
                        @include layout-flex-c-center;
                        align-items: center;
                        @include set-height(92px);

                        .text {
                            color: #dddddd;
                            @include font-dpr(14px);
                            margin-top: 8px;
                        }
                    }
                }

                .one {
                    margin: 5px;
                    @include layout-flex-r-center;
                    align-items: center;
                    @include set-height(79px);
                    background: rgba(0, 124, 100, 0.6);
                    border-radius: 4px;

                    .text {
                        color: #f5f5f5;
                        @include font-dpr(15px);
                        width: 15px;
                        line-height: 16px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }

</style>