<template>
    <div class="list-manage">
        <div class="menu" v-for="item in menuListManage" :key="item.key" v-on:click="onItemClick(item.href)">
            <div class="left">
                <span class="icon" :class="item.icon"></span>
                <span class="name">{{item.name}}</span>
                <span class="message">{{item.message}}</span>
            </div>
            <span class="icon icon-arrow-mine-more"></span>
        </div>
    </div>
</template>

<script>

    import REQ from "../../comm/request"
    import ConstValue from "../../comm/const_value"

    var roomInfo = window.RINFO;

    export default {
        props: ['info'],

        components: {},

        watch: {
            info() {
                if (this.info.client && this.info.client.sysVip == 1) {
                    this.menuListManage.push({
                        key: 5,
                        name: '个人信息',
                        icon: 'icon-mine-green',
                        message: '编辑或更改个人信息',
                        href: 'PersonInfo'
                    },)
                }
            }
        },

        data() {
            return {
                menuListManage: [
                    // {key: 1, name: '我的主页', icon: 'icon-home', message: '查看我的主页', href: ''},
                    {key: 2, name: '我的关注', icon: 'icon-like', message: '管理我关注的人', href: 'follow'},
                    {key: 3, name: '我的消息', icon: 'icon-message', message: '查看我的私信', href: 'chatList'},
                    {key: 4, name: '订单管理', icon: 'icon-order', message: '管理我的订单', href: 'OrderManage'},
                ]
            }
        },
        computed: {},

        mounted() {
            if (this.info.client && this.info.client.sysVip == 1) {
                this.menuListManage.push({
                    key: 5,
                    name: '个人信息',
                    icon: 'icon-mine-green',
                    message: '编辑或更改个人信息',
                    href: 'PersonInfo'
                },)
            }
            // 查询艺人状态
            if (roomInfo.clientRole == ConstValue.CLIENT_ROLE_ACTOR) {
                const posData = {clientId: roomInfo.clientId, storeId: roomInfo.storeId}
                REQ.reqActorState(posData,
                    (res) => {
                        const info = res.data
                        if (info.type == 1 && info.status == 1) {
                            this.menuListManage.push({
                                key: 6,
                                name: '节目订单',
                                icon: 'icon-music-m',
                                message: '确认表演已点节目',
                                href: 'programOrder'
                            })
                        }
                        if (info.status == 1) {
                            this.menuListManage.push({
                                key: 7,
                                name: '节目管理',
                                icon: 'icon-program',
                                message: '编辑和管理节目单',
                                href: 'aProgram'
                            })
                            window.RINFO.actorId = info.actorId
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger(err)
                    }
                );
            }
        },

        methods: {
            onItemClick(href) {
                href && this.$router.push({
                    name: href,
                })
            }
        }
    }


</script>


<style lang='scss' scoped>
    @import "../../../../../style/sass/mixin.scss";

    .list-manage {
        height: 100%;

        .menu {
            @include layout-flex-r-sb;
            height: 45px;
            align-items: center;
            border-bottom: 1px solid #322831;
            padding: 0 15px 0 15px;

            .left {
                @include layout-flex-r;
                align-items: center;

                .name {
                    color: #c0b8c3;
                    @include font-dpr(15px);
                    padding-left: 5px;
                }

                .message {
                    color: #8d888f;
                    @include font-dpr(13px);
                    padding-left: 5px;
                }
            }
        }
    }
</style>




