<template>
    <div class="adver-box">
         <img class="ani_image" :src="getCurrImg" alt="">
    </div>
</template>

<script>

export default {
    
    components:{  },

    data(){
        return{
        }
    },
    computed:{
        getCurrImg(){
            return this.currImg;
        }
    },

    mounted(){
        var _this    = this;
        var imgTotal = this.imgList.length;
        setInterval(function(){
            var imgIndex = Math.floor( Math.random()*imgTotal );
            _this.currImg = _this.imgList[ imgIndex ].url;
        }, 3000)
    },
    
    methods:{

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.adver-box{ 
    width: 100%; height: 180px; background-color: rgba(219, 200, 200, 0.2);
    border-radius: 8px; overflow: hidden;
    margin-top: 10px;
}
.adver-box img{
    width: 100%;
    height: auto;
}

@-webkit-keyframes fadeInOut {
    0% {
        opacity:1;
     }
    25% {
        opacity:0.25;
    }
    50% {
        opacity: 0.5;    
    }
    75% {
        opacity:1;
    }
}

.ani_image {
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 3s;
    -webkit-animation-direction: alternate;
}




</style>




