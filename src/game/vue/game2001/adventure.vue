<template>
    <div class="adventure bgd bg-private-bg">
        <div class="panel">
            <Title title="大冒险" @leftClick="backHandler"/>
            <Imag :src="getBg" classes="backdrop"/>
            <span class="question">{{question}}</span>
            <div class="btn" @click="finish">本题完成</div>
            <div class="btn" @click="jump" v-if="canJump">跳过本题</div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import Imag from "../component/Image.vue"

    const arrayDare = [
        "背一位异性绕场一周",
        "唱青藏高原最后一句",
        "做一个大家都满意的鬼脸",
        "抱一位异性直到下一轮真心话大冒险结束",
        "向一位异性表白3分钟",
        "与一位异性十指相扣，对视10秒",
        "邀请一位异性为你唱情歌，或邀请一位异性与你情歌对唱",
        "做自己最性感、最妩媚的表情或动作",
        "吃下每个人为你夹得菜",
        "蹲在凳子上作便秘状",
        "亲***（这个人可以事先指定），或者亲一位异性，部位不限",
        "深情的吻墙30秒",
        "模仿古代特殊职业女子拉客",
        "跳肚皮舞",
        "跳钢管舞",
        "对外大喊我是猪",
        "走猫步50米",
        "和左数第一个异性亲一下",
        "跪地求婚状：如果我不向你求婚，我会后悔一辈子，因为你是我的惟一。",
        "大喊 燃烧吧，小宇宙～",
        "站起來,大喊: 我是超人,我要回家了！",
        "亲左数第二个 异性的额头",
        "和左边第一个 异性换穿上衣",
        "露出肚皮，扭腰扭屁股，各扭3圈",
        "把右边第一个 异性横抱起来",
        "对外大喊“我好寂寞啊”",
        "屁股写字",
        "问一位陌生异性加微信",
        "在地上坐蛙跳，并发出呱呱声音",
        "邀请一位异性为你唱情歌，或邀请一位异性与你情歌对唱",
        "对陌生的异性送一飞吻，那个被送飞吻的异性必须看到",
        "大喊三遍：“我是美女/帅哥”",
        "对一个陌生人大喊2声“我是禽兽”",
        "拦一部出租车，上车以后，司机问说去哪里。说：带我去月球„„",
        "输的人要去买一杯可乐，等店员问你要中杯还是大杯，说：我要D罩杯！",
    ]

    export default {
        props: [],
        components: {Title, Imag},

        data() {
            return {
                question: '',
                canJump: true,
            }
        },

        computed: {
            getBg() {
                return REQ.apiStaticDomain + '/static/img/new/damaoxian.gif.webp'
            },
        },

        mounted() {
            this.getQuestion()
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            getQuestion() {
                const random = parseInt(Math.random() * arrayDare.length)
                this.question = arrayDare[random]
            },

            finish() {
                this.$router.replace({name: 'Play'})
            },

            jump() {
                this.canJump = false
                this.getQuestion()
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .adventure {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;

            .backdrop {
                width: 80%;
                margin-top: 30px;
            }

            .question {
                color: #F5F5F5;
                @include font-dpr(18px);
                width: 55%;
                position: absolute;
                top: 200px;
                text-align: center;
            }

            .btn {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>