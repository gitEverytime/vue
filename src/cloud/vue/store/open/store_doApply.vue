<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="300px"
            :before-close="handleClose"
            center
    >
        <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
            <el-form-item
                    label=""
                    prop="remarks"
                    :rules="[
                           { required: true, message: '原因不能为空'},
                        ]"
            >
                <el-input v-model="oForm.remarks" placeholder="请输入原因" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button type="danger" @click="submitForm('oForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        components:{

        },
        props:{
            dialogVisible1:{
                type:Boolean
            },
            title:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    remarks:''
                }
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setRemarks',this.oForm.remarks);
                        this.dialogVisible = false;
                        this.$emit('setDialogVisible',false)
                    } else {
                        return false;
                    }
                });
            },
            handleClose(done){
                done();
                this.$emit('setDialogVisible',false)
            }
        }
    }
</script>

<style scoped>

</style>