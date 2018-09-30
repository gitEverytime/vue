<template>
    <div class="store_logo">
        <div class="logo_title">
            <p>商家介绍</p><a href="javascript:;" @click='dialogVisible=true'>编辑</a>
        </div>
        <p class="introduce_text">{{summary}}</p>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改商家介绍"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="introduce"
                        :rules="[
                           { required: true, message: '商家介绍不能为空'},
                        ]"
                >
                    <el-input v-model="oForm.introduce" type="textarea" placeholder="请输入商家介绍" auto-complete="off"></el-input>
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
            summary:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    introduce:this.summary
                }
            }
        },
        watch:{
            summary(val){
                this.oForm.introduce = val;
            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setSummary',this.oForm.introduce);
                        this.dialogVisible = false;
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
    .store_logo{
        padding: 20px 0;
        border-bottom: $green solid 1px;
        .logo_title{
            @include layout-flex-r-sb;
            margin-bottom:20px;
            p{
                font-size: 14px;
                color: #FFFFFF;
                span{
                    color: $light_gray;
                }
            }
            a{
                color: $green;
                font-size: 14px;
            }
        }
        .introduce_text{
            font-size: 14px;
            color: $orange;
        }
    }
</style>