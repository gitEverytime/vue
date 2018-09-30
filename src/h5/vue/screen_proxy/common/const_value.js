const STORE_TYPE = {1: "酒吧", 2: "餐吧", 3: "KTV", 4: "慢摇", 5: "火锅", 6: "小吃", 7: "面馆", 8: "商超", 9: "婚庆"}

class ConstValue {
    constructor() {
    }

    getStoreTypeName(type) {
        return STORE_TYPE[Number(type)]
    }
}

export default new ConstValue();
   
   
       
       




    
    
    
    
    