<template>
    <el-dialog
            title="提现说明"
            :visible.sync="forwardVisible"
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
            forwardVisible1:{
                type:Boolean
            }
        },
        data(){
            return{
                forwardVisible:false
            }
        },
        watch:{
            forwardVisible1(val){
                this.forwardVisible = val;
            }
        },
        mounted(){

        },
        methods:{
            handleClose(done){
                done();
                this.$emit('setForwardStatus',this.forwardVisible)
            }
        }
    }
</script>

<style scoped>

</style>