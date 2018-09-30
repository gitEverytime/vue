<template>
    <div class="item-apply">
        <ul class="row">
            <li class="col"><div class="img-con"> <img v-bind:src="url" alt=""></div> </li>

            <li class="col col-name"><label class="nick-name">{{name}}</label> </li>

            <li class="col col-msg"><label class="msg">{{phone}}</label> </li>

            <li class="col "> 
                <span class="btn btn-bill" v-on:click="switchPerformPanel">演出单</span> 
                <TempPerformPanel v-if="gitPerformState"  ></TempPerformPanel>
            </li>

            <li class="col col-btn"> 
                <span class="btn" v-on:click="operateHandler(1)">通过</span> 
                <span class="btn btn-warnning" v-on:click="operateHandler(2)">不通过</span> 
            </li>
        </ul>

    </div>
</template>

<script>

import $    from 'jquery';
import REQ  from "../../comm/comm_req.js";

import TempPerformPanel from "./actor_perform_panel.vue";


export default {

    props:["id", "name", "url", "phone"],
    components:{ TempPerformPanel   },

    data(){
        return{
            isShowPerform:false
        }
    },
    computed:{ 
        gitPerformState(){
            return this.isShowPerform;
        }

    },

    mounted(){
    },
    
    methods:{
        operateHandler(flag){
            var posData = { applyId:this.id, status:flag }
            REQ.reqDoActorApply(posData,
                function(data){
                    alert(data.msg);
                },
                function(data){},
                function(data){
                    //todo  error
                }
            );
        },

        //显示节目单列表
        switchPerformPanel(){
            isShowPerform = !isShowPerform;
        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.item-apply{ 
    margin: 10px 0 0 10px;
    width: 100%; height: 80px; border: 1px solid #FFF; border-radius: 5px; background: #FFF;  
}

.item-apply .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.item-apply .row .img-con,
.item-apply .row .img-con img
{
    width: 80px; height: 80px;
}

.item-apply .row .col{ 
    @include layout-flex-c-center;
    margin: 0 10px 0 0;  height: 80px; line-height: 80px; 
}

.item-apply .row .col-name{ width: 150px; }

.item-apply .row .col .btn{ 
    margin:5px 0 0 0; width: 100px; height: 30px; line-height: 30px;
    text-align: center; background: #1E9FFF; color: #FFF;  cursor: pointer;
}

.item-apply .row .col .btn-bill{
    display: block; border: 1px solid #C9C9C9; background: #FFF; color: #000;
}

.item-apply .row .col .btn-warnning{
    background: #FF5722;
}

.item-apply .row .col-btn{
    @include layout-flex-c-center;
}










</style>


