<template>
    <el-dialog
            title="新增楼层"
            :visible.sync="dialogVisible"
            :show-close="true"
            :before-close="handleClose"
            width="300px"
    >
        <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
            <el-form-item
                    label=""
                    prop="floorValue"
                    :rules="[
                           {validator: validatePass3, trigger: 'change' },
                        ]"
            >
                <el-input v-model="oForm.floorValue" placeholder="请输入楼层" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button type="danger" @click="submitForm('oForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
        },
        props: {
            dialogVisible2:{
                type:Boolean
            },
            floorList:{
                type:Array
            }
        },
        data(){
            return{
                dialogVisible:this.dialogVisible2,
                oForm:{
                    floorValue:''
                },
                floorList1:this.floorList
            }
        },
        watch:{
            dialogVisible2(val){
                this.dialogVisible = val;
            },
            floorList(val){
                this.floorList1 = val;
            }
        },
        computed:{
        },
        mounted(){
        },

        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let isPush = true;
                        this.floorList1.forEach(val => {
                            if(val.roomName === this.oForm.floorValue) {
                                this.$message.warning("已存在楼层，请确认！");
                                isPush = false;
                                return
                            }
                        });
                       if(isPush) this.roomCreate();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 创建楼层
             */
            roomCreate(){
                let _this = this;
                let posData = {
                    room:{
                        roomName:_this.oForm.floorValue,
                        storeId:JSON.parse(_this.$store.getters.getCurInfo).storeId || '',
                    }
                };
                REQ.reqRoomCreate(posData,
                    function(result){
                        _this.$emit('setFloorNumber',{
                            roomName:_this.oForm.floorValue,
                            id:result.data.id
                        });
                        _this.dialogVisible = false;
                        _this.$emit('setFloorEmit',_this.dialogVisible);
                        _this.$message.success("创建楼层成功！");
                    },
                    function(data){},
                    function(data){}
                );
            },
            handleClose(done){
                done();
                this.$emit('setFloorEmit',this.dialogVisible);
            },
            validatePass3(rule, value, callback){
                const reg = /[\d]/;
                if (value === '') {
                    callback(new Error('楼层不能为空！'));
                } else if (!reg.test(value)) {
                    callback(new Error('只能输入数字！'));
                } else {
                    callback();
                }
            },
        }
    }
</script>

<style scoped>

</style>