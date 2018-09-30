<template>
    <div>
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="资料信息" v-if="props.row.attachs">
                            <div class="material_info" v-for="item in JSON.parse(props.row.attachs)">
                                <img :src="item.img">
                                <h2>{{item.title}}</h2>
                            </div>
                        </el-form-item>
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
                    width="100"
                    label="头像">
                <template slot-scope="scope">
                    <img src="http://static.ibigtop.com/static/img/public/touxiang/headimg2.jpg" class="headimg">
                </template>
            </el-table-column>
            <el-table-column
                    prop="actorName"
                    width="100"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    prop="realName"
                    width="100"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="100"
                    label="艺人类型">
                <template slot-scope="scope">
                    {{actorType[Number(scope.row.actorType)]}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="actorId"
                    width="200"
                    label="身份证号">
                <template slot-scope="scope">
                    {{scope.row.idcard}}
                </template>
            </el-table-column>
            <el-table-column
                    width="200"
                    label="电话">
                <template slot-scope="scope">
                    {{scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdAt"
                    width=""
                    :formatter="dateFormat"
                    label="时间">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template slot-scope="scope">
                    付薪
                    <!--<div v-if="activeIndex === ''">-->
                    <!--<el-button type="primary"-->
                    <!--v-if="scope.row.sysStatus === '3'"-->
                    <!--@click="passStaffEvent(scope.row.staffId)"-->

                    <!--&gt;解冻</el-button>-->
                    <!--<el-button type="primary" v-if="scope.row.sysStatus === '1'" @click="rejectStaffEvent(scope.row.staffId)">冻结</el-button>-->
                    <!--</div>-->
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :pager-count="5"
                    :page-size="20"
                    :total="value">
            </el-pagination>
        </div>

        <TempReject
                :dialogVisible1="dialogVisible"
                :title ='title'
                :verifyData="verifyData"
                @setSatus="getStatus"
                @setIsUpdate="getIsUpdate"
        >

        </TempReject>
    </div>
</template>
<script>
    import TempReject from './verify_reject.vue'
    import REQ from "../../../vue/global/request.js";
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import type from '../../global/name_space.js'
    import moment  from 'moment'
    export default {
        components:{
            TempReject
        },
        props:{
            activeName:{
                type:String
            }
        },
        data(){
            return{
                tableData:[],
                dialogVisible:false,
                actorType:type,
                title:'通过',
                pageNo:1,
                value:0,
                verifyData:{
                    status:'',
                    applyId:'',
                    remarks:''
                },
                CodeToText:CodeToText,
                update:'1',
                multipleSelection:[],
                status:'1'
            }
        },
        watch:{
            tableData1(val){
                this.tableData = val;
            },
            activeName(val){
                if(val === '管理') this.status = '1';
                if(val === '未通过') this.status = '2';
                this.actorSysList();
            }
        },
        mounted(){
            this.actorSysList();
        },
        methods:{
            getStatus(val){
                this.dialogVisible = val;
            },

            /**
             * 平台艺人已通过列表
             */
            actorSysList(){
                let vm = this;
                let postData = {
                    sys:'1',
                    status:[vm.status],
                    pageNo:vm.pageNo,
                    pageSize:10
                };
                REQ.actorSysList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.tableData = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
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
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            getIsUpdate(val){
                this.$emit('setUpdate',val)
            },
            handleCurrentChange(val){
                this.pageNo = val;
                this.actorSysList();
            },
            handleSizeChange(){

            },
        }
    }
</script>

<style scoped>

</style>