<template>
    <div class="actor">
        <el-tabs v-model="activeName">
            <el-tab-pane label="管理小票机" name="1"></el-tab-pane>
            <el-tab-pane label="管理读卡器" name="2"></el-tab-pane>
            <el-tab-pane label="管理扫码枪" name="3"></el-tab-pane>
            <el-tab-pane label="买单方式" name="4"></el-tab-pane>
            <el-tab-pane label="管理监控" name="5"></el-tab-pane>
        </el-tabs>

        <div class="box">
            <TempMenu v-if="activeName === '1'" >  </TempMenu>
        </div>

    </div>
</template>

<script>
    import TempMenu   from "./device_POS.vue";
    export default {

        components:{
            TempMenu,
        },


        data(){
            return{
                menuIndex:1,
                activeName:'1'
            }
        },
        computed:{
            getOnMenuIndex(){
                return this.menuIndex;
            }

        },

        mounted(){
            var _this = this;

        },

        methods:{
            switchBox(menuIndex){
                this.menuIndex = menuIndex;
            }
        }
    }
</script>


<style  lang='scss'   scoped>

    @import '../../../sass/common.scss';

    .actor{
        margin: 0 0 0 20px;
        width: 100%; height: 100%;
    }

    .actor .menu-bar{
        @include layout-flex-r;
        padding: 20px 0;
        border-bottom: #00B594 solid 1px;
    }

    .actor .menu-bar .btn{
        width: 100px; height: 40px; line-height: 40px; color: #dedede;
        text-align: center; font-size: 18px; cursor: pointer;
    }

    .actor .menu-bar .on{
        color: #009688;
    }




</style>




