<template>
    <div class="shop-car">
        <div class="top" v-show="showList && hasList" ref="top" @click="toggleListShow">
            <div class="detail" @click.stop>
                <span class="title">已选商品（共{{getCount}}份）</span>
                <div class="content">
                    <div class="line" v-for="item in getDataList">
                        <div class="left">
                            <div class="name"><span class="point">●</span>{{item.carteName}}</div>
                            <div v-if="item.carteTaste" class="taste">{{item.carteTaste}}</div>
                        </div>
                        <span class="price">￥{{Number(item.cartePrice)}}/份</span>
                        <div class="menu">
                            <span class="icon icon-10-13" @click="reduceFood(item)"></span>
                            <span class="count">{{item.carteCount}}</span>
                            <span class="icon icon-10-12" @click="addFood(item)"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="price-cover" @click="toggleListShow">
                <div class="final-price" :class="{'final-active': getTotalPrice}">会员价：￥<span class="number">
                    {{Number(getTotalPrice).toFixed(2)}}
                </span>
                </div>
                <div class="original-price" :class="{'original-active': getTotalPrice}">
                    原价：￥{{Number(getTotalPrice).toFixed(2)}}
                </div>
            </div>
            <div class="btn" :class="{'btn-active':getCount}" @click="clickBtn">
                {{hasList ? '去下单' : '确认下单'}}
            </div>
        </div>
        <img :src="getSrc" class="img" @click="toggleListShow">
        <span v-if="getCount" class="badge">{{getCount}}</span>
    </div>
</template>

<script>
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: ["hasList"],

        data() {
            return {
                showList: false,
                canPress: true
            }
        },

        computed: {
            getSrc() {
                if (this.$store.getters.getShopCarCount) {
                    return REQ.apiStaticDomain + '/static/img/icon/shopcar.png'
                } else {
                    return REQ.apiStaticDomain + '/static/img/icon/shopcar-no.png'
                }
            },

            getTotalPrice() {
                return Number(this.$store.getters.getShopCarTotalPrice)
            },

            getCount() {
                if (!this.$store.getters.getShopCarCount) {
                    this.showList = false
                }
                return this.$store.getters.getShopCarCount
            },

            getDataList() {
                return this.$store.getters.getShopCarData
            },

            getMenuDataMap() {
                return this.$store.getters.getMenuDataMap
            }
        },

        mounted() {
            this.$store.commit("storeMenuData", {storeId: roomInfo.storeId});
            this.setTopHeight()
            this.$root.notify.$on("ConfirmDetail", () => {
                this.$router.push({name: 'ConfirmDetail'})
            })
            this.$root.notify.$on("OrderResult", () => {
                this.$router.replace({name: 'OrderResult'})
            })
            this.$store.commit("storeIsOnDiningPage", true)
        },

        destroyed() {
            this.$root.notify.$off("ConfirmDetail")
            this.$root.notify.$off("OrderResult")
        },

        methods: {
            toggleListShow() {
                if (this.$store.getters.getShopCarCount) {
                    this.showList = !this.showList
                }
            },

            setTopHeight() {
                const top = this.$refs.top
                top.style.height = window.innerHeight - 49 + 'px'
            },

            reduceFood(food) {
                this.operateShopCar(food, -1)
            },

            addFood(food) {
                this.operateShopCar(food, 1)
            },

            operateShopCar(food, type) {
                if (!this.canPress) {
                    return
                } else {
                    this.canPress = false
                    let timer = setTimeout(() => {
                        this.canPress = true
                        clearTimeout(timer)
                    }, 200)
                }

                const params = {
                    orderId: this.$store.getters.getDiningOrderId,
                    isPlus: type > 0 ? true : false,
                    nickname: roomInfo.nickName,
                    cid: roomInfo.clientId,
                    headImage: roomInfo.headimg,
                    carte: {
                        carteId: food.carteId,
                    },
                }
                if (food.carteTaste) params.carte.carteTaste = food.carteTaste
                REQ.reqDiningAddFood(params,
                    () => {
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            clickBtn() {
                if (!this.getCount) return
                if (this.hasList) {
                    this.$router.push({name: 'ConfirmOrder'})
                } else {
                    const params = {
                        order: {
                            id: this.$store.getters.getDiningOrderId,
                            isTakeout: this.$store.getters.getEatType === 1 ? false : true,
                            comment: this.$store.getters.getRemark
                        },
                    }
                    REQ.reqDiningConfirmOrder(params,
                        (res) => {
                            this.$logger("确认下单", res)
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
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .shop-car {
        position: fixed;
        bottom: 0;
        width: 100%;
        @include layout-flex-c;
        z-index: 99;

        .bottom {
            @include set-height(49px);
            background: #221821;
            @include box-shadow(0px 0px 10px #241010);
            @include layout-flex-r;
            padding-left: 95px;

            .price-cover {
                flex: 3;
                @include layout-flex-c-center;

                .final-price {
                    color: #8D888F;
                    @include font-dpr(14px);

                    .number {
                        @include font-dpr(19px);
                    }
                }

                .final-active {
                    color: #01B695;
                }

                .original-price {
                    @include font-dpr(12px);
                    color: #8D888F;
                    text-decoration: line-through;
                    margin-bottom: 8px;
                }

                .original-active {
                    color: #007C64;
                }
            }

            .btn {
                @include set-width(100px);
                background: #8D888F;
                border-radius: 20px 0 0 0;
                color: #766C7A;
                @include layout-flex-c-center;
                align-items: center;
                @include font-dpr(15px);
            }

            .btn-active {
                color: #ffffff;
                background: #CD533E;
            }
        }

        .img {
            @include set-width-height(92px, 67px);
            position: absolute;
            bottom: 3px;
            left: 3px;
        }

        .badge {
            @include font-dpr(8px);
            color: #fff;
            background: #CD533E;
            border-radius: 50%;
            @include set-width-height(15px, 15px);
            @include layout-flex-r-center;
            align-items: center;
            position: absolute;
            bottom: 35px;
            left: 70px;
        }

        .top {
            flex: 1;
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            @include layout-flex-c;
            justify-content: flex-end;

            .detail {
                @include layout-flex-c;
                margin: 0 10px;
                background: #322831;
                border-radius: 4px 4px 0 0;

                .title {
                    @include set-h(34px);
                    color: #8D878F;
                    @include font-dpr(14px);
                    padding-left: 10px;
                    border-radius: 4px 4px 0 0;
                    border-bottom: 1px solid #3D333C;
                }

                .content {
                    width: 100%;
                    overflow-y: auto;
                    max-height: 305px;

                    .line {
                        @include set-height(54px);
                        margin: 0 10px;
                        border-bottom: 1px solid #3D333C;
                        @include layout-flex-r;
                        align-items: center;

                        .left {
                            flex: 2;
                            @include layout-flex-c-center;

                            .name {
                                @include font-dpr(14px);
                                color: #cccccc;
                                @include layout-flex-r;
                                align-items: center;

                                .point {
                                    color: #8D878F;
                                    font-size: 8px;
                                    width: 15px;
                                    @include layout-flex-c-center;
                                }
                            }

                            .taste {
                                color: #8D878F;
                                @include font-dpr(12px);
                                margin-top: 4px;
                                margin-left: 15px;
                            }
                        }

                        .price {
                            flex: 1;
                            color: #02B695;
                            @include font-dpr(14px);
                        }

                        .menu {
                            @include layout-flex-r;
                            align-items: center;
                            justify-content: flex-end;
                            flex: 1;

                            .count {
                                @include layout-flex-r-center;
                                align-items: center;
                                @include font-dpr(14px);
                                color: #dddddd;
                                width: 40px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>