<template>
    <div class="perform_panel">
        <div class="tab">
            <table>
                <tr class="tab-top"> <th>节目名称</th> <th>节目类型</th> <th>节目价格</th> <th>操作</th>  </tr>
                <tr>
                    <td><span>我是你的眼</span></td>
                    <td><span>歌曲</span></td>
                    <td><input type="text" value="100"></td>
                    <td> <span class="btn">修改</span></td>
                </tr>
            </table>
        </div>
        

      
    </div>
</template>

<script>
import $  from 'jquery';

import REQ    from "../../comm/comm_req.js";


export default {
    
    components:{    },

    data(){
        return{
            performList:[
                //{id:"1", name:"动信息1", phone:"151555555", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"},
                //{id:"2", name:"动信息2", phone:"151555555", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"}
            ]
        }
    },
    computed:{ 
        getPerformList(){
            return this.performList;
        }

    },

    mounted(){

    },
    
    methods:{

        reqPerformList(){
            var posData = { sys:0 }
            REQ.reqStoreActorList(posData,
                function(data){

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


.perform_panel{ 
    position: absolute; margin: 70px 0 0 -200px;
    width: 500px; height: auto; background: #FFF; border-radius: 8px;
}

.perform_panel .tab table{width: 100%; height: 100%; }

.perform_panel .tab table tr{height: 40px; line-height: 40px;}

.perform_panel .tab table tr td{ text-align: center; }

.perform_panel .tab .tab-top{
    background:#f2f2f2;
}


.perform_panel .tab .tab-top th{height: 40px; line-height: 40px; width: 25%; text-align: center;}






</style>


