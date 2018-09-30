<template>
    <div class="box">
        <el-row>
            <el-col :span="7">
                <el-form-item
                        label="代理名称"
                        prop="proxyName"
                        :rules="[
                        { required: true, message: '请填写代理名称', trigger: 'change' }
                    ]"
                >
                    <el-input v-model="proxyName"></el-input>
                </el-form-item>
                <el-form-item
                        label="营业执照"
                        prop="licenceNo"
                        :rules="[
                       {required: true, message: '营业执照编号不能为空', trigger: 'change'},
                    ]"
                >
                    <el-input v-model="licenceNo"></el-input>
                </el-form-item>
                <el-form-item
                        label="法人"
                        prop="corporate"
                        :rules="[
                       {required: true, message: '法人姓名不能为空', trigger: 'change'},
                    ]"
                >
                    <el-input v-model="corporate"></el-input>
                </el-form-item>
                <el-form-item
                        label="身份证号"
                        prop="idcard"
                        :rules="[
                       {validator: validateIDcard, trigger: 'change'},
                    ]"
                >
                    <el-input v-model="idcard"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="7">
            </el-col>
            <el-col :span="4">
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import regular  from '../../global/regular.js'
    export default {
        components:{

        },
        data(){
            return{
                options:provinceAndCityData,
                proxyName:'',
                licenceNo:'',
                corporate:'',
                idcard:'',
                validateIDcard:regular.validateIDcard
            }
        },
        watch:{
            proxyName(val){
                this.$emit('setProxyName',val);
            },
            licenceNo(val){
                this.$emit('setLicenceNo',val);
            },
            corporate(val){
                this.$emit('setCorporate',val);
            },
            idcard(val){
                this.$emit('setIdcard',val);
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/common.scss";

</style>