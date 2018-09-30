<template>
    <div class="open_wrap">
        <el-tabs v-model="activeIndex">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getStoreMsg"
                    :label="col.resName"
                    :name="String(index+1)"
            ></el-tab-pane>
        </el-tabs>

        <TempStoreSet
                v-if="activeIndex === '1'"
                @setActiveIndex="getActiveIndex"
                @setApplyStatus="getApplyStatus"
        ></TempStoreSet>
        <TempStoreInfo
                v-if="activeIndex === '2'"
                :storeList="storeList"
                :value="value"
                @setIndex="getIndex"
                @setApplyStatus="getApplyStatus"
        ></TempStoreInfo>
    </div>
</template>

<script>
    import TempStoreSet   from  './open/store_set.vue'
    import TempStoreInfo  from  './open/store_info.vue'
    import REQ from "../../vue/global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempStoreSet,
            TempStoreInfo
        },
        data(){
            return{
                activeIndex:'1',
                pageNo:'1',
                value:0,
                storeList:[],
            }
        },
        mounted(){
            this.reqStoreTodoList();
        },
        methods:{
            reqStoreTodoList(){
                let vm = this;
                let postData = {
                    pageNo:this.pageNo
                };
                REQ.reqStoreTodoList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.storeList = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            getApplyStatus(val){
                this.reqStoreTodoList();
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key;
            },
            getActiveIndex(val){
                this.activeIndex = val;
            },
            getIndex(val){
                this.pageNo = val;
                this.reqStoreTodoList();
            }
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