<template>
    <div class="menu-line">
        <div class="item " v-for="(item, key) in typeList" :key="item.type">
            <div class="group" :class="type==item.type ? 'group-on': '' "
                 @click="setType(item.type)">{{item.name}}
            </div>
            <div class="line" v-if="key !== (typeList.length - 1) "></div>
        </div>
    </div>
</template>

<script>
    const E_CHOOSE_ITEM_TYPE = "E_CHOOSE_ITEM_TYPE"
    export default {
        props: ["typeList"],
        data() {
            return {
                type: "1"
            }
        },
        mounted() {
        },
        methods: {
            setType(type) {
                this.type = type;
                this.$emit(E_CHOOSE_ITEM_TYPE, type);
            }
        }

    }


</script>
<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .menu-line {
        @include layout-flex-r-sb;
        padding: 5px 10px;
        background: #322831;

        .item {
            @include layout-flex-r;
            align-items: center;
            flex-grow: 1;
            text-align: center;
            color: rgb(184, 184, 184);

            .line {
                width: 1px;
                height: 8px;
                background: #8d888f;
                align-self: center;
            }

            .group {
                width: 100%;
                text-align: center;
                @include font-dpr(14px);
                color: #8d8890;
            }

            .group-on {
                color: #06a285;
            }
        }
    }
</style>




