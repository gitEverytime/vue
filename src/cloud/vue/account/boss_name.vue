<template>
    <div class="store_name">
        <h3>BOSS姓名&nbsp;&nbsp;&nbsp;&nbsp;<span>{{bossName}}</span></h3>
        <a href="javascript:;" @click='dialogVisible = true'>编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="输入BOSS名字"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="bossName"
                        :rules="[
                           { required: true, message: 'BOSS名字不能为空'},
                        ]"
                >
                    <el-input v-model="oForm.bossName" placeholder="请输入BOSS名字" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="danger" @click="submitForm('oForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            bossName:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    bossName:this.bossName
                }
            }
        },
        watch:{
            bossName(val){
                this.oForm.bossName = val;
            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setBossName',this.oForm.bossName);
                        this.dialogVisible = false
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .store_name{
        padding: 20px 0;
        @include layout-flex-r-sb;
        border-bottom:$green solid 1px;
        h3{
            font-size: 14px;
            color: #FFFFFF;
            span{
                color: $orange;
            }
        }
        a{
            color: $green;
            font-size: 14px;
        }
    }
</style>