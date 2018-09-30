<template>
     <div></div>
</template>

<script>
    import REQ from "../../vue/global/request.js";
    export default {
        components:{

        },
        data(){
            return{
                fullscreenLoading: true
            }
        },
        mounted(){
        },
        methods:{
            //获取权限信息
            getAllPerms(){
                let vm = this;
                REQ.reqGetAllPerms({},
                    (result) => {
                        vm.$store.commit('setParemInfo',JSON.stringify(result.data));
                        vm.endLevel(result.data);
                        // 在这里面去获取DOM
                        vm.$nextTick(() =>{
                            vm.$store.commit('setIsScreenOk',true);
                            vm.fullscreenLoading = false;
                        })
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },
            endLevel(result){
                let vm = this;
                result.forEach((item) => {
                    switch (item.resName){
                        case '互动管理':
                            vm.$store.commit('setInteractInfo',item.child[0].child);
                            break;
                        case '人员管理':
                            if(item.child.length<1) return;
                            item.child.forEach((col) => {
                                switch (col.resName){
                                    case '服务人员':
                                        vm.$store.commit('setServiceInfo',col.child);
                                        break;
                                    case '艺人':
                                        vm.$store.commit('setActorInfo',col.child);
                                        break;
                                }
                            });
                            break;
                        case '代理管理':
                            if(item.child.length<1) return;
                            item.child.forEach((col) => {
                                switch (col.resName){
                                    case '开设代理':
                                        vm.$store.commit('setAgentInfo',col.child);
                                        break;
                                    case '代理列表':
                                        vm.$store.commit('setAgentList',col.child);
                                        break;
                                }
                            });
                            break;
                        case '商户管理':
                            if(item.child.length<1) return;
                            item.child.forEach((col) => {
                                switch (col.resName){
                                    case '开设商户':
                                        vm.$store.commit('setStoreMsg',col.child);
                                        break;
                                    case '商户列表':
                                        vm.$store.commit('setStoreList',col.child);
                                        break;
                                }
                            });
                            break;
                        case '人资管理':
                            if(item.child.length<1) return;
                            debugger
                            item.child.forEach((col) => {
                                switch (col.resName){
                                    case '艺人管理':
                                        vm.$store.commit('setHrInfo',col.child);
                                        break;
                                    case '服务人员管理':
                                        debugger
                                        vm.$store.commit('setTotalService',col.child);
                                        break;
                                }
                            });
                            break;
                    }

                    //
                })

            }
        }
    }
</script>

<style scoped>

</style>