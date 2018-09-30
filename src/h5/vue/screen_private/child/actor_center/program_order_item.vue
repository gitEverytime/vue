<template>
    <div class="order-item">
        <div class="top">
            <span class="title">NO{{' ' + itemData.index + '. ' + itemData.programTitle}}</span>
            <span class="time">{{getTime}}</span>
        </div>
        <div class="center">
            <Imag :src="getAvatar" classes="avatar"/>
            <div class="content">
                <span class="name">{{itemData.cname + ' 点播留言：'}}</span>
                <p class="remark">{{itemData.remarks || '无'}}</p>
            </div>
        </div>
        <div class="bottom">
            <span class="btn" :class="{'btn-no': itemData.status == 1}" @click="orderTake">{{getBtnText}}</span>
        </div>
    </div>

</template>

<script>
    import DateFormat from "../../comm/date_format"
    import CatchControl from "../../comm/catch_control"
    import Imag from "../component/Image.vue"

    export default {
        props: ["itemData"],

        components: {Imag},

        data() {
            return {}
        },

        computed: {
            getTime() {
                return DateFormat.HMS(this.itemData.createdAt)
            },

            getAvatar() {
                if (CatchControl.getUserById(this.itemData.cid)) {
                    return CatchControl.getUserById(this.itemData.cid).headimg
                } else {
                    return ''
                }

            },

            getBtnText() {
                return this.itemData.status == 0 ? '接单表演' : '已确认表演'
            }
        },

        mounted() {
        },

        methods: {
            orderTake() {
                if (this.itemData.status == 1) return
                this.$emit("confirm", this.itemData.id)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .order-item {
        margin-top: 10px;
        width: 100%;
        @include layout-flex-c;
        background: #322831;

        .top {
            padding: 0 10px;
            @include layout-flex-r-sb;
            align-items: center;
            @include set-height(45px);
            border-bottom: 1px solid #221821;

            .title {
                color: #01B695;
                @include font-dpr(15px);
            }

            .time {
                color: #8D888F;
                @include font-dpr(14px);
            }
        }

        .center {
            @include layout-flex-r;
            border-bottom: 1px solid #221821;

            .avatar {
                @include set-width-height(44px, 44px);
                border-radius: 50%;
                margin: 10px;
            }

            .content {
                @include layout-flex-c;
                flex: 1;
                padding-right: 10px;

                .name {
                    color: #8D888F;
                    @include font-dpr(14px);
                    margin-top: 8px;
                }

                .remark {
                    flex: 1;
                    @include font-dpr(14px);
                    color: #ccc;
                    margin: 10px 0;
                }
            }

        }

        .bottom {
            height: 53px;
            width: 100%;
            @include layout-flex-c-center;
            align-items: center;

            .btn {
                width: 38%;
                @include set-height(33px);
                background: #CD533E;
                color: #F5F5F5;
                @include font-dpr(14px);
                @include layout-flex-c-center;
                align-items: center;
                border-radius: 4px;
            }

            .btn-no {
                background: #8D888F;
                color: #CBC7CD;
            }
        }
    }
</style>