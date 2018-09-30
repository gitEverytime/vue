<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center
    >
        <el-input placeholder="请输入驳回/通过理由" v-model="verifyData1.remarks"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="postApprovalDoApply">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import REQ     from "../../global/request.js";
    export default {
        components:{

        },
        props:{
            dialogVisible1:{
                type:Boolean
            },
            title:{
                type:String
            },
            verifyData:{
                type:Object
            }
        },
        data(){
            return{
                dialogVisible:false,
                value1:'',
                verifyData1:this.verifyData
            }
        },
        watch:{
            dialogVisible1(val){
                this.dialogVisible = val;
            },
            verifyData(val){
                this.verifyData1 = val;
            }
        },
        mounted(){

        },
        methods:{
            handleClose(done){
                done();
                this.$emit('setSatus',this.dialogVisible)
            },
            postApprovalDoApply(){
                let _this = this;
                let posData = _this.verifyData1;
                REQ.reqApprovalDoApply(posData,
                    function(result){
                        _this.verifyData1.status === '1' ? _this.$message.success("已同意！") : _this.$message.success("已拒绝！");
                        _this.dialogVisible = false;
                        _this.$emit('setSatus',_this.dialogVisible);
                        _this.$emit('setIsUpdate',true)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>