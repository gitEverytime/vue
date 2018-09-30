<template>
    <transition name="user-fade">
        <div class="user-item" @click="closePenal">
            <div class="penal" @click.stop>
                <span class="btn-close icon icon-close-on" v-on:click="closePenal"></span>
                <Imag v-bind:src="userInfo.headimg" classes="head-img"/>

                <div class="name-line">
                    <span class="icon" :class="getSex"></span>
                    <span class="name">{{this.userInfo.nickname}}</span>
                </div>

                <div class="class-line">
                    <span class="icon icon-level-lv0"></span>
                    <span class="class-name">果宝</span>
                </div>

                <!--<span class="wechat">微信号</span>-->

                <span class="one-line"></span>

                <div class="menu">
                    <span class="btn" v-on:click="sendPrivateMessage">私信</span>
                    <span class="btn" v-on:click="followHandler">{{getFollowText}}</span>
                    <!--<span class="btn" v-on:click="sendGift">送礼物</span>-->
                    <!--<span class="btn" v-on:click="sendRedPacket">发红包</span>-->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import REQ from '../../comm/request'
    import ConstValue from '../../comm/const_value'
    import Imag from '../component/Image.vue'

    const roomInfo = window.RINFO;
    export default {
        props: ["userInfo"],

        data() {
            return {
                follow: 1,
            }
        },

        components: {Imag},

        computed: {
            getSex() {
                return this.userInfo.sex == 1 ? 'icon-man-mine' : (this.sex == 2 ? 'icon-woman-mine' : '')
            },
            getFollowText() {
                return this.follow ? '关注' : '取消关注'
            }
        },

        mounted() {
            this.getFollowState()
        },

        methods: {
            closePenal() {
                this.$emit("E_CLOSE_PENAL")
            },

            sendPrivateMessage() {
                this.closePenal()
                this.goToChatPage()
            },

            sendGift() {
                this.closePenal()
            },

            sendRedPacket() {
                this.closePenal()
            },

            getFollowState() {
                REQ.reqGetFollowStatus({
                        cid: roomInfo.clientId,
                        tid: this.userInfo.clientId
                    },
                    (response) => {
                        if (response.data.status == ConstValue.FOLLOWSTATUS_FOLLOW || response.data.status == ConstValue.FOLLOWSTATUS_FOLLOW_MUTUAL) {
                            this.follow = 0
                        } else {
                            this.follow = 1
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            followHandler() {
                REQ.reqFollowOrNot({
                        cid: roomInfo.clientId,
                        tid: this.userInfo.clientId,
                        type: this.follow
                    },
                    (response) => {
                        this.follow = this.follow ? 0 : 1
                    },
                    (complete) => {
                    },
                    (err) => {
                    }
                )
            },

            goToChatPage() {
                var userInfo = this.userInfo;
                userInfo.tsId = userInfo.sId;
                userInfo.sId = roomInfo.sId;
                this.$store.commit("setChatUserInfo", userInfo)
                this.$router.push({
                    name: 'chatList'
                }, () => {
                    this.$router.push({name: 'chatRoom'})
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .user-item {
        width: 100%;
        height: 100%;
        @include layout-flex-c-center;
        align-items: center;

        .penal {
            @include layout-flex-c;
            align-items: center;
            width: 75%;
            height: auto;
            background: #3b313a;
            border-radius: 5px;
            @include box-shadow(0 0 15px #000);
            margin-bottom: 20%;
            position: relative;

            .head-img {
                margin-top: -36px;
                width: 72px;
                height: 72px;
                border-radius: 50%;
            }

            .name-line {
                @include layout-flex-r;
                margin-top: 15px;
                align-items: center;

                .name {
                    color: #ddd;
                    padding: 0 5px;
                    @include font-dpr(14px)
                }
            }

            .class-line {
                @include layout-flex-r;
                align-items: center;
                position: absolute;
                top: 12px;
                left: 12px;

                .class-name {
                    padding: 0 5px 3px 5px;
                    @include font-dpr(14px);
                    color: #d8d854;
                }
            }

            .wechat {
                color: #aaa;
                @include font-dpr(14px);
                margin-top: 10px;
            }

            .one-line {
                width: 100%;
                height: 1px;
                margin: 10px 0 0 0;
                background: rgba(156, 140, 154, 0.1);
            }

            .menu {
                @include layout-flex-r-sb;
                width: 100%;
                padding: 0 10px;
                @include set-height(45px);
                align-items: center;

                .btn {
                    color: #01b695;
                    flex: 1;
                    @include font-dpr(14px);
                    text-align: center;
                }
            }

            .btn-close {
                position: absolute;
                top: 12px;
                right: 12px;
            }
        }
    }

    .user-fade-enter,
    .user-fade-leave-active {
        opacity: 0;
    }

    .user-fade-enter-active,
    .user-fade-leave-active {
        transition: opacity .5s ease
    }
</style>