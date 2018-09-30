<template>
    <div class="list-news">
        <div class="item" v-for="item in dataList" @click="readHandler(item)">
            <div class="top">
                <div class="title">
                    <span class="icon" :class="getIcon(item)"></span>
                    <span :class="{'title-on': item.isRead == 0}" style="margin-left: 8px">{{getTitle(item)}}</span>
                </div>
                <span class="time">{{getTime(item)}}</span>
            </div>
            <p class="content" :class="{'content-on': item.isRead == 0}">{{item.content}}</p>
        </div>
    </div>
</template>

<script>
    import REQ from '../../comm/request'
    import DateFormat from '../../comm/date_format'

    const roomInfo = window.RINFO

    export default {
        props: [],

        data() {
            return {
                dataList: []
            }
        },

        computed: {},

        mounted() {
            this.getDataList()
        },

        methods: {
            getDataList() {
                REQ.reqGetUserCenterNews({cid: roomInfo.clientId},
                    (res) => {
                        this.dataList = res.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getIcon(item) {
                const icons = {
                    0: {
                        1: 'icon-bell-on',
                        2: 'icon-grade-on',
                        3: 'icon-follow-on',
                    },
                    1: {
                        1: 'icon-bell',
                        2: 'icon-grade',
                        3: 'icon-follow',
                    }
                }
                return icons[item.isRead][item.type]
            },

            getTime(item) {
                return DateFormat.Intelligence(item.createdAt)
            },

            getTitle(item) {
                const titles = {1: '系统通知', 2: '升级通知', 3: '关注通知'}
                return titles[item.type]
            },

            readHandler(item) {
                if (item.isRead == 1) {
                    return
                }
                REQ.reqSetUserCenterActReaded({actId: item.id},
                    () => {
                        this.$emit("getInfo")
                        this.getDataList();
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
    @import './../../../../../style/sass/mixin.scss';

    .list-news {
        width: 100%;

        .item {
            width: 100%;
            @include layout-flex-c;
            border-bottom: 1px solid #322831;

            .top {
                @include layout-flex-r-sb;
                padding: 0 15px;
                align-items: center;
                @include set-height(40px);

                .title {
                    @include layout-flex-r;
                    align-items: center;
                    @include font-dpr(15px);
                    color: #C0B8C3;
                }

                .title-on {
                    color: #01b695;
                }

                .time {
                    @include font-dpr(13px);
                    color: #8D888F;
                }
            }

            .content {
                @include font-dpr(14px);
                color: #8E8990;
                padding: 0 15px 15px 38px;
            }

            .content-on {
                color: #DDDDDD;
            }
        }
    }
</style>