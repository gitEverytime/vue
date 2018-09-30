<template>
    <div >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="width" >
            <el-form-item
                    :label="text"
                    prop="val"
                    class="save_form_item"
                    :rules="[
                     { validator: validatePass, trigger: 'change' }
                    ]"
            >
                <el-input v-model.number="ruleForm.val" class="oInput" :disabled="propsDisabled"></el-input>
                <el-button type="primary"
                           class="btn btn-save"
                           @click="submitForm('ruleForm')"
                           :disabled="propsDisabled"
                >{{value}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {

        components:{
        },
        props:{
            width:{
                type:String
            },
            propsDisabled:{
                type:Boolean
            },
            text:{
                type:String
            },
            value:{
                type:String
            },
            propsSaveText:{
                type:Number
            },
            isMaxMin:{
                type:Boolean
            }
        },
        data(){
            return{
                ruleForm:{
                    val:this.propsSaveText,
                },
                rules:{

                },
                isMM:this.isMaxMin
            }
        },
        watch: {
            propsSaveText(val) {
                this.ruleForm.val = val;//新增result的watch，监听变更并同步到myResult上
            },
            isMaxMin(val){
                this.isMM = val;
            }
        },
        computed:{

        },

        mounted(){

        },

        methods:{
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$emit("inputVal",vm.ruleForm.val);
                    } else {
                        return false;
                    }
                });
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
            }
        }


    }
</script>

<style  lang='scss' scoped>

    @import "../../../style/sass/mixin";
    .lab{
        margin: 0 20px 0 0;
        height: 25px; line-height: 25px; color: #dedede; font-size: 16px;
    }
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
    .layui-form-switch{
        margin-top: 0;
    }
    .reg_msg{
        color: #CD2626;
        font-size: 10px;
        padding-top: 3px;
    }

</style>