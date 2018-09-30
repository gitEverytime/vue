<template>
    <div class="list-knapsack">
        <div class="content">
            <div class="card-cover" v-for="item in list" :key="item.key" @click="handleItemClick(item.key)">
                <div class="card">
                    <span class="icon" :class="item.icon"></span>
                    <span class="text">{{item.name}}</span>
                    <span v-if="item.badge" class="badge">{{item.badge}}</span>
                </div>
            </div>
        </div>
        <span class="btn" @click="explainClick">背包说明</span>
    </div>
</template>

<script>
    export default {
        props: ["info"],

        data() {
            return {
                list: [
                    {key: 1, name: '道具', badge: this.info.toolCount || 0, icon: 'icon-prop'},
                    // {key: 2, name: '抵用券', icon: 'icon-voucher'},
                    {key: 3, name: '会员卡', badge: 0, icon: 'icon-gift-green'},
                    // {key: 4, name: '收到礼物', icon: 'icon-membership-card'},
                ]
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            handleItemClick(key) {
                if (key === 1) {
                    this.$emit("clickTool")
                    window.location.href = "#/tool"
                } else if (key === 3 ){
                    window.location.href = "#/MembershipCard"
                }
            },

            explainClick() {
                window.location.href = "#/knapsackExplain"
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .list-knapsack {
        border: 15px solid transparent;
        flex: 1;
        @include layout-flex-c-sb;
        align-items: center;

        .content {
            width: 100%;
            @include layout-flex-r-wrap;

            .card-cover {
                width: 50%;
                @include set-height(130px);
                position: relative;

                .card {
                    @include layout-flex-c;
                    justify-content: flex-end;
                    align-items: center;
                    margin: 15px;
                    background: #160a15;
                    @include set-height(100px);
                    border-radius: 5px;

                    .text {
                        color: #01b695;
                        @include font-dpr(15px);
                        margin: 5px 0 14px 0;
                    }

                    .badge {
                        @include layout-flex-c-center;
                        align-items: center;
                        background-color: #cd533e;
                        border-radius: 50%;
                        color: #fff;
                        font-size: 8px;
                        width: 12px;
                        height: 12px;
                        text-align: center;
                        position: absolute;
                        top: 25px;
                        right: 25px;
                    }
                }
            }
        }

        .btn {
            margin-top: 10px;
            color: #cd533e;
            border-bottom: 1px solid #cd533e;
            @include font-dpr(14px);
            line-height: 14px;
            position: absolute;
            bottom: 15px;
        }
    }
</style>