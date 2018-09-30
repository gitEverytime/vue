<template>
    <div class="info-line">
        <span class="left">{{left}}</span>
        <span class="right">{{right}}</span>
    </div>
</template>

<script>
    export default {
        props: ['left', 'right'],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .info-line {
        width: 100%;
        @include layout-flex-r-sb;
        @include set-height(30px);
        align-items: center;
        @include font-dpr(15px);
        box-sizing: border-box;
        padding: 0 24px;

        .left {
            color: #5f5563;
            margin-left: 12px;
        }

        .right {
            color: #8D888F;
        }
    }

</style>