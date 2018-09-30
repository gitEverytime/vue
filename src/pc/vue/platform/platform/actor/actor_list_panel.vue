<template>
    <div class="actor-list">

        <div class="user-item" v-for="item in getActorList">
            <TemNormalItem v-bind="item"></TemNormalItem>
        </div>
        
    </div>
</template>

<script>
import $    from 'jquery';
import REQ  from "../../comm/comm_req.js";

import TemNormalItem from "./item_normal.vue";

export default {
    
    components:{ TemNormalItem   },

    data(){
        return{
            actorList:[
                //{id:"1", name:"动信息1", phone:"151555555",  url:"https://imgt.388g.com/jzd/201708/150268176415543.jpeg", msg:"动信息动信息"},
                //{id:"2", name:"卡通头像", phone:"151555555", url:"https://imgt.388g.com/jzd/201708/150268176526028.jpeg", msg:"动信息动信息"}
            ]
        }
    },
    computed:{ 
        getActorList(){
            return this.actorList;
        }

    },

    mounted(){
        this.getAllActor();
    },
    
    methods:{

        getAllActor(){
            var _this = this;
            REQ.reqCloudActorList({sys:0}, 
                function(data){
                    _this.actorList = data.data;
                    _this.formatData();
                },
                function(data){},
                function(data){}
            );

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


    }


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



