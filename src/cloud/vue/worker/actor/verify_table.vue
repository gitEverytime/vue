<template>
    <div>
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="详细地址">
                            {{CodeToText[props.row.ac1]}}·{{CodeToText[props.row.ac2]}}·{{CodeToText[props.row.ac3]}}{{props.row.ac4}}
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="selection"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.headimg" class="headimg">
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="50"
                    label="性别">
                <template slot-scope="scope">
                    <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                    <i class="iconfont icon-woman" v-else></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="城市">
                <template slot-scope="scope">
                    {{scope.row.province}}{{scope.row.city}}
                </template>
            </el-table-column>
            <el-table-column
                    width="actorType"
                    label="身份">
                <template slot-scope="scope">
                    <span>{{actorType[Number(scope.row.actorType)]}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="phone"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="actorName"
                    label="艺名">
            </el-table-column>

            <el-table-column
                    prop="address"
                    width="150"
                    label="操作">
                <template slot-scope="scope">
                    <a class="pass" href="javascript:;" @click="passEvent(scope.row.applyId)">
                        通过
                    </a>
                    <a class="reject" href="javascript:;" @click="rejectEvent(scope.row.applyId)">
                        驳回
                    </a>
                </template>
            </el-table-column>
        </el-table>
        <TempReject
                :dialogVisible1="dialogVisible"
                :title ='title'
                :verifyData="verifyData"
                @setSatus="getStatus"
        >

        </TempReject>
    </div>
</template>
<script>
    import TempReject from './verify_reject.vue'
    import type from '../../global/name_space.js'
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    export default {
        props:{
            tableData1:{
                type:Array
            },
        },
        components:{
            TempReject
        },
        data(){
            return{
                tableData:this.tableData1,
                dialogVisible:false,
                actorType:type,
                title:'通过',
                CodeToText:CodeToText,
                verifyData:{
                    status:'',
                    applyId:'',
                    remarks:''
                },
                update:'1',
                multipleSelection:[],
            }
        },
        watch:{
            tableData1(val){
                this.tableData = val;
            }
        },
        mounted(){

        },
        methods:{
            getStatus(val){
                this.dialogVisible = val;
            },
            /**
             * 通过
             * @param applyId
             */
            passEvent(applyId){
                this.verifyData = {
                    applyId:applyId,
                    status:'1',
                    remarks:''
                };
                this.title = "通过";
                this.dialogVisible = true;
            },
            /**
             * 驳回
             * @param applyId
             */
            rejectEvent(applyId){
                this.verifyData = {
                    applyId:applyId,
                    status:'2',
                    remarks:''
                };
                this.title = "驳回";
                this.dialogVisible = true;
            },
            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.applyId);
                });
                this.multipleSelection = [...this.multipleSelection];
                this.$emit('multipleSelection', this.multipleSelection)
            },
            getUpdate(val){
                if(val){
                    this.$emit('setUpdate1',val);
                }
                this.$store.commit('setUpdate',false)
            }
        }
    }
</script>

<style scoped>

</style>