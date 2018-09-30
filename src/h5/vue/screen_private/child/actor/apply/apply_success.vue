<template>
    <div class="apply-success">
        <div class="panel">
            <Title title="申请成为艺人" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <span class="image bgd bg-success"/>
                <h1>提交成功，请耐心等待平台通过</h1>
                <h3>系统将在7个工作日内完成审核</h3>

            </div>
            <Button class="btn" text="回到首页" @click.native="backHandler"/>
        </div>
    </div>

</template>

<script>
    import Title from "../../component/title.vue"
    import Button from "../../component/button.vue"

    export default {
        props: [],

        components: {Title, Button},

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .apply-success {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;
                @include layout-flex-c;
                align-items: center;

                .image {
                    @include set-width-height(90px, 90px);
                    margin-top: 35%;
                }

                h1 {
                    @include font-dpr(16px);
                    color: #dddddd;
                    margin-top: 25px;
                }

                h3 {
                    @include font-dpr(14px);
                    color: #8d888f;
                    margin-top: 15px;
                }
            }

            .btn {
                margin-bottom: 30px;
            }
        }
    }
</style>