<template>
    <div class="categoryWrap">
        <div>
            <div class="title m_l20">详细信息
                <el-button type="primary" class="insertBtn" size="small" @click="insertNewClass">+新增品类</el-button>
                <el-button type="primary"
                           class="insertBtn"
                           size="small"
                           icon="el-icon-d-caret"
                           @click="isDESC"
                >从高到低</el-button>

                <!--<el-input placeholder="请输入菜品" v-model="carteName" class="searchText">-->
                    <!--<el-button slot="append" icon="el-icon-search" @click="searchCategoty"></el-button>-->
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
                    width="30"
                    size="medium"
            >
            </el-table-column>

            <el-table-column
                    type="index"
                    width="30"
                    label="序号">
            </el-table-column>

            <el-table-column
                    prop="carteName"
                    width="110"
                    label="品类名称">
            </el-table-column>
            <el-table-column
                    width="100"
                    label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.carteThumbnail" class="" width="50" height="50">
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    width="80"
                    label="外带/卖">
                <template slot-scope="scope">
                    <div @click="isTakeout(scope.row,scope.$index)">
                        <TempSwitch message = ''
                            :propsSwitch='String(scope.row.carteIsTakeout)'
                            @isSwitchEmit="isCarteIsTakeout"
                        ></TempSwitch>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    prop="carteTaste"
                    label="口味">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    width="70"
                    label="价格">
                <template slot-scope="scope">
                    <span>￥{{scope.row.cartePrice}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    width="110"
                    label="估清">
                <template slot-scope="scope">
                    <div @click="isSellout(scope.row,scope.$index)">
                        <TempSwitch message = ''
                                    :propsSwitch='String(scope.row.carteIsSellout)'
                                    @isSwitchEmit="isCarteIsSellout"
                        ></TempSwitch>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    prop="address"
                    width=""
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="updateCarte(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :pager-count="5"
                    :page-size="rowsPerPage"
                    :total="total3">
            </el-pagination>
            <el-button type="danger"
                       class="deleteType"
                       @click="deleteCategory"
                       :disabled="multipleSelection.length<1"
            >删除品类</el-button>
        </div>
        <!--    新增/修改分类   -->
        <el-dialog
                title="品类管理"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="400px"
        >
            <el-form ref="carteData" :model="carteData" :rules="rules" label-width="80px">
                <el-form-item label="品类名称" prop="carteName" >
                    <el-input v-model="carteData.carteName" placeholder="请输入品类名称"></el-input>
                </el-form-item>
                <el-form-item label="品类图片" prop="carteThumbnail">
                    <el-upload
                            class="avatar-uploader-mini"
                            action="http://static.ibigtop.com/res/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="carteData.carteThumbnail" :src="carteData.carteThumbnail" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="品类价格" prop="cartePrice">
                    <el-input v-model="carteData.cartePrice" placeholder="请输入品类价格"></el-input>
                </el-form-item>

                <el-form-item label="菜品单位" prop="carteUnit">
                    <el-input v-model="carteData.carteUnit" placeholder="菜品单位(例如：份，串)"></el-input>
                </el-form-item>

                <el-form-item label="最小数量" prop="carteCountMin">
                    <el-input v-model="carteData.carteCountMin" placeholder="请输入最小数量"></el-input>
                </el-form-item>

                <el-form-item label="品类口味">
                    <div class="testWrap">
                        <el-input v-model="carteTaste" placeholder="请输入口味" :disabled="tasteList.length === 3"></el-input>
                        <i class="el-icon-circle-plus"
                           v-if="tasteList.length<3"
                           @click="insertTaste"
                        ></i>
                    </div>
                    <div class="tasteList">
                        <div    v-for="(item,index) in tasteList"
                                class="item"
                                v-if="item.taste"
                        >
                            <el-button size="mini" type="danger">{{item.taste}}</el-button>
                            <i class="el-icon-remove" @click="tasteList.splice(index,1)"></i>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="外卖外带" >
                    <el-switch
                            v-model="carteIsTakeout"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>

                <el-form-item label="特色菜" >
                    <el-switch
                            v-model="carteIsFeature"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>

                <el-form-item style="padding-top:20px">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="submitForm('carteData')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import REQ from "../../global/request.js";

    const roomInfo = window.UINFO;
    export default {
        components:{
            TempSwitch,
            TempSaveText
        },
        data(){
            /**
             * 验证价格是否符合数字 || 小数的验证
             */
            let validatePass3 = (rule, value, callback) => {
                const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if (value === '') {
                    callback(new Error('请输入菜品价格'));
                } else if (!reg.test(value)) {
                    callback(new Error('只能输入数字或者小数'));
                } else {
                    callback();
                }
            };

            let validatePass = (rule, value, callback) =>{
                let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/;
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(!reg.test(value)){
                    callback(new Error('只能输入数字'));
                } else if(value<1){
                    callback(new Error('数字必须大于1'));
                }else{
                    callback();
                }
            }

            return{
                dialogVisible:false,
                tableData:[],
                tableData1:[],
                actorList:[],
                input8:'',
                total3:0,
                pageIndex:1,
                rowsPerPage:6,
                carteData:{
                    carteName:'',
                    carteDescription:'',
                    carteThumbnail:'',
                    cartePrice:'',
                    carteUnit:'份',
                    carteCountMin:'1'
                },
                carteIsTakeout:false,
                carteIsFeature:false,
                carteIsSellout:false,
                carteTaste:'',
                tasteList:[],
                form:{

                },
                rules:{
                    carteName: [
                        { required: true, message: '请填写品类名称', trigger: 'change' }
                    ],
                    cartePrice: [
                        {validator: validatePass3, trigger: 'change' },
                    ],
                    carteThumbnail:[
                        { required: true, message: '请上传图片', trigger: 'change' }
                    ],
                    carteUnit:[
                        { required: true, message: '请输入菜品单位', trigger: 'change' }
                    ],
                    carteCountMin:[
                        {validator: validatePass, trigger: 'change' }
                    ],

                },
                id:'',
                multipleSelection:[],
                isUpdate:false,
                carteName:'',
                orderFields:[

                ],
                row:{}
            }
        },
        computed: {
            getId() {
                return this.$store.getters.getCarteTypeInfo
            },
        },
        watch:{
            getId(id){
                this.pageIndex = 1;
                this.getCarteList(id);
            }
        },

        mounted(){
            if(this.$store.getters.getCarteTypeInfo!==""){
                this.getCarteList(this.$store.getters.getCarteTypeInfo);
            }
        },

        methods:{
            /**
             * 获取当前菜品类型下的菜品
             */
            getCarteList(id){
                let _this = this;
                if(id === '') return;
                let posData = {
                    carte: {
                        carteType: id,
                    },
                    pageIndex: _this.pageIndex,
                    rowsPerPage: _this.rowsPerPage,
                    orderFields: _this.orderFields
                };
                REQ.reqCarteList(posData,
                    function(data){
                        _this.total3 = data.data.count;
                        _this.tableData = data.data.rows;
                    },
                    function(data){ },
                    function(data){}
                );
            },
            /*************************创建/更新操作****************************/
            //新增弹窗
            insertNewClass(){
                let vm = this;
                vm.dialogVisible = true;
                vm.isUpdate = false;
                // vm.$refscarteData.resetFields();
                Object.keys(vm.carteData).forEach((key) => {
                    if(key === 'carteUnit'){
                        vm.carteData[key] = '份';
                    }
                    if(key === 'carteCountMin'){
                        vm.carteData[key] = '1';
                    }
                });
                vm.carteIsTakeout = false;
                vm.carteIsFeature = false;
                vm.carteTaste = '';

            },
            //上传图片
            handleAvatarSuccess(res, file){
                let vm = this;
                vm.carteData.carteThumbnail = res.response.data;
            },
            //新增口味
            insertTaste(){
                if(this.carteTaste === "") return;
                this.tasteList.push({
                    taste:this.carteTaste
                });
            },
            //提交验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postReqCarteCreate();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 创建/更新菜品
             */
            postReqCarteCreate(){
                let _this = this;
                let newArray = [];
                let posData = {
                    carte:_this.carteData
                };
                posData.carte.storeId = roomInfo.storeId;
                _this.isUpdate ? posData.carte.id = _this.id : '';                      //更新传菜品ID
                posData.carte.carteType = _this.$store.getters.getCarteTypeInfo;
                _this.tasteList.forEach((val) => {
                    newArray.push(val.taste);                   //push到新的数组里面
                });
                posData.carte.carteTaste = newArray.join("、");
                _this.carteIsTakeout ? posData.carte.carteIsTakeout = 1 : posData.carte.carteIsTakeout = 0;
                _this.carteIsFeature ? posData.carte.carteIsFeature = 1 : posData.carte.carteIsFeature = 0;
                _this.carteIsSellout ? posData.carte.carteIsSellout = 1 : posData.carte.carteIsSellout = 0;
                _this.isUpdate ? _this.carteUpdateTotal(posData) : _this.carteCreate(posData)
            },
            //修改菜品总
            carteUpdateTotal(posData){
                let _this = this;
                REQ.reqCarteUpdate(posData,
                    function(data){
                    _this.$message.success("修改菜品成功！");
                    _this.getCarteList(_this.$store.getters.getCarteTypeInfo);
                    _this.dialogVisible = false;
                },
                function(data){},
                function(data){}
                );
            },
            //创建菜品
            carteCreate(posData){
                let _this = this;
                REQ.reqCarteCreate(posData,
                    function(data){
                        _this.$message.success("创建菜品成功！");
                        _this.getCarteList(_this.$store.getters.getCarteTypeInfo);
                        _this.dialogVisible = false;

                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 更新菜品渲染
             */
            updateCarte(row){
                let vm = this;
                vm.dialogVisible = true;
                vm.tasteList = [];
                vm.id = row.id;
                vm.isUpdate = true;
                vm.carteData = {
                    carteName:row.carteName,
                    carteDescription:row.carteDescription,
                    carteThumbnail:row.carteThumbnail,
                    cartePrice:row.cartePrice,
                    carteUnit:row.carteUnit,
                    carteCountMin:row.carteCountMin,
                    storeId:roomInfo.storeId,
                };
                row.carteTaste.split("、").forEach((val) => {
                    vm.tasteList.push({
                        taste: val
                    })
                });
                Number(row.carteIsTakeout) === 1 ? vm.carteIsTakeout = true : vm.carteIsTakeout = false;
                Number(row.carteIsFeature) === 1 ? vm.carteIsFeature = true : vm.carteIsFeature = false;
                Number(row.carteIsSellout) === 1 ? vm.carteIsSellout = true : vm.carteIsSellout = false;
            },

            /**
             * 模糊查询
             */
            searchCategoty(){
                if(this.carteName === '') return;
                this.getCarteList(this.$store.getters.getCarteTypeInfo);
            },

            /**
             * 高低排列
             */
            isDESC(){
                this.orderFields =[];
                this.orderFields.push(["cartePrice", "DESC"]);
                this.getCarteList(this.$store.getters.getCarteTypeInfo);
            },

            /**
             * 是否外带
             */
            isTakeout(row,index){
                row.carteIsTakeout === 1 ?  row.carteIsTakeout = 0 :  row.carteIsTakeout = 1;
                this.carteUpdate(row);
            },

            /**
             * 是否估清
             */
            isSellout(row,index){
                row.carteIsSellout === 1 ?  row.carteIsSellout = 0 :  row.carteIsSellout = 1;
                this.carteUpdate(row);
            },

            /**
             * 修改价格
             */
            changePrice(data){
                this.row.cartePrice = data;
                this.carteUpdate(this.row);
            },

            //修改外带，估清，价格单独调用
            carteUpdate(row){
                let _this = this;
                let posData =  {
                    carte:row
                };
                REQ.reqCarteUpdate(posData,
                    function(data){
                        _this.$message.success("修改菜品成功！");
                        _this.getCarteList(_this.$store.getters.getCarteTypeInfo);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            isCarteIsTakeout(data){
                data === '1' ? this.carteIsTakeout = true : this.carteIsTakeout = false;

            },
            isCarteIsSellout(data){
                data === '1' ? this.carteIsSellout = true : this.carteIsSellout = false;
            },

            //批量操作
            handleSelectionChange(val){
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
                this.$confirm('删除菜品，请谨慎操作', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postDeleteCategory();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除接口调用
            postDeleteCategory(){
                let _this = this;
                let posData = {
                    ids:_this.multipleSelection
                };
                REQ.reqCarteDelete(posData,
                    function(data){
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.getCarteList(_this.$store.getters.getCarteTypeInfo);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getCarteList(this.$store.getters.getCarteTypeInfo);
            },
        }


    }
</script>

<style lang="scss">
   .categoryWrap{
       .title{
           margin: 20px 0 20px 0;
           height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
           color: #FF5722; border-left: 2px solid #FF5722;
       }
       .insertBtn{
           margin-left: 40px;
       }
       .m_l20{
           margin-left: 20px;
       }
       .searchText{
           width: 234px;
           .el-input__inner{
               height: 32px;
           }
           .el-input-group__append{
               background-color: #00B594;
               color: #FFFFFF;
               border: #00B594 solid 1px;
           }
       }
       .deleteType{
           margin: 30px 0;
       }
       .testWrap{
           position: relative;
           .el-icon-circle-plus{
               position: absolute;
               top: 11px;
               right: 10px;
               font-size: 20px;
               color: #fff;
               cursor: pointer;
           }
       }
       .tasteList{
           .item {
               position: relative;
               display:inline-block;
               margin-right:20px;
               .el-icon-remove{
                   position: absolute;
                   top: 11px;
                   right: -10px;
                   font-size: 20px;
                   color: #fff;
                   cursor: pointer;
               }
           }

       }
   }
</style>