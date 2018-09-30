<template>
    <div class="box-pre">

        <div class="talk-item" v-for="item in privateList">
            <ItemPrivate v-bind="item"></ItemPrivate>
        </div>
        
    </div>
</template>

<script>

import ItemPrivate from "./item_private.vue";
import REQ         from "../../comm/comm_req.js";

export default {
    
    components:{ ItemPrivate   },

    data(){
        return{
            privateList:[
                {id:"1", nickname:"动信息1", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"},
                {id:"2", nickname:"动信息2", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"}
           
            ]
        }
    },
    computed:{ 
        getPreList(){
            return this.privateList;
        }

    },

    mounted(){
        this.requestPrivateList();
    },
    
    methods:{

        requestPrivateList(){
            var posData = {
                //storeId:window.UINFO.storeId, 
                storeId:"1", 
                chatType:"0"
            }

            REQ.reqChatInStore(posData,
                function(data){
                    console.log("[ private chat list]", data);
                },
                function(data){},
                function(data){
                    //todo  error
                }
            );

        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.box-pre{ width: 100%; height: 100%; }

.box-pre .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.box-pre .title-bar h1{ font-size: 18px; }

.box-pre .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.box-pre .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}



</style>


