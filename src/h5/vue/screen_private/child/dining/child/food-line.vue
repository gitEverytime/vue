<template>
    <div class="food-line">
        <span class="name">{{info.carteName}}{{info.carteTaste ? `（${info.carteTaste}）` : ''}}</span>
        <span class="count">x {{' ' + info.carteCount}}</span>
        <span class="price">￥{{Number(info.cartePrice)}}/份</span>
    </div>
</template>

<script>
    export default {
        props: ['info'],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .food-line {
        width: 100%;
        @include layout-flex-r;
        @include set-height(30px);
        align-items: center;
        @include font-dpr(15px);
        box-sizing: border-box;
        padding: 0 24px;

        .name {
            color: #8D888F;
            flex: 5;
            margin-left: 12px;
        }

        .count {
            color: #8D888F;
            flex: 1;
        }

        .price {
            color: #007C64;
            flex: 2;
            text-align: right;
        }
    }

</style>