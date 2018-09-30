<template>
    <div>
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
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
                    <span>{{actorType[Number(scope.row.actor_type)]}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="address"-->
                    <!--width="50"-->
                    <!--label="主页">-->
                <!--<template slot-scope="scope">-->
                    <!--<router-link class="reject" :to="{name:'manage-insert',params: {id: scope.row.id}}">-->
                        <!--查看-->
                    <!--</router-link>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="phone"
                    label="手机"
                    width="100"
            >
            </el-table-column>

            <el-table-column
                    prop="idcard"
                    label="身份证号"
                    width="100"
            >
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
                @setIsUpdate="getIsUpdate"
        >

        </TempReject>
    </div>
</template>
<script>
    import TempReject from './verify_reject.vue'
    import type from '../../global/name_space.js'
    import REQ from "../../../vue/global/request.js";
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
            // this.actorSysTList();
        },
        methods:{
            getStatus(val){
                this.dialogVisible = val;
            },

            /**
             * 平台艺人已通过列表
             */
            actorSysTList(){
                let vm = this;
                let postData = {
                    sys:'1'
                };
                REQ.actorSysTList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.staffInfo = result.data.rows;
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
            getIsUpdate(val){
                 this.$emit('setUpdate',val)
            }
        }
    }
</script>

<style scoped>

</style>