<template>
    <div class="box-list">

        <div class="user-item" v-for="item in getActorList">
            <TemItemList v-bind="item"></TemItemList>
        </div>
        
    </div>
</template>

<script>
import $  from 'jquery';

import REQ    from "../../comm/comm_req.js";

import TemItemList from "./item_list.vue";


export default {
    
    components:{ TemItemList   },

    data(){
        return{
            actorList:[
                //{id:"1", name:"动信息1", phone:"151555555", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"},
                //{id:"2", name:"动信息2", phone:"151555555", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"}
            ]
        }
    },
    computed:{ 
        getActorList(){
            return this.actorList;
        }

    },

    mounted(){
        this.reqApplyList();
    },
    
    methods:{

        reqApplyList(){
            var _this = this;
            var posData = { sys:0 }
            REQ.reqStoreActorList(posData,
                function(data){
                    _this.actorList = data.data;
                    _this.formatData();
                },
                function(data){},
                function(data){
                    //todo  error
                }
            );
        },

        //todo 测试数据
        formatData(){
            this.actorList.forEach( function(item){
                item.name  = Date.now(),
                item.phone = Date.now(),
                item.url = "https://imgt.388g.com/jzd/201708/150268176415543.jpeg",
                item.msg = "动信息动信息动信息动信息"

            });
        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.box-list{ width: 100%; height: 100%; }

.box-list .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.box-list .title-bar h1{ font-size: 18px; }

.box-list .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.box-list .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}






</style>


