<template>
    <div class="create bgd bg-private-bg">
        <div class="panel">
            <Title title="创建游戏" @leftClick="backHandler"/>
            <div class="content">
                <InputBox @confirm="createGame"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import InputBox from './input_box.vue'
    import REQ from './request'
    import storage from './storage'

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
                REQ.createGame(params,
                    (res) => {
                        REQ.playGame({gameId: res.data.id},
                            (re) => {
                                this.$root.notify.$emit("conn-socket", re.data.id)
                                storage.setValue('playId', re.data.id)
                                storage.setValue('params', params)
                                this.$router.replace({name: 'Prepare'})
                            },
                            (complete) => {
                            },
                            (err) => {
                                this.$logger.error(err)
                            }
                        )
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