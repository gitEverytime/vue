<template>
    <div class="box-header">
        <div class="marquee-box">
            <div class="marquee">
                {{marqueeMsg}}
            </div>
            <div class="marquee-row">
                {{marqueeMsg}}
            </div>
        </div>


    </div>
</template>

<script>

    import REQ from './../../comm/request.js'
    export default {
        props: ["storeTitle"],
        components: {},

        data() {
            return {
                barInfo: {},
                marqueeMsg: '',
            }
        },
        computed: {
            getBarInfo() {
                return this.barInfo.barName + "   " + this.barInfo.wearther + ""
            },
            getBarlogo() {
                return this.barInfo.logoUrl
            },
        },

        watch: {
            storeTitle() {
                if (!this.storeTitle) return
                this.setTitleText()
            }
        },

        mounted() {
            var _this = this;
            var getstoreInfoData = {
                "id": window.RINFO.storeId
            }
        },

        methods: {
            setTitleText() {
                const length = Object.keys(this.storeTitle).filter(item => item.startsWith('title')).length;
                if (!length) return;
                this.marqueeMsg = this.storeTitle.title1;
                let i = 1;
                this.timer = setInterval(() => {
                    i++;
                    if(this.storeTitle['title' + i]){
                        this.marqueeMsg = this.storeTitle['title' + i];
                    }else{
                        this.marqueeMsg = this.storeTitle.title1;
                        i = 0
                    }
                }, 1000 * 30)
            }
        },

        beforeDestroy() {
            clearInterval(this.timer)
        }

    }
</script>


<style lang='scss' scoped>
    // @import '../../../style/sass/mixin.scss';

    .box-header {
        width: 100%;
        padding: 15px;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 27px;
        font-weight: bold;
        line-height: 27px;
        color: #fff;
        box-sizing: border-box;
    }

    .box-header .marqueestatic {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 36px;
        line-height: 36px;
        flex-shrink: none;
    }

    .box-header .marquee {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        height: 36px;
        line-height: 36px;
        animation: marquee 30s infinite;
        -webkit-animation: marquee 30s infinite; /*Safari and Chrome*/
        animation-timing-function: linear;
        -webkit-animation-timing-function: linear; /* Safari and Chrome */
        position: absolute;
        top: 10px;
        left: 380px;
        z-index: 1008;
    }

    .box-header .marquee-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        height: 36px;
        line-height: 36px;
        /*animation: marquee-row 30s infinite;*/
        /*-webkit-animation: marquee-row 30s infinite; !*Safari and Chrome*!*/
        animation-timing-function: linear;
        -webkit-animation-timing-function: linear; /* Safari and Chrome */
        position: absolute;
        top: 0;
        right: -100%;

    }

    .box-header .marquee-box {
        overflow: hidden;
        position: relative;
        top: 0;
        height: 100%;
        flex-grow: 1;
        margin-left: 363px;
        width: 100%;
        box-sizing: border-box;
    }

    .box-header .marquee-box div {
        flex-shrink: 0;

    }

    .box-header .head-contant {
        /*font-size: 22px;*/
        /*line-height: 36px;*/
        /*color: #fff;*/
        /*padding: 0 10px;*/
    }

    @keyframes marquee-row {
        from {
            right: -100%;
        }
        to {
            right: 0;
        }
    }

    @-webkit-keyframes marquee-row /*Safari and Chrome*/
    {
        from {
            right: -100%;
        }
        to {
            right: 0;
        }
    }

    @keyframes marquee {
        from {
            left: 0px;
        }
        to {
            left: -100%;
        }
    }

    @-webkit-keyframes marquee /*Safari and Chrome*/
    {
        from {
            left: 0px;
        }
        to {
            left: -100%;
        }
    }


</style>




