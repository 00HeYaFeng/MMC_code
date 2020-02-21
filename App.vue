<script>
	import {
	       mapMutations
	   } from 'vuex';
	let _this = this;
	export default {
		methods:{
			...mapMutations(['login'])
		},
		globalData:{
			unionId: '',
			dev: true,
			loginCode:'',
			loginCall:'',
			name: '',
			head: ''
		},
		onLaunch: function() {
			let userInfo = uni.getStorageInfoSync('userInfo') || '';
		
				uni.getStorage({
					key: 'userInfo',
					success:(res) =>{
						// this.userId = res.data.mpWXID?res.data.mpWXID:res.data.appWXID;
						// this.unionId = res.data.unionId;
						// this.userNickName = res.data.name;
						// this.userHead = res.data.head;
						// this.login = true;
						console.log(res.data);
						this.globalData.unionId = res.data[0].unionId;
						this.globalData.name = res.data[0].name;
						this.globalData.head = res.data[0].head;
						this.login(res.data)
					}
				})
			
			//console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "/wxcomponents/vant/dist/cell/index.wxss";
	@import "/wxcomponents/vant/dist/switch/index.wxss"; */
	@import "/wxcomponents/vant/dist/button/index.wxss";
	@import "/wxcomponents/vant/dist/tabs/index.wxss";
	@import "/wxcomponents/vant/dist/tab/index.wxss";
</style>
