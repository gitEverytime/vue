<template>
    <div class="home" id="home">
        <div class="panel">
            <div class="top" :style="{background: 'url('+ getHeadImg +')', backgroundSize: 'cover'}"></div>
            <div class="content">
                <TempHeader :info="info"></TempHeader>
                <TempMenu :info="info" v-on:EVENT_CLICK_MENU="showBox" ref="menu"></TempMenu>
            </div>
            <div class="bottom">
                <TempMenuListManage v-if="getHomeTabIndex === 5" :info="info"/>
                <TempMenuListNews v-if="getHomeTabIndex === 4" @getInfo="getInfo"/>
                <TempMenuListKnapsack v-if="getHomeTabIndex === 3" :info="info" @clickTool="clickTool"/>
                <TempMenuListWallet v-if="getHomeTabIndex === 2"/>
                <TempMenuListPrivilege v-if="getHomeTabIndex === 1" :info="info"/>
            </div>
        </div>
    </div>
</template>

<script>

    import TempHeader from "./header.vue"
    import TempMenu from "./menubar.vue"
    import TempMenuListManage from "./menu_list_manage.vue"
    import TempMenuListNews from "./menu_list_news.vue"
    import TempMenuListKnapsack from "./menu_list_knapsack.vue"
    import TempMenuListWallet from "./menu_list_wallet.vue"
    import TempMenuListPrivilege from "./menu_list_privilege.vue"
    import REQ from '../../comm/request'

    var roomInfo = window.RINFO;

    export default {
        components: {
            TempHeader, TempMenu, TempMenuListManage, TempMenuListNews, TempMenuListKnapsack,
            TempMenuListWallet, TempMenuListPrivilege
        },

        data() {
            return {
                info: {}
            }
        },
        computed: {

            getHeadImg() {
                if (roomInfo.headimg.slice(-4).toLowerCase() === "webp") {
                    return roomInfo.headimg.slice(0, -5)
                }
                return roomInfo.headimg
            },
            getHomeTabIndex() {
                return this.$store.getters.getHomeTabIndex
            }
        },

        mounted() {
            this.getInfo()
        },

        methods: {
            showBox(boxIndex) {
                this.$store.commit("storeHomeTabIndex", boxIndex)
            },

            clickTool() {
                REQ.reqSetUserCenterToolReaded({cid: roomInfo.clientId},
                    () => {
                        this.getInfo()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getInfo() {
                REQ.reqGetUserCenterInfo({cid: roomInfo.clientId},
                    (res) => {
                        this.info = res.data
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
    @import "../../../../../style/sass/mixin.scss";

    .home {
        @include window;
    }

    .home .panel {
        @include panel;

        .top {
            width: 100%;
            @include set-height(222px);
            opacity: 0.1;
        }

        .content {
            @include layout-flex-c;
            position: absolute;
            width: 100%;
        }

        .bottom {
            width: 100%;
            flex: 1;
            overflow-y: auto;
            position: relative;
        }
    }

</style>




