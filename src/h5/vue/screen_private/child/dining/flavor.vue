<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <span class="close icon icon-close-yellow" @click="close"></span>
                <h1 class="name">{{getCurrFood.carteName}}</h1>
                <span class="taste">口味:</span>
                <div class="content">
                    <span class="label" v-for="(item, index) in getCurrTastes"
                          :class="{'active': index === currKey}" @click="clickLabel(index)">{{item}}</span>
                </div>
                <div class="line">
                    <div class="left">
                        <div class="rmb">￥<span class="price">{{Number(getCurrFood.cartePrice)}}</span></div>
                        <span class="desc">（{{getCurrTastes[currKey]}}）</span>
                    </div>
                    <div class="right" @click="addFood">+加入购物车</div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        props: ["show"],

        data() {
            return {
                currKey: 0,
            }
        },

        computed: {
            getCurrFood() {
                return this.$store.getters.getCurrFood
            },

            getCurrTastes() {
                return this.$store.getters.getCurrTastes
            }
        },

        methods: {
            close() {
                this.$emit("close")
                this.currKey = 0
            },

            addFood() {
                const food = this.getCurrFood
                food.taste = this.getCurrTastes[this.currKey]
                this.$emit("addFood", food)
            },

            clickLabel(index) {
                this.currKey = index
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
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;

        .panel {
            @include layout-flex-c;
            width: 90%;
            border-radius: 5px;
            background: #322831;
            position: relative;
            margin-bottom: 20%;
            @include box-shadow(0 0 15px #000);

            .close {
                position: absolute;
                top: 15px;
                right: 15px;
            }

            .name {
                color: #cccccc;
                @include font-dpr(15px);
                width: 100%;
                text-align: center;
                margin-top: 15px;
            }

            .taste {
                color: #8D878F;
                @include font-dpr(15px);
                margin-top: 10px;
                margin-left: 15px;
            }

            .content {
                @include layout-flex-r-wrap;
                margin: 8px;

                .label {
                    @include font-dpr(15px);
                    color: #8d878f;
                    border: 1px solid #4A3F49;
                    background: transparent;
                    margin: 7px;
                    padding: 10px 15px;
                    border-radius: 4px;
                }

                .active {
                    color: #F5F5F5;
                    border: 1px solid #00B795;
                    background: #02B693;
                }
            }

            .line {
                padding: 0 15px;
                @include layout-flex-r-sb;
                align-items: center;
                background: #4A3F49;
                @include set-height(44px);
                border-radius: 0 0 4px 4px;

                .left {
                    @include layout-flex-r;
                    align-items: center;

                    .rmb {
                        color: #01b695;
                        @include font-dpr(10px);

                        .price {
                            @include font-dpr(19px);
                        }
                    }

                    .desc {
                        color: #8d888f;
                        @include font-dpr(15px);
                        margin-left: 10px;
                    }
                }

                .right {
                    color: #02b693;
                    @include font-dpr(15px);
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