<template>
    <div class="box_wrap">
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeIndex">
                    <el-tab-pane
                            v-for="(col,index) in $store.getters.getStoreList"
                            :label="col.resName"
                            :name="col.resUrl"
                    ></el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"> <h1 class="new_title">按条件查询<span></span></h1></el-col>
            <el-col :span="6" class="top_20">
                <el-input
                        placeholder="请输入店名"
                        v-model="storeName"
                        clearable>
                </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6" class="top_20">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="selectTimestamp"
                >
                </el-date-picker>
            </el-col>
            <el-col :span="7" class="top_20">
                &nbsp;&nbsp;&nbsp;&nbsp;<el-button type="danger" size="medium" @click="searchBtn">查询</el-button>
            </el-col>
        </el-row>
        <div class="box">
            <el-table
                    :data="storeInfo"
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
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="商户名称"
                        prop="sname">
                </el-table-column>
                <el-table-column
                        label="商户类型"
                        prop="id">
                    <template slot-scope="scope">
                        <span>{{storeType[scope.row.type-1].name}}</span>
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
                        label="创建时间"
                        :formatter="dateFormat"
                        width="170"
                        prop="createdAt">
                </el-table-column>
                <el-table-column
                        label="开户人ID"
                        width="250"
                        prop="createdBy">
                </el-table-column>
                <el-table-column
                label="操作"
                prop="phone">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="scaleDetail(scope.row.id)">分成详情</el-button>
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
                    :page-size="10"
                    :total="value">
            </el-pagination>
        </div>
        <!--弹出层dialog-->
        <el-dialog
                title="分成详单"
                :visible.sync="dialogVisible"
                width="300px"
                content
               >
            <table border="0" cellspacing="0" cellpadding="0" class="scale_list">
                <tr>
                    <td>类型</td>
                    <td colspan="1">平台方</td>
                    <td colspan="2">商户方</td>
                </tr>
                <tbody v-for="item in scaleList">
                <tr>
                    <td rowspan="3">{{item.name}}</td>
                    <td colspan="1">
                        {{item.sysScale}}
                    </td>
                    <td colspan="2">
                        {{item.storeScale}}
                    </td>
                </tr>
                <tr>
                    <td>平台方</td>
                    <td>商家</td>
                    <td>艺人</td>
                </tr>
                <tr>
                    <td>{{item.sysScale}}</td>
                    <td>{{item.storeStoreScale}}</td>
                    <td>{{item.storeActorScale}}</td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../vue/global/request.js";
    import Type from '../global/name_space.js'
    import moment  from 'moment'
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        data(){
            return{
                pageNo:1,
                value:0,
                storeInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                storeType:Type.storeType,
                dialogVisible:false,
                scaleList:[],
                time:'',
                startTime:null,
                endTime:null,
                storeName:null
            }
        },
        mounted(){
            this.storeList();
        },
        watch:{
            activeIndex(val){
                this.storeList();
            },
            // storeName(val){
            //     this.storeList();
            // }
        },
        methods:{
            storeList(){
                let vm = this;
                let postData = {
                    pageNo:this.pageNo,
                    status:[vm.activeIndex],
                    pageSize:10,
                    startTime:this.startTime,
                    endTime:this.endTime,
                    storeName:this.storeName
                };
                REQ.reqStoreList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.storeInfo = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            scaleDetail(id){
                this.dialogVisible = true;
                this.getStoreScale(id);
            },
            selectTimestamp(val){
                if(val){
                    this.startTime = val[0];
                    this.endTime = val[1];
                }else{
                    this.startTime = null;
                    this.endTime = null;
                }
                this.pageNo = 1;
            },
            searchBtn(){
                this.storeList();
            },
            getStoreScale(id){
                let vm = this;
                let postData = {
                    storeId:id
                };
                REQ.getStoreScale(postData,
                    (result) => {
                        let oResult = result.data;
                        oResult.forEach((item) => {
                            switch (item.type){
                                case '1':
                                    item['name'] = '节目';
                                    break;
                                case '3':
                                    item['name'] = '霸屏';
                                    break;
                                case '4':
                                    item['name'] = '私人红包';
                                    break;
                                case '5':
                                    item['name'] = '全店红包';
                                    break;
                                case '6':
                                    item['name'] = '礼物';
                                    break;
                                case '7':
                                    item['name'] = '实物';
                                    break;
                                case '8':
                                    item['name'] = '霸麦';
                                    break;
                            }
                        });
                        vm.scaleList = oResult;

                    },
                    (data) => {},
                    (data) => {}
                )
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            handleCurrentChange(val){
                this.pageNo = val;
                this.storeList();
            },
            handleSizeChange(){

            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .box_wrap{
        padding: 0 30px;
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
        .scale_list{
            border: #FFFFFF solid 1px;
            tr{
                td{
                    padding: 5px 10px;
                    color: #000000;
                    font-size: 12px;
                    border: #FFFFFF solid 1px;
                }
            }
        }
        .top_20{
            padding-top: 20px;
        }
    }
</style>