var state = {
    //当前导航的索引的对象
    type:'',
    isUpdate:false,
    paremInfo:'',
    isScreenOk:false,
    curInfo:'',
    interactInfo:[],      //互动管理
    serviceInfo:[],       //服务人员
    actorInfo:[],         //艺人
    setAgentInfo:[],      //开设代理
    agentList:[],         //代理列表
    setStoreInfo:[],      //开设商户
    storeList:[],         //商户列表
    hrInfo:[],            //总平台艺人
    totalService:[],      //总平台服务人员
    tradeInfo:[],         //交易订单
    unFinished:[],        //未结订单
    settlementInfo:[],    //结算单（未结）
    unsettlementInfo:[]   //结算单（已结）
};


var getters = {
    getTypeInfo(state){
        return state.type;
    },
    getUpdate(state){
        return state.isUpdate;
    },
    getParemInfo(state){
        return state.paremInfo;
    },
    getInteractInfo(state){
        return state.interactInfo;
    },
    getServiceInfo(state){
        return state.serviceInfo;
    },
    getActorInfo(){
        return state.actorInfo;
    },
    getAgentInfo(){
        return state.setAgentInfo;
    },
    getAgentList(){
        return state.agentList;
    },
    getStoreMsg(){
        return state.setStoreInfo;
    },
    getStoreList(){
        return state.storeList;
    },
    getHrInfo(){
        return state.hrInfo;
    },
    getIsScreenOk(){
        return state.isScreenOk;
    },
    getCurInfo(){
        return state.curInfo;
    },
    getTotalService(){
        return state.totalService;
    },
    getTradeInfo(){
        return state.tradeInfo;
    },
    getUnFinished(){
        return state.unFinished;
    },
    getSettlementInfo(){
        return state.settlementInfo;
    },
    getUnsettlementInfo(){
        return state.unsettlementInfo;
    },

}

var actions = {}

var mutations = {
    setTypeInfo(state, data) {
        state.type = data;
    },
    setUpdate(state, data){
        state.isUpdate = data;
    },
    setParemInfo(state, data) {
        state.paremInfo = data;
    },
    setInteractInfo(state, data) {
        state.interactInfo = data;
    },
    setServiceInfo(state, data) {
        state.serviceInfo = data;
    },
    setActorInfo(state, data) {
        state.actorInfo = data;
    },
    setAgentInfo(state, data) {
        state.setAgentInfo = data;
    },
    setAgentList(state, data) {
        state.agentList = data;
    },
    setStoreMsg(state, data) {
        state.setStoreInfo = data;
    },
    setStoreList(state, data) {
        state.storeList = data;
    },
    setHrInfo(state, data) {
        state.hrInfo = data;
    },
    setIsScreenOk(state, data) {
        state.isScreenOk = data;
    },
    setCurInfo(state, data) {
        state.curInfo = data;
    },
    setTotalService(state, data) {
        state.totalService = data;
    },
    setTradeInfo(state, data) {
        state.tradeInfo = data;
    },
    setUnFinished(state, data) {
        state.unFinished = data;
    },
    setSettlementInfo(state, data) {
        state.settlementInfo = data;
    },
    setUnsettlementInfo(state, data) {
        state.unsettlementInfo = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}