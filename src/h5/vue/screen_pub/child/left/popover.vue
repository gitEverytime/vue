<template>
    <div>
        <div class="popoverWrap" v-show="popoverShow" @click="$store.commit('setPopoverShow',false)"></div>
        <div class="popover" id="popover" v-show="popoverShow">
            <div id="qrcodeBig" ref="qrcodeBig" class="bigimg"></div>
            <p>扫码上墙</p>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import drapMouseDown from '../../js/drap.js';
    import ZoommouseWheel from '../../js/zoom.js'
    import QRCode from 'qrcodejs2'
    export default {
        data() {
            return {
                isShow:true
            }
        },
        props:{
            wxpic:{
                type:String
            }
        },
        watch:{
            wxpic(val){
                this.qrcodeBig(val);
                const _div = document.getElementById("popover");
                $(".bigimg").find('img').addClass('oimg');
                ZoommouseWheel('oimg');       //二维码放大缩小
                drapMouseDown(_div);          //二维码鼠标拖拽
            }
        },
        computed: {
            popoverShow(){
                return this.$store.getters.getPopoverShow;
            }
        },
        mounted(){
        },
        methods:{
            qrcodeBig(url) {
                let qrcodeBig = new QRCode('qrcodeBig', {
                    width: 445,  // 设置宽度
                    height: 445, // 设置高度
                    text: url
                })
            },
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../../../../style/sass/mixin.scss';
    .popoverWrap{
        position: absolute;
        top: 0;
        left: 0;
        @include set-width-height(100%,100%);
        z-index: 1003;
        overflow:hidden;
    }
    .popover{
        padding: 33px;
        position: absolute;
        z-index:1007;
        @include box-center(50%,50%);
        background: rgba(32,23,32,0.3);
        border-radius:6px;
        cursor: pointer;
        img{
            @include set-width-height(445px,445px);
        }
        p{
            padding-top: 20px;
            font-size: 40px;
            color: #FFFFFF;
            text-align: center;
        }
    }
    #qrcodeBig{
        padding: 15px;
        background: #ffffff;
        border-radius: 4px;
    }

</style>