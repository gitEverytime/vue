

var state = {
    programList:[]
}


var getters = {

    getProgramList(state){
        return state.programList;
    }

}

var actions = {
    
}

var mutations = {
    addProgram(state, data){
        state.programList.push(data);
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}