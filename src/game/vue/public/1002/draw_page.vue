<template>
    <div class="drawPage">
        <TempDrawHeader
                :title="title"
        ></TempDrawHeader>
        <TempDrawCont
                @setTitle="getTitle"
        ></TempDrawCont>
        <div class="copyRight">
            &copy;2018-2020&nbsp;&nbsp;毕果科技
        </div>
    </div>
</template>

<script>
    import TempDrawHeader  from './draw_header.vue'
    import TempDrawCont    from './draw_cont.vue'
    export default {
        components:{
            TempDrawHeader,
            TempDrawCont,
        },
        data(){
            return{
                title:''
            }
        },
        mounted(){

        },
        methods:{
            getTitle(val){
                this.title = val;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .drawPage{
        display: -webkit-flex;
        flex-direction: column;
        @include set-width-height(100%,100%);
        background-image: url(http://static.ibigtop.com/static/img/public/game/choujiangbg2.webp);
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        .copyRight{
            position: absolute;
            @include box-center(99%,50%);
            text-align: center;
            margin-top: 5px;
            font-size: 14px;
            color: #FFFFFF;
        }
    }

</style>