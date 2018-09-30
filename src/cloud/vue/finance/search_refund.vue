<template>
    <div class="box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="模糊查询" name="first"></el-tab-pane>
            <el-tab-pane label="精准查询" name="second"></el-tab-pane>
        </el-tabs>
        <div class="" >
            <div v-if="activeName === 'first'" class="pad_30">
                <h1 class="new_title">选择商家<span></span></h1>
                <el-row>
                    <el-col :span="6">
                        <el-cascader
                                :options="options"
                                v-model="region"
                                placeholder="选择省市区"
                                @change="selectBlockCode"
                        >
                        </el-cascader>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="oForm.storeId" placeholder="请选择" @change="chooseStore">
                            <el-option
                                    v-for="item in storeList"
                                    :key="item.id"
                                    :label="item.sname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-row class="pad_30">
                    <el-col :span="6">
                        <h1 class="new_title">选择时间<span></span></h1>
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="selectTimestamp"
                                :clearable="false"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="6">
                        <h1 class="new_title">选择类型<span></span></h1>
                        <el-select v-model="oForm.type" placeholder="请选择" disabled>
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <!--<h1 class="new_title" v-if="oForm.orderType === '1'">选择互动类型<span></span></h1>-->
                <!--<h1 class="new_title" v-if="oForm.orderType === '2'">查询<span></span></h1>-->
                <el-row>
                    <el-col :span="6" v-if="oForm.orderType === '1'"></el-col>
                    <el-col :span="6">
                        <el-button type="danger" size="small" @click="sureSearch">查询</el-button>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
            </div>
            <div v-if="activeName === 'second'" class="pad_30">
                <el-col :span="6">
                    <el-input v-model="oForm.id" placeholder="请输入互动记录编号" size="small"></el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="6">
                    <el-button type="danger" size="small" @click="sureSearch">查询</el-button>
                </el-col>
                <el-col :span="8"></el-col>
            </div>
            <TempRefundTable
                    :tradeList = 'tradeList'
                    :oForm="oForm"
                    :oCode="oCode"
                    :totalAmount="totalAmount"
            >

            </TempRefundTable>
            <div class="pagination-wrap">
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        layout="prev, pager, next"
                        :pager-count="5"
                        :page-size="Number(oForm.pageSize)"
                        :total="total3">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
    import TempRefundTable   from './refund_table.vue'
    import REQ from "../../vue/global/request.js";
    import Type   from  '../global/name_space.js'
    import cookie from '../global/cookie.js'
    export default {
        components:{
            TempRefundTable
        },
        data(){
            return{
                menuIndex:1,
                activeName:'first',
                perms:[],
                options:regionData,
                storeList: [],
                interactList:Type.interactList,
                typeList:[{
                    value: '1',
                    label: '互动'
                }, {
                    value: '2',
                    label: '点餐'
                }],
                region:[],
                time:'',
                oCode:{
                    ac1:'',
                    ac2:'',
                    ac3:'',
                },
                oForm:{
                    storeId:'',
                    pageNo:'1',
                    pageSize:'10',
                    type: '1',
                    startDate:'',
                    endDate:'',
                    id:''
                },
                totalAmount:0,
                tradeList:[],
                total3:0,
                id:''
            }
        },
        watch:{

        },
        computed:{

        },
        mounted(){
        },
        methods:{
            /**
             * 根据省市区code查询商家
             */
            getStoreFindByAC(storeId){
                let vm = this;
                let postData = vm.oCode;
                REQ.reqStoreFindByAC(postData,
                    (result) => {
                        //初始化信息查询
                        vm.storeList = result.data;
                        if(storeId){    //如果是历史拉取
                            this.getDetailRefundList();
                        }else{
                            if(vm.storeList.length>0){            //如果是正常拉取
                                vm.oForm.storeId = vm.storeList[0].id;
                            }else {                               //正常拉取没有数据
                                vm.oForm.storeId = '';
                                vm.storeList = [];
                            }
                        }
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 确认查询
             */
            sureSearch(){
                if(!this.oForm.storeId && this.activeName === 'first') {
                    this.$message.warning("请选择要查询的商家！");
                    return
                }
                if(!this.oForm.id && this.activeName === 'second') {
                    this.$message.warning("请输入互动记录编号！");
                    return
                }
                this.oForm.pageNo = 1;
                this.getDetailRefundList();
            },
            /**
             * 获取订单列表
             */
            getDetailRefundList(){
                let vm = this;
                let postData = vm.oForm;
                REQ.reqDetailRefundList(postData,
                    (result) => {
                        vm.totalAmount = result.data.totalAmount;
                        vm.tradeList = result.data.rows;
                        vm.total3 = result.data.count;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             *
             * @param val
             */
            selectBlockCode(val){
                let vm = this;
                vm.oCode.ac1 = val[0];
                vm.oCode.ac2 = val[1];
                vm.oCode.ac3 = val[2];
                vm.oForm.startDate = '';
                vm.oForm.endDate = '';
                vm.time = '';
                vm.oForm.type ='1';
                vm.oForm.pageNo = 1;
                vm.getStoreFindByAC();
            },
            /**
             * 按商家查询
             * @param val
             */
            chooseStore(val){
                let vm = this;
                vm.oForm.startDate = '';
                vm.oForm.endDate = '';
                vm.time = '';
                vm.oForm.type ='';
                vm.oForm.pageNo = 1;
            },
            /**
             * 按选择互动类型查询
             * @param val
             */
            selectType(val){
                this.oForm.pageNo = 1;
            },
            /**
             * 按时间段查询
             * @param val
             */
            selectTimestamp(val){
                this.oForm.startDate = val[0];
                this.oForm.endDate = val[1];
                this.oForm.pageNo = 1;
            },
            handleClick(){
                this.tradeList = [];
                if(this.activeName === 'second'){
                    this.oForm = {
                        storeId:'',
                        pageNo:'1',
                        pageSize:'10',
                        type: '1',
                        startDate:'',
                        endDate:'',
                        id:''
                    };
                    this.time = [];
                    this.region = [];
                }else{
                    this.oForm.id = '';
                }
            },
            /**
             * 分页查找
             * @param val
             */
            handleCurrentChange(val){
                this.oForm.pageNo = val;
                this.getDetailRefundList();
            },
            handleSizeChange(){

            },
        }
    }
</script>


<style  lang='scss'   scoped>
    @import "../../sass/common.scss";
    .box{
        padding: 0 30px;
    }
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
    .pad_30{
        padding-bottom: 30px;
        overflow: hidden;
    }
</style>




