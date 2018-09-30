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
        margin: 10px 0 0 10px;
        @include font-dpr(14px);
        border-left: 2px solid #8d8890;
        color: #8d8890;
        text-indent: 10px;
        line-height: 14px;
    }
</style>