<template>
    <div class="price-item" v-on:click="clickHandler">
        <span class="btn">{{time}}秒</span>
        <span class="price">￥{{price}}</span>
    </div>

</template>

<script>

    const E_CLICK_PRICE = "E_CLICK_PRICE";

    export default {
        props: ["time", "price", "priceKey"],

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {
            clickHandler() {
                this.$emit(E_CLICK_PRICE, {price: this.price, time: this.time, priceKey: this.priceKey});
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .price-item {
        @include layout-flex-c;
        text-align: center;
        align-items: center;
        width: 65px;
    }

    .price-item .btn {
        border-radius: 4px;
        background: #322831;
        padding: 5px 0 5px 0;
        color: #8d888f;
        @include font-dpr(14px);
        width: 80%;
    }

    .price-item .price {
        width: 100%;
        padding: 5px 5px 5px 0;
        @include font-dpr(14px);
        color: #8d888f;
    }

    .price-active .btn {
        color: #f5f5f5;
        background: #01b695;
    }

    .price-active .price {
        color: #01b695;
    }

</style>




