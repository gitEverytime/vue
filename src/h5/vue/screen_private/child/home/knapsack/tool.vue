<template>
    <div class="tool">
        <div class="panel">
            <Title title="道具包" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <div class="item" v-for="item in dataList" v-if="dataList.length">
                    <div class="top">
                        <span class="icon" :class="getIcon(item)"></span>
                    </div>
                    <div class="line">
                        <div class="left">
                            <span :style="{color: getColor(item)}">{{getCate(item)}}</span>
                            <span>{{' ' + item.title}}</span>
                        </div>
                        <div class="right">
                            <span>有效期至：{{getDate(item)}}</span>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-if="!dataList.length">
                    <img :src="getNoDataSrc">
                    <span>当前道具列表为空</span>
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
            }
        },

        computed: {
            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/tool-no.png'
            }
        },


        mounted() {
            this.getToolList()
        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 3}
                })
            },

            getToolList() {
                REQ.reqGetUserCenterToolList({cid: roomInfo.clientId},
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
                switch (item.type) {
                    case '1' :
                        return 'icon-tool-onscreen'
                    case '2' :
                        return 'icon-tool-gift'
                    case '4' :
                        return 'icon-tool-microphone'
                    default:
                        return ''
                }
            },

            getDate(item) {
                return DateFormat.YMD(item.expiredAt)
            },

            getColor(item) {
                const colors = {
                    '1': {
                        '1': '#86ff44',
                        '2': '#fffc26',
                        '3': '#30fdff',
                    },
                    '2': {
                        '1': '#FF2581'
                    },
                    '4': {
                        '1': '#00EAFF',
                        '2': '#01FFD1',
                    }
                }
                return colors[item.type][item.cate]
            },

            getCate(item) {
                const msgs = {
                    '1': {
                        '1': '炫酷霸屏',
                        '2': '重金霸屏',
                        '3': '主题霸屏',
                    },
                    '2': {
                        '1': '虚拟礼物'
                    },
                    '4': {
                        '1': '说你想说的话',
                        '2': '唱你想唱的歌',
                    }
                }
                return msgs[item.type][item.cate]
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .tool {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .item {
                    margin: 15px 15px 0 15px;
                    border-radius: 4px;
                    background: #322831;
                    @include set-height(98px);

                    .top {
                        @include set-height(52px);
                        @include layout-flex-c-center;
                        align-items: center;
                        margin: 0 15px;
                        border-bottom: 1px solid #493D48;
                    }

                    .line {
                        @include layout-flex-r-sb;
                        align-items: center;
                        @include set-height(45px);
                        margin: 0 15px;

                        .left {
                            span {
                                @include font-dpr(16px);
                                color: #ccc;
                            }
                        }

                        .right {
                            span {
                                @include font-dpr(14px);
                                color: #8D888F
                            }
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
        }
    }
</style>