<template>
    <el-dialog
            title="提现历史"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        components:{

        },
        props:{
            dialogVisible1:{
                type:Boolean
            }
        },
        data(){
            return{
                dialogVisible:false
            }
        },
        watch:{
            dialogVisible1(val){
                this.dialogVisible = val;
            }
        },
        mounted(){

        },
        methods:{
            handleClose(done){
                done();
                this.$emit('setStatus',this.dialogVisible)
            }
        }
    }
</script>

<style scoped>

</style>