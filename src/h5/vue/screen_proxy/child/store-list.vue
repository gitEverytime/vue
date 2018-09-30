<template>
    <div class="store-list">
        <div class="panel">
            <Title title="商户列表" right="+开设商户" @rightClick="addStore" left="注销" @leftClick="logout"/>
            <div class="content" ref="list">
                <div class="item" v-for="item in dataList">
                    <span class="line">
                        <span class="name">{{item.sname}}（{{getStoreType(item)}}）</span>
                    </span>
                    <span class="line">
                        <span class="address"><i class="el-icon-location" style="margin-right: 5px"></i>{{getAddress(item)}}</span>
                    </span>
                    <span class="line">
                        <span class="boss"><i class="el-icon-info"
                                              style="margin-right: 5px"></i>{{item.bossName}}</span>
                        <span class="phone">
                            <i class="el-icon-mobile-phone" style="font-size: 14px"></i>
                            {{item.phone}}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './component/title.vue'
    import InputItem from './component/input_item.vue'
    import Button from './component/button.vue'
    import REQ from '../common/request'
    import ConstValue from '../common/const_value'
    import {CodeToText} from 'element-china-area-data'

    export default {
        props: [],

        components: {Title, InputItem, Button},

        data() {
            return {
                pageNo: 1,
                dataList: [],
                hasData: true
            }
        },

        computed: {},

        mounted() {
            this.getStoreList()
            this.addScrollListener()
        },

        methods: {
            getStoreList() {
                REQ.getStoreList({pageNo: this.pageNo},
                    (res) => {
                        const data = res.data.rows
                        if (data.length && data.length >= 20) {
                            this.hasData = true
                        } else {
                            this.hasData = false
                        }
                        this.dataList = this.dataList.concat(data)
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    }
                )
            },

            addStore() {
                this.$router.push({name: 'addStore'})
            },

            getAddress(item) {
                return CodeToText[item.ac1] + CodeToText[item.ac2] + CodeToText[item.ac3] + '-' + item.ac4
            },

            addScrollListener() {
                const list = this.$refs.list
                list.addEventListener('scroll', (e) => {
                    const target = e.target
                    if (target.scrollTop + target.clientHeight === target.scrollHeight && this.hasData) {
                        this.$loading('加载中...')
                        setTimeout(() => {
                            this.pageNo++
                            this.getStoreList()
                            this.$loading.close()
                        }, 1000)
                    }
                })
            },

            getStoreType(item) {
                return ConstValue.getStoreTypeName(item.type)
            },

            logout() {
                REQ.proxyLogout({},
                    () => {
                        this.$router.replace({name: 'login'})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';

    .store-list {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;
                padding-bottom: 15px;

                .item {
                    @include layout-flex-c;
                    box-sizing: border-box;
                    margin: 15px 15px 0 15px;
                    background: #322831;
                    border-radius: 6px;
                    padding: 8px 15px;

                    .line {
                        @include layout-flex-r-sb;
                        align-items: center;
                        margin: 8px 0;

                        .name {
                            @include font-dpr(16px);
                            color: #01B695;
                        }

                        .address {
                            color: #bbb;
                            @include font-dpr(15px);
                        }

                        .boss {
                            color: #8D888F;
                            @include font-dpr(15px)
                        }

                        .phone {
                            color: #8D888F;
                            @include font-dpr(15px)
                        }
                    }
                }
            }
        }
    }
</style>