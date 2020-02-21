<template>
	<view>
		<view class="setTop" @click="switchSetting">
			<image :src='userHead?userHead:userHeadImage' mode="" class="userHeadImage"></image>
			<text class="userName">{{userName}}</text>
		</view>
		<view class="myMake" @click="switchHtml" id="../myMake/myMake">
			<image :src='setMakeImage' mode="" class="playImg"></image>
		    <span style="margin-left:5%;float: left;" >我的制作</span>
		</view>
		<view class="myMake" @click="clickCard" id="../myMake/myMake">
			<image :src='setCardImage' mode="" class="playImg"></image>
		    <span style="margin-left:5%;float: left;" >我的影名片</span>
		</view>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				userHeadImage: '../../static/images/defaultHead.png',
				setMakeImage: '../../static/images/Card_make.png',
				setCardImage: '../../static/images/setCard.png',
				userHead: '',
				userName:''
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			var data ={
				url: 'user_select_nameAndHead',
				unionId: getApp().globalData.unionId
			}
			_this.$api.request(data).
			then( res =>{
				getApp().globalData.head = res[0].head;
				getApp().globalData.name = res[0].name;
				_this.userHead = res[0].head;
				_this.userName = res[0].name;
			})
			
		},
		methods: {
			clickCard:function(){
				uni.navigateTo({
					url:'../myCard/myCard'
				})
			},
			switchSetting:function(){
				uni.reLaunch({
					url:'../setting/setting'
				})
			},
			switchHtml:function(){
				uni.navigateTo({
					url:'../myMake/myMake'
				})
			}
		},
		
	}
</script>

<style>
	page{
		background-color: rgb(2,2,2);
	}
	.setTop{
		background-color: rgb(68,68,68);
		float: left;
		width: 100%;
		margin-bottom: 20rpx;
		margin-top: 50rpx;
	}
	.userHeadImage{
		float: left;
		width: 100rpx;
		height: 100rpx;
		border-radius: 140rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	.userName{
		float: left;
		color: #ffffff;
		height: 140rpx;
		line-height: 140rpx;
		font-size: 50rpx;
		margin-left: 35rpx;
	}
	.myMake{
	    height: 100rpx;
	    font-size: 30rpx;
	    line-height: 100rpx;
		background-color: rgb(68,68,68);
		color: #FFFFFF;
		margin-top: 15rpx;
		float: left;
		width: 100%;
	}
	.playImg{
		float: left;
		width: 50rpx;
		height: 50rpx;
		margin-left: 40rpx;
		margin-top: 25rpx;
	}
</style>
