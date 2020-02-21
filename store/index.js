import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        userName: "",
        userId:'',
        userHead:'',
        unionId:'',
    },
    mutations: {
        login(state, user) {
			console.log(user)
            state.name = user[0].name || '';
            state.hasLogin = true;
            state.head = user[0].head || '';
            state.unionId = user[0].unionId || '';
			uni.setStorage({
				key: 'userInfo',
				data: user
			})
        },
    }
})
export default store