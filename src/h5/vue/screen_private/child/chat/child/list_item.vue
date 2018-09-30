<template>
    <div class="list-item" v-on:click="clickItem">
        <div class="avatar">
            <Imag :src="itemData.headimg"/>
        </div>
        <div class="content">
            <div class="name">
                {{getName}}
            </div>
            <div class="message">
                {{getMessage}}
            </div>
        </div>
        <span class="time">
            {{getMessageTime}}
        </span>
    </div>
</template>

<script>
    import DateFormat from '../../../comm/date_format'
    import CatchControl from '../../../comm/catch_control'
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
            },
            getName() {
                return CatchControl.getUserById(this.itemData.userId).nickname
            },
            getMessage() {
                if (this.itemData.content) {
                    return this.itemData.content
                } else if (this.itemData.pic) {
                    return "[图片]"
                } else {
                    return ""
                }
            }
        },

        mounted() {
            this.$store.commit('storeClearUnReadMessageNumber')
        },

        methods: {
            clickItem() {
                this.$emit("E_CLICK_ITEM", this.itemData)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .list-item {
        @include layout-flex-r;
        padding: 15px 10px;
        border-bottom: 1px solid #322831;

        .avatar img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
        }

        .content {
            flex: 1;
            @include layout-flex-c;

            .name {
                color: #DDDDDD;
                @include font-dpr(15px);
                padding: 2px 8px 0 10px;
            }

            .message {
                color: #8D888F;
                @include font-dpr(12px);
                padding: 2px 10px;
                @include singleLine;
                word-break: break-all;
            }
        }

        .time {
            color: #8D888F;
            @include font-dpr(12px);
            text-align: right;
        }
    }
</style>