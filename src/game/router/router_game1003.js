
import VueRouter from 'vue-router'
import Main from '../vue/game1003/main.vue'
import Create from '../vue/game1003/create.vue'
import Prepare from '../vue/game1003/prepare.vue'
import SelectGroup from '../vue/game1003/selectGroup.vue'
import Rank from '../vue/game1003/rank.vue'
import Play from '../vue/game1003/play.vue'
import Result from '../vue/game1003/result.vue'

class MainScreenPrivate {
    constructor() {

        this.routerList = null;

        this.comRouter = null;

        this.initRouter();
    }


    initRouter() {
        this.routerList = [
            {path: '/', name: "Main", component: Main},
            {path: '/Create', name: "Create", component: Create},
            {path: '/Prepare', name: "Prepare", component: Prepare},
            {path: '/SelectGroup', name: "SelectGroup", component: SelectGroup},
            {path: '/Play', name: "Play", component: Play},
            {path: '/Rank', name: "Rank", component: Rank},
            {path: '/Result', name: "Result", component: Result},
        ];

        this.comRouter = new VueRouter({routes: this.routerList});
    }

    getRouter() {
        return this.comRouter;
    }
}

export default new MainScreenPrivate();

