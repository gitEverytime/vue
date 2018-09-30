<template>
    <div class="follow">
        <div class="panel">
            <TempTitle :title="'我的关注'" @E_LEFT_CLICK="backHandler"></TempTitle>
            <div class="tab">
                <span @click="switchTab(1)" :class="{'tab-active':activeTabIndex === 1}">关注我的</span>
                <div class="cut"></div>
                <span @click="switchTab(2)" :class="{'tab-active':activeTabIndex === 2}">我关注的</span>
            </div>
            <div class="content">
                <TempFollowMe v-if="activeTabIndex === 1"></TempFollowMe>
                <TempMyFollow v-if="activeTabIndex === 2"></TempMyFollow>
            </div>
        </div>
    </div>

</template>

<script>
    import TempTitle from '../../component/title.vue'
    import TempFollowMe from './followMeList.vue'
    import TempMyFollow from './myFollowList.vue'

    export default {
        props: [],

        components: {TempTitle, TempFollowMe, TempMyFollow},

        data() {
            return {
                activeTabIndex: 1
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 5}
                })
            },
            switchTab(index) {
                this.activeTabIndex = index
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .follow {
        @include window;

        .panel {
            @include panel;

            .tab {
                @include layout-flex-r-sb;
                @include set-h(44px);
                align-items: center;
                background: rgba(0, 124, 100, 0.8);

                span {
                    flex: 1;
                    @include font-dpr(15px);
                    color: #dddddd;
                    text-align: center;
                }

                .tab-active {
                    color: #d8d854;
                }

                .cut {
                    width: 1px;
                    height: 60%;
                    background: #007c64;
                }
            }

            .content {
                @include content
            }
        }
    }

</style>