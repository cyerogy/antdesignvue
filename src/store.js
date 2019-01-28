import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadingdata: true, //控制数据加载中按钮
        token: '',
    },
    mutations: {
        //更改 Vuex 的 store 中的状态的唯一方法
        setToken(state, token) {
            state.token = token;
        },
        showLoading(state) {
            state.loadingdata = true
        },
        hideLoading(state) {
            state.loadingdata = false
        }
    },
    actions: {

    }
})