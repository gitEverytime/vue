<template>
    <img :src="getGif" class="pross" >
</template>

<script>

const gifUrl = "http://static.ibigtop.com/static/img/game/";

    export default {
        props: [ "index" ],
        data() {
            return {
            }
        },
        computed: {

            getGif(){
                let flag = Number(this.index)%5;
                let url = gifUrl+ "r"+flag+".gif";
                return url;
            }


        },
        mounted() {
            console.log( 33,this.index);
        },
        methods: {
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .pross{
        width: 100%; height: 100%;
    }


</style>