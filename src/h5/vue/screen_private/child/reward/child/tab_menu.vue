<template>
    <div class="tab-th-box">
        <div v-for="(barname,index) in menuList" class="tab-th" :class="tabthClass==index?'tab-th-on':''"
             @click="showMenu(index)">
            {{barname}}
        </div>
    </div>

</template>

<script>

    export default {
        props: ['url', "name", "price"],
        data() {
            return {
                tabthClass: '0',
                menuList: [
                    "店内打赏",
                    "礼物打赏",
                    "红包打赏",
                ]
            }
        },
        mounted() {

        },
        methods: {
            showMenu(tab) {
                this.tabthClass = tab;
                this.$emit("E_REWORD_TYPE", tab)
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .tab-th-box {
        @include layout-flex-r;
        text-align: center;
        color: rgb(78, 85, 99);
        @include set-h(27px);
    }

    .tab-th-box .tab-th {
        flex: 1;
        text-align: center;
        color: #8d888f;
       @include font-dpr(12px);
    }

    .tab-th-box .tab-th-on {
        background: #322831;
        color: #01b695;
        border-radius: 4px 4px 0 0;
    }

</style>




