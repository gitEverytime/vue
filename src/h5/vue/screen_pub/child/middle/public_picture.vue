<template>
    <div class="public_picture"  v-if="currImg !== ''">
        <img
            :src="currImg"
            alt=""
            @load="imageLoaded"
            class="L_picture"
        >

    </div>
</template>

<script>
    import $ from 'jquery';
    import UiType  from '../../comm/ui_type.js';
    import ConstValue from '../../comm/const_value.js'
    import LinkType from '../../comm/link_type.js';
    export default {
        components:{  },

        data(){
            return{
                currImg:'',
                img:{
                    width:'',
                    height:''
                }
            }
        },
        computed:{
            publicUserInfo(){
                return this.$store.getters.getPublicUserInfo;
            }
        },
        watch: {
            /**
             * 延时一秒才会执行添加图片的src
             */
            publicUserInfo(val){
                this.currImg = '';
                const Timer = setTimeout(() => {
                    if(val.length>=5){
                        let type = val[val.length - 5].type;
                        switch (type){
                            case ConstValue.INTERACTION_ONSCREEN:                                  //霸屏
                                if(val[val.length - 5].pic){
                                    this.currImg = val[val.length - 5].pic.split(',')[0];
                                }
                                break;
                            case ConstValue.INTERACTION_CHAT:                                      //聊天
                                this.currImg = val[val.length - 5].pic;
                                break;
                            case ConstValue.INTERACTION_BM_HEART:                                  //霸麦：真心话
                                this.currImg = `${LinkType.LINK_BM}/maipic2.png`;
                                break;
                            case ConstValue.INTERACTION_BM_VOICE:                                  //霸麦：好声音
                                this.currImg = `${LinkType.LINK_BM}/maipic1.png`;
                                break;
                            default :
                                this.currImg = '';
                                break;
                        }
                    }else {
                        return ''
                    }
                },1000)
            }
        },
        mounted(){
        },
        methods:{
            /**
             * 图片加载完成之后才会执行的操作,如果图片的宽度>图片的高度，16:9显示，否则9:16显示
             *
             */
            imageLoaded() {
                let vm = this;
                let oW = '';
                let oH = '';
                let Img = new Image();
                Img.src = vm.currImg;
                Img.onload = function ()
                {
                    let w = document.documentElement.clientWidth || document.body.clientWidth;
                    let h = document.documentElement.clientHeight || document.body.clientHeight;
                    if(Img.width>Img.height){
                        oW = 1160;
                        oH = parseFloat((Img.height/Img.width)*1160);
                        $(".public_picture").addClass("ab_top").removeClass("ab_center");
                    }else{
                        oH = parseFloat(h);
                        oW = parseFloat((Img.width/Img.height)*h);
                        $(".public_picture").addClass("ab_center").removeClass("ab_top");
                    }
                    //赋予图片固定的比例
                    $(".L_picture").css({
                        'height':oH,
                        'width':oW
                    });
                }
            }
        }
    }
</script>


<style lang='scss'  scoped>
    @import '../../../../../style/sass/mixin';
    .public_picture{
        position: absolute;
        z-index: -40;
        text-align: center;
        .L_picture{
            box-shadow: 0 0 0 20vmax rgba(0, 0, 0, 0.3) inset;
        }
        img{
            border-radius: 6px;
        }
    }
    .ab_center{
        @include box-center(50%,50%);
    }
    .ab_top{
        @include box-center(40%,50%);
    }
    .V_screen{
        width: 454px !important;
        height: 100% !important;
    }
</style>