/*
* @Author: jgg
* @Date: 2018-05-05 17:42:32
* @Last Modified by: jgg
* @Last Modified time: 2018-05-08 16:47:30
* @Describe 发言模板
*/


<template>
    <div class="chat-content">
        <div class="item-chat">
            {{ this.msg }}
        </div>
        <Imag v-if="pic" v-bind:src="pic" classes="chat-img" @click.native="previewImage([pic])"/>

        <OperationMenu :mid="mid" :cid="cid" :liked="liked" :likedNumber="likedNumber"></OperationMenu>
    </div>
</template>

<script>
    import OperationMenu from './chat_msg_operation.vue'
    import Imag from '../component/Image.vue'

    var roomInfo = window.RINFO;

    export default {

        props: ["sId", "msg", "pic", "mid", "cid", "liked", "likedNumber"],

        data() {
            return {}
        },

        components: {OperationMenu, Imag},

        computed: {},

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

    @import '../../../../../style/sass/mixin.scss';

    .chat-content {
        @include layout-flex-c
    }

    .chat-content .item-chat {
        color: #999;
        @include font-dpr(13px);
        padding: 3px 5px 3px 0;
        display: block;
        word-break: break-all;
        word-wrap: break-word;
    }

    .chat-content .chat-img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        margin: 5px 0;
    }


</style>




