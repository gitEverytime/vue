<template>
    <div class="box-all">

        <div class="user-item" v-for="item in getUserList">
            <TemItemUser v-bind="item"></TemItemUser>
        </div>
        
    </div>
</template>

<script>

import REQ         from "../../comm/comm_req.js";

import TemItemUser from "./item_user.vue";


export default {
    
    components:{ TemItemUser   },

    data(){
        return{
            userList:[
           
            ]
        }
    },
    computed:{ 
        getUserList(){
            return this.userList;
        }

    },

    mounted(){
        this.getAllUser();
    },
    
    methods:{
        getAllUser(){
            var _this = this;
            var posData = {
                userId:window.UINFO.uId,
                storeId:"r1"
            }
            REQ.reqAllUserFromStore(posData, 
                function(data){
                    console.log("store user list=", data);
                    _this.userList = data.data;
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
@import '../../../../../style/sass/mixin.scss';


.box-all{ width: 100%; height: 100%; }

.box-all .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.box-all .title-bar h1{ font-size: 18px; }

.box-all .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.box-all .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}






</style>


