<template>
    <div class="main">
        <div class="meddle">
            <!-- 渲染路由 -->
            <router-view class="view">
            </router-view>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
        }
    }


</script>
<style lang='scss' scoped>

    .main {
        width: 100%;
        height: 100%;

        .meddle {
            width: 100%;
            height: 100%;
            overflow-y: hidden;
        }
    }
</style>




