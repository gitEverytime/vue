<template>
    <div class="program-list">
        <div class="item" v-for="item in dataList" v-if="dataList.length">
            <div class="top">
                <div class="title">
                    <span class="icon" :class="getIcon(item)"></span>
                    <span style="margin-left: 3px">{{getTitle(item)}}</span>
                </div>
                <span class="time">{{getTime(item)}}</span>
            </div>
            <div class="center">
                <Imag :src="item.actorImg" />
                <div class="content">
                    <span class="name">{{item.programTitle}}</span>
                    <span class="type"><span style="color: #01B695">{{getActorType(item)}}-</span>{{item.actorName}}</span>
                </div>
                <span class="price">￥{{item.amount}}</span>
            </div>
            <div class="bottom">
                <span class="store">{{item.storeTitle}}</span>
                <span class="status">{{getStatus(item)}}</span>
            </div>
        </div>
        <div class="no-data" v-if="!dataList.length">
            <img :src="getNoDataSrc">
            <span>点播订单列表为空</span>
        </div>
    </div>
</template>

<script>
    import REQ from '../../../comm/request'
    import DateFormat from '../../../comm/date_format'
    import ConstValue from '../../../comm/const_value'
    import Imag from '../../component/Image.vue'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Imag},

        data() {
            return {
                dataList: []
            }
        },

        computed: {
            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/dianbo-no.png'
            }
        },

        mounted() {
            this.getPerformanceOrderList()
        },

        methods: {
            getIcon(item) {
                const icons = {1: 'icon-music', 2: 'icon-dance'}
                return icons[item.type]
            },

            getTitle(item) {
                const titles = {1: '点歌订单', 2: '点舞订单'}
                return titles[item.type]
            },

            getTime(item) {
                return DateFormat.YMDHMS(item.createdAt)
            },

            getActorType(item) {
                return ConstValue.getActorType(item.actorType)
            },

            getStatus(item){
                const status = {0: '订单未确认', 1: '订单已完成'}
                return status[item.status]
            },

            getPerformanceOrderList() {
                REQ.reqGetPerformanceOrderList({cid: roomInfo.clientId},
                    (res) => {
                        this.dataList = res.data
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
    @import './../../../../../../style/sass/mixin.scss';

    .program-list {
        width: 100%;
        @include layout-flex-c;
        padding-bottom: 15px;

        .item {
            margin-top: 15px;
            background: #322831;

            .top {
                padding: 0 10px;
                @include layout-flex-r-sb;
                align-items: center;
                @include set-height(34px);
                border-bottom: 1px solid #221821;

                .title {
                    @include layout-flex-r;
                    align-items: center;
                    @include font-dpr(14px);
                    color: #8d888f;
                }

                .time {
                    @include font-dpr(14px);
                    color: #8d888f;
                }
            }

            .center {
                @include layout-flex-r;
                align-items: center;
                border-bottom: 1px solid #221821;
                @include set-height(70px);

                img {
                    @include set-width-height(50px, 50px);
                    border-radius: 50%;
                    margin: 0 10px;
                }

                .content {
                    @include layout-flex-c-center;
                    flex: 1;

                    .name {
                        @include font-dpr(16px);
                        color: #ccc;
                        margin-bottom: 5px;
                    }

                    .type {
                        @include font-dpr(12px);
                        color: #8C878E;
                    }
                }

                .price {
                    @include font-dpr(21px);
                    color: #D8D854;
                    padding-right: 10px;
                }
            }

            .bottom {
                padding: 0 10px;
                @include layout-flex-r-sb;
                align-items: center;
                @include set-height(52px);

                .store {
                    @include font-dpr(14px);
                    color: #01B695;
                }

                .status {
                    @include font-dpr(14px);
                    color: #8D888F;
                }
            }
        }

        .no-data {
            @include layout-flex-c;
            align-items: center;

            img {
                @include set-width-height(220px, 150px);
                margin-top: 40%;
            }

            span {
                margin-top: 15px;
                color: #8d888f;
                @include font-dpr(15px);
            }
        }
    }
</style>