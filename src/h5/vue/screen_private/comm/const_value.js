/*
 * @Author: jgg 
 * @Date: 2018-04-08 15:49:19 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-05-26 16:26:48
 * @Describe  常量
 */

import REQ from './request'

// const PROGRAM_TYPE = {0: "未定义", 1: "歌曲", 2: "舞蹈", 3: "吉他", 4: "DJ", 5: "二人转", 6: "小提琴", 7: "萨克斯", 8: "其他"}
const PROGRAM_TYPE = {1: "歌曲", 2: "舞蹈"}

const ON_SCREEN_TYPE = {1: "炫酷霸屏", 2: "重金霸屏", 3: "主题霸屏"}

const ON_SCREEN_COLOR = {1: "#86ff44", 2: "#fffc26", 3: "#30fdff"}

const ACTOR_TYPE = {0: "未定义", 1: "歌手", 2: "舞蹈", 3: "吉他手", 4: "DJ", 5: "MC", 6: "贝斯", 7: "鼓手", 8: "DMC", 9: "主持人", 10: "其他"}

class ConstValue {

    constructor() {
        this.FOLLOWSTATUS_UNFOLLOW = 0  // 未关注
        this.FOLLOWSTATUS_FOLLOW = 1    // 已关注
        this.FOLLOWSTATUS_FOLLOW_MUTUAL = 2  //互相关注

        // 交互类型
        this.INTERACTION_CHAT = '0'//发言
        this.INTERACTION_SONG = '1' // 节目，点歌
        this.INTERACTION_DANCE = '2' // 节目，点舞
        this.INTERACTION_ONSCREEN = '3' //霸屏
        this.INTERACTION_REDPACKET_ONE = '4' // 私人红包
        this.INTERACTION_REDPACKET_ALL = '5' // 全店红包
        this.INTERACTION_GIVE_GIFT = '6' // 礼物打赏
        this.INTERACTION_GIVE_REAL = '7' // 实物打赏
        this.INTERACTION_BM_HEART = '8' //霸麦真心话
        this.INTERACTION_BM_VOICE = '9' //霸麦好声音

        // 用户角色
        this.CLIENT_ROLE_CLIENT = '0' // 普通用户
        this.CLIENT_ROLE_ACTOR = '1' // 艺人
        this.CLIENT_ROLE_WAITER = '102' // 服务员
        this.CLIENT_ROLE_COOKER = '103' // 厨师
        this.CLIENT_ROLE_CASHIER = '104' // 收银员

        // 打赏图标
        this.REWARD_ICON_EAT = REQ.apiStaticDomain + '/static/img/new/eat.png'
        this.REWARD_ICON_DRINK = REQ.apiStaticDomain + '/static/img/new/drink.png'
        this.REWARD_ICON_RED = REQ.apiStaticDomain + '/static/img/new/red.png'

    }

    getAllProgramType() {
        return PROGRAM_TYPE;
    }

    getGrogramTypeNameByType(programType) {
        return PROGRAM_TYPE[Number(programType)];
    }

    getScreenType(type) {
        return ON_SCREEN_TYPE[Number(type)]
    }

    getScreenColor(type) {
        return ON_SCREEN_COLOR[Number(type)]
    }

    getActorType(type) {
        return ACTOR_TYPE[Number(type)]
    }
}


export default new ConstValue();
   
   
       
       




    
    
    
    
    