<template>
    <div class="account_wrap">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基础资料" name="1"></el-tab-pane>
            <!--<el-tab-pane label="分店管理" name="2"></el-tab-pane>-->
        </el-tabs>
        <TempAccountInfo  :activeName="activeName"></TempAccountInfo>
    </div>
</template>

<script>
    import TempAccountInfo from './account_info.vue'
    import TempBranchShop from './branch_shop.vue'
    export default {
        components:{
            TempAccountInfo,
            TempBranchShop
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
    .account_wrap{
        padding:0 30px;
        /*width: 100%;*/
        height: 100%;
        margin-right: -17px;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>