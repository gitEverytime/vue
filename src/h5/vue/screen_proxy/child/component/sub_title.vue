<template>
    <h1 class="sub-title">{{title}}</h1>
</template>

<script>
    export default {
        props: ["title"],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';
    .sub-title {
        margin: 10px 0 10px 20px;
        @include font-dpr(14px);
        border-left: 2px solid #01b695;
        color: #01b695;
        text-indent: 10px;
        line-height: 14px;
    }
</style>