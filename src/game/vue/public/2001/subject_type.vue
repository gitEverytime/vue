<template>
    <div>
        <ul class="group_type">
            <li>电器</li>
            <li>动物</li>
        </ul>
        <ul class="group_type">
            <li>食物</li>
            <li>动作</li>
        </ul>
        <ul class="group_type">
            <li>日用品</li>
            <li>动漫人物</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "subject"
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .group_type{
        li{
            @include set-width-height(250px,160px);
            background:rgba(229,32,69,1);
            border-radius:10px;
            float: left;
            margin-right: 50px;
            font-size:42px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:160px;
            text-align: center;
            -moz-box-shadow: inset -1px -3px 16px -1px #7D0A1D;
            -webkit-box-shadow: inset -1px -3px 16px -1px #7D0A1D;
            box-shadow: inset -1px -3px 16px -1px #7D0A1D;
            text-shadow: -1px -1px 1px #bbb, 1px 1px 1px #bbb;
            margin-top: 50px;
        }
    }
</style>