<template>
    <div class="store_name">
        <h3>工作时间&nbsp;&nbsp;&nbsp;&nbsp;<span>{{dayStartTime}}-{{dayEndTime}}</span></h3>
        <a href="javascript:;" @click='dialogVisible = true'>编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改工作时间"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="startTime"
                        :rules="[
                           { required: true, message: '起始时间不能为空'},
                        ]"
                >
                    <el-time-select
                            placeholder="起始时间"
                            v-model="oForm.startTime"
                            :picker-options="{
                              start: '06:30',
                              step: '00:15',
                              end: '24:00'
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item
                        label=""
                        prop="endTime"
                        :rules="[
                           { required: true, message: '结束时间不能为空'},
                        ]"
                >
                    <el-time-select
                            placeholder="结束时间"
                            v-model="oForm.endTime"
                            :picker-options="{
                              start: '06:30',
                              step: '00:15',
                              end: '24:00',
                              minTime: oForm.startTime
                            }">
                    </el-time-select>
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
            dayStartTime:{
                type:String
            },
            dayEndTime:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    startTime: this.dayStartTime,
                    endTime: this.dayEndTime
                },
            }
        },
        watch:{
            dayStartTime(val){
                this.oForm.startTime = val;
            },
            dayEndTime(val){
                this.oForm.endTime = val;
            },
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setWorkTime',this.oForm);
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