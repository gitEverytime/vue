<template>
    <div class="open_wrap">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getTotalService"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>

        <TempServiceSet
                v-if="activeName === '添加'"
        ></TempServiceSet>
        <TempServiceInfo
                v-if="activeName === '申请'"
        ></TempServiceInfo>
        <TempServiceList
                v-if="activeName === '管理' || activeName === '未通过'"
                :activeName="activeName"
        >
        </TempServiceList>
    </div>
</template>

<script>
    import TempServiceSet   from  './service_set.vue'
    import TempServiceInfo  from  './service_apply.vue'
    import TempServiceList  from  './service_list.vue'
    import REQ from "../../../vue/global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempServiceSet,
            TempServiceInfo,
            TempServiceList
        },
        data(){
            return{
                activeIndex:'添加',
                pageNo:'1',
                value:0,
                activeName:'添加'
            }
        },
        mounted(){
        },
        watch:{
        },
        methods:{
            getApplyStatus(val){
                this.reqStoreTodoList();
            },
            handleSelect(key, keyPath) {
                this.activeName = key;
            },
            getActiveName(val){
                this.activeName = val;
            },
            getIndex(val){
                this.pageNo = val;
                this.reqStoreTodoList();
            },
        }
    }
</script>

<style scoped lang="scss">
    .open_wrap{
        padding: 0 30px;
        height: 100%;
        overflow-y: auto;
        margin-left: -15px;
        position:relative
    }
</style>