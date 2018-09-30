<template>
    <div class="red-package">
        <transition name="red-fade">
            <div class="red-modal" @click="firstClose" v-show="firstShow">
                <div class="panel bgd bg-big-red" @click.stop="takeRedPackage">
                    <img :src="headimg">
                    <span class="name">{{name}}</span>
                    <span class="text">发了一个红包</span>
                    <span class="content">{{content}}</span>
                </div>
            </div>
        </transition>

        <transition name="red-fade">
            <div class="red-modal" @click="nextClose" v-show="nextShow">
                <div class="panel2" @click.stop>
                    <span class="top"></span>
                    <img :src="headimg">
                    <span class="name">{{name}}的红包</span>
                    <span class="text">{{content}}</span>
                    <div class="money-line">
                        <span class="money">{{result}}</span>
                        <span class="yuan" v-if="Number(result)">元</span>
                    </div>
                    <span class="bottom">{{getBottomText}}</span>
                    <span class="close icon icon-close-yellow" @click="nextClose"></span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import MsgType from "../../comm/msg_type"
    import REQ from "../../comm/request"

    const roomInfo = window.RINFO

    export default {
        data() {
            return {
                firstShow: false,
                nextShow: false,
                headimg: '',
                content: '',
                name: '',
                rid: '',
                result: '',
            }
        },

        computed: {
            getBottomText() {
                if (Number(this.result)) {
                    return "已存入您的钱包，可用于平台消费"
                } else {
                    return "哎呀！手慢了不到一秒钟！下一个加速"
                }
            }
        },

        mounted() {
            this.$root.notify.$on(MsgType.DISPATCH_DOWN_RED_PACKAGE_PUB, data => {
                this.headimg = data.headimg
                this.content = data.content
                this.name = data.cname
                this.rid = data.rid
                setTimeout(() => {
                    this.firstShow = true
                }, 500)
            })

            this.$root.notify.$on(MsgType.DISPATCH_DOWN_RED_PACKAGE_PRI, data => {
                this.headimg = data.headimg
                this.content = data.content
                this.name = data.cname
                this.rid = data.rid
                setTimeout(() => {
                    this.firstShow = true
                }, 500)
            })
        },

        methods: {
            firstClose() {
                this.firstShow = false
            },

            nextClose() {
                this.nextShow = false
            },

            takeRedPackage() {
                const params = {
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    rid: this.rid,
                }
                REQ.reqTakeRedPackage(params,
                    (res) => {
                        this.$logger(res)
                        this.result = res.data.amount
                        this.firstShow = false
                        this.nextShow = true
                    },
                    (complete) => {
                    },
                    () => {
                        this.firstShow = false
                        this.result = "抢光啦！"
                        this.nextShow = true
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .red-package {
        .red-modal {
            @include layout-flex-c-center;
            align-items: center;
            position: fixed;
            z-index: 9000;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            width: 100%;
            height: 100%;

            .panel {
                @include layout-flex-c;
                @include set-width-height(305px, 320px);
                align-items: center;
                margin-bottom: 20%;

                img {
                    @include set-width-height(52px, 52px);
                    border-radius: 50%;
                    margin-top: 70px;
                }

                .content {
                    color: #d8d854;
                    @include font-dpr(20px);
                    margin-top: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    @include set-width(230px);
                    padding: 0 20px;
                    text-align: center;
                }
            }

            .panel2 {
                @include layout-flex-c;
                @include set-width-height(250px, 270px);
                align-items: center;
                margin-bottom: 7%;
                background: #e75043;
                border-radius: 20px;
                position: relative;

                .top {
                    width: 100%;
                    height: 52px;
                    background: #f76255;
                    border-radius: 20px 20px 0 0;
                }

                img {
                    @include set-width-height(52px, 52px);
                    border-radius: 50%;
                    margin-top: -26px;
                }

                .content {
                    color: #d8d854;
                    @include font-dpr(20px);
                    margin-top: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    @include set-width(230px);
                    padding: 0 20px;
                    text-align: center;
                }

                .money-line {
                    @include layout-flex-r-center;
                    align-items: baseline;
                    margin-top: 35px;

                    .money {
                        color: #d8d854;
                        @include font-dpr(40px);
                    }

                    .yuan {
                        color: #d8d854;
                        @include font-dpr(14px);
                        margin-left: 5px;
                    }
                }

                .bottom {
                    margin-top: 20px;
                    @include font-dpr(12px);
                    color: #f4f4cf;
                }

                .close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                }
            }

            .name {
                color: #d8d854;
                @include font-dpr(14px);
                margin-top: 8px;
            }

            .text {
                color: #c8c869;
                @include font-dpr(13px);
                margin-top: 6px;
            }
        }

        .red-fade-enter,
        .red-fade-leave-active {
            opacity: 0;
        }

        .red-fade-enter-active,
        .red-fade-leave-active {
            transition: opacity .5s ease
        }
    }

</style>