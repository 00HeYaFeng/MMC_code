<template>
	<view class="makeView" >
	  <image src="/static/images/makePhoto.png" class="makeImage"></image>
	  <text class="makeText">做影集</text>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			uni.navigateTo({
				url:'../myCard/myCard?url=true'
			})
		},
		methods: {
			makeVideo: function () {
				if(!getApp().globalData.dev){
					_this.devLoading(function(){
						
					})
					// uni.showActionSheet({
					// 	title: '选择上传类型',
					// 	itemList: ['拍摄','从相册中选择'],
					// 	success: (res) => {
					// 		this.chooseVideo(res.tapIndex)
					// 	}
					// })
					
				}else{
					this.chooseVideo(0)
				}
				
			     
			    
			 },
			  chooseVideo(type){
				  if(type != 0){
					  var photo = ['album']
				  }else{
					  var photo = ['camera'];
				  }
				  uni.chooseVideo({
				    sourceType: ['album','camera'],
				    compressed: true,
				    maxDuration: 25,
				    camera: 'back',
				    success: function (res) {
				      if (res.duration < 26){
				        var type = 'false';
						var ceshi = [];
						ceshi.push(res.tempFilePath);
				        uni.navigateTo({
				          url: '../make/make?url=' + JSON.stringify(ceshi) + '&img=' + res.thumbTempFilePath + '&type=' + type,
				        })
				      }else{
				        uni.showToast({
				          title: '最多上传25秒的视频',
				          icon: 'none'
				        })
				      }
				     
				    },
				  })
			  },
		}
	}
</script>

<style scoped>
	.makeView{
	  border-radius: 15rpx;
	  margin-left: 5%;
	  float: left;
	  width: 90%;
	  height: 500rpx;
	  background: rgb(248,248,248);
	  margin-top: 10%;
	}
	.makeImage{
	  float: left;
	  width: 75rpx;
	  height: 75rpx;
	  margin-left: 45%;
	  margin-top:25%; 
	}
	.makeText{
	  float: left;
	  width: 100%;
	  margin-top: 30rpx;
	  font-size: 50rpx;
	  text-align: center;
	}
	.actionButton{
	  float: left;
	  width: 100rpx;
	  height: 30rpx;
	  color: white;
	  background: rgb(255,33,100);
	}
	.upload_body{
	   width: 100%;
	   height: 50%;
	   float: left;
	}
	.upload_photo{
	  width: 20%;
	  height: 100%;
	  line-height: 100%;
	  margin: 0 auto;
	  float: left;
	
	}
	.upload_bigfont{
	  width: 80%;
	  height: 30%;
	  font-size: 30rpx;
	  float: left;
	  line-height: 100%;
	  margin-top: 5%;
	  text-align: left;
	}
	.upload_smallfont{
	  width: 80%;
	  height: 30%;
	  font-size: 27rpx;
	  color: #E9E9E9;
	  float: left;
	  text-align: left;
	}
	.actionItem{
	  float: left;
	  width: 100%;
	}
	.makeBottom{
	  float: left;
	  width: 100%;
	  height:140rpx;
	  background: rgb(247,247,247);
	}
	.makeText{
	  float: left;
	  width: 100%;
	  text-align: center;
	  margin-top: 23rpx;
	  font-size: 30rpx;
	}
	.makeBottom button{
	  float: left;
	  width: 30%;
	  height: 60rpx;
	  color: white;
	  background: rgb(255,33,100);
	  margin-left: 35%;
	  margin-top: 45rpx;
	  font-size: 25rpx;
	  border-radius: 30rpx;
	  line-height: 60rpx;
	}
</style>
