<template>
    <div class="sub-title">
        {{title}}
    </div>

</template>

<script>
    export default {
        props: ['title'],
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .sub-title {
        margin: 10px 10px 10px 25px;
        @include font-dpr(15px);
        border-left: 2px solid #01B695;
        color: #01B695;
        text-indent: 10px;
        line-height: 14px;
    }
</style>