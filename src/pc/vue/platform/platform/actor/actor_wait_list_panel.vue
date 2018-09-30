<template>
    <div class="actor-list">

        <div class="user-item" v-for="item in getActorList">
            <TemWaitItem v-bind="item"></TemWaitItem>
        </div>
        
    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_CLOUD_DOMAIN;

import TemWaitItem from "./item_wait.vue";

export default {
    
    components:{ TemWaitItem   },

    data(){
        return{
            actorList:[
            ]
        }
    },
    computed:{ 
        getActorList(){
            return this.actorList;
        }

    },

    mounted(){
        this.requestWaitList();
    },
    
    methods:{

        requestWaitList(){
            var _this = this;
            var url = api_domain+'/admin/api/approval/sysDList';
            var posData = {sys:"0", ac1:"", ac2:""};
            U.request("post",url,posData, 
                function(data){
                    //todo sucess
                    _this.actorList = data.data;
                    _this.formatData();
                },
                function(data){ },
                function(data){  }
            )

        },

        //todo 测试数据
        formatData(){
            this.actorList.forEach( function(item){
                item.name = Date.now(),
                item.phone = Date.now(),
                item.url = "https://imgt.388g.com/jzd/201708/150268176415543.jpeg",
                item.msg = "动信息动信息动信息动信息"

            });
        }



    },


    


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.actor-list{ width: 100%; height: 100%; }

.actor-list .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.actor-list .title-bar h1{ font-size: 18px; }

.actor-list .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.actor-list .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}






</style>


