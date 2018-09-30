<template>
    <div class="menubar">
        <span class="btn" v-for="item in menuList" v-bind:key="item.key" v-on:click="clickHandler(item.key)">
            <span class="icon" :class="item.key === getHomeTabIndex ? item.iconOn : item.icon"></span>
            <span class="name" :class="{'active' : item.key === getHomeTabIndex}">{{item.name}}</span>
            <span class="arrow" v-if="item.key === getHomeTabIndex"></span>
            <span class="arrow-no" v-if="item.key !== getHomeTabIndex"></span>
            <span v-if="item.badge" class="badge">{{item.badge}}</span>
            <span v-if="!item.badge" class="badge-no"></span>
        </span>
    </div>
</template>

<script>

    const EVENT_CLICK_MENU = "EVENT_CLICK_MENU";


    export default {
        props: ['info'],

        components: {},

        data() {
            return {
                menuList: [
                    {key: 1, name: '特权', badge: 0, icon: 'icon-privilege', iconOn: 'icon-privilege-on'},
                    {key: 2, name: '钱包', badge: 0, icon: 'icon-wallet', iconOn: 'icon-wallet-on'},
                    {key: 3, name: '背包', badge: 0, icon: 'icon-knapsack', iconOn: 'icon-knapsack-on'},
                    {key: 4, name: '动态', badge: 0, icon: 'icon-trends', iconOn: 'icon-trends-on'},
                    {key: 5, name: '管理', badge: 0, icon: 'icon-manage', iconOn: 'icon-manage-on'},
                ],
            }
        },

        watch: {
            info() {
                this.menuList = [
                    {key: 1, name: '特权', badge: 0, icon: 'icon-privilege', iconOn: 'icon-privilege-on'},
                    {key: 2, name: '钱包', badge: 0, icon: 'icon-wallet', iconOn: 'icon-wallet-on'},
                    {key: 3, name: '背包', badge: this.info.packCount || 0, icon: 'icon-knapsack', iconOn: 'icon-knapsack-on'},
                    {key: 4, name: '动态', badge: this.info.actCount || 0, icon: 'icon-trends', iconOn: 'icon-trends-on'},
                    {key: 5, name: '管理', badge: 0, icon: 'icon-manage', iconOn: 'icon-manage-on'},
                ]
            }
        },
        computed: {
            getHomeTabIndex() {
                return this.$store.getters.getHomeTabIndex
            }
        },

        methods: {
            clickHandler(btnIndex) {
                this.$emit(EVENT_CLICK_MENU, btnIndex);
            }
        }


    }


</script>


<style lang='scss' scoped>
    @import "../../../../../style/sass/mixin.scss";

    .menubar {
        @include layout-flex-r;
        width: 95%;
        align-self: center;
        margin-top: 2px;
    }

    .menubar .btn {
        @include layout-flex-c-center;
        flex: 1;
        align-items: center;
        position: relative;

        .arrow {
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: $second-background;
        }

        .arrow-no{
            height: 16px;
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
            position: relative;
            top: -78px;
            right: -16px;
        }

        .badge-no {
            width: 12px;
            height: 12px;
            position: relative;
        }
    }

    .menubar .btn .pic {
        width: 26px;
        height: 26px;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .menubar .btn .name {
        padding-top: 5px;
        @include font-dpr(14px);
        color: #8e8990;
    }

    .menubar .btn .active {
        color: #fff;
    }
</style>




