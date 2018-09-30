<template>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center
    >
        <el-input placeholder="请输入冻结原因" v-model="value1"></el-input>
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
                dialogVisible:false,
                value1:''
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
                this.$emit('setSatus',this.dialogVisible)
            }
        }
    }
</script>

<style scoped>

</style>