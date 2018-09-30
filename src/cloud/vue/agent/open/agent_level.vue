<template>
    <div class="box">
        <el-row>
            <el-col :span="7">
                <el-form-item
                    label="代理级别"
                    prop="type"
                    :rules="[
                        { required: true, message: '请选择代理级别', trigger: 'change' }
                    ]"
                >
                    <el-radio-group v-model="type">
                        <el-radio label="200">一级代理</el-radio>
                        <el-radio label="201">二级代理</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                        label="代理区域"
                        prop="ac1"
                        :rules="[
                       {required: true, message: '省市区不能为空', trigger: 'change'},
                    ]"
                >
                    <el-cascader
                            :options="options"
                            v-model="region"
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item
                        label="详细地址"
                        prop="ac4"
                        :rules="[
                        { required: true, message: '请填写详细地址', trigger: 'change' }
                        ]"
                >
                    <el-input v-model="ac4"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="7">
            </el-col>
            <el-col :span="7">
            </el-col>
            <el-col :span="3"></el-col>
        </el-row>
    </div>
</template>

<script>
    import { provinceAndCityData, regionData } from 'element-china-area-data';
    export default {
        components:{

        },
        data(){
            return{
                options:regionData,
                type:'',
                ac4:'',
                region:[]
            }
        },
        watch:{
            type(val){
                this.$emit('setType',val);
            },
            region(val){
                this.$emit('setRegion',val)
            },
            ac4(val){
                this.$emit('setAc4',val)
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