<template>
    <div class="order-manage">
        <div class="panel">
            <Title title="订单管理" @E_LEFT_CLICK="backHandler"/>
            <div class="tab">
                <span @click="switchTab(1)" :class="{'tab-active':activeTabIndex === 1}">点播订单</span>
                <div class="cut"></div>
                <span @click="switchTab(2)" :class="{'tab-active':activeTabIndex === 2}">点餐订单</span>
            </div>
            <div class="content">
                <ProgramList v-if="activeTabIndex === 1"></ProgramList>
                <MealList v-if="activeTabIndex === 2"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../../component/title.vue'
    import ProgramList from './ProgramList.vue'
    import MealList from './mealList.vue'

    export default {
        props: [],

        components: {Title, ProgramList, MealList},

        data() {
            return {}
        },

        computed: {
            activeTabIndex() {
                return this.$store.getters.getOrderManageIndex
            }
        },

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
                this.$store.commit("storeOrderManageIndex", index)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .order-manage {
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
                @include content;
            }
        }
    }

</style>