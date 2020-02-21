import Vue from 'vue'
import App from './App'
import store from './store'
import agriknow from './utils/agriknow.js'
import utils from './utils/util.js'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = new agriknow()
Vue.prototype.$utils = utils;
App.mpType = 'app'
Vue.prototype.loginshowModel = function(){
	if(!this.hasLogin){
	  uni.showModal({
		title:'提示',
		content:'检测到您未登录,请先登录',
		showCancel:false,
		confirmText:'点击登录',
		success:function(res){
			if(res.confirm){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	  })
		
	}
}
Vue.prototype.devLoading = function(cb){
	uni.showToast({
		title:'正在开发中,敬请期待',
		icon: 'none',
		success() {
			typeof cb == 'function' && cb('ok')
		}
	})
}
const app = new Vue({
	store,
    ...App
})
app.$mount()
