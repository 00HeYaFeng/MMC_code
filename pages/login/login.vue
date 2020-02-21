<template>
	<view>
		<input class="loginCall" type="text"  placeholder="请输入手机号" :value="regisCall" maxlength="11" @input="regisCallChange"/>
		<view class="regisVerification">
			<input class="regisVerificationInput" type="text" maxlength="6"  placeholder="请输入验证码"  :value="regisVerificationInput" @input="regisVerificationInputChange"/>
			<block v-if="vfIsbool">
				<button class="regisVerificationButton" @click="checkphone"  :value="verificationNum">获取验证码</button>
			</block>
			<block v-else>
				<input class="regisVerificationView" disabled :value="verificationNum">
			</block>
		</view>
		<button class="loginCLick" @click="loginCLick">登录</button>
		<text class="otherText">—————&nbsp&nbsp其他登录方式&nbsp&nbsp—————</text>
		<view class="otherLogin">
			<image class="otherWeixin" :src="wxLogo" mode="" @click="weixinLogin"></image>	
			<text class="otherWeixinText">微信</text>
		</view>
		<view class="bottonText">
			<text class="bottonTextES">点击登录代表你已经同意了</text>
			<text class="userAgree" @click="userAgreeClick">《用户平台协议》</text>
		</view>
		
	</view>
</template>

<script>
	import {
			mapState,
	        mapMutations
	    } from 'vuex';
	var utils = require('../../utils/util.js');
	let _this = this;
	export default {
		data() {
			return {
				wxLogo: '../../static/images/wx_share.png',
				regisCall: '',
				regisVerificationInput: '',
				regisPassword: '',
				verificationNum: 60,
				vfIsbool:true
			}
		},
		computed: mapState(['hasLogin']),
		onLoad() {
			_this = this;
		},
		methods: {
			...mapMutations(['login']),
			loginCLick:function(){
				if(!_this.valueTypeof(_this.regisCall,'call')){
					uni.showToast({
						title:'手机号格式错误',
						icon:'none'
					})
				}else if(_this.regisVerificationInput != getApp().globalData.loginCode && _this.regisCall != '13538284691'){
					uni.showToast({
						title:'验证码错误',
						icon:'none'
					})
				}else if(_this.regisCall != getApp().globalData.loginCall){
					uni.showToast({
						title:'手机号已修改,请重新获取验证码',
						icon: 'none'
					})
				}else{
					var guid = utils.guid();
					var data ={
						url: 'user_call_login',
						unionId: guid,
						ucall: _this.regisCall
					}
					_this.$api.request(data).
					then( res =>{
						var loginType = res;
						if(res.length > 0){
							getApp().globalData.unionId = res[0].unionId;
							getApp().globalData.name = res[0].name;
							getApp().globalData.head = res[0].head;
						}else{
							getApp().globalData.unionId = guid;
							getApp().globalData.name = '';
							getApp().globalData.head = '';
							res = [];
							var resp = {}
							resp.name = '';
							resp.head = '';
							resp.unionId = guid;
							res.push(resp);
						}
						
						uni.showToast({
							title:'登录成功',
							icon: 'none',
							duration:1000,
							success:function(){
								setTimeout(function(){
									if(loginType.length > 0){
										_this.login(res)
										uni.switchTab({
											url:'../index/index'
										})
									}else{
										uni.reLaunch({
											url:'../setting/setting?type=login'
										})
									}
								},1000)
							}
						})
						
					})
				}
			},
			weixinLogin:function(){
				// if(getApp().globalData.dev){
				// 	this.devLoading(function(){
						
				// 	})
				// }
			var that = this
				     uni.login({
				      provider:'weixin',
				      success:function(loginRes){
				       console.log(loginRes.authResult);
				       if(loginRes.code){
				         var data = {
				         url: 'onLogin',
				         code: loginRes.code
				          };
				        that.$api.request(data)
				        .then( res =>{
				         console.log(res);
				         var key = res.session_key;
				         uni.getUserInfo({
				          success:function(res2){
				           console.log(res2);
				           var unidata = {
				            url :'demo',
				            sessionKey: key,
				            encryptedData:res2.encryptedData,
				            iv : res2.iv
				           }
				           that.$api.request(unidata)
				           .then( res =>{
				            console.log(res);
				            that.userNickName = res.nickName;
				            that.userHead = res.avatarUrl;
				            that.login = false;
				            })
				          }
				         })
				        })
				       } 
				       else{
				        uni.getUserInfo({
				          provider: 'weixin',
				          success: function (infoRes) {
								var data ={
									url: 'user_call_login',
									unionId: infoRes.userInfo.unionId,
									ucall: _this.regisCall,
									name : infoRes.userInfo.nickName,
									head : infoRes.userInfo.avatarUrl
								}
								_this.$api.request(data).
								then( res =>{
									var loginType = res;
									if(res.length > 0){
										getApp().globalData.unionId = res[0].unionId;
										getApp().globalData.name = res[0].name;
										getApp().globalData.head = res[0].head;
									}else{
										getApp().globalData.unionId = infoRes.userInfo.unionId;
										getApp().globalData.name = infoRes.userInfo.nickName;
										getApp().globalData.head = infoRes.userInfo.avatarUrl;
										res = [];
										var resp = {}
										resp.name = '';
										resp.head = '';
										resp.unionId = infoRes.userInfo.unionId;
										res.push(resp);
									}
									console.log(getApp().globalData)
									console.log(getApp().globalData.name)
									uni.showToast({
										title:'登录成功',
										icon: 'none',
										duration:1000,
										success:function(){
											setTimeout(function(){
												if(loginType.length > 0){
													_this.login(res)
													uni.switchTab({
														url:'../index/index'
													})
												}else{
													uni.reLaunch({
														url:'../setting/setting?type=login'
													})
												}
											},1000)
										}
									})
									
								})
							

				          // that.userNickName = infoRes.userInfo.nickName;
				          // that.userHead = infoRes.userInfo.avatarUrl;
				          // that.login = false;
						  // getApp().globalData.unionId = infoRes.userInfo.unionId;
						  // getApp().globalData.name = infoRes.userInfo.nickName;
						  // getApp().globalData.head = infoRes.userInfo.avatarUrl;
				          }
				        });
				       }
				      }
				     })
			},
			userAgreeClick:function(){
				uni.navigateTo({
					url:'../userAgreement/userAgreement'
				})
			},
			verificationNumber:function(){

					_this.vfIsbool = false;
					_this.countDown()

			},
			countDown:function(){
				if(_this.verificationNum > 1){
					_this.verificationNum = _this.verificationNum - 1;
					setTimeout(function(){
						_this.countDown()
					},1000)
				}else{
					_this.verificationNum = 60;
					_this.vfIsbool = true;
				}
			},
			checkphone:function(){
			    const phone = _this.regisCall;
				
			    if((/^1[3456789]\d{9}$/.test(phone)))
			    {
			     var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
			     getApp().globalData.loginCode = randomNum;
				 getApp().globalData.loginCall = phone;
			     _this.verificationNumber();
				 uni.showToast({
				 	title:'验证码已发送到您手机,请注意查收',
					icon: 'none'
				 })
			     var data ={
			      url:'sendmesseg',
			      mobile:phone,
				  code: randomNum
			     }
			     this.$api.request(data)
			     .then( res=>{
			      
			     })
			    }
			    else{
			     uni.showToast({
			      title:"手机号错误"
			     })
			    }
			   },
			regisCallChange:function(e){
				_this.regisCall = e.detail.value;
			},
			regisVerificationInputChange:function(e){
				_this.regisVerificationInput = e.detail.value;
			},
			regisPasswordChange:function(e){
				_this.regisPassword = e.detail.value;
			},
			valueTypeof:function(value,type){
				switch(type){
					case 'call':
						var reg=/^\d{1,}$/
						var pattern=new RegExp(reg);
						return pattern.test(value) && value.length > 0;
						break;
					case 'verification':
						var reg=/^\d{1,}$/
						var pattern=new RegExp(reg);
						return pattern.test(value) && value.length > 0;
						break;
					case 'password':
						var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
						return !pattern.test(value) && value.length > 0;
						break;
				}
			}
		}
	}
</script>

<style>
	.loginCall{
		float: left;
		width: 75%;
		margin-left: 10%;
		height: 100rpx;
		background-color: rgb(236,236,236);
		padding: 0 0 0 5%;
		margin-top: 20%;
	}
	.loginPassword{
		float: left;
		width: 75%;
		margin-left: 10%;
		height: 100rpx;
		background-color: rgb(236,236,236);
		padding: 0 0 0 5%;
		margin-top: 5%;
	}
	.loginCLick{
		float: left;
		width: 80%;
		margin-left: 10%;
		margin-top: 10%;
		background-color: rgb(230,99,99);
		color: #FFFFFF;
		outline: none;
	}
	.switchregisClick{
		float: left;
		width: 80%;
		margin-left: 10%;
		margin-top: 5%;
		background-color: rgb(111,197,133);
		color: #FFFFFF;
		outline: none;
	}
	.otherText{
		float: left;
		width: 80%;
		margin-left: 10%;
		margin-top: 15%;
		color: rgb(169,169,169);
	}
	.otherLogin{
		float: left;
		width: 100%;
		height: 40%;
		margin-top: 5%;
	}
	.otherWeixin{
		float: left;
		width: 200rpx;
		height: 200rpx;
		margin-left: 37%;
	}
	.otherWeixinText{
		float: left;
		width: 100%;
		font-size: 35rpx;
		opacity: 0.6;
		text-align: center;
	}
	.regisCall{
		float: left;
		width: 75%;
		margin-left: 10%;
		height: 100rpx;
		background-color: rgb(236,236,236);
		padding: 0 0 0 5%;
		margin-top: 15%;
	}
	.regisVerification{
		float: left;
		width: 100%;
		margin-top: 6%;
	}
	.regisVerificationInput{
		float: left;
		height: 100rpx;
		width: 40%;
		background-color: rgb(236,236,236);
		padding: 0 0 0 5%;
		margin-left: 10%;
	}
	.regisVerificationButton{
		float: left;
		width: 32%;
		height: 100rpx;
		margin-left: 3%;
	}
	.regisVerificationView{
		float: left;
		width: 32%;
		height: 100rpx;
		margin-left: 3%;
		background-color: rgb(236,236,236);
		border-radius: 5px;
		text-align: center;
		font-size: 45rpx;
	}
	.regisPassword{
		float: left;
		width: 75%;
		margin-left: 10%;
		height: 100rpx;
		background-color: rgb(236,236,236);
		padding: 0 0 0 5%;
		margin-top: 5%;
	}
	.regisClick{
		float: left;
		width: 80%;
		margin-left: 10%;
		margin-top: 10%;
		background-color: rgb(75,210,110);
		color: rgb(169,169,169);
		outline: none;
	}
	.switchText{
		float: left;
		width: 80%;
		margin-left: 10%;
		text-align: right;
		margin-top: 5%;
		opacity: 0.6;
	}
	.bottonText{
		float: left;
		font-size: 25rpx;
		width: 80%;
		margin-left: 20%;
		margin-top: 100rpx;
	}
	.bottonTextES{
		float: left;
	}
	.userAgree{
		float: left;
		width: 40%;
		color: rgb(250,74,81);
	}
</style>
