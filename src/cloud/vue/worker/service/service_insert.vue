<template>
    <div class="setWrap">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="agent-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="选择省市" prop="ac1">
                        <el-cascader
                                :options="options"
                                v-model="region"
                                placeholder="选择省市区"
                        >
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8"></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="详细地址" prop="ac4">
                        <el-input v-model="ruleForm.ac4"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="身份证号" prop="idcard">
                        <el-input v-model="ruleForm.idcard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
    import type from '../../global/name_space.js'
    import regular  from '../../global/regular.js'
    export default {
        components:{
        },
        data(){
            return{
                storeTypeList:type.storeType,
                ruleForm:{
                    nickname:'',
                    staffType:'102',
                    phone:"",
                    ac1:"",
                    ac2:"",
                    ac3:"",
                    ac4:"",
                    sex:'',
                    idcard:''
                },
                options:regionData,
                region:[],
                rules:{
                    nickname: [
                        { required: true, message: '昵称不能为空', trigger: 'change' }
                    ],
                    idcard:[
                        { validator: regular.validateIDcard, trigger: 'change' }
                    ],
                    storeType:[
                        {required: true, message: '请选择店铺类型', trigger: 'change' }
                    ],
                    phone:[
                        {validator: regular.validateNumber, trigger: 'change'},
                    ],
                    bossName:[
                        { required: true, message: 'boss姓名不能为空', trigger: 'change' }
                    ],
                    ac1:[
                        { required: true, message: '所在地区不能为空', trigger: 'change' }
                    ],
                    ac4:[
                        { required: true, message: '详细地址不能为空', trigger: 'change' }
                    ],
                    pwd:[
                        { required: true, message: '密码不能为空', trigger: 'change' }
                    ]
                },
            }
        },
        watch:{
            region(val){
                if(val.length<1) return;
                val.forEach((col,key) => {
                    this.ruleForm[`ac${key+1}`] = col;
                })
            }
        },
        mounted(){},
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.staffAddToStore();
                    } else {
                        return false;
                    }
                });
            },
            staffAddToStore(){
                let vm = this;
                let posData = vm.ruleForm;
                vm.REQ.reqAddWithoutClient(posData,
                    function(data){
                        vm.$message.success("商家服务员添加成功！");
                        vm.$emit('setActiveName','1')
                    },
                    function(data){},
                    function(data){}
                )
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../sass/common';
    .setWrap{
        padding: 30px 0;
    }
</style>