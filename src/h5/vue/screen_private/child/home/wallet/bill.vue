<template>
    <div class="bill">
        <div class="panel">
            <Title title="我的账单" @E_LEFT_CLICK="backHandler"/>
            <div class="content" ref="list">
                <div class="item" v-for="item in dataList" v-if="dataList.length">
                    <div class="left">
                        <span class="desc">{{item.descr}}</span>
                        <span class="time">{{getTime(item)}}</span>
                    </div>
                    <span class="right" :style="{color: item.type == 0 ? '#f5f5f5' : '#8D888F'}">{{item.amount}}</span>
                </div>
                <div class="no-data" v-if="!dataList.length">
                    <img :src="getNoDataSrc">
                    <span>当前账单列表为空</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from '../../component/title.vue'
    import REQ from '../../../comm/request'
    import DateFormat from '../../../comm/date_format'

    const roomInfo = window.RINFO

    export default {
        props: [],
        components: {Title},

        data() {
            return {
                dataList: [],
                pageNo: 1,
                hasData: true,
            }
        },

        computed: {
            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/bill-no.png'
            }
        },

        mounted() {
            this.getBillList()
            this.addReachToEndHandler()
        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 2}
                })
            },

            getBillList() {
                REQ.reqGetBillList({cid: roomInfo.clientId, pageNo: this.pageNo},
                    (res) => {
                        if (res.data.rows.length) {
                            this.dataList = this.dataList.concat(res.data.rows)
                        } else {
                            this.hasData = false
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getTime(item) {
                return DateFormat.YMDHM(item.createdAt)
            },

            addReachToEndHandler() {
                const list = this.$refs.list
                list.addEventListener('scroll', (e) => {
                    const target = e.target
                    if (target.scrollTop + target.clientHeight === target.scrollHeight && this.hasData) {
                        this.pageNo++
                        this.getBillList()
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .bill {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .item {
                    @include layout-flex-r-sb;
                    padding: 0 15px;
                    @include set-height(74px);
                    border-bottom: 1px solid #322831;
                    align-items: center;

                    .left {
                        @include layout-flex-c-center;

                        .desc {
                            color: #bbbbbb;
                            @include font-dpr(14px);
                            margin-bottom: 8px;
                        }

                        .time {
                            @include font-dpr(11px);
                            color: #8D888F;
                        }
                    }

                    .right {
                        color: #8D888F;
                        @include font-dpr(16px);
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
        }
    }
</style>