<template>
    <el-dialog
            title="预览效果"
            :visible.sync="dialogVisible"
            :show-close="true"
            :before-close="handleClose"
    >
        <div class="previewCont">
            <div
                    class="bar_row"
                    v-for="(row,key) in tabData"
                    v-if="row"
            >
                <div
                        class="bar_col"
                        v-for="(col,index) in row.item"
                        :class="{
                            'isHasType': col.tableType && col.tableType!==''
                        }"
                >
                    <span v-if='col.tableType'><i class="iconfont icon-leixing"></i>{{col.tableTypeName}}</span>
                    <span v-if="col.tableType === '0'"><i class="iconfont icon-haoma"></i>第{{col.tableName}}号桌</span>
                    <span v-if="col.tableType === '0'"><i class="iconfont icon-zuoweishu"></i>用餐{{col.seatCount}}人</span>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">

        </span>
    </el-dialog>
</template>

<script>
    const roomInfo = window.UINFO;
    export default {
        components:{
        },
        props: {
            dialogVisible1:{
                type:Boolean
            },
            bardata:{
                type:Array
            }
        },
        data(){
            return{
                dialogVisible:this.dialogVisible1,
                barData1:this.bardata,
            }
        },
        watch:{
            dialogVisible1(val){
                this.dialogVisible = val;
            },
            bardata(val){
                this.barData1 = val;
            }
        },
        computed:{
            /**
             * 如果一行所有数据都没有，则删除这一行
             */
            tabData(){
                let isNull = true;
                let array = [];
                this.barData1.forEach((row,key) => {
                    row.item.forEach((col,index) => {
                        if(JSON.stringify(col) !== '{}') isNull = false; return;
                    });
                    if(!isNull){
                        array.push(row); isNull=true
                    }
                });
                return array;
            }
        },
        mounted(){
        },

        methods:{
            handleClose(done){
                done();
                this.$emit('setCloseEmit',this.dialogVisible);
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../../sass/common.scss';
    .previewCont{
        /*padding: 50px;*/
        .bar_row{
            @include layout-flex-r-center;
            .bar_col {
                justify-content:space-around;
                align-items: center;
                margin: 5px;
                display:inline-block;
                overflow: hidden;
                padding: 10px;
                color: #FFFFFF;
                @include set-width-height(80px, 80px);
                border-radius: 4px;
                @include layout-flex-c;
                span{
                    display: block;
                    color:$deep_green;
                }
            }
            .isHasType{
                border: $orange solid 1px;
            }
            .isDesk{
                padding: 10px;
            }
            .isBar{
                padding: 10px 10px;
            }
            .isDance{
                padding: 30px 10px;
            }
            .isDoor{
                padding: 20px 10px;
            }
            .isRoom{
                padding: 10px 10px;
            }
        }
    }

</style>