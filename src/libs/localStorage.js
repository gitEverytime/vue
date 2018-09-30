let DB = {}

DB.install = function (Vue) {
    let storage = window.localStorage

    Vue.prototype.$db = {}

    Vue.prototype.$db.setItem = (key, value) => {
        storage.setItem(key, JSON.stringify(value))
    }

    Vue.prototype.$db.getItem = (key) => {
        return JSON.parse(storage.getItem(key))
    }

    Vue.prototype.$db.removeItem = (key) => {
        storage.removeItem(key)
    }

    Vue.prototype.$db.clear = () => {
        storage.clear()
    }
}
module.exports = DB;
