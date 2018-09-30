/*
* @Author: jgg
* @Date: 2018-05-05 17:42:32
* @Last Modified by: jgg
* @Last Modified time: 2018-05-07 15:52:58
* @Describe 霸屏模板
*/


<template>
    <div class="theme-screen">
        <div class="screen-title">
            <span class="text" :style="{color: getOnScreenColor}">{{getOnScreenText}} {{duration}}s</span>
            #{{this.mediaTitle}}#
        </div>
        <div class="screen-chat">
            {{this.msg}}
        </div>
        <Imag v-if="pic && pic.split(',').length === 1" v-bind:src="pic" classes="screen-img"
              @click.native="previewImage([pic], 0)"/>
        <div class="images" v-if="pic && pic.split(',').length > 1">
            <BImag v-for="(item, index) in pic.split(',')" :src="item" class="img" :key="Date.now() * Math.random()"
                   @click.native="previewImage(pic.split(','),index)"/>
        </div>
        <OperationMenu :mid="mid" :cid="cid" :liked="liked" :likedNumber="likedNumber"></OperationMenu>
    </div>

</template>

<script>
    import OperationMenu from './chat_msg_operation.vue'
    import ConstValue from "../../comm/const_value"
    import Imag from "../component/Image.vue"
    import BImag from "../component/BImage.vue"

    var roomInfo = window.RINFO;

    export default {
        props: ["sId", "msg", "mediaTitle", "pic", "mid", "cid", "onScreenType", "duration", "liked", "likedNumber"],

        data() {
            return {}
        },

        components: {OperationMenu, BImag, Imag},

        computed: {
            getOnScreenText() {
                return ConstValue.getScreenType(this.onScreenType)
            },

            getOnScreenColor() {
                return ConstValue.getScreenColor(this.onScreenType)
            }
        },

        mounted() {

        },

        methods: {
            previewImage(images, index) {
                this.$store.commit('storePreviewImageIndex', index)
                this.$store.commit('storePreviewImages', images)
                this.$root.notify.$emit("ShowImagePreview")
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .theme-screen {
        @include layout-flex-c;
        position: relative;

        .screen-chat {
            color: #999;
            @include font-dpr(13px);
            padding: 5px 5px 3px 0;
            display: block;
            word-break: break-all;
            word-wrap: break-word;
        }

        .screen-title {
            color: #f5f5f5;
            @include font-dpr(14px);
            border-bottom: 1px solid rgba(1, 182, 149, 0.2);
            line-height: 25px;
            padding-bottom: 3px;
        }

        .screen-img {
            width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 5px 0;
        }

        .images {
            @include layout-flex-r-wrap;
            justify-content: space-between;
            position: relative;

            .img {
                width: 48%;
                margin: 4px 0;
                border-radius: 4px;
                height: 100px;
            }
        }
    }
</style>




