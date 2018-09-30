<template>
    <div class="box">
        <el-row>
            <el-col :span="7">
                <el-form-item
                        label="boss姓名"
                        prop="bossName"
                        :rules="[
                        { required: true, message: '请填写boss姓名', trigger: 'change' }
                    ]"
                >
                    <el-input v-model="bossName"></el-input>
                </el-form-item>
                <el-form-item
                        label="boss电话"
                        prop="phone"
                        :rules="[
                        {validator: validateNumber, trigger: 'change'},
                    ]"
                >
                    <el-input v-model="phone"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="7">
            </el-col>
            <el-col :span="10">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import regular  from '../../global/regular.js'
    export default {
        components:{

        },
        data(){
            return{
                bossName:'',
                phone:'',
                validateNumber:regular.validateNumber
            }
        },
        watch:{
            bossName(val){
                this.$emit('setBossName',val);
            },
            phone(val){
                this.$emit('setPhone',val);
            },
        },
        mounted(){
            // console.log(regular.number())
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/common.scss";

</style>