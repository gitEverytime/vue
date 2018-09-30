<template>
    <div class="item-wait">
        <ul class="row">
            <li class="col"><div class="img-con"> <img v-bind:src="url" alt=""></div> </li>

            <li class="col col-name"><label class="nick-name">{{name}}</label> </li>

            <li class="col col-msg"><label class="msg">{{phone}}</label> </li>

            <li class="col "> <span class="btn btn-bill">查看详细</span> </li>

            <li class="col col-btn"> 
                <span class="btn" v-on:click="operateHandler(1)">通过</span> 
                <span class="btn btn-warnning" v-on:click="operateHandler(2)">不通过</span> 
            </li>
        </ul>

    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_CLOUD_DOMAIN;



export default {

    props:["id", "name", "url", "phone"],
    components:{    },

    data(){
        return{
        }
    },
    computed:{ 

    },

    mounted(){
    },
    
    methods:{
        operateHandler(flag){
            var _this = this;
            var url = api_domain+'/admin/api/approval/doApply';
            var posData = {applyId:this.id, status:flag, remarks:"测试数据"};
            U.request("post",url,posData, 
                function(data){
                    //todo sucess
                    alert(data.msg);
                },
                function(data){ },
                function(data){  }
            )

        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.item-wait{ 
    margin: 10px 0 0 10px;
    width: 100%; height: 80px; border: 1px solid #FFF; border-radius: 5px; background: #FFF;  
}

.item-wait .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.item-wait .row .img-con,
.item-wait .row .img-con img
{
    width: 80px; height: 80px;
}

.item-wait .row .col{ 
    @include layout-flex-c-center;
    margin: 0 10px 0 0;  height: 80px; line-height: 80px; 
}

.item-wait .row .col-name{ width: 150px; }

.item-wait .row .col .btn{ 
    margin:5px 0 0 0; width: 100px; height: 30px; line-height: 30px;
    text-align: center; background: #1E9FFF; color: #FFF;  cursor: pointer;
}

.item-wait .row .col .btn-bill{
    display: block; border: 1px solid #C9C9C9; background: #FFF; color: #000;
}

.item-wait .row .col .btn-warnning{
    background: #FF5722;
}

.item-wait .row .col-btn{
    @include layout-flex-c-center;
}










</style>


