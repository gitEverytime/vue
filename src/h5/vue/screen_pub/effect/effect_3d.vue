<template>
    <div class="slider" id="slider" v-if="$store.getters.getOnScreenPic">
        <div class="re_slider">
            <div class="slider__content oSlider" id="slider-content">
                <div class="slider__images">
                    <div
                        v-for="(item,index) in imgList"
                        class="slider__images-item"
                        :class="{
                            'slider__images-item--active':index === 0,

                        }"
                        :data-id="index+1">
                        <div :class="'L_picture'+index">
                            <img :src="item.img" @load="imageLoaded(item,index)" :key="Date.now()"   class="slider_img"/>
                        </div>
                    </div>
                </div>
                <div class="slider__text">
                    <div
                        v-for="(item,index) in imgList"
                        class="slider__text-item"
                        :class="{'slider__text-item--active':index === 0}"
                        :data-id="index+1">
                        <div class="slider__text-item-head">
                            <h3>{{item.head}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider__nav" style="display: none">
                <div class="slider__nav-arrows">
                <div class="slider__nav-arrow slider__nav-arrow--left" id="left">to left</div>
                <div class="slider__nav-arrow slider__nav-arrow--right" id="right">to right</div>
                </div>
                <div class="slider__nav-dots" id="slider-dots">
                <div class="slider__nav-dot slider__nav-dot--active" data-id="1"></div>
                <div class="slider__nav-dot" data-id="2"></div>
                <div class="slider__nav-dot" data-id="3"></div>
                <div class="slider__nav-dot" data-id="4"></div>
                <div class="slider__nav-dot" data-id="5"></div>
                </div>
            </div>
            <div class="ab_content" v-if="content">
                {{content}}
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import Slider  from '../comm/index.js'
    export default {
        components:{},
        data(){
            return{
                timer:null,
                imgList:[],
                content:''
            }
        },
        mounted(){
            let oH = $(".ab_content").height();
            if(oH>130){    //判断是否是一行数据，是，字体44px,不是54px
                $(".ab_content").addClass('font44').removeClass('font54');
            }else{
                $(".ab_content").addClass('font54').removeClass('font44');
            }
        },
        watch:{
            pic(val){
                let vm = this;
                let timer = 0;
                if(val){
                    let data = JSON.parse(val);          //转化为JSON格式
                    vm.content = data.content;
                    if(!data.pic) return;                //如果霸屏图片不存在返回
                    let pic = data.pic.split(',');       //转化为数组
                    if(pic.length< 2){                   //如果只有一张图片，那么再复制一张图片
                        for(let i=0; i<2; i++){
                            vm.imgList.push({
                                img:pic[0],
                                head:data.mediaTitle,
                                content:data.content
                            })
                        }
                    }else{
                        pic.forEach((item,index) => {    //大于1张则循环添加
                            vm.imgList.push({
                                img:item,
                                head:data.mediaTitle,
                                content:data.content
                            })
                        });
                    }
                    vm.$nextTick(() => {                  //DOM更新完成执行3D效果
                        let sliderEl = document.getElementById('slider');
                        let slider = new Slider(sliderEl);
                        function autoSlide() {
                            $(".slider__content").removeClass("oSlider");
                            slider.next();
                            $(".slider__content").addClass("oSlider");
                        }
                        timer = setInterval(autoSlide, 10000);
                    })
                }else{
                    clearInterval(timer);
                    timer = 0;
                    vm.imgList = [];
                }
            }
        },
        computed:{
            pic(){
                return this.$store.getters.getOnScreenPic;
            }
        },
        methods:{
            imageLoaded(item,index) {
                let timer = 0;
                let vm = this;
                let oW = '';
                let oH = '';
                let Img = new Image();
                Img.src = item.img;
                Img.onload = function ()
                {
                    let w = document.documentElement.clientWidth || document.body.clientWidth;
                    let h = document.documentElement.clientHeight || document.body.clientHeight;
                    if(Img.width>Img.height){    //横图
                        oH = parseFloat(620);
                        oW = parseFloat((Img.width/Img.height)*oH);
                    }else{
                        oH = parseFloat(700);
                        oW = parseFloat((Img.width/Img.height)*oH);
                    }
                    // //赋予图片固定的比例
                    $(`.L_picture${index}`).css({
                        'height':oH,
                        'width':oW
                    });
                    if(index === 0){
                        $(".slider__content").css({
                            'height':oH,
                            'width':oW
                        })
                    }

                }
            }
            //文字大小

        },
        beforeDestroy(){
            //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么暂停。
            clearInterval(this.timer);
        },
    }
</script>

<style scoped lang="scss">
    .font44{
        font-size: 44px;
    }
    .font54{
        font-size: 54px;
    }
</style>