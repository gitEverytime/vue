<template>
    <el-dialog
            title="添加银行卡"
            :visible.sync="dialogVisible"
            width="30%"
            center
            :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

            <el-form-item label="" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="个人银行卡"></el-radio>
                    <el-radio label="公户"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-select v-model="ruleForm.region" placeholder="请选择开户银行">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-input v-model="ruleForm.name" placeholder="请输入支行信息(请务必确认准确)"></el-input>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-select v-model="ruleForm.region" placeholder="证件类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-input v-model="ruleForm.name" placeholder="请输入手机号(开户行手机号码与平台登录需一致)"></el-input>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-input v-model="ruleForm.name" placeholder="请输入商户名称"></el-input>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-input v-model="ruleForm.name" placeholder="获取短信验证码"></el-input>
            </el-form-item>

            <el-form-item label="" prop="resource">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger"  @click="submitForm('ruleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
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
                ruleForm:{

                },
                rules:{

                }
            }
        },
        watch:{
            dialogVisible1(val){
                this.dialogVisible= val;
            }
        },
        mounted(){

        },
        methods:{
            handleClose(done){
                done();
                this.$emit('setDialogStatus',this.dialogVisible)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>