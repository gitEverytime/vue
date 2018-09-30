<template>
    <div class="setWrap">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="agent-ruleForm">
        <el-row>
            <el-col :span="8">
                <el-form-item label="店面名称" prop="sname">
                    <el-input v-model="ruleForm.sname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="16"></el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="店面类型" prop="storeType">
                    <el-select v-model="ruleForm.storeType" placeholder="请选择商家类型">
                        <el-option
                                v-for="item in storeTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
                <el-form-item label="BOSS姓名" prop="bossName">
                    <el-input v-model="ruleForm.bossName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="16"></el-col>
        </el-row>
        <el-row>
             <el-col :span="16">
                 <el-form-item label="密码" prop="pwd">
                     <el-input v-model="ruleForm.pwd" disabled="disabled"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="16"></el-col>
        </el-row>
        <el-row>
             <el-col :span="16">
                 <el-form-item label="设置分成" >
                     <table border="0" cellspacing="0" cellpadding="0" class="scale_list">
                         <tr>
                             <td>类型</td>
                             <td colspan="3">平台方</td>
                             <td colspan="2">商户方</td>
                         </tr>
                         <tbody v-for="item in scaleData">
                             <tr>
                                 <td rowspan="3">{{item.name}}</td>
                                 <td colspan="3">
                                     <el-input-number v-model="item.sys" :precision="2" :step="0.01" :max="1" :min="0" @change="changeScaleSys(item,item.sys)"></el-input-number>
                                 </td>
                                 <td colspan="2">
                                     <el-input-number v-model="item.store" :precision="2" :step="0.01" :max="1" :min="0" :disabled="item.name === '实物'" @change="changeScaleStore(item,item.store)"></el-input-number>
                                 </td>
                             </tr>
                             <tr>
                                 <td>平台</td>
                                 <td>一代</td>
                                 <td>二代</td>
                                 <td>商家</td>
                                 <td>艺人</td>
                             </tr>
                             <tr>
                                 <td>{{item.sysSys}}</td>
                                 <td>{{item.sysP1}}</td>
                                 <td>{{item.sysP2}}</td>
                                 <td>{{item.storeStore}}</td>
                                 <td>{{item.storeActor}}</td>
                             </tr>
                         </tbody>
                     </table>
                 </el-form-item>
             </el-col>
             <el-col :span="16"></el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <el-form-item label="点餐" prop="isFood">
                    <el-switch
                            v-model="ruleForm.isFood"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                    >
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="互动" prop="isInt">
                    <el-switch
                            v-model="ruleForm.isInt"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                    >
                    </el-switch>
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
    import REQ from "../../../vue/global/request.js";
    import base64   from '../../global/base64.js'
    const roomInfo = window.UINFO;
    export default {
        components:{
        },
        data(){
            return{
                storeTypeList:type.storeType,
                ruleForm:{
                    sname:'',
                    storeType:'',
                    phone:"",
                    ac1:"",
                    ac2:"",
                    ac3:"",
                    ac4:"",
                    bossName:"",
                    isFood:"0",
                    isInt:"0",
                    pwd:'bg123456'
                },
                scaleLsit:[
                    {
                        type:'霸屏',
                        storeScale:'0.3',
                        sysScale:'0.7'
                    },
                    {
                        type:'点歌',
                        storeScale:'0.3',
                        sysScale:'0.7'
                    },
                    {
                        type:'打赏',
                        storeScale:'0.3',
                        sysScale:'0.7'
                    }
                ],
                activeColor:type.activeColor,
                inactiveColor:type.inactiveColor,
                activeValue:type.activeValue,
                inactiveValue:type.inactiveValue,
                options:regionData,
                region:[],
                rules:{
                    sname: [
                        { required: true, message: '店面名称不能为空', trigger: 'change' }
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
                scaleData:[],
                keys:[]
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
        mounted(){
            this.getDefaultScale();
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addStore();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addStore(){
                let vm = this;
                let posData = JSON.parse(JSON.stringify(vm.ruleForm));
                posData['pwd'] = base64.encode(vm.ruleForm.pwd);
                vm.scaleData.forEach((item) => {
                    let name = item.name;
                    switch (name){
                        case '霸屏':
                            posData['bpSysScale'] = item.sys;
                            posData['bpStoreScale'] = item.store;
                            break;
                        case '霸麦':
                            posData['bmSysScale'] = item.sys;
                            posData['bmStoreScale'] = item.store;
                            break;
                        case '点播':
                            posData['dbSysScale'] = item.sys;
                            posData['dbStoreScale'] = item.store;
                            break;
                        case '实物':
                            posData['swSysScale'] = item.sys;
                            posData['swStoreScale'] = item.store;
                            break;
                    }
                });
                vm.REQ.reqApprovalStoreAdd(posData,
                    function(data){
                        vm.$message.success("商铺入驻成功！");
                        window.location.href="#/store/list"
                    },
                    function(data){},
                    function(data){}
                )
            },
            changeScaleSys(item,scale){
                if(item.name !=='实物') item.store = 1-scale
            },
            changeScaleStore(item,scale){
                if(item.name !=='实物') item.sys = 1-scale
            },
            /**
             * 获取默认分成比例
             */
            getDefaultScale(){
                let vm = this;
                let posData = {};
                REQ.getDefaultScale(posData,
                    function(data){
                        vm.scaleData = data.data;
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
    .scale_list{
        border: #FFFFFF solid 1px;
        tr{
            td{
                padding: 10px 10px;
                color: $green;
                font-size: 12px;
                border: #FFFFFF solid 1px;
            }
        }
    }
    .scale_text{
        width: 90px;
    }
</style>