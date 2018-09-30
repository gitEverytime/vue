<template>
    <div class="user-item">
        <Imag :src="avatar"/>
        <span>{{userName}}</span>
    </div>

</template>

<script>
    import Imag from '../component/Image.vue'
    export default {
        props: ["avatar", "userName"],
        components: {Imag},
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';
    .user-item {
        @include layout-flex-r;
        align-items: center;
    }

    .user-item img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    .user-item span{
        color: #35ffcc;
        margin-left: 5px;
    }
</style>