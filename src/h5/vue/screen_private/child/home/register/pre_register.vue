<template>
    <div class="pre-register">
        <TempTitle title="果宝必修课" @E_LEFT_CLICK="backHandler"/>
        <div class="content">
            <p class="top">
                加入毕果,你将自动成为果宝，你的足迹以及成长过程我们将全程记录，并且会综合你的情况予以升级获得特权，每一级别会有你意想不到
                的收获，还会根据你的兴趣爱好为你准备你需要的信息，首次注册将获得以下特权：
            </p>
            <p class="text">1、毕果赠送一次免费打赏的机会；</p>
            <p class="text">2、毕果赠送一次免费霸屏的机会；</p>
            <p class="text">3、成为毕果终身会员的机会；</p>
            <p class="text">4、任意消费机会晋级的机会，每一级会有礼物赠送；</p>
            <p class="text">5、你想要的信息推送；</p>
            <p class="text">6、丰厚的生日礼物；</p>
            <p class="text">7、丰厚的电价优惠；</p>
            <p class="text">8、其他福利后续开放，敬请期待；</p>
            <p class="text">9、所有平台活动最终解释权归平台所有；</p>
        </div>
        <TempBtn text="下一步" @click.native="nextPage" class="btn"></TempBtn>
    </div>
</template>

<script>
    import TempTitle from "../../component/title.vue"
    import TempBtn from "../../component/button.vue"

    export default {
        props: [],

        data() {
            return {}
        },

        components: {TempTitle, TempBtn},

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 1}
                })
            },

            nextPage() {
                window.location.href = "#/register"
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .pre-register {
        @include layout-flex-c;
        position: absolute;
        z-index: 199;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #221821;
        overflow-y: scroll;

        .content {
            flex: 1;
            @include layout-flex-c;

            .top {
                @include font-dpr(14px);
                color: #ccc;
                margin: 35px 25px;
                text-indent: 30px;
                word-wrap: break-word;
                word-break: break-all;
            }

            .text {
                @include font-dpr(14px);
                color: #8d888f;
                line-height: 20px;
                padding: 0 50px;
            }
        }

        .btn {
            margin-bottom: 30px;
        }
    }

</style>