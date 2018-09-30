<template>
    <li>
        <div>
            <div class="title m_l20">详细信息
                <el-button type="primary" class="insertBtn" size="small" @click="dialogVisible = true">+添加礼物</el-button>
                <!--<el-button type="primary" class="insertBtn" size="small"  icon="el-icon-d-caret">从高到低</el-button>-->
                <!--<el-input-->
                        <!--class="searchText"-->
                        <!--size="small"-->
                        <!--placeholder="请输入菜品"-->
                        <!--suffix-icon="el-icon-search"-->
                        <!--v-model="input8">-->
                <!--</el-input>-->
            </div>
        </div>
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="100"
                    size="medium"
            >
            </el-table-column>
            <el-table-column
                    type="index"
                    width="100"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="foodName"
                    width="200"
                    label="品类名称">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width=""
                    label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" width="50" height="50">
                </template>
            </el-table-column>
            <el-table-column
                    prop="priceShow"
                    width="200"
                    label="打赏价格">
            </el-table-column>
            <el-table-column
                    prop="price"
                    width="200"
                    label="价格">
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="prev, pager, next"
            :pager-count="5"
            :total="total3">
            </el-pagination>
            <el-button type="danger"
                       class="deleteType"
                       @click="deleteCategory"
                       :disabled="multipleSelection.length<1"
            >删除品类</el-button>
        </div>
        <!--弹窗-->
        <el-dialog
                title="选择礼物"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="400px"
        >
            <el-select v-model="food" filterable placeholder="请选择打赏的菜品"  v-if="foodList.length>0">
                <el-option
                        v-for="item in foodList"
                        :key="JSON.stringify(item)"
                        :label="item.carteName"
                        :value="JSON.stringify(item)">
                </el-option>
            </el-select>

            <div class="dialog_footer">
                <el-button type="danger" @click="postFoodAdd">确认打赏</el-button>
            </div>
        </el-dialog>
    </li>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import nameSpace    from  '../../global/name_space.js'
    import REQ from "../../global/request.js";
    export default {
        components:{
            TempSwitch,
            TempSaveText
        },
        data(){
            return{
                tableData:[],
                actorList:[],
                input8:'',
                total3:0,
                pageNo:1,
                pageIndex:1,
                rowsPerPage:6,
                orderFields:[],
                dialogVisible:false,
                foodList:[],
                food:'',
                multipleSelection:[]
            }
        },
        mounted(){
            this.getCarteList();
            this.getFoodList('');
        },
        watch:{
            carteType(val){
                this.pageNo =1;
                this.getFoodList('');
            },
            input8(val){
                this.getFoodList(val);
            }
        },
        computed:{
            carteType(){
                return this.$store.getters.getCarteType;
            }
        },
        methods:{
            /**
             * 查询当前的礼物菜品
             */
            getFoodList(foodName){
                let _this = this;
                let posData = {
                    type:_this.$store.getters.getCarteType,
                    pageNo:_this.pageNo,
                    foodName:foodName,
                    // minCount:
                };
                REQ.reqFoodList(posData,
                    function(data){
                        _this.tableData = data.data.rows;
                        _this.total3 = data.data.count
                    },
                    function(data){},
                    function(data){}
                );
            },

            /**
             * 获取全部的菜品
             */
            getCarteList(){
                let _this = this;
                let posData = {
                    storeId: JSON.parse(_this.$store.getters.getCurInfo).storeId || '',
                };
                REQ.reqCarteList(posData,
                    function(data){
                        _this.foodList = data.data.rows;
                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 菜品添加
             */
            postFoodAdd(){
                let _this = this;
                let posData = {
                    storeId: JSON.parse(_this.$store.getters.getCurInfo).storeId || '',
                    type: _this.$store.getters.getCarteType,
                    price: JSON.parse(_this.food).cartePrice,
                    foodName: JSON.parse(_this.food).carteName,
                    descr: JSON.parse(_this.food).carteDescription,
                    icon: JSON.parse(_this.food).carteThumbnail,
                    foodId:JSON.parse(_this.food).id,
                    minCount:JSON.parse(_this.food).carteCountMin,
                };
                REQ.reqFoodAdd(posData,
                    function(data){
                        _this.$message.success("添加礼物菜品成功！");
                        _this.dialogVisible = false;
                        _this.getFoodList('');
                        _this.food = ''
                    },
                    function(data){},
                    function(data){}
                );
            },
            //批量操作
            handleSelectionChange(val) {
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            /**
             * 删除菜品
             */
            deleteCategory(){
                this.$confirm('删除所选的打赏菜品，请谨慎操作', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postDeleteCategory();
                }).catch(() => {
                });
            },
            /**
             * 删除调用
             */
            postDeleteCategory(){
                let _this = this;
                let posData = {
                    foodIds: _this.multipleSelection
                }
                REQ.reqFoodDel(posData,
                    function(data){
                        _this.$message.success("删除所选打赏菜品成功！");
                        _this.getFoodList('');
                    },
                    function(data){},
                    function(data){}
                );
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getFoodList('');
            },
        }
    }
</script>

<style scoped lang="scss">

    @import "../../../../style/sass/mixin";
    .el-table th{
        background-color: #D5D7D6 !important;
    }

    .verify{
        width: 100%; height: 100%;
    }


    .verify .tab .row{
        @include set-wh(100%, 60px);
        border-bottom: 1px solid #009688;
    }

    .verify .tab tr td{ text-align: center; }

    .verify .tab .avatar,
    .verify .tab .avatar img{margin: auto; width: 60px; height: 60px;}

    .verify .tab .col-btn{
        @include layout-flex-r-center;
    }

    .verify .tab .col-btn .btn{
        margin: 0 10px 0 0; height: 60px; line-height: 60px; cursor: pointer;
    }
    .headimg{
        width: 50px;
        height: 50px;
    }
    .icon-man{
        color: #086D99;
        font-size: 25px;
    }
    .icon-woman{
        color: #8E1250;
        font-size: 25px;
    }
    .btnsWrap{
        text-align: center;
        padding-top: 50px;
    }
    .menu_type{
        height: 50px;
        background-color: #164648;
        li{
            color: #FFFFFF;
            line-height: 50px;
            float: left;
            text-align: center;
        }
        li:nth-of-type(1){
            width: 350px;
        }
        li:nth-of-type(2){
            width: 890px;
        }
    }
    .menu_wrap{
        border-bottom: solid 2px #164648;
        overflow: hidden;
        li{
            float:left;
        }
        li:nth-of-type(1){
            width: 350px;
        }
        li:nth-of-type(2){
            width: 888px;
            border-left: solid 2px #164648;
        }
        .title{
            margin: 20px 0 20px 0;
            height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
            color: #FF5722; border-left: 2px solid #FF5722;
        }
        .m_l20{
            margin-left: 20px;
        }
        .insertBtn{
            margin-left: 40px;
        }
        .searchText{
            width: 234px;
        }
        .pagination-wrap{
            padding-bottom: 20px;
        }
    }
    .typeName{
        color: #FFFFFF;
        &:hover{
            color: #00B594;
            text-decoration: underline;
        }
    }
    .dialog_footer{
        padding: 30px 0;
        text-align: center;
    }
    .deleteType{
        margin-top: 30px;
    }
</style>