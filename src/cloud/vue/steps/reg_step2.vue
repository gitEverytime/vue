<template>
    <div class="transform_center">
        <div class="login_wrap">
            <h2 class="login_title">创建角色</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="1" border>商家</el-radio>
                        <el-radio label="200" border>一级代理</el-radio>
                        <el-radio label="201" border>二级代理</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="" prop="bossName">
                    <el-input v-model="ruleForm.bossName" placeholder="BOSS名字"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger"
                               class="mar_t_30"
                               @click="submitForm('ruleForm')"
                    >确定</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return{
                radio7:'',
                ruleForm:{
                    type:'',
                    bossName:''
                },
                rules:{
                    type:[
                        { required: true, message: '请选择角色类型', trigger: 'change' }
                    ],
                    bossName:[
                        { required: true, message: '请输入BOSS名字', trigger: 'change' }
                    ]
                }
            }
        },
        computed:{
        },
        mounted(){
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        switch (this.ruleForm.type){
                            case '1':
                                this.$emit('setActiveIndex','3');
                                this.$emit('setBossName',this.ruleForm.bossName);
                                break;
                            case '200':
                                this.$emit('setActiveIndex','4');
                                this.$emit('setApplyType',this.ruleForm.type);
                                this.$emit('setBossName',this.ruleForm.bossName);
                                break;
                            case '201':
                                this.$emit('setActiveIndex','4');
                                this.$emit('setApplyType',this.ruleForm.type);
                                this.$emit('setBossName',this.ruleForm.bossName);
                                break;
                        }
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
    .login_wrap{
        padding: 40px 50px 20px;
        background-color: rgba(0,0,0,0.4);
        text-align:center;
        border-radius: 10px;
        .login_title{
            color: $green;
            font-size: 18px;
            padding-bottom: 40px;
        }
        .mar_t_30{
            margin-top: 20px;
        }
    }

</style>