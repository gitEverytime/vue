<template>
    <div class="capital_wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="查询及提现" name="1"></el-tab-pane>
            <el-tab-pane label="提现设置" name="2"></el-tab-pane>
        </el-tabs>
        <TempQuery
                v-if="activeName === '1'"
        >

        </TempQuery>
        <TempForward
                v-else
        >

        </TempForward>
    </div>
</template>

<script>
    import TempQuery from './query_forward.vue'
    import TempForward from './forward_set.vue'
    export default {

        components:{
            TempQuery,
            TempForward
        },


        data(){
            return{
                activeName:'1'
            }
        },
        computed:{

        },

        mounted(){

        },

        methods:{
            handleClick(){

            }
        }
    }
</script>

<style scoped lang="scss">
    .capital_wrap{
        padding:0 30px;
    }
</style>