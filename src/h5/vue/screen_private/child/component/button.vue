<template>
    <h1 class="button">{{text}}</h1>
</template>

<script>
    export default {
        props: ["text"],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .button {
        @include set-h(44px);
        text-align: center;
        border-radius: 4px;
        background: #cd533e;
        color: #fff;
        @include font-dpr(16px);
        margin: 10px 20px;
    }
</style>