<template>
    <div>
        <Modal :show="wifiModalShow" @close="closeWifiModal" type="wifi" :content="wifiModalContent" btnText="朕已阅"
               @confirm="closeWifiModal"/>
        <div class="nav-box">
            <span class="wifi icon icon-wifi" @click="showWifiModal"></span>
            <!--<span class="friend icon icon-friend"></span>-->
            <div class="scroll" @click="scroll('top')">
                <span class="icon icon-arrow-up-no"></span>
            </div>
            <ul class="ul-box" ref="menu">
                <!--霸屏-->
                <li v-on:click="openHander(6)">
                    <span v-if="currIndex !== 6" class="fill"></span>
                    <span v-if="currIndex === 6" class="arrow"></span>
                    <span v-if="currIndex === 6" class="arrow-small"></span>
                    <span class="icon icon-onscreen"></span>
                    <!--<img style="height: 44px; width: 44px;" src="http://static.ibigtop.com/static/img/new/onscreen.gif">-->
                </li>
                <!--打赏-->
                <li v-on:click="openHander(5)">
                    <span v-if="currIndex !== 5" class="fill"></span>
                    <span v-if="currIndex === 5" class="arrow"></span>
                    <span v-if="currIndex === 5" class="arrow-small"></span>
                    <span class="icon icon-reward"></span>
                </li>
                <!--点歌-->
                <li v-if="getProgramBtnStatus" v-on:click="openHander(4)">
                    <span v-if="currIndex !== 4" class="fill"></span>
                    <span v-if="currIndex === 4" class="arrow"></span>
                    <span v-if="currIndex === 4" class="arrow-small"></span>
                    <span class="icon icon-sing"></span>
                </li>

                <!--游戏-->
                <li v-on:click="openHander(7)">
                    <span v-if="currIndex !== 7" class="fill"></span>
                    <span v-if="currIndex === 7" class="arrow"></span>
                    <span v-if="currIndex === 7" class="arrow-small"></span>
                    <span class="icon icon-game"></span>
                </li>

                <!--霸麦-->
                <li v-on:click="openHander(8)">
                    <span v-if="currIndex !== 8" class="fill"></span>
                    <span v-if="currIndex === 8" class="arrow"></span>
                    <span v-if="currIndex === 8" class="arrow-small"></span>
                    <span class="icon icon-microphone"></span>
                </li>

                <!--艺人-->
                <li v-on:click="openHander(1)">
                    <span v-if="currIndex !== 1" class="fill"></span>
                    <span v-if="currIndex === 1" class="arrow"></span>
                    <span v-if="currIndex === 1" class="arrow-small"></span>
                    <span class="icon icon-actor"></span>
                </li>
                <!--我的-->
                <li v-on:click="openHander(3)">
                    <span class="fill"></span>
                    <span class="icon icon-mine"></span>
                </li>

            </ul>
            <div class="scroll" @click="scroll('bottom')">
                <span class="icon icon-arrow-down-no"></span>
            </div>
        </div>
    </div>
</template>

<script>

    import MsgType from "../comm/msg_type.js";
    import Modal from "../child/component/modal.vue"
    import REQ from '../comm/request'

    const roomInfo = window.RINFO
    var E_R_MENU_CLICK = "E_R_MENU_CLICK";

    export default {

        components: {Modal},

        data() {
            return {
                isShowProgram: true,
                wifiModalShow: false,
                wifiModalContent: ["WIFI名称：", "WIFI密码："],
            }
        },


        computed: {
            getProgramBtnStatus() {
                return this.$store.getters.getActorList.length > 0;
            },

            currIndex() {
                return this.$store.getters.getRightTabIndex
            }

        },

        mounted() {
            var _this = this;
            this.$root.notify.$on(MsgType.DISPATCH_DOWN_SIGN_IN, function (data) {
                _this.isShowProgram = true;
            });

            this.$root.notify.$on(MsgType.DISPATCH_DOWN_SIGN_OUT, function (data) {
                _this.isShowProgram = false;
            });

            this.$root.notify.$on(MsgType.CLIENT_WIN_CLOSE, function () {
                _this.$store.commit("storeRightTabIndex", 0)
            })
        },

        methods: {
            getWifiInfo() {
                if (roomInfo.cfg) {
                    const info = JSON.parse(roomInfo.cfg['wifi'])
                    this.wifiModalContent = ["WIFI名称：" + info.wifiName, "WIFI密码：" + info.wifiPwd]
                }
            },

            openHander(flag) {
                const priIndex = this.$store.getters.getRightTabIndex
                this.$store.commit("storeRightTabIndex", flag)
                if (flag === 3) {
                    this.$store.commit("storeRightTabIndex", 0)
                    this.$store.commit("storeHomeTabIndex", 1)
                }
                if (flag === 1) {
                    REQ.reqGetUserById({cid: roomInfo.clientId, storeId: roomInfo.storeId},
                        (res) => {
                            window.RINFO.clientRole = res.data.clientRole
                            this.$root.notify.$emit(MsgType.CLIENT_ROLE_CHANGE)
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$logger.error(err)
                        })
                }
                const routers = {
                    1: 'Actor',
                    5: 'Reward',
                    6: 'Onscreen',
                    3: 'home',
                    4: 'uProgram',
                    7: 'game',
                    8: 'microphone'
                }
                if (priIndex > 0) {
                    this.$router.replace({name: routers[flag]})
                } else {
                    this.$router.push({name: routers[flag]})
                }
            },

            scroll(type) {
                if (type === "top") {
                    this.$refs.menu.scrollTop = 0
                } else {
                    this.$refs.menu.scrollTop = 550
                }
            },

            closeWifiModal() {
                this.wifiModalShow = false
            },

            showWifiModal() {
                this.getWifiInfo()
                this.wifiModalShow = true
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../style/sass/mixin.scss';

    .nav-box {
        display: block;
        padding: 10px 0;
        box-sizing: border-box;
        @include layout-flex-c;
        justify-content: flex-start;
        width: 76px;
        position: fixed;
        right: 0px;
        border-radius: 6px;
        color: #f9f9f9;
        max-height: 100%;
        top: 60px;
        z-index: 99;

        .wifi {
            align-self: center;
            margin: 20px 0;
        }
        .friend {
            margin-bottom: 20px;
            align-self: center;
        }

        .scroll {
            align-self: center;
            width: 56px;
            height: 20px;
            background: #164648;
            border-radius: 3px;
            @include layout-flex-c-center;
            align-items: center;
        }
    }

    .nav-box ul {
        max-height: 270px;
        padding-top: 10px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 76px;
    }

    .nav-box ul li {
        @include layout-flex-r;
        width: 100%;
        padding-bottom: 10px;
        align-items: center;

        .fill {
            width: 16px;
        }

        .arrow {
            border: 8px solid transparent;
            border-left-color: #332932;
            width: 0;
            height: 0;
        }

        .arrow-small {
            width: 0;
            height: 0;
        }
    }

    .nav-box ul li .text {
        font-size: 14px;
    }


</style>




