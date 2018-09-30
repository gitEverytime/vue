<template>
    <div class="screen bgd bg-private-bg">

        <CommSocket></CommSocket>
        <CommSSE></CommSSE>

        <!-- screen top  -->
        <TempStoreTop></TempStoreTop>
        <!-- 右侧菜单 -->
        <TempMenuRight v-on:E_R_MENU_CLICK="listenRMenuHandler" v-show="currTabIndex === 1 "></TempMenuRight>

        <div class="meddle">
            <!-- 渲染路由 -->
            <router-view class="view"></router-view>
        </div>

        <!-- 底 菜单  -->
        <TempMenuFooter></TempMenuFooter>

        <!-- 红包  -->
        <RedPackageModal/>

        <!-- 点餐toast  -->
        <ToastInfo :info="toastInfo" :show="toastInfoShow"/>

        <!-- 点餐toast  -->
        <ImagePreview :show="showImagePreview" @close="closeImagePreview"/>
    </div>
</template>

<script>
    import MsgType from "./comm/msg_type.js";
    import SSEType from "./comm/sse_type"

    import CatchControl from "./comm/catch_control.js";

    import TempMenuFooter from './menu/menu_footer.vue';
    import TempMenuRight from './menu/menu_right.vue';

    import TempStoreTop from "./child/store_top/store_top.vue";

    import RedPackageModal from "./child/reward/red_package_modal.vue"
    import ToastInfo from "./child/dining/toast-info.vue"
    import ImagePreview from "./child/box/image-preview-wx.vue"

    import CommSocket from "../screen_private/comm/comm_socket.vue";
    import CommSSE from "../screen_private/comm/comm_sse.vue"
    import REQ from './comm/request'

    var roomInfo = window.RINFO;


    export default {

        components: {
            TempStoreTop, TempMenuFooter, TempMenuRight, CommSocket, RedPackageModal, CommSSE, ToastInfo, ImagePreview
        },

        data() {
            return {
                boxIndex: 0,
                toastInfo: {},
                toastInfoShow: false,
                showImagePreview: false,
            }
        },
        computed: {
            getCurrBoxIndex() {
                return this.boxIndex;
            },

            currTabIndex() {
                return this.$store.getters.getCurrTabIndex
            },

            getLoadingStatus() {
                return this.$store.getters.getFileIsUploading
            }

        },

        watch: {
            getLoadingStatus() {
                if (this.getLoadingStatus) {
                    this.$loading("图片上传中...")
                } else {
                    this.$loading.close()
                }
            }
        },

        mounted() {
            var _this = this;

            CatchControl.init(_this.$root.notify);

            this.$root.notify.$on("E_PRIVATETALKCOUNT", function (data) {
                _this.$root.notify.$emit("E_PRI_COUNT");
            });

            //监听艺人申请表单关闭事件
            this.$root.notify.$on("E_CLOSE_APPLY", function () {
                _this.boxIndex = 0;
            });
            //监听节目列表显示
            this.$root.notify.$on("E_SHOW_PROGRAM", function (data) {
                _this.boxIndex = data;
            });
            //关闭歌单
            this.$root.notify.$on("E_R_PROM_FN_CLOSE", function (data) {
                _this.boxIndex = "close";

            });

            //关闭霸屏面板
            this.$root.notify.$on(MsgType.CLIENT_WIN_CLOSE_ONSCREEN, function () {
                _this.boxIndex = 0;
            });

            //关闭打赏面板
            this.$root.notify.$on(MsgType.CLIENT_WIN_CLOSE_REWARD, function () {
                _this.boxIndex = 0;
            });

            //关闭所有面板
            this.$root.notify.$on(MsgType.CLIENT_WIN_CLOSE, function () {
                _this.boxIndex = 0;
            });

            this.$root.notify.$on("ShowImagePreview", () => {
                this.showImagePreview = true
            })

            //监听点餐toast通知
            this.$root.notify.$on(SSEType.E_SHOW_TOAST_INFO, (info) => {
                if (this.$store.getters.getIsOnDiningPage) {
                    this.toastInfo = info
                    this.toastInfoShow = true
                    setTimeout(() => {
                        this.toastInfoShow = false
                    }, 800)
                }
            })

            //缓存 霸屏礼物数据
            CatchControl.catchOnScreenGiftData({storeId: roomInfo.storeId});
            //缓存 用户数据
            CatchControl.catchUser({storeId: roomInfo.storeId});
            //缓存 打赏礼物数据
            CatchControl.catchRewordGiftData({storeId: roomInfo.storeId});
            //缓存 实物打赏数据
            CatchControl.catchRewardRealData({storeId: roomInfo.storeId})
            //缓存 艺人列表
            CatchControl.catchActorList({storeId: roomInfo.storeId})
            this.$store.commit("storecActorList", {storeId: roomInfo.storeId});
            this.$store.commit('storeChatDic', this.$db.getItem('secretChatDic') || {})
            this.getPrivateCfg()

            this.setFirstPage()

            this.addEruda()

            this.addWXjs()

            this.$store.commit("storeClearPubChat")
            this.$store.commit("storeHistoryPubChat", () => {
                setTimeout(() => {
                    this.$root.notify.$emit(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM)
                }, 200)
            })

            this.aboutGame()
        },

        methods: {
            listenRMenuHandler(btnId) {
                this.boxIndex = btnId;
            },

            getPrivateCfg() {
                REQ.reqGetPrivateCfg({storeId: roomInfo.storeId},
                    (res) => {
                        window.RINFO.cfg = res.data;
                        this.$store.commit('storePrivateCfg', res.data)
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            closeImagePreview() {
                this.showImagePreview = false
            },

            setFirstPage() {
                // if (roomInfo.isStaff == 1 && roomInfo.staffId) {
                //     window.location.replace("#/ChooseTable")
                // } else if (roomInfo.tableId) {
                //     this.$store.commit("storeCurrTabIndex", 4)
                //     window.location.replace("#/Dining")
                // } else {
                //     this.$store.commit("storeCurrTabIndex", 1)
                //     window.location.replace("#/")
                window.location.replace("#/")
                // }
            },

            addEruda() {
                // if (roomInfo.nickName === 'zero') {
                //     let script = document.createElement('script')
                //     script.src = "//cdn.jsdelivr.net/npm/eruda"
                //     document.body.appendChild(script)
                //     script.onload = function () {
                //         eruda.init()
                //     }
                // }
            },

            addWXjs() {
                // let script = document.createElement('script')
                // script.src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js"
                // document.body.appendChild(script)
                // script.onload = function () {
                //     console.log("wx ready")
                // }

                // const data = {
                //     app: 'wxa5894c0183d82ea2',
                //     img: 'http://static.ibigtop.com/static/img/new/wxbg1.jpg',
                //     link: window.location.href,
                //     desc: 'zero',
                //     title: 'lian'
                // };
            },

            aboutGame() {
                //打开游戏邀请面板
                this.$root.notify.$on(MsgType.E_OPEN_INVITE_PANEL, (data) => {
                    console.log(data)
                    switch (data.gameIndex) {
                        case '1001':
                            this.$store.commit('storeGameInviteInfo', data)
                            this.$router.push({name: 'invite'})
                            break
                        case '1003':
                            REQ.getGameCurrent({storeId: roomInfo.storeId},
                                (res) => {
                                    this.$logger(res)
                                    data.playId = res.data.playId
                                    this.$store.commit('storeGameInviteInfo', data)
                                    this.$router.push({name: 'invite1003'})
                                },
                                (complete) => {
                                },
                                (err) => {
                                    this.$logger.error(err)
                                }
                            )
                            break
                    }
                });

                REQ.reqHasPlayingGame({storeId: roomInfo.storeId},
                    (res) => {
                        if (res.data.gameIndex && res.data.gameIndex === 1001) {
                            this.$store.commit('storeGameInviteInfo', {gameIndex: res.data.gameIndex})
                            setTimeout(() => {
                                this.$router.push({name: 'invite'})
                            }, 1000)
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )

                REQ.getGameCurrent({storeId: roomInfo.storeId},
                    (res) => {
                        const data = res.data
                        if (data.metaId === '1003' && !data.isStarted) {
                            this.$store.commit('storeGameInviteInfo', data)
                            this.$router.push({name: 'invite1003'})
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>


<style lang='scss' scoped>

    .screen {
        width: 100%;
        height: 100%;
        position: fixed;
    }

    .screen .meddle {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

</style>




