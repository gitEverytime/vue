<template>
    <div class="game">
        <div class="panel">
            <TempTitle :title="'游戏'"></TempTitle>
            <TempSubTitle :title="'现场游戏'"></TempSubTitle>
            <div class="content">
                <TempGameItem v-for="item in onLineGameList" :key="item.key" v-bind="item"
                              v-on:E_CLICK_ITEM="onClickItemHandler"
                              class="game-item"></TempGameItem>
            </div>
            <TempSubTitle :title="'桌面游戏'"></TempSubTitle>
            <div class="content">
                <TempGameItem v-for="item in desktopGameList" :key="item.key" v-bind="item"
                              v-on:E_CLICK_ITEM="onClickItemHandler"
                              class="game-item"></TempGameItem>
            </div>
        </div>

    </div>
</template>

<script>
    import TempTitle from '../component/box_title.vue'
    import TempSubTitle from '../component/box_sub_title.vue'
    import TempGameItem from './game_item.vue'
    import REQ from '../../comm/request'
    import ConstValue from '../../comm/const_value'

    const roomInfo = window.RINFO

    export default {

        components: {TempTitle, TempSubTitle, TempGameItem},

        data() {
            return {
                onLineGameList: [
                    {key: 1001, gameIndex: 1001, name: '摇一摇', icon: REQ.apiStaticDomain + '/static/img/game/1001.png'},
                    {key: 1002, gameIndex: 1002, name: '幸运抽奖', icon: REQ.apiStaticDomain + '/static/img/game/1002.png'},
                    {key: 1003, gameIndex: 1003, name: '心心相印', icon: REQ.apiStaticDomain + '/static/img/game/1003.png'},

                ],
                desktopGameList: [
                    {
                        key: 2001,
                        gameIndex: 2001,
                        name: '真心话 大冒险',
                        icon: REQ.apiStaticDomain + '/static/img/game/2001.png'
                    },
                ],

                canStartGame: false
            }
        },
        computed: {},

        mounted() {
            if (roomInfo.clientRole == ConstValue.CLIENT_ROLE_ACTOR) {
                REQ.reqActorAuth({},
                    (res) => {
                        if (res.data.isGame == 1) {
                            this.canStartGame = true
                        } else {
                            this.canStartGame = false
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        },

        methods: {
            onClickItemHandler(gameIndex) {
                if (gameIndex < 2000 && (roomInfo.clientRole != ConstValue.CLIENT_ROLE_ACTOR || !this.canStartGame)) {
                    this.$toast.center('游戏暂未开始')
                    return
                }

                window.location.href = `${REQ.apiGameDomain}/game/render/set/${gameIndex}?cId=${roomInfo.clientId}&storeId=${roomInfo.storeId}`
            }
        }
    }


</script>


<style lang='scss' scoped>
    @import "../../../../../style/sass/mixin.scss";

    .game {
        @include window-box;
    }

    .game .panel {
        @include box-panel;
    }

    .game .panel .content {
        @include layout-flex-r-wrap;
        width: 100%;
        height: auto;
    }

    .game .panel .content .game-item {
        width: 20%;
    }

</style>




