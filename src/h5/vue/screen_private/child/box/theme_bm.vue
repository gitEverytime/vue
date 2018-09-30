<template>
    <div class="theme_bm">
        <div class="title">
            {{getTitle}}
        </div>
        <Imag v-if="pic" v-bind:src="pic" classes="img" @click.native="previewImage([pic])"/>
        <OperationMenu :mid="mid" :cid="cid" :liked="liked" :likedNumber="likedNumber"></OperationMenu>
    </div>

</template>

<script>
    import OperationMenu from './chat_msg_operation.vue'
    import ConstValue from '../../comm/const_value'
    import Imag from "../component/Image.vue"

    export default {
        props: ["cid", "mid", "type", "pic", "liked", "likedNumber"],

        data() {
            return {}
        },

        computed: {
            getTitle() {
                return "【霸麦】" + (this.type == ConstValue.INTERACTION_BM_HEART ? '真心话' : '好声音')
            },
        },

        components: {OperationMenu, Imag},

        mounted() {

        },
        methods: {
            previewImage(images) {
                this.$store.commit('storePreviewImageIndex', 0)
                this.$store.commit('storePreviewImages', images)
                this.$root.notify.$emit("ShowImagePreview")
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .theme_bm {
        @include layout-flex-c
    }

    .theme_bm .title {
        @include font-dpr(14px);
        border-bottom: 1px solid rgba(1, 182, 149, 0.2);
        line-height: 25px;
        padding-bottom: 5px;
        color: #1EFF00;
    }

    .theme_bm .img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        margin: 5px 0;
    }

</style>