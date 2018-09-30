<template>
    <div class="reward-real-item">
        <Imag v-bind:src="icon" />
        <div class="name">{{foodName}}</div>
        <div class="price">￥{{price}}</div>
    </div>
</template>

<script>
    import Imag from "../../component/Image.vue"
    export default {
        props: ["icon", "foodName", "price", "id"],
        components: {Imag},
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .reward-real-item {
        @include layout-flex-c;
        width: 100%;
        height: 72px;
        overflow: hidden;
        align-items: center;
        border: 1px solid transparent;

        img {
            width: 50px;
            height: 38px;
            margin: 5px 0;
        }

        .name {
            color: #8d888f;
            @include font-dpr(10px);
            margin-bottom: 3px;
        }

        .price {
            color: #8d888f;
            @include font-dpr(10px);
            margin-bottom: 3px;
        }
    }

    .gift-active {
        border-radius: 4px;
        border: 1px solid #01b695;
        @include box-shadow(0 0 3px #01b695);

        .name {
            color: #01b695;
        }

        .price {
            color: #01b695;
        }
    }
</style>