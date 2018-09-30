<template>
    <div class="reward" :style="getStyle">
        <div class="menu-box">
            <TempTitle :title="'打赏'"/>
            <div class="content">
                <PeoItem v-bind:groupList="groupList" v-on:E_CHOOSE_ITEM_TYPE="setItemType"/>
                <TmpTypeHead v-on:E_CHOOSE_PEO="setRewordPeopleId" v-bind:peoType="peoType" :rewardType="rewordTypeTabIndex" :toUser="toUser"/>
                <div>
                    <TabMenu v-on:E_REWORD_TYPE="setRewordTypeTabIndex"/>
                    <TempRewardGift v-if="rewordTypeTabIndex == 1"
                                    v-bind="{trole: peoType, tUser: this.toUser}"/>
                    <TempRewardRed v-if="rewordTypeTabIndex == 2" v-bind="{trole: peoType, tUser: this.toUser}"/>
                    <TempRewardReal v-if="rewordTypeTabIndex == 0"
                                    v-bind="{trole: peoType, tUser: this.toUser}"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import TmpTypeHead from './child/type_users.vue'
    import PeoItem from './child/peo_item.vue'
    import TabMenu from './child/tab_menu.vue'
    import SelectLine from './child/select_line.vue'
    import TempTitle from "../component/box_title.vue"
    import TempRewardGift from "./child/reward_gift.vue"
    import TempRewardRed from "./child/reward_red.vue"
    import TempRewardReal from "./child/reward_real.vue"
    import MsgType from "../../comm/msg_type"
    import CatchControl from "../../comm/catch_control"

    const roomInfo = window.RINFO

    export default {
        props: [],
        components: {
            TmpTypeHead,
            PeoItem,
            TabMenu,
            SelectLine,
            TempTitle,
            TempRewardGift,
            TempRewardRed,
            TempRewardReal
        },

        data() {
            return {
                groupList: [
                    {groupType: '0', name: '现场'},
                    {groupType: '1', name: '艺人'},
                    {groupType: '102', name: '服务员'},
                    {groupType: '103', name: '厨师'},
                    {groupType: '104', name: '收银员'},
                ],
                peoType: '0',
                rewordTypeTabIndex: '0',
                toUser: {},
            }
        },
        computed: {
            getStyle() {
                const height = this.$store.getters.getFootMenuShow ? '50px' : '0px'
                return {
                    borderBottom: height + ' solid transparent'
                }
            }
        },

        mounted() {
            CatchControl.catchUser({storeId: roomInfo.storeId});
        },

        methods: {
            //设置打赏人类别
            setItemType(id) {
                this.peoType = id;
                // CatchControl.catchUser({storeId: roomInfo.storeId});
            },

            //设置具体打赏人
            setRewordPeopleId(data) {
                this.toUser = data;
            },
            //标签页选择
            setRewordTypeTabIndex(tabIndex) {
                this.rewordTypeTabIndex = tabIndex;
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .reward {
        @include window-box;

        .menu-box {
            @include box-panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;
                position: relative;
            }
        }
    }
</style>






