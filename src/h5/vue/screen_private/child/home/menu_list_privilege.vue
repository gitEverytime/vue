<template>
    <div class="list-privilege">
        <div v-if="!hasRights" class="no-rights">
            <div class="more-rights bgd bg-more-rights"></div>
            <span class="btn-want" @click="registerBig">注册果宝</span>
        </div>
        <div v-if="hasRights" class="has-rights">
            <div class="trophy bgd bg-trophy"></div>
            <div class="content">
                <div class="item" v-for="item in rightsList" :key="item.key">
                    <span class="icon" :class="item.on ? item.iconOn : item.icon "></span>
                    <span class="text" :class="item.on ? 'active' : ''">{{item.name}}</span>
                </div>
            </div>
            <!--<span class="btn-level" @click="levelClick">等级特权</span>-->
        </div>
    </div>

</template>

<script>
    export default {
        props: ["info"],

        watch: {
            info() {
                if (this.info.client) {
                    this.hasRights = this.info.client.sysVip == 0 ? false : true
                }
            }
        },

        data() {
            return {
                hasRights: false,
                rightsList: [
                    {key: 1, name: 'V1进场', icon: 'icon-hi', iconOn: 'icon-hi-on', on: false},
                    {key: 2, name: '等级勋章', icon: 'icon-level-medal', iconOn: 'icon-level-medal-on', on: false},
                    {key: 3, name: '周礼物包', icon: 'icon-week-gift', iconOn: 'icon-week-gift-on', on: false},
                    {key: 4, name: '炫彩昵称', icon: 'icon-colorful-name', iconOn: 'icon-colorful-name-on', on: false},
                    {key: 5, name: '级别奖励', icon: 'icon-rank-reward', iconOn: 'icon-rank-reward-on', on: false},
                    {key: 6, name: '添加微信', icon: 'icon-wechat', iconOn: 'icon-wechat-on', on: false},
                    {
                        key: 7,
                        name: '专属表情',
                        icon: 'icon-exclusive-emoticon',
                        iconOn: 'icon-exclusive-emoticon-on',
                        on: false
                    },
                    {key: 8, name: '打赏特权', icon: 'icon-reward-privilege', iconOn: 'icon-reward-privilege-on', on: true},
                    {key: 9, name: '预定位置', icon: 'icon-schedule', iconOn: 'icon-schedule-on', on: false},
                    {key: 10, name: '名人榜单', icon: 'icon-list', iconOn: 'icon-list-on', on: false},
                ]
            }
        },

        computed: {},

        mounted() {
            if (this.info.client) {
                this.hasRights = this.info.client.sysVip == 0 ? false : true
            }
        },

        methods: {
            registerBig() {
                this.$router.replace({name: 'pre-register'})
            },

            levelClick() {
                console.log("levelClick")
                // TODO
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .list-privilege {
        flex: 1;
        @include layout-flex-c-sb;
        align-items: center;

        .no-rights {
            @include layout-flex-c;
            align-items: center;
            width: 100%;

            .more-rights {
                @include set-width-height(150px, 167px);
                margin-top: 55px;
            }

            .btn-want {
                text-align: center;
                background-color: #cd533e;
                @include set-h(44px);
                border-radius: 4px;
                margin-top: 30px;
                color: #f5f5f5;
                width: 50%;
                @include font-dpr(16px);
            }
        }

        .has-rights {
            @include layout-flex-c;
            align-items: center;
            width: 100%;

            .trophy {
                @include set-width-height(49px, 49px);
                margin-top: 20px;
            }

            .content {
                width: 100%;
                @include layout-flex-r-wrap;

                .item {
                    width: 25%;
                    @include set-height(65px);
                    @include layout-flex-c;
                    align-items: center;
                    justify-content: flex-end;

                    .text {
                        color: #ccc;
                        @include font-dpr(12px);
                        margin: 5px 0 8px 0;
                    }

                    .active {
                        color: #01b695;
                    }
                }
            }

            .btn-level {
                margin: 10px 0 20px 0;
                color: #cd533e;
                border-bottom: 1px solid #cd533e;
                @include font-dpr(14px);
                line-height: 14px;
            }
        }
    }
</style>