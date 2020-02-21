<template>
	<view>
		<block v-if="companyData">
			<view class="preview">
				<view class="previewHead">
					<image class="previewLogo" :src="newLogo" mode=""></image>
					<text class="previewHeadName">{{companyData.company_name}}</text>
				</view>
				<video class="previewVideo" :src="companyData.company_mediaAddress" controls   page-gesture="true" show-fullscreen-btn show-play-btn show-center-play-btn enable-progress-gesture vslide-gesture-in-fullscreen></video>
				<view class="previewText">
					<text class="previewName">业务范围</text>
					<text class="previewCenton">{{companyData.company_range}}</text>
					<text class="previewName">企业联系电话</text>
					<text class="previewCenton">{{companyData.company_call}}</text>
					<text class="previewName">企业联系邮箱</text>
					<text class="previewCenton">{{companyData.company_email}}</text>
					<text class="previewName">企业联系地址</text>
					<text class="previewCenton">{{companyData.company_address}}</text>
					<text class="previewName">企业发展历程</text>
					<text class="previewCenton">{{companyData.company_develop}}</text>
				</view>
				<button class="fixedButtonShare" @click="fixedButtonShare">分享</button>
			</view>
		</block>
		
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				newLogo: '../../static/images/newLogo.png',
				companyData:''
			}
		},
		onLoad() {
			_this = this;
			var data ={
				url: 'userCardCompany_select',
				unionId: getApp().globalData.unionId
			}
			_this.$api.request(data).
			then( res =>{
				res = res[0];
				var data ={
					url: 'media_select',
					unionId: getApp().globalData.unionId,
					mediaType: 'company'
				}
				_this.$api.request(data).
				then( resp =>{
					res.company_mediaAddress = resp[0].mediaAddress
					_this.companyData = res;
				})
			})
		},
		methods: {
			fixedButtonShare:function(){
				uni.showToast({
					title:'正在开发中,敬请期待',
					icon:'none'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: rgb(2,2,2);
	}
	.preview{
		float: left;
		width: 88%;
		margin-left: 6%;
	}
	.previewHead{
		float: left;
		color: #FFFFFF;
		width: 96%;
		margin-left: 2%;
	}
	.previewLogo{
		float: left;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
	}
	.previewHeadName{
		float: left;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 20rpx;
		font-size: 35rpx;
	}
	.previewVideo{
		float: left;
		width: 96%;
		height: 356.4rpx;
		margin-top: 10rpx;
		border-radius: 10rpx;
		margin-left: 2%;
	}
	.previewText{
		float: left;
		color: #FFFFFF;
		width: 100%;
		margin-top: 50rpx;
	}
	.previewName{
		float: left;
		width: 100%;
		margin-top: 40rpx;
	}
	.previewCenton{
		float: left;
		opacity: 0.6;
		border-bottom: 1rpx solid rgb(120,120,120);
		padding: 0 0 15rpx 0;
		margin-top: 10rpx;
		width: 100%;
	}
	.fixedButtonShare{
		position: fixed;
		bottom: 0;
		width: 30%;
		margin-left: 29%;
		margin-bottom: 50rpx;
		background-color: rgb(254,33,100);
		color: #FFFFFF;
		border-radius: 15rpx;
	}
</style>
