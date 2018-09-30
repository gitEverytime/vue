<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show">
            <div class="panel" @click.stop :style="getBackground">
                <div class="content">
                    <div class="name">{{getCurrFood.carteName}}</div>
                    <div class="menu-line" v-if="getCurrFood.id">
                        <div class="rmb">￥<span class="price">{{Number(getCurrFood.cartePrice)}}</span>
                            <span class="unit">/份</span>
                        </div>
                        <div class="menu" v-if="!getCurrFood.carteTaste">
                                    <span v-if="getMenuDataMap[getCurrFood.carteType][getCurrFood.id].count"
                                          class="icon icon-10-13"
                                          @click="reduceFood"></span>
                            <span v-if="getMenuDataMap[getCurrFood.carteType][getCurrFood.id].count" class="count">
                                        {{getMenuDataMap[getCurrFood.carteType][getCurrFood.id].count}}
                                    </span>
                            <span class="icon icon-10-12" @click="addFood"></span>
                        </div>
                        <div class="flavor" v-if="getCurrFood.carteTaste" @click.stop="chooseFlavor()">选规格</div>
                        <span class="badge"
                              v-if="getCurrFood.carteTaste && getMenuDataMap[getCurrFood.carteType][getCurrFood.id].count">
                                    {{getMenuDataMap[getCurrFood.carteType][getCurrFood.id].count}}
                                </span>
                    </div>
                    <div class="remark-line">
                        <div class="desc">
                            <span class="icon icon-11-2"></span>
                            <span class="text">备注</span>
                        </div>
                        <input type="text" class="remark" placeholder="口味、偏好等要求" v-model="remark">
                    </div>
                </div>
            </div>
            <span class="icon icon-12-16"></span>
        </div>
    </transition>

</template>

<script>
    export default {
        props: ["show"],

        data() {
            return {
                remark: ''
            }
        },

        computed: {
            getCurrFood() {
                return this.$store.getters.getCurrFood
            },

            getBackground() {
                let thumbnail = this.getCurrFood.carteThumbnail
                if (!thumbnail) {
                    thumbnail = ''
                }
                if (this.isIphone() && thumbnail.slice(-4).toLowerCase() === "webp") {
                    thumbnail = thumbnail.slice(0, -5)
                }
                return {
                    backgroundImage: `url(${thumbnail})`,
                    backgroundSize: 'cover',
                }
            },

            getMenuDataMap() {
                return this.$store.getters.getMenuDataMap
            }

        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },

            close() {
                this.$emit("close")
                this.remark = ''
            },

            addFood() {
                const food = this.getCurrFood
                food.remark = this.remark
                this.$emit("addFood", food)
                this.remark = ''
            },

            reduceFood() {
                this.$emit("reduceFood", this.getCurrFood)
            },

            chooseFlavor() {
                const food = this.getCurrFood
                food.remark = this.remark
                this.$emit("chooseFlavor", food)
                this.remark = ''
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .modal {
        @include layout-flex-c-center;
        align-items: center;
        position: fixed;
        z-index: 888;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;

        .panel {
            @include layout-flex-c;
            width: 90%;
            border-radius: 4px;
            background: #322831;
            position: relative;
            @include box-shadow(0 0 15px #000);
            @include set-height(335px);
            @include layout-flex-c;
            justify-content: flex-end;

            .content {
                background: rgba(26, 16, 25, 0.8);
                width: 100%;
                @include layout-flex-c;
                border-radius: 0 0 4px 4px;

                .name {
                    @include set-height(30px);
                    margin: 0 10px;
                    color: #dddddd;
                    @include font-dpr(15px);
                    @include layout-flex-c;
                    justify-content: flex-end;
                }

                .menu-line {
                    @include layout-flex-r-sb;
                    align-items: center;
                    position: relative;
                    box-sizing: border-box;
                    @include set-height(45px);
                    margin: 0 10px;
                    border-bottom: 1px solid #3E343D;

                    .rmb {
                        color: #01b695;
                        @include font-dpr(10px);

                        .price {
                            @include font-dpr(18px);
                        }

                        .unit {
                            @include font-dpr(14px);
                            color: #8D888F;

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
                        top: 6px;
                    }
                }

                .remark-line {
                    width: 100%;
                    @include set-height(45px);
                    @include layout-flex-r-sb;
                    align-items: center;

                    .desc {
                        @include layout-flex-r;
                        align-items: center;
                        margin-left: 10px;

                        .text {
                            @include font-dpr(15px);
                            color: #8D888F;
                            margin-left: 5px;
                        }
                    }

                    .remark {
                        width: 50%;
                        color: #8D888F;
                        @include font-dpr(14px);
                        padding-right: 10px;
                        text-align: right;
                        background: transparent;
                        border-color: transparent;
                    }
                }
            }
        }
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }

</style>