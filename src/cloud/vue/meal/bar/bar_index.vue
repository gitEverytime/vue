<template>
    <div class="box">
        <el-tabs v-model="activeName">
            <el-tab-pane label="添加吧图" name="1"></el-tab-pane>
            <el-tab-pane label="桌位二维码" name="2"></el-tab-pane>
        </el-tabs>
        <TempBarMap v-if="activeName === '1'"></TempBarMap>
        <TempBarQrcode v-if="activeName === '2'"></TempBarQrcode>
    </div>
</template>

<script>
    import TempBarMap  from  './barMap.vue'
    import TempBarQrcode   from './bar_qrcode.vue'
    export default {
        components:{
            TempBarMap,
            TempBarQrcode
        },
        data(){
            return{
                activeName:'1'
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/common.scss";
    .box{
        padding: 0 30px;
    }
</style>