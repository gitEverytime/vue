<template>
    <div class="apply_wrap">
        <div class="box">
            <el-table
                    :data="storeList"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left"  class="demo-table-expand">
                            <el-form-item label="资料信息">
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
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="商户名称"
                        prop="sname">
                </el-table-column>
                <!--<el-table-column-->
                        <!--label="代理区域"-->
                        <!--prop="id">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span v-if="scope.row.type === '200'">{{CodeToText[scope.row.ac1]}}</span>-->
                        <!--<span v-else>{{CodeToText[scope.row.ac1]}}·{{CodeToText[scope.row.ac2]}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                        label="商户类型"
                        prop="id">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type">{{storeType[scope.row.type-1].name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="BOSS姓名"
                        prop="bossName">
                </el-table-column>
                <el-table-column
                        label="BOSS电话"
                        prop="phone">
                </el-table-column>
                <el-table-column
                        label="操作"
                        prop="phone">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="agressBtnEvent(scope.row.applyId)">同意</el-button>
                        <el-button type="danger" size="small" @click="rejectBtnEvent(scope.row.applyId)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        <TempStoreDoApply
                :dialogVisible1="dialogVisible"
                :title="title"
                @setDialogVisible="getDialogVisible"
                @setRemarks="getRemarks"
        ></TempStoreDoApply>
    </div>
</template>

<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import TempPagination   from '../../components/el_pagination.vue'
    import TempStoreDoApply from './store_doApply.vue';
    import REQ from "../../../vue/global/request.js";
    import Type from '../../global/name_space.js'
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempPagination,
            TempStoreDoApply
        },
        props:{
            storeList:{
                type:Array
            },
            value:{
                type:Number
            }
        },
        data(){
            return{
                CodeToText:CodeToText,
                dialogVisible:false,
                oForm:{
                    applyId:'',
                    status:'',
                    remarks:''
                },
                title:'同意',
                storeType:Type.storeType
            }
        },
        watch:{

        },
        computed:{
            getName(type){
                this.storeType.forEach(val => {
                    if(val.id === type) return val.name
                })
            }
        },
        mounted(){

        },
        methods:{
            reqStoreDoApply(){
                let vm = this;
                let postData = vm.oForm;
                REQ.reqStoreDoApply(postData,
                    (result) => {
                        vm.oForm.status === '1' ? vm.$message.success("商家申请信息已通过审核") : vm.$message.success("商家申请信息已驳回");
                        vm.$emit('setApplyStatus',true);
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            handleCurrentChange(val){
                this.$emit('setIndex',val)
            },
            handleSizeChange(){

            },
            //同意
            agressBtnEvent(applyId){
                this.dialogVisible = true;
                this.oForm.applyId = applyId;
                this.oForm.status = '1';
                this.title = "同意申请"
            },
            //驳回
            rejectBtnEvent(applyId){
                this.dialogVisible = true;
                this.oForm.applyId = applyId;
                this.oForm.status = '2';
                this.title = "驳回申请"
            },
            getDialogVisible(val){
                this.dialogVisible = val;
            },
            getRemarks(val){
                this.oForm.remarks = val;
                this.reqStoreDoApply();
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/common.scss";
    .box{
        padding: 10px 0;
        .material_info{
            text-align: center;
            padding: 10px 0;
            display: inline-block;
            margin-right: 30px;
            border-radius: 4px;
            img{
                width: 100px;
                height: 100px;
            }
            h2{
                padding-top: 10px;
                color: #FFFFFF;
            }
        }
    }
</style>