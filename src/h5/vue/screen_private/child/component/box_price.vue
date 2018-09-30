<template>
    <h1 class="box-price" :class="{'price-active' : price}">￥{{price}}</h1>
</template>

<script>
    export default {
        props: ["price"],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-price {
        color: #5f525e;
        @include font-dpr(29px);
        text-align: center;
    }

    .price-active {
        color: #01b695;
    }
</style>