
import U from '../common/util'

class Request {
    constructor() {
        this.apiGameDomain = "http://g.ibigtop.com";
        this.apiStaticDomain = "http://static.ibigtop.com";
    }

    /**
     * 创建游戏
     */
    createGame(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/game/create"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 开启场次
     */
    playGame(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/game/play"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 结束场次
     */
    termGame(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/term"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 抽取玩家
     */
    drawPlayer(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/1003/drawPlayer"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 设置类型
     */
    setQuestionType(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/1003/setQuestionType"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 下一问题
     */
    nextQuestion(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/1003/nextQuestion"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 排行榜
     */
    billboard(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/1003/billboard"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

    /**
     * 排行榜
     */
    playerJoin(data, cabSuccess, cabComplete, cabError) {
        const url = this.apiGameDomain + "/play/1003/playerJoin"
        const method = "post"
        U.request(method, url, data, cabSuccess, cabComplete, cabError)
    }

}

export default new Request();