<template>
    <div class="order-meal">
        <Flavor :show="flavorModalShow" @close="closeFlavor" @addFood="addFood"></Flavor>
        <ShopCar :hasList="true"/>
        <FoodDetail :show="foodDetailShow" @close="closeFoodDetail" @addFood="addFood" @reduceFood="reduceFood"
                    @chooseFlavor="chooseFlavor"/>
        <div class="panel">
            <Title :title="getTableName" :history="true" @leftClick="backHandler"
                   style="position: absolute; z-index: 9"/>
            <div class="content">
                <div class="left">
                    <div v-for="(item, index) in getMenuData" class="left-item"
                         :class="{'active': index == getCurrIndex}"
                         @click="selectIndex(index)">
                        <span>{{item.carteType.typeName}}</span>
                        <span v-if="getMenuDataMap[item.carteType.id].count" class="badge">
                            {{getMenuDataMap[item.carteType.id].count}}
                        </span>
                    </div>
                </div>
                <div class="right">
                    <div class="sub-title">{{getTypeName}}</div>
                    <div v-for="item in getCartesData" class="right-item" @click="clickFood(item)">
                        <Imag :src="item.carteThumbnail" classes="thumbnail"/>
                        <div class="detail">
                            <div class="name">
                                <span>{{item.carteName}}</span>
                                <span v-if="item.carteIsFeature == 1" class="ico icon icon-10-16"></span>
                                <!--<span class="ico icon icon-10-14"></span>-->
                                <!--<span class="ico icon icon-10-15"></span>-->
                            </div>
                            <div class="line">
                                <div class="rmb">￥<span class="price">{{Number(item.cartePrice)}}</span></div>
                                <div class="menu" v-if="!item.carteTaste">
                                    <span v-if="getMenuDataMap[item.carteType][item.id].count" class="icon icon-10-11"
                                          @click.stop="reduceFood(item)"></span>
                                    <span v-if="getMenuDataMap[item.carteType][item.id].count" class="count">
                                        {{getMenuDataMap[item.carteType][item.id].count}}
                                    </span>
                                    <span class="icon icon-10-10" @click.stop="addFood(item)"></span>
                                </div>
                                <div class="flavor" v-if="item.carteTaste" @click.stop="chooseFlavor(item)">选规格</div>
                                <span class="badge"
                                      v-if="item.carteTaste && getMenuDataMap[item.carteType][item.id].count">
                                    {{getMenuDataMap[item.carteType][item.id].count}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './child/title.vue'
    import Flavor from './flavor.vue'
    import ShopCar from './shop-car.vue'
    import FoodDetail from './food-detail.vue'
    import REQ from '../../comm/request'
    import Imag from '../component/Image.vue'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, Flavor, ShopCar, FoodDetail, Imag},

        data() {
            return {
                flavorModalShow: false,
                canPress: true,
                foodDetailShow: false,
            }
        },

        computed: {
            getMenuData() {
                return this.$store.getters.getMenuData
            },

            getCartesData() {
                return this.$store.getters.getCartes
            },

            getCurrIndex() {
                return this.$store.getters.getTypeIndex
            },

            getTypeName() {
                return this.$store.getters.getTypeName
            },

            getTableName() {
                return this.$store.getters.getDiningTableName + '桌'
            },

            getMenuDataMap() {
                return this.$store.getters.getMenuDataMap
            }
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            selectIndex(index) {
                this.$store.commit("storeUpdateCartes", index)
            },

            addFood(food) {
                this.operateShopCar(food, 1)
            },

            reduceFood(food) {
                this.operateShopCar(food, -1)
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
                        carteId: food.id,
                    },
                }
                if (food.taste) params.carte.carteTaste = food.taste
                if (food.remark) params.carte.comment = food.remark
                REQ.reqDiningAddFoodWaiter(params,
                    () => {
                        if (!params.isPlus && this.getMenuDataMap[food.carteType][food.id].count == 1) {
                            const info = {
                                countChange: '-1',
                                typeId: food.carteType,
                                carteId: food.id
                            }
                            this.$store.commit("storeShopCarData", info)
                        } else {
                            this.$store.commit("storeShopCarData")
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            chooseFlavor(food) {
                this.$store.commit("storeUpdateFood", food)
                this.flavorModalShow = true
            },

            clickFood(food) {
                this.$store.commit("storeUpdateFood", food)
                this.foodDetailShow = true
            },

            closeFoodDetail() {
                this.foodDetailShow = false
            },

            closeFlavor() {
                this.flavorModalShow = false
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .order-meal {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                @include layout-flex-r;
                flex: 1;

                .left {
                    flex: 3;
                    background: #322831;
                    margin-top: 49px;
                    margin-bottom: 49px;
                    overflow-y: auto;

                    .left-item {
                        @include set-height(55px);
                        @include layout-flex-r-sb;
                        padding: 0 25px 0 10px;
                        align-items: center;
                        color: #8d888f;
                        @include font-dpr(15px);
                        border-bottom: 1px solid $second-background;
                        position: relative;

                        .badge {
                            @include font-dpr(8px);
                            color: #fff;
                            background: #CD533E;
                            border-radius: 50%;
                            @include set-width-height(15px, 15px);
                            @include layout-flex-r-center;
                            align-items: center;
                            position: absolute;
                            right: 10px;
                        }
                    }

                    .active {
                        background: $second-background;
                        color: #A7A1A9;
                    }
                }

                .right {
                    flex: 7;
                    padding-top: 49px;
                    overflow-y: auto;
                    padding-left: 10px;
                    margin-bottom: 49px;

                    .sub-title {
                        margin: 10px 10px 0 10px;
                        @include font-dpr(15px);
                        border-left: 2px solid #01B695;
                        color: #01B695;
                        text-indent: 10px;
                        line-height: 14px;
                    }

                    .right-item {
                        @include set-height(100px);
                        @include layout-flex-r;
                        align-items: center;
                        border-bottom: 1px solid #322831;

                        .thumbnail {
                            @include set-width-height(70px, 70px);
                            border-radius: 4px;
                        }

                        .detail {
                            @include layout-flex-c-sb;
                            flex: 1;
                            padding: 0 10px;
                            @include set-height(70px);

                            .name {
                                @include font-dpr(15px);
                                color: #8D888F;
                                @include layout-flex-r;
                                align-items: center;

                                .ico {
                                    margin-left: 5px;
                                }
                            }

                            .line {
                                @include layout-flex-r-sb;
                                align-items: flex-end;
                                position: relative;
                                border-radius: 0 0 4px 4px;

                                .rmb {
                                    color: #01b695;
                                    @include font-dpr(10px);

                                    .price {
                                        @include font-dpr(18px);
                                    }
                                }

                                .menu {
                                    @include layout-flex-r;
                                    align-items: center;

                                    .count {
                                        width: 35px;
                                        @include font-dpr(16px);
                                        color: #dddddd;
                                        @include layout-flex-r-center;
                                        align-items: center;
                                    }
                                }

                                .flavor {
                                    background: #8d888f;
                                    border-radius: 4px;
                                    color: #f5f5f5;
                                    @include font-dpr(10px);
                                    padding: 2px 8px;
                                }

                                .badge {
                                    @include font-dpr(6px);
                                    color: #fff;
                                    background: #CD533E;
                                    border-radius: 50%;
                                    @include set-width-height(12px, 12px);
                                    @include layout-flex-r-center;
                                    align-items: center;
                                    position: absolute;
                                    right: -5px;
                                    top: -3px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>