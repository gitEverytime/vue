<template>
    <div class="membership-card">
        <div class="panel">
            <Title title="会员卡" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <div class="card bgd" v-for="item in dataList" :class="getCardBg" v-if="dataList.length">
                    <img :src="getHeadImg" class="avatar">
                    <div class="name">
                        <span class="icon" :class="getSex"></span>
                        <span style="margin-left: 3px">{{getName}}</span>
                    </div>
                    <span class="number">{{getNumber(item)}}</span>
                    <span class="store">会员店：{{item.storeTitle}}</span>
                    <div class="bottom">
                        <div class="priceCover">
                            <span>账户余额</span>
                            <span class="money">￥</span>
                            <span class="price">{{item.amount}}</span>
                        </div>
                        <span @click="historyBill(item)">历史账单</span>
                        <span style="margin-right: 15px" @click="recharge">充值</span>
                    </div>
                </div>
                <div class="no-data" v-if="!dataList.length">
                    <img :src="getNoDataSrc">
                    <span>您还没有会员卡</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../../component/title.vue'
    import REQ from '../../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title},

        data() {
            return {
                dataList: [],
                sex: 1
            }
        },

        computed: {
            getHeadImg() {
                return roomInfo.headimg
            },

            getSex() {
                return roomInfo.sex == 1 ? 'icon-man-white' : 'icon-woman-white'
            },

            getName() {
                return roomInfo.nickName
            },

            getCardBg() {
                return roomInfo.sex == 1 ? 'bg-vip-man' : 'bg-vip-woman'
            },

            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/vipno.png'
            }
        },

        mounted() {
            this.getCardList()
        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 3}
                })
            },

            getNumber(item) {
                const no = item.no
                const str = no.substring(0, 4) + ' ' + no.substring(4, 8) + ' ' + no.substring(8, 12)
                return 'NO. ' + str
            },

            getCardList() {
                REQ.reqGetCardList({cid: roomInfo.clientId},
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

            recharge() {
                this.$toast.center('请到吧台充值')
            },

            historyBill(item) {
                window.RINFO.card = item
                window.location.href = "#/HistoryBill"
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .membership-card {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .card {
                    @include set-height(200px);
                    margin: 20px 20px 0 20px;
                    @include layout-flex-c;
                    align-items: center;

                    .avatar {
                        @include set-width-height(59px, 59px);
                        border-radius: 50%;
                        margin-top: 15px;
                    }

                    .name {
                        @include layout-flex-r;
                        align-items: center;
                        @include font-dpr(15px);
                        color: #CACAD4;
                        margin-top: 10px;
                    }

                    .number {
                        color: #d5d5d5;
                        @include font-dpr(20px);
                        margin-top: 8px;
                        text-shadow: 1px 1px 1px #745959;
                    }

                    .store {
                        color: #FEFEFF;
                        @include font-dpr(13px);
                        margin-top: 8px;
                    }

                    .bottom {
                        @include font-dpr(15px);
                        color: #ffffff;
                        @include layout-flex-r-sb;
                        align-items: baseline;
                        margin-top: 8px;
                        width: 100%;

                        .priceCover {
                            @include layout-flex-r;
                            align-items: baseline;
                            margin-left: 15px;

                            .money {
                                color: #D8D854;
                                @include font-dpr(14px);
                                margin-left: 5px;
                            }

                            .price {
                                color: #D8D854;
                                @include font-dpr(18px);
                                margin-left: 3px;
                            }
                        }
                    }
                }
                .no-data {
                    @include layout-flex-c;
                    align-items: center;

                    img {
                        @include set-width-height(200px, 136px);
                        margin-top: 40%;
                    }

                    span {
                        margin-top: 15px;
                        color: #8d888f;
                        @include font-dpr(15px);
                    }
                }
            }
        }
    }
</style>