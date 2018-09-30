<template>
    <div class="verify">
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import REQ     from "../../global/request.js";

    export default {

        components:{
            TempSwitch
        },


        data(){
            return{
                tableData:[],
                actorList:[],
                total3:10,
                pageNo:1,
            }
        },
        computed:{
            getActorList(){
                return this.actorList;
            }

        },

        mounted(){
        },

        methods:{
        }
    }


</script>


<style  lang='scss'   scoped>

    @import "../../../../style/sass/mixin.scss";

    .verify{
        width: 100%; height: 100%;
    }


    .verify .tab .row{
        @include set-wh(100%, 60px);
        border-bottom: 1px solid #009688;
    }

    .verify .tab tr td{ text-align: center; }

    .verify .tab .avatar,
    .verify .tab .avatar img{margin: auto; width: 60px; height: 60px;}

    .verify .tab .col-btn{
        @include layout-flex-r-center;
    }

    .verify .tab .col-btn .btn{
        margin: 0 10px 0 0; height: 60px; line-height: 60px; cursor: pointer;
    }
    .headimg{
        width: 50px;
        height: 50px;
    }
    .icon-man{
        color: #086D99;
        font-size: 25px;
    }
    .icon-woman{
        color: #8E1250;
        font-size: 25px;
    }
    .btnsWrap{
        text-align: center;
        padding-top: 50px;
    }

</style>




