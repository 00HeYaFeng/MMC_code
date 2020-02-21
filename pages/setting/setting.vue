<template>
	<view>
		<view class="settingHead">
			<view class="settingCeshiHead" @click="uploadHead">
				<text class="settingHeadText">头像</text>
				<block v-if="userHead == ''">
					<textarea class="settingHeadInput" value="" placeholder="点击设置头像" disabled  />
				</block>
				<block v-else>
					<image class="settingHeadImg" :src="userHead" mode=""></image>
				</block>
				<image class="backRightHead" :src="backRight" mode=""></image>
			</view>
		</view>
		<view class="settingName">
			<view class="settingCeshiName">
				<text class="settingNameText">昵称</text>
				<textarea class="settingNameInput" :value="userName" placeholder="点击修改昵称" @input="settingNameInput" maxlength="8"/>
				<image class="backRightName" :src="backRight" mode=""></image>
			</view>
		</view>
		
		<button class="computerSet" @click="computerClick">完成设置</button>
		<block v-if="isbool">
			<button class="loginOut">退出登录</button>
		</block>
	</view>
</template>

<script>
	let _this;;
	import {
	        mapMutations
	    } from 'vuex';
	export default {
		data() {
			return {
				userHead:'',
				userName: '',
				backRight: '../../static/images/go.png',
				isbool: false,
				
			}
		},
		onLoad:function(option) {
			_this = this;
			if(option.type == 'login'){
				_this.isbool = false
			}else{
				_this.isbool = false
			}
			_this.userHead =  getApp().globalData.head;
			_this.userName = getApp().globalData.name;
		},
		onBackPress() {
			return true
		},
		methods: {
			...mapMutations(['login']),
			settingNameInput:function(e){
				_this.userName = e.detail.value;
			},
			computerClick:function(){
				if(_this.userName.length > 0){
					if(_this.userHead){
						_this.computerSet()
					}else{
						uni.showModal({
							title:'温馨提示',
							content:'确定使用默认头像吗',
							success:function(res){
								if(res.confirm){
									_this.computerSet()
								}
							}
						})
					}
				}else{
					uni.showToast({
						title:'请填写昵称',
						icon:'none'
					})
				}
			},
			computerSet:function(){
				var data = {
					url: 'user_update_nameAndHead',
					unionId: getApp().globalData.unionId,
					name: _this.userName,
					head: _this.userHead
				}
				_this.$api.request(data).
				then( res =>{
					var resp = {
						name: _this.userName,
						head: _this.userHead,
						unionId: getApp().globalData.unionId
					}
					var res = [];
					res.push(resp);
					_this.login(res)
					uni.switchTab({
						url:'../index/index'
					})
				})
			},
			uploadHead:function(){
				
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					sourceType: ['album'],
					success:function(res){
						var tempFilePaths = res.tempFilePaths[0];
						uni.showLoading({
							title:'上传中'
						})
						uni.uploadFile({
							url:'https://youfu.iaun.co/ivy/upload.php',
							filePath: tempFilePaths,
							name: 'fileData',
							formData:{
								'guid' : 'ceshi'
							},
							success:(resp) =>{
								_this.userHead = resp.data,
								uni.hideLoading();
								uni.showToast({
									title:'上传成功',
									icon: 'none'
								})
							},
						})
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: rgb(234,234,234);
	}
	.settingHead{
		float: left;
		width: 100%;
		height: 200rpx;
		margin-top: 50rpx;
		background-color: #FFFFFF;
	}
	.settingCeshiHead{
		width: 92%;
		margin-left: 4%;
		border-bottom: 1px solid rgb(232,232,232);
		float: left;
		margin-top: -1rpx;
	}
	.settingCeshiName{
		width: 92%;
		margin-left: 4%;
		border-bottom: 1px solid rgb(232,232,232);
		float: left;
	}
	.settingHeadText{
		float: left;
		height: 200rpx;
		line-height: 200rpx;
		font-size: 40rpx;
	}
	.settingHeadInput{
		float: left;
		height: 50rpx;
		margin-top: 85rpx;
		text-align: right;
		margin-left: 27rpx;
		width: 75%;
	}
	.settingHeadImg{
		float: left;
		width: 100rpx;
		height: 100rpx;
		margin-left: 65%;
		margin-top: 50rpx;
		border-radius: 60rpx;
	}
	.settingName{
		float: left;
		width: 100%;
		height: 150rpx;
		background-color: #FFFFFF;
	}
	.settingNameText{
		float: left;
		height: 150rpx;
		line-height: 150rpx;
		font-size: 40rpx;
	}
	.settingNameInput{
		float: left;
		height: 50rpx;
		margin-top: 55rpx;
		text-align: right;
		margin-left: 27rpx;
		width: 75%;
	}
	.loginOut{
		float: left;
	}
	.computerSet{
		float: left;
		margin-left: 30%;
		width: 40%;
		margin-top: 40%;
		background-color: rgb(245,57,92);
		color: #FFFFFF;
	}
	.backRightHead{
		width: 27rpx;
		height: 60rpx;
		float: right;
		margin-top: 70rpx;
		opacity: 0.7;
	}
	.backRightName{
		width: 27rpx;
		height: 60rpx;
		float: right;
		margin-top: 45rpx;
		opacity: 0.7;
	}
</style>
