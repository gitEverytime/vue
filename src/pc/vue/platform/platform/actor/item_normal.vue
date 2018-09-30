<template>
    <div class="normal">
        <ul class="row">
            <li class="col"><div class="img-con"> <img v-bind:src="url" alt=""></div> </li>

            <li class="col col-name"><label class="nick-name">{{name}}</label> </li>

            <li class="col col-msg"><label class="msg">{{phone}}</label> </li>

            <li class="col  col-btn"> <span class="btn" v-on:click="detailHandler">查看详细</span>   </li>

        </ul>

    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



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
        operateHandler(){

        },

        detailHandler(){

        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.normal{ 
    margin: 10px 0 0 10px;
    width: 100%; height: 80px; border: 1px solid #FFF; border-radius: 5px; background: #FFF;  
}

.normal .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.normal .row .img-con,
.normal .row .img-con img
{
    width: 80px; height: 80px;
}

.normal .row .col{ 
    @include layout-flex-c-center;
    margin: 0 10px 0 0;  height: 80px; line-height: 80px; 
}

.normal .row .col-name{ width: 150px; }

.normal .row .col .btn{ 
    margin:5px 0 0 0; width: 100px; height: 30px; line-height: 30px;
    text-align: center; background: #1E9FFF; color: #FFF;  cursor: pointer;
}



.normal .row .col-btn{
    @include layout-flex-c-center;
}










</style>


