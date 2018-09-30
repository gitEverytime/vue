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

            createGame(data) {
                data.gameIndex = GameInfo.gameIndex
                REQ.reqSubmitGameSettings(data,
                    (req) => {
                        this.$router.replace({name: 'prepare'})
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
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