<template>
    <div class="pf-actor-list">

        <p class="row"    v-for="item in getApplyList">
            <span>{{ item.actorName}}</span>
        </p>

    </div>
</template>

<script>

import $            from 'jquery';

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
        this.getPlatformAcotrList();
    },
    
    methods:{

        getPlatformAcotrList(){
            var _this = this;
            let posData = {sys:0 };
            REQ.reqCloudActorList(posData,
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

.pf-actor-list{width: 100%;}

.pf-actor-list .row{margin: 20px; color: #FFF;}




</style>




