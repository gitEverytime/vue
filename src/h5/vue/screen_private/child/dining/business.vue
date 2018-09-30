<template>
    <div class="business">
        <div class="panel">
            <Title title="商家" @E_LEFT_CLICK="backHandler" style="position: absolute"/>
            <div class="content">
                <div class="top bgd bg-vip-bg">
                    <span class="store">{{info.sname || ''}}</span>
                </div>
                <div class="line">
                    <span class="icon icon-11-5"></span>
                    <span class="text">{{info.ac4 || ''}}</span>
                </div>
                <span class="detail">服务电话：{{info.serviceTel}}</span>
                <div class="line">
                    <span class="icon icon-11-6"></span>
                    <span class="text">营业时间</span>
                </div>
                <span class="detail">{{info.dayStartTime ? formatTime(info.dayStartTime) : ''}} - {{info.dayEndTime ? formatTime(info.dayEndTime) : ''}}</span>
                <div class="line">
                    <span class="icon icon-11-7"></span>
                    <span class="text">商户服务</span>
                </div>
                <div class="tags" v-if="tags.length">
                    <span class="tag" v-for="item in tags" v-if="item.length">{{item}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title},

        data() {
            return {
                info: {},
                tags: [],
            }
        },

        computed: {
            getStoreName() {
                return 'roomInfo.storeName'
            }
        },

        mounted() {
            this.getInfo()
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            getInfo() {
                REQ.reqGetBusinessInfo({storeId: roomInfo.storeId},
                    (res) => {
                        this.info = res.data
                        this.tags = res.data.tags.split(',')
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            formatTime(time) {
                if (time.length < 5) {
                    return '0' + time
                } else {
                    return time
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .business {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .top {
                    width: 100%;
                    @include set-height(155px);
                    @include layout-flex-r-center;
                    align-items: flex-end;

                    .store {
                        margin-bottom: 45px;
                        color: #F5F5F5;
                        @include font-dpr(16px);
                    }
                }

                .line {
                    @include layout-flex-r;
                    @include set-height(45px);
                    align-items: center;
                    padding: 0 10px;
                    border-bottom: 1px solid #221821;
                    background: #322831;
                    margin-top: 10px;

                    .text {
                        @include font-dpr(15px);
                        color: #8d888f;
                        margin-left: 10px;
                    }
                }

                .detail {
                    padding-left: 35px;
                    color: #ccc;
                    @include font-dpr(15px);
                    @include set-height(40px);
                    @include layout-flex-r;
                    align-items: center;
                    background: #322831;
                }

                .tags {
                    background: #322831;
                    padding: 5px 28px;
                    @include layout-flex-r-wrap;

                    .tag {
                        margin: 7px;
                        color: #01B695;
                        padding: 10px;
                        border: 1px solid #01B695;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
</style>