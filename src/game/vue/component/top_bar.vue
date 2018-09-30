<template>
    <div class="top-bar">
        <span class="left" v-on:click="clickBack">< 返回</span>
        <span class="center">毕果互动</span>
        <span class="right">···</span>
    </div>

</template>

<script>
    const E_CLICK_BACK = "E_CLICK_BACK"
    export default {
        methods: {
            clickBack(data) {
                this.$emit(E_CLICK_BACK, data)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .top-bar {
        @include layout-flex-r-sb;
        height: 50px;
        width: 100%;
        background: #000;
        align-items: center;
    }

    .top-bar .left {
        color: #FFFFFF;
        padding: 0 10px;
        @include font-dpr(16px);
    }

    .top-bar .center {
        color: #FFFFFF;
        padding: 0 10px;
        @include font-dpr(18px);
    }

    .top-bar .right {
        color: #FFFFFF;
        padding: 0 10px;
        @include font-dpr(16px);
        font-weight: 600;
    }

</style>