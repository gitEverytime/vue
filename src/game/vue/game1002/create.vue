<template>
    <div class="create bgd bg-private-bg">
        <div class="panel">
            <Title title="创建幸运大抽奖" @leftClick="backHandler"/>
            <div class="content">
                <InputBox @confirm="createGame"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import InputBox from './input_box.vue'
    import REQ from '../common/request'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {Title, InputBox},

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            createGame(params) {
                REQ.reqSubmitGameSettings(params,
                    () => {
                        if (params.mode == 1) {
                            REQ.reqStartGame({storeId: GameInfo.storeId, gameIndex: GameInfo.gameIndex},
                                () => {
                                    this.$router.replace({name: 'Playing'})
                                },
                                (complete) => {
                                },
                                (err) => {
                                    this.$toast.center(err.data)
                                }
                            )
                        } else {
                            this.$router.replace({name: 'Prepare'})
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .create {
        @include window;

        .panel {
            @include game-panel;

            .content {
                @include content;
            }
        }
    }


</style>