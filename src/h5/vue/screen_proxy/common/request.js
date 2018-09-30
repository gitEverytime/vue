
import U from './util';

class Request {
    constructor() {
        this.apiCloudDomain = "http://cloud.ibigtop.com";
    }

    /***
     *平台管理员登录
     * */
    proxyLogin(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/sys/enter/login";
        var method = "post";
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /***
     *平台管理员登出
     * */
    proxyLogout(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/sys/enter/logout";
        var method = "post";
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /***
     *商户列表
     * */
    getStoreList(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/store/list";
        var method = "post";
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /***
     *开设商户
     * */
    addStore(data, cabSuccess, cabComplete, cabError) {
        var url = this.apiCloudDomain + "/admin/api/store/add";
        var method = "post";
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }
}

export default new Request();