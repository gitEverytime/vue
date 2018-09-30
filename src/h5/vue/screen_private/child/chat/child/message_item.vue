<template>
    <div class="message-item">
        <div class="top">
            <span class="time">{{getMessageTime}}</span>
        </div>
        <div class="content" :class="itemData.isMe ? 'flex-reverse' : ''">
            <Imag :src="itemData.headimg" classes="avatar"/>
            <span v-show="itemData.content" :class="itemData.isMe ? 'arrow-right' : 'arrow-left'"/>
            <div :class="itemData.isMe ? 'nome-cover' : 'cover'">
                <div v-show="itemData.content" :class="itemData.isMe ? 'me' : 'message'">{{this.itemData.content}}</div>
                <Imag v-show="itemData.pic" :src="itemData.pic" classes="pic" @click.native="previewImage([itemData.pic])"/>
            </div>
        </div>
    </div>

</template>

<script>
    import DateFormat from '../../../comm/date_format'
    import Imag from "../../component/Image.vue"
    export default {
        props: ["itemData"],

        components: {Imag},

        data() {
            return {}
        },

        computed: {
            getMessageTime() {
                return DateFormat.HM(this.itemData.date)
            }
        },

        mounted() {
        },

        methods: {
            setSelectValue(data) {
                this.$emit("E_CLICK", data)
            },

            previewImage(images) {
                this.$store.commit('storePreviewImageIndex', 0)
                this.$store.commit('storePreviewImages', images)
                this.$root.notify.$emit("ShowImagePreview")
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .message-item {
        @include layout-flex-c;

        .top {
            @include layout-flex-c-center;
            align-items: center;
            @include set-height(40px);

            .time {
                background: #322831;
                padding: 3px 5px;
                border-radius: 4px;
                margin: 10px;
                color: #8f888f;
            }
        }

        .content {
            @include layout-flex-r;
            justify-content: flex-start;
            margin-bottom: 10px;

            .avatar {
                width: 44px;
                height: 44px;
                margin: 0 10px;
                border-radius: 50%;
            }

            .arrow-right {
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-left-color: #019175;
                margin-top: 18px;
                margin-right: -10px;
            }

            .arrow-left {
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-right-color: #3e333d;
                margin-top: 18px;
                margin-left: -10px;
            }

            .cover {
                @include layout-flex-c;
                max-width: 60%;
            }

            .nome-cover {
                @include layout-flex-c;
                max-width: 60%;
            }

            .message {
                background: #3e333d;
                color: #bbb;
                border-radius: 4px;
                padding: 10px;
                @include font-dpr(14px);
                word-wrap: break-word;
                margin-top: 5px;
            }

            .me {
                background: #019175;
                color: #ddd;
                border-radius: 4px;
                padding: 10px;
                @include font-dpr(14px);
                word-wrap: break-word;
                margin-top: 5px;
            }

            .pic {
                max-width: 100%;
                border-radius: 4px;
                margin-top: 5px;
            }
        }

        .flex-reverse {
            @include layout-flex-r-reverse;
        }
    }
</style>