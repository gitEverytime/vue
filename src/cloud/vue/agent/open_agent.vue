<template>
    <div class="open_wrap">
        <el-tabs v-model="activeIndex">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getAgentInfo"
                    :label="col.resName"
                    :name="String(index+1)"
            ></el-tab-pane>
        </el-tabs>

        <TempAgentSet
                v-if="activeIndex === '1'"
                @setActiveIndex="getActiveIndex"
                @setApplyStatus="getApplyStatus"
        ></TempAgentSet>
        <TempApplyInfo
                v-if="activeIndex === '2'"
                :agentList="agentList"
                :value="value"
                @setIndex="getIndex"
                @setApplyStatus="getApplyStatus"
        ></TempApplyInfo>
    </div>
</template>

<script>
    import TempAgentSet   from  './open/agent_set.vue'
    import TempApplyInfo  from  './open/apply_info.vue'
    import REQ from "../../vue/global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempAgentSet,
            TempApplyInfo
        },
        data(){
            return{
                activeIndex:'1',
                pageNo:'1',
                value:0,
                agentList:[],
            }
        },
        mounted(){
            this.reqProxyTodoList();
        },
        methods:{
            reqProxyTodoList(){
                let vm = this;
                let postData = {
                    pageNo:this.pageNo
                };
                REQ.reqProxyTodoList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.agentList = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            getApplyStatus(val){
                this.reqProxyTodoList();
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key;
            },
            getActiveIndex(val){
                this.activeIndex = val;
            },
            getIndex(val){
                this.pageNo = val;
                this.reqProxyTodoList();
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