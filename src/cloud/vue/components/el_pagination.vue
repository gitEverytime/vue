<template>
    <div class="pagination-wrap">
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                layout="prev, pager, next"
                :pager-count="5"
                :page-size="20"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        components:{
        },
        props:{
            total:{
                type:Number
            }
        },
        data(){
            return{
                total3:0,
            }
        },
        computed:{
        },
        mounted(){
        },
        methods:{
            handleCurrentChange(){

            },
            handleSizeChange(){

            }
        }
    }
</script>

<style scoped>

</style>