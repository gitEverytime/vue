<template>
    <div class="user-item">
        <img :src="avatar">
        <span>{{userName}}</span>
    </div>

</template>

<script>
    export default {
        props: ["avatar", "userName"],
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .user-item {
        @include layout-flex-r;
        align-items: center;
    }

    .user-item img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .user-item span {
        color: #35ffcc;
        margin-left: 5px;
        @include font-dpr(20px);
    }
</style>