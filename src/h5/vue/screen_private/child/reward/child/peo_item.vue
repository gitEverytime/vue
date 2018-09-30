<template>
    <div class="row-box peo-type-list">
        <div class="peo-item " v-for="(item, key) in groupList">
            <div class="group" :class="groupClass==item.groupType ? 'group-on': '' "
                 @click="getGroupMember(item.groupType)">{{item.name}}
            </div>
            <div class="line" v-if="key !== (groupList.length-1) "></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["groupList"],
        data() {
            return {
                groupClass: "0"
            }
        },
        mounted() {
        },
        methods: {
            getGroupMember(index) {
                this.groupClass = index;
                this.$emit('E_CHOOSE_ITEM_TYPE', index);
            }
        }

    }


</script>
<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .peo-type-list {
        @include layout-flex-r-sb;
        margin: 10px 10px 2px 10px;
    }

    .peo-type-list .peo-item {
        @include layout-flex-r;
        align-items: center;
        flex-grow: 1;
        text-align: center;
        color: rgb(184, 184, 184);
    }

    .peo-type-list .peo-item .line {
        width: 1px;
        height: 8px;
        background: #8d888f;
        align-self: center;
    }

    .peo-type-list .group {
        width: 100%;
        text-align: center;
        @include font-dpr(14px);
        color: #8d8890;
    }

    .peo-type-list .group-on {
        color: #06a285;
    }

</style>




