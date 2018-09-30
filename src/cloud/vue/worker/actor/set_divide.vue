<template>
    <div>
        <h1 class="com_title">分成设置</h1>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="60px" >
            <el-row>
            <el-col :span="4">
                <el-form-item
                        prop="storeStoreScale"
                        class="save_form_item"
                        label="商家"
                        :rules="[
                     { validator: validatePass, trigger: 'change' }
                    ]"

                >
                    <el-input v-model.number="storeStoreScale" class="oInput"></el-input>
                    <el-button type="primary"
                               class="btn btn-save"
                               @click="submitForm('ruleForm')"
                    >{{value}}</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item
                        prop="storeActorScale"
                        class="save_form_item"
                        label="艺人"
                        :rules="[
                 { validator: validatePass, trigger: 'change' }
                ]"

                >
                    <el-input v-model.number="storeActorScale" class="oInput"></el-input>
                    <el-button type="primary"
                               class="btn btn-save"
                               @click="submitForm('ruleForm')"
                    >{{value}}</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <TempSaveText text="平台" value="保存"
                              width="60px"
                              :propsSaveText="sysScale"
                              @inputVal="setProgramScale3"
                              :propsDisabled="true"
                ></TempSaveText>
            </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import TempSaveText from '../../components/save_Text.vue'
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempSaveText
        },
        data(){
            return{
                ruleForm:{
                    storeStoreScale:0,
                    storeActorScale:0,
                },
                storeStoreScale:0,
                storeActorScale:0,
                id:'',
                sysScale:0,
                value:'保存'
            }
        },
        computed:{

        },
        watch:{
            storeStoreScale(val){
                this.ruleForm.storeStoreScale = val;
                this.storeActorScale = (1-val).toFixed(2);
            },
            storeActorScale(val){
                this.ruleForm.storeActorScale = val;
                this.storeStoreScale = (1-val).toFixed(2);
            },
        },
        mounted(){
            let _this = this;
            let posData = {
                storeId:roomInfo.storeId
            };
            REQ.reqGetActorScale(posData,
                function(result){
                    _this.storeStoreScale =  result.data.storeStoreScale;
                    _this.storeActorScale =  result.data.storeActorScale;
                    _this.sysScale =  result.data.sysScale;
                    _this.id = result.data.id
                },
                function(data){ },
                function(data){
                    //todo error
                }
            );
        },
        methods:{
            setProgramScale1(val){
                this.storeStoreScale = val;
                this.setProgram();
            },
            setProgramScale2(val){
                this.storeActorScale = val;
                this.setProgram();
            },
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.setStoreScale();
                    } else {
                        return false;
                    }
                });
            },
            setProgramScale3(val){
                this.sysScale = val;
                this.setStoreScale();
            },
            setStoreScale(){
                let _this = this;
                let posData = {
                    storeStoreScale:_this.storeStoreScale,
                    storeActorScale:_this.storeActorScale,
                    id:_this.id
                };
                REQ.reqSetStoreScale(posData,
                    function(result){
                        _this.$message.success("修改商户分成比例成功！")
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            validatePass(rule, value, callback){
                let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/;
                let vm = this;
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(!reg.test(value)){
                    callback(new Error('只能输入数字'));
                } else if(vm.isMM && value<10 || value>5000){
                    callback(new Error('数字应该在10-5000'));
                }else{
                    callback();
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/common";
    .oInput{
        @include set-wh(60px, 20px);
        input{
            @include set-wh(60px, 20px);
            background:rgba(0,0,0,0.2); text-indent: 5px;
            border: 1px solid #dedede; border-radius: 5px; color: #dedede;
        }
    }
    .btn{
        @include set-wh(60px, 20px);
        line-height: 0px;
        /*margin: 0 0 0 20px;*/
        display:inline-block; text-align: center; border-radius: 5px;
        background: #00B594; color: #FFF; cursor: pointer;
    }
</style>