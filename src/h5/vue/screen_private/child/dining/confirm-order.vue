<template>
    <div class="confirm-order">
        <ShopCar :hasList="false"/>
        <div class="panel">
            <Title :title="getTableName" :refresh="true" :history="true" @leftClick="backHandler"
                   @refreshClick="refreshClick" style="position: absolute; z-index: 9"/>
            <div class="content">
                <div class="group" v-for="(group, key) in getData">
                    <span class="type">{{key}}</span>
                    <div v-for="item in group" class="item">
                        <div class="name">{{item.carteName}}<span v-if="item.carteTaste">({{item.carteTaste}})</span>
                        </div>
                        <span class="price">￥{{Number(item.cartePrice)}}/份</span>
                        <div class="menu">
                            <span class="icon icon-10-11" @click="reduceFood(item)"></span>
                            <span class="count">{{item.carteCount}}</span>
                            <span class="icon icon-10-10" @click="addFood(item)"></span>
                        </div>
                    </div>
                </div>
                <div class="remark-line" @click="writeRemark">
                    <div class="desc">
                        <span class="icon icon-11-1"></span>
                        <span class="text">整单备注</span>
                    </div>
                    <div class="remark">
                        <span class="text">{{getRemark.length ? getRemark : '口味、偏好等要求'}}</span>
                        <span class="icon icon-arrow-more"></span>
                    </div>
                </div>
                <div class="type-line">
                    <div class="type-item" @click="updateType(2)">
                        <span class="icon" :class="getEatType === 2 ? 'icon-11-3' : 'icon-11-4' "></span>
                        <span :class="getEatType === 2 ? 'type-active' : 'type'">外带</span>
                    </div>
                    <div class="type-item" @click="updateType(1)">
                        <span class="icon" :class="getEatType === 1 ? 'icon-11-3' : 'icon-11-4' "></span>
                        <span :class="getEatType === 1 ? 'type-active' : 'type'">堂食</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from './child/title.vue'
    import ShopCar from './shop-car.vue'
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, ShopCar},

        data() {
            return {
                canPress: true
            }
        },

        computed: {
            getTableName() {
                return '确认订单-' + this.$store.getters.getDiningTableName + '桌'
            },

            getData() {
                if (!this.$store.getters.getShopCarCount) {
                    this.backHandler()
                }
                return this.$store.getters.getShopCarTypeData
            },

            getMenuDataMap() {
                return this.$store.getters.getMenuDataMap
            },

            getRemark() {
                return this.$store.getters.getRemark
            },

            getEatType() {
                return this.$store.getters.getEatType
            }
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            refreshClick() {
                this.$store.commit("storeShopCarData")
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

            updateType(type) {
                this.$store.commit("storeUpdateEatType", type)
            },

            writeRemark() {
                window.location.href = "#/WriteRemark"
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .confirm-order {
        @include window;

        .panel {
            @include panel;
        }

        .content {
            @include content;
            padding: 49px 0;

            .group {
                width: 100%;
                @include layout-flex-c;
                border-bottom: 1px solid #322831;
                padding: 5px 0;

                .type {
                    margin: 10px;
                    @include font-dpr(15px);
                    border-left: 2px solid #01B695;
                    color: #01B695;
                    text-indent: 10px;
                    line-height: 14px;
                }

                .item {
                    padding: 0 10px;
                    @include layout-flex-r;
                    @include set-h(30px);
                    align-items: center;

                    .name {
                        flex: 2;
                        text-indent: 15px;
                        @include font-dpr(15px);
                        color: #8D888F;
                    }

                    .price {
                        flex: 1;
                        @include font-dpr(15px);
                        color: #01B695;
                    }

                    .menu {
                        flex: 1;
                        @include layout-flex-r;
                        justify-content: flex-end;
                        align-items: center;

                        .count {
                            @include set-width(35px);
                            @include font-dpr(16px);
                            color: #dddddd;
                            @include layout-flex-r-center;
                            align-items: center;
                        }
                    }
                }
            }

            .remark-line {
                width: 100%;
                @include set-height(49px);
                background: #322831;
                @include layout-flex-r-sb;
                align-items: center;
                margin-top: 15px;

                .desc {
                    @include layout-flex-r;
                    align-items: center;
                    margin-left: 10px;

                    .text {
                        @include font-dpr(15px);
                        color: #01b695;
                        margin-left: 5px;
                    }
                }

                .remark {
                    @include layout-flex-r;
                    justify-content: flex-end;
                    align-items: center;
                    margin-right: 10px;
                    width: 50%;
                    overflow: hidden;

                    .text {
                        @include font-dpr(15px);
                        color: #8D888F;
                        margin-right: 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 90%;
                    }
                }
            }

            .type-line {
                width: 100%;
                @include set-height(49px);
                align-items: center;
                @include layout-flex-r;
                justify-content: flex-end;
                padding-right: 10px;

                .type-item {
                    @include layout-flex-r;
                    align-items: center;
                    margin-left: 20px;

                    .type {
                        @include font-dpr(15px);
                        color: #8d888f;
                        margin: 0 10px 0 5px;
                    }

                    .type-active {
                        @include font-dpr(15px);
                        color: #01B695;
                        margin: 0 10px 0 5px;
                    }
                }
            }
        }
    }

</style>