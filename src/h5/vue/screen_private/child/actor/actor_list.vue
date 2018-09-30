<template>
    <div class="header-list">

        <div v-if="getActorList.length" class="has-data">
            <div class="item" v-for="item in getActorList">
                <Imag :src="item.headimg"/>
                <span class="name">{{item.actorName}}</span>
                <span class="type">{{getActorType(item.actorType)}}</span>
            </div>
        </div>

        <div v-if="!getActorList.length" class="no-data">
            <span class="no-sign bgd bg-no-sign"></span>
            <span class="text">还没有艺人签到哦~</span>
        </div>

    </div>
</template>

<script>
    import ConstValue from "../../comm/const_value"
    import Imag from "../component/Image.vue"

    export default {
        data() {
            return {}
        },

        components: {Imag},

        computed: {
            getActorList() {
                return this.$store.getters.getActorList;
            }
        },
        methods: {
            getActorType(type) {
                return ConstValue.getActorType(type)
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin.scss';

    .header-list {
        @include layout-flex-c;

        .has-data {
            @include layout-flex-r-wrap;

            .item {
                width: 25%;
                @include layout-flex-c;
                align-items: center;
                margin: 10px 0;

                img {
                    @include set-width-height(48px, 48px);
                    border-radius: 50%;
                }

                .name {
                    color: #01b695;
                    @include font-dpr(13px);
                    margin-top: 2px;
                }

                .type {
                    color: #8d888f;
                    @include font-dpr(11px);
                    margin-top: 5px;
                }
            }
        }

        .no-data {
            @include layout-flex-c-center;
            align-items: center;

            .no-sign {
                margin-top: 20%;
                @include set-width-height(190px, 130px);
            }

            .text {
                @include font-dpr(14px);
                color: #8d888f;
                margin-top: 20px;
            }
        }
    }
</style>




