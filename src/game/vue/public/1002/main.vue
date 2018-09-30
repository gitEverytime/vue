<template>
    <div class="game-public">
        <div class="content">
            <div class="left">
                <div class="meddle">
                    <router-view>
                    </router-view>
                </div>

            </div>
            <div class="right">

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {

        },
        data(){
            return{

            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';

    .game-public {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .game-public .content {
        /*background: rgba(0, 0, 0, 0.8);*/
        width: 100%;
        height: 100%;
        background-image: url(http://static.ibigtop.com/static/img/public/game/bgpoint.gif);
        background-repeat: no-repeat;
        background-size: cover;
        @include layout-flex-r;
    }

    .game-public .content .left {
        flex: 1;
    }

    .game-public .content .left {
        width: 100px;
        @include layout-flex-c;
    }

    .game-public .content .meddle {
        flex: 1;
        width: 100%;
    }
</style>




