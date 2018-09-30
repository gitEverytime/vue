<template>
    <div class="gift-content">
        <img v-bind:src="icon">
        <div class="name">{{name}}</div>
        <div class="price">￥{{price}}</div>
    </div>
</template>

<script>
    export default {
        props: ["icon", "name", "price", "id", "clickGift"],

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .gift-content {
        @include layout-flex-c;
        width: 100%;
        height: 72px;
        overflow: hidden;
        align-items: center;
        border: 1px solid transparent;
    }

    .gift-content img {
        width: 44px;
        height: 44px;
        margin: 5px 0;
    }

    .gift-content .name {
        color: #8d888f;
        @include font-dpr(10px);
        margin-bottom: 3px;
    }

    .gift-content .price {
        color: #8d888f;
        @include font-dpr(10px);
        margin-bottom: 3px;
    }

    .gift-active {
        border-radius: 4px;
        border: 1px solid #01b695;
        @include box-shadow(0 0 3px #01b695);
    }

    .gift-active .name {
        color: #01b695;
    }

    .gift-active .price {
        color: #01b695;
    }
</style>