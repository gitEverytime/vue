<template>
    <div class="pf-actor-apply">

        <p class="row"    v-for="item in getApplyList">
            <span>{{ item.actorName}}</span>
            <span class="layui-btn layui-btn-sm" v-on:click="doHandler(item.applyId,1)" > 通过 </span>
            <span class="layui-btn layui-btn-sm layui-btn-normal"  v-on:click="doHandler(item.applyId,2)" > 驳回 </span>
        </p>

    </div>
</template>

<script>

import $    from 'jquery';

import REQ from "../../global/request.js";

const roomInfo = window.UINFO;


export default {

    components:{  
    },


    data(){
        return{
            applyList : []
        }
    },
    computed:{

        getApplyList(){
            return this.applyList;
        }

    },

    mounted(){
        var _this = this;
        this.getPlatformAcotrApplyList();
    },
    
    methods:{

        getPlatformAcotrApplyList(){
            var _this = this;
            let posData = { storeId:roomInfo.storeId, sys:0 };
            REQ.reqCloudActorApplyList(posData,
                function(data){
                    _this.applyList = data.data;
                },
                function(data){},
                function(data){
                    //todo  error
                }
            )

        },


        doHandler(applyId, status){
            var _this = this;
            let posData = { applyId: applyId, status:status };
            REQ.reqDoActorApply(posData,
                function(data){
                    console.log("申请成为艺人， 平台处理结果", data);
                },
                function(data){},
                function(data){
                    //todo  error
                }
            )

        }






    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.pf-actor-apply{width: 100%;}

.pf-actor-apply .row{margin: 20px; color: #FFF;}




</style>




