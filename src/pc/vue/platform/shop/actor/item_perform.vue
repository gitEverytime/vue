<template>
    <div class="item-perform">
        <ul class="row">
            <li class="col"><div class="img-con"> <img v-bind:src="url" alt=""></div> </li>

            <li class="col col-name"><label class="nick-name">{{name}}</label> </li>

            <li class="col col-msg"><label class="msg">{{phone}}</label> </li>

            <li class="col col-btn"> 
            </li>
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

        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.item-list{ 
    margin: 10px 0 0 10px;
    width: 100%; height: 80px; border: 1px solid #FFF; border-radius: 5px; background: #FFF;  
}

.item-list .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.item-list .row .img-con,
.item-list .row .img-con img
{
    width: 80px; height: 80px;
}

.item-list .row .col{ margin: 0 10px 0 0;  height: 80px; line-height: 80px; }

.item-list .row .col-name{ width: 150px; }

.item-list .row .col-msg{ width: 300px; }

.item-list .row .col .btn{ 
    margin:5px 0 0 0; width: 100px; height: 30px; line-height: 30px;
    text-align: center; background: #1E9FFF; color: #FFF;  cursor: pointer;
}

.item-list .row .col .btn-warnning{
    background: #FF5722;
}

.item-list .row .col-btn{
    @include layout-flex-c-center;
}










</style>


