<template>
    <div class="box-title">
        {{title}}
    </div>

</template>

<script>
    export default {
        props: ["title"],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-title {
        width: 100%;
        @include set-h(44px);
        background: #322831;
        color: #dddddd;
        @include font-dpr(15px);
        text-align: center;
        border-top-right-radius: 8px;
        border-bottom: 1px solid #221821;
    }

</style>