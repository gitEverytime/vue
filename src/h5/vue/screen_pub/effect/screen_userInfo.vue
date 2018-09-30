<template>
    <div class="ab_screenUserInfo" v-if="$store.getters.getOnScreenPic">
        <div class="re_screenUserInfo">
            <!--左上角-->
            <div class="ab_userInfo">
                <div class="re_userInfo">
                    <div class="ab_head wiggle">
                        <div class="re-head">
                            <img :src="effectData.headimg" class="head_img">
                            <img :src="LinkType.LINK_ON_SCREEN_THEME_IMG+(effectData.mediaId)+'_headimg.png'" class="head-ring">
                        </div>
                    </div>
                    <h2
                        :style="{
                        'background':`url(${effectData.nameImg})`
                       }"
                        class="animate_pulse">
                        {{effectData.cname}}
                    </h2>
                    <p
                        :style="{
                        'background':`url(${effectData.nameContent})`
                        }"
                            class="animate_pulse">
                        {{effectData.mediaTitle}}霸屏{{effectData.duration}}秒
                    </p>
                </div>
            </div>
            <!--中间特效展示-->

            <!--右上角-->
            <div class="count_down">
                <!--{_this.downNum}-->
                {{times}}&nbsp;s
            </div>
        </div>
    </div>
</template>

<script>
    import LinkType from '../comm/link_type.js';
    export default {
        components:{

        },
        data(){
            return{
                effectData:{},
                LinkType:LinkType,
                times:0
            }
        },
        watch:{
            pic(val){
                let vm = this;
                let timer = null;
                if(val){
                    vm.effectData = JSON.parse(val);
                    vm.effectData['nameImg'] = `${vm.LinkType.LINK_ON_SCREEN_THEME_IMG}${vm.effectData.mediaId}_name.png`;
                    vm.effectData['nameContent'] = `${vm.LinkType.LINK_ON_SCREEN_THEME_IMG}${vm.effectData.mediaId}_content.png`;
                    vm.times = Number(vm.effectData.duration);
                    timer =setInterval(() =>{
                        if(vm.times === 0) {
                            clearInterval(timer);
                            return;
                        }
                        vm.times --;
                    },1000)
                }else{
                    vm.effectData = {};
                    clearInterval(timer);
                    vm.times = 0;
                }
            }
        },
        computed:{
            pic(){
                return this.$store.getters.getOnScreenPic;
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>