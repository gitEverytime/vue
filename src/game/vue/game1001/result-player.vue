<template>
    <div class="result-player bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <div class="content">
                <p class="top-title">【{{title}}】最终排名</p>
                <p class="number">总参与人数：{{count}}人</p>
                <p class="class-name">{{className}}</p>
                <Imag classes="avatar" :src="userInfo.avatar" />
                <p class="name">{{userInfo.userName}}</p>
                <p class="describe">{{describe}}</p>
                <p class="reward-desc">{{rewardDesc}}</p>
            </div>
            <span class="btn" @click="backHandler">返回</span>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import TempUserItem from './user_item.vue'
    import Imag from '../component/Image.vue'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        data() {
            return {
                title: '',
                count: 0,
                level: 0,
                rewardDesc: '',
                describe: '',
                userInfo: {},
                className: ''
            }
        },

        components: {Title, TempUserItem, Imag},

        computed: {},

        mounted() {
            REQ.reqGetGameResult({
                    storeId: GameInfo.storeId,
                    userId: GameInfo.cId,
                    gameIndex: GameInfo.gameIndex,
                },
                (response) => {
                    this.title = response.data.name
                    this.formatResult(response.data.reward)
                },
                (complete) => {
                },
                (err) => {
                })

            REQ.reqGetUserCount({
                    gameIndex: GameInfo.gameIndex,
                    storeId: GameInfo.storeId
                },
                (response) => {
                    this.count = response.data.count || 0
                },
                (complete) => {
                },
                (err) => {
                })
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            formatResult(data) {
                const describes = {
                    1: '麒麟臂，恭喜您夺魁',
                    2: '臂力惊人，恭喜您中奖',
                    3: '健康达人，恭喜您中奖',
                    4: '正常发挥，幸运砸中',
                    5: '好遗憾'
                }
                const classNames = {
                    1: '一等奖',
                    2: '二等奖',
                    3: '三等奖',
                    4: '幸运奖',
                    5: '未中奖'
                }
                // 如果中奖
                data.forEach(item => {
                    item.userList && item.userList.forEach(user => {
                        if (user.userId == GameInfo.cId) {
                            this.userInfo = user
                            this.level = item.level
                            this.rewardDesc = item.rewardDesc
                        }
                    })
                })
                //如果未中奖
                if (!this.level) {
                    const user = this.$store.getters.getUserById(GameInfo.cId)
                    this.userInfo = {userId: user.sysId, userName: user.nickname, avatar: user.headimg}
                    this.level = 5
                    this.rewardDesc = '差一点点就中奖啦'
                }
                this.describe = describes[this.level]
                this.className = classNames[this.level]
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .result-player {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .content {
                flex: 1;
                width: 100%;
                @include layout-flex-c;
                align-items: center;
                overflow-y: scroll;

                .top-title {
                    color: #eeeeee;
                    @include font-dpr(16px);
                    margin-top: 15px;
                }

                .number {
                    color: #bbbbbb;
                    margin: 10px 0 15px 0;
                }

                .class-name {
                    color: #eeeeee;
                    @include font-dpr(25px);
                }

                .avatar {
                    margin: 10px 0 5px 0;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }

                .name {
                    color: #35ffcc;
                    margin: 3px;
                }

                .describe {
                    color: #eeeeee;
                    margin: 10px 0 20px 0;
                    @include font-dpr(28px);
                }

                .reward-desc {
                    color: #eeeeee;
                    margin: 10px 0 20px 0;
                    @include font-dpr(16px);
                }
            }

            .btn {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                text-align: center;
                margin: 20px 0;
            }
        }
    }

</style>