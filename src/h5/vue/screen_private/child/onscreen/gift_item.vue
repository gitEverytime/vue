<template>
    <div class="gift-item-content">
        <div class="gift-item1" v-if="cate == 1" v-on:click="clickGiftHandler">
            <div class="header">
                <img :src="icon">
            </div>
            <h1 class="gift-name">{{name}}</h1>
        </div>
        <div class="gift-item2" v-if="cate == 2" v-on:click="clickGiftHandler">
            <div class="header">
                <img :src="icon">
            </div>
            <h1 class="gift-name">{{name}}</h1>
        </div>
        <div class="gift-item3" v-if="cate == 3" v-on:click="clickGiftHandler">
            <div class="header">
                <img :src="icon">
            </div>
            <h1 class="gift-name">{{name}}</h1>
        </div>
    </div>
</template>

<script>
    const E_CLICK_GIFT = "E_CLICK_GIFT";


    export default {
        props: ["id", "name", "icon", "cate"],

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {

            clickGiftHandler() {
                this.$emit(E_CLICK_GIFT, this.id);
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .gift-item-content {
        margin: 15px 0 0 0;

        .gift-item1 {
            width: 105px;
            @include layout-flex-c;
            align-items: center;

            .header img {
                @include set-width-height(95px, 55px);
                overflow: hidden;
            }

            .gift-name {
                margin: 3px 0 3px 0;
                @include font-dpr(13px);
                color: #8d8890;
                text-align: center;
            }
        }

        .gift-item2 {
            width: 75px;
            @include layout-flex-c;
            align-items: center;

            .header img {
                @include set-width-height(65px, 55px);
                overflow: hidden;
            }

            .gift-name {
                margin: 3px 0 3px 0;
                @include font-dpr(13px);
                color: #8d8890;
                text-align: center;
            }
        }

        .gift-item3 {
            width: 130px;
            @include layout-flex-c;
            align-items: center;

            .header img {
                @include set-width-height(110px, 75px);
                overflow: hidden;
            }

            .gift-name {
                margin: 3px 0 3px 0;
                @include font-dpr(13px);
                color: #8d8890;
                text-align: center;
            }
        }
    }

    .gift-active {
        .gift-item1 {
            border-radius: 4px;
            border: 1px solid #01b695;
            @include box-shadow(0 0 3px #01b695);

            .gift-name {
                color: #01b695;
            }
        }
        .gift-item2 {
            border-radius: 4px;
            border: 1px solid #01b695;
            @include box-shadow(0 0 3px #01b695);

            .gift-name {
                color: #01b695;
            }
        }
        .gift-item3 {
            border-radius: 4px;
            border: 1px solid #01b695;
            @include box-shadow(0 0 3px #01b695);

            .gift-name {
                color: #01b695;
            }
        }
    }

</style>




