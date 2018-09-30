<template>
    <div class="actor-item" v-on:click="selectActor">
        <div class="img-content">
            <img src="http://thirdwx.qlogo.cn/mmopen/JQpUg1oh5acs7vfaIWC8ukFbI4El6auxRPUWEQMvj6ibSqSf16ulLyp5RBLhW4k8Ke9lSq7bribwMaVALG544rYQ/132">
        </div>
        <span class="name">
            {{this.itemData.actorName}}
        </span>
        <span class="type">
            {{this.itemData.actorType}}
        </span>
    </div>

</template>

<script>
    export default {
        props: ["itemData"],

        data() {
            return {
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            selectActor() {
                this.$emit("E_CLICK_ACTOR", this.itemData)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .actor-item {
        @include layout-flex-c-center
    }

    .actor-item .img-content img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 10px 5px 5px 5px;
    }

    .actor-item .name {
        font-size: 14px;
        color: #666;
    }

    .actor-item .type {
        color: #999;
    }

    .actor-active .img-content img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 10px 5px 5px 5px;
    }

    .actor-active .name{
        color:#b225f0;
    }

    .actor-active .type{
        color: #b225f0;
    }

</style>

