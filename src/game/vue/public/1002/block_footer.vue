<template>
    <div class="block_footer">
       <p>
           一次性抽取
           <select v-model="value" placeholder="请选择" @change="chooseNum" :disabled="active === '1'">
                <option
                        v-for="item in option"
                        :value ="item"
                >{{item}}</option>
           </select>
           人
           &nbsp;&nbsp;&nbsp;&nbsp;
           抽取
           <select v-model="level" placeholder="请选择" @change="chooseLevel" :disabled="active === '1'">
               <option
                       v-for="item in levelList"
                       :value ="item.id"
               >{{item.name}}</option>
           </select>
       </p>
        <button class="stopBtn"
                @click="awardBtn"
                :disabled="isChecked"
        >{{isBegin ? '停止抽奖/Enter' : '开始抽奖/Enter'}}</button>
    </div>
</template>

<script>
    import REQ   from "../../common/request.js";
    const roomInfo = window.GameInfo;
    console.log(roomInfo);
    export default {
        components:{},
        props:{
            userList:{
                type:Array
            },
            info:{
                type:Array
            }
        },
        data(){
            return{
                option:[],
                value:'',
                level:'1',
                isBegin:false,
                text:'开始抽奖/Enter',
                awardList:this.info,
                active:'2',
                isChange:false,
                isChecked:true,
                restList:[]
            }
        },
        watch:{
            info(val){
                this.awardList = val;
            },
            level(val){
                this.awardList.forEach((item,index) => {
                    if((index+1) === Number(val)) this.$store.commit('setAwardInfo',item)
                })
            }
        },
        mounted(){},
        computed:{
            levelList(){
                let vm = this;
                let lists = [];
                if(vm.awardList.length<1) return;
                vm.isChecked = false;
                vm.awardList.forEach((item,index) => {
                    lists.push({
                        id:index+1,
                        name:item.level
                    });
                });
                vm.isChange ? vm.secondCount() : vm.firstCount();
                return lists
            }
        },
        methods:{
            firstCount(){
                let vm = this;
                let count = Number(vm.awardList[0].count);
                if(count<0) return;
                for(let i=0; i<count; i++) {
                    vm.option.push(i + 1);
                }
                vm.value = vm.option[0];
            },
            secondCount(){
                let count = 0;
                this.option = [];
                this.awardList.forEach((item,index) => {
                    if(Number(this.level) === (index+1)){
                        count = Number(item.count);
                    }
                });
                if(count<1) return;
                for(let i=0; i<count; i++) {
                    this.option.push(i+1);
                }
                this.value = this.option[0];
            },
            awardBtn(){
                let vm = this;
                if(vm.restList.length>0){
                    vm.restList.forEach((item,key) => {
                        if((key+1) === Number(vm.level)){
                            // vm.option = [];
                            if(item.left<1){vm.$store.commit('setIsOver',true); return;}
                            // for(let i=0; i<item.left; i++) {
                            //     vm.option.push(i+1);
                            // }
                            vm.postPlayGame();
                        }
                    })
                }else{
                    vm.postPlayGame();
                }
            },
            postPlayGame(){
                let vm = this;
                vm.isBegin = !vm.isBegin;
                if(vm.isBegin){
                    vm.active = '1';
                    vm.$emit('setActive','1')
                }else{
                    vm.active = '2';
                    vm.$emit('setActive','2');
                    vm.playGame();
                }
            },
            playGame(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    gameIndex:roomInfo.gameIndex,
                    play:{
                        action:'lotto',
                        data:{
                            level:_this.level,
                            count:_this.value
                        }
                    }
                };
                REQ.reqGamePlay(posData,
                    function(result){
                        let winners = result.data.winners;
                        _this.restList = result.data.count;
                        winners.forEach((value) =>{
                            _this.awardList.forEach((item,index) => {
                                if((index+1) === Number(_this.level)){
                                    value['levelName'] = item.level;
                                    value['rewardDesc'] = item.rewardDesc;
                                }
                            });
                        });
                        _this.$emit('setWinners',winners);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            chooseLevel(obj){
                 this.isChange = true;
                 this.$store.commit('setIsOver',false);
            },
            chooseNum(obj){

            }
        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .block_footer{
        position: absolute;
        @include box-center(98%,50%);
        text-align: center;
        p{
            color: #cb5363;
            font-size: 20px;
        }
        select{
            width: 68px;
            height: 28px;
            background: rgba(203,83,99,1);
            border-radius: 8px;
            font-size: 13px;
            color: #FFFFFF;
            border: none !important;
            margin-bottom: 40px;
            &:focus{
                border: 0;
                outline: 0;
            }
        }
        .stopBtn{
            @include set-width-height(252px,72px);
            margin: 0 auto;
            background: url("http://static.ibigtop.com/static/img/public/game/btn_bg.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 72px;
            color: #FFFFFF;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            outline: 0;
        }
    }
</style>