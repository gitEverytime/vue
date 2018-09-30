<template>
    <div class="title-box">
        <div class="content">
            <div class="left">
                <span class="link" @click="goToChatList">我在{{barName}}</span>
                <span v-if="getTalkTotal" class="badge" id="badge"> {{getTalkTotal}} </span>
            </div>
            <div class="right">
                <div class="welcome" id="welcome" v-if="getEnterUserName">
                    欢迎 <span class="user">{{getEnterUserName}}</span> 进店
                </div>
            </div>
        </div>
        <div class="ad" v-if="showAd && getAdIsOn">
            <div class="close" @click="closeAd">
                <span class="icon icon-close"></span>
            </div>
            <div class="marquee-box">
                <div class="marquee">
                    {{getAdText[adIndex] || ''}}
                </div>
                <div class="marquee-row">
                    {{getAdText[adIndex] || ''}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import CatchControl from "../../comm/catch_control.js";
    import $ from "jquery"

    var roomInfo = window.RINFO;

    export default {

        components: {},

        data() {
            return {
                userName: roomInfo.nickName,
                barName: roomInfo.storeName,
                showAd: true,
                msg: [],
                adIndex: 0,
            }
        },
        computed: {
            getEnterUserName() {
                this.startScrollName()
                return this.$store.getters.getCurrEnterUser.userName;
            },

            getTalkTotal() {
                return this.$store.getters.getUnReadMessageNumber
            },

            getAdIsOn() {
                if (this.$store.getters.getPrivateCfg.storeTitle) {
                    const ads = JSON.parse(this.$store.getters.getPrivateCfg.storeTitle)
                    if (ads.isOn == 1) {
                        return true
                    }
                }
                return false
            },

            getAdText() {
                if (!this.$store.getters.getPrivateCfg.storeTitle) {
                    return []
                } else {
                    const ads = JSON.parse(this.$store.getters.getPrivateCfg.storeTitle)
                    const msg = []
                    Object.keys(ads).forEach(item => {
                        if (item.startsWith('title')) {
                            msg.push(ads[item])
                        }
                    })
                    this.msg = msg
                    if (this.msg.length) {
                        setInterval(() => {
                            if (this.adIndex < this.msg.length - 1) {
                                this.adIndex++;
                            } else {
                                this.adIndex = 0
                            }
                        }, 1000 * 5)
                    }
                    return msg
                }
            }
        },

        mounted() {
            this.startFlicker()
            setTimeout(() => {
                this.closeAd()
            }, 1000 * 15)
        },

        methods: {
            closeAd() {
                this.showAd = false
            },

            startScrollName() {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    const welcome = $("#welcome")
                    welcome.animate({bottom: '10px', opacity: '0'}, "slow");
                    welcome.animate({bottom: '-10px', opacity: '0'}, "0");
                    welcome.animate({bottom: '0', opacity: '1'}, "slow");
                }, 3000)
            },

            startFlicker() {
                let showBadge = true
                this.timer1 = setInterval(() => {
                    const budge = $("#badge")
                    budge.animate({opacity: showBadge ? '0' : '1'}, "1");
                    showBadge = !showBadge
                }, 1000)
            },

            goToChatList() {
                this.$router.push({
                    name: 'chatList'
                })
            }
        },

        beforeDestroy() {
            clearInterval(this.timer)
            clearInterval(this.timer1)
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin.scss';

    .title-box {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        box-sizing: border-box;
        z-index: 90;

        .content {
            background-color: rgba(0, 124, 100, 0.9);
            @include layout-flex-r-sb;
            width: 100%;
            height: 35px;
            align-items: center;

            .left {
                @include layout-flex-r;

                .link {
                    color: #ddd;
                    margin-left: 10px;
                    @include font-dpr(14px);
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 200px;
                    overflow: hidden;
                }

                .badge {
                    display: block;
                    background-color: #cd533e;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 8px;
                    width: 12px;
                    height: 12px;
                    text-align: center;
                    position: relative;
                    top: -5px;
                    left: 3px;
                    @include layout-flex-c-center;
                    align-items: center;
                }
            }

            .right {
                .welcome {
                    color: #eee;
                    margin-right: 10px;
                    @include font-dpr(14px);
                    position: relative;
                }
            }
        }

        .ad {
            background-color: rgba(0, 124, 100, 0.8);
            @include layout-flex-r;
            height: 30px;
            align-items: center;

            .close {
                @include layout-flex-c-center;
                align-items: center;
                margin-left: 10px;
            }

            .marquee-box {
                @include font-dpr(13px);
                color: #ddd;
                margin-left: 10px;

                overflow: hidden;
                position: relative;
                height: 100%;
                flex-grow: 1;

                .marquee {
                    width: 100%;
                    line-height: 30px;
                    overflow: hidden;
                    @include layout-flex-r;
                    justify-content: flex-start;
                    animation: marquee 30s infinite;
                    -webkit-animation: marquee 30s infinite; /*Safari and Chrome*/
                    animation-timing-function: linear;
                    -webkit-animation-timing-function: linear; /* Safari and Chrome */
                    position: absolute;
                    left: 0;
                }

                .marquee-row {
                    width: 100%;
                    line-height: 30px;
                    overflow: hidden;
                    @include layout-flex-r;
                    justify-content: flex-start;
                    animation: marquee-row 30s infinite;
                    -webkit-animation: marquee-row 30s infinite; /*Safari and Chrome*/
                    animation-timing-function: linear;
                    -webkit-animation-timing-function: linear; /* Safari and Chrome */
                    position: absolute;
                    right: -100%;
                }

                @keyframes marquee-row {
                    from {
                        right: -100%;
                    }
                    to {
                        right: 0;
                    }
                }

                @-webkit-keyframes marquee-row /*Safari and Chrome*/
                {
                    from {
                        right: -100%;
                    }
                    to {
                        right: 0;
                    }
                }

                @keyframes marquee {
                    from {
                        left: 0px;
                    }
                    to {
                        left: -100%;
                    }
                }

                @-webkit-keyframes marquee /*Safari and Chrome*/
                {
                    from {
                        left: 0px;
                    }
                    to {
                        left: -100%;
                    }
                }
            }
        }
    }
</style>




