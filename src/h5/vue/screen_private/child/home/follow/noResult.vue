<template>
    <div class="no-result">
        <div class="no-follow bgd bg-no-follow"></div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    import REQ from '../../../comm/request'
    export default {
        props: ["title"],
        data() {
            return {
                imgSrc: REQ.apiStaticDomain + '/static/img/new/empty.png'
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .no-result {
        @include layout-flex-c-center;
        align-items: center;
        height: 100%;

        .no-follow {
            width: 200px;
            height: 136px;
        }

        .title {
            @include font-dpr(16px);
            color: #999;
            margin-top: 20px;
            margin-bottom: 30%;
        }
    }
</style>