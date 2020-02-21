<template>
	<view class="">
		<block  v-for="(item,index) in video" :key="index">
		    <view class="main_body">
		      <view class="body_content">
				
		        <text class="myMakeText">{{item.title}}</text>
		        <view class="body_mp4" :id="index"  :style="{backgroundImage:'url(' + item.mediaCover + ')'}" @click="videoClick">
		        <image class="body_pause"src="../../static/images/pause.png"></image>
		        </view>
		        <view class="body_userinfo">
		          <view class="body_user">
					<image class="user_head" :src="item.head?item.head:defaultHead" ></image>
					<view class="user_name">{{item.name}}</view>
		          </view>
				 <view class="user_mediaType">
				 	{{item.mediaType=='person'?'个人视频':'企业视频'}}
				 </view>
<!-- 				 <view class="user_delete" @click="deletevideos(item.mediaId,item.title)">
						点击删除
				 </view> -->
		          <button class="indexButton" open-type="share" id="index">
		            <image  class="body_share" src="../../static/images/share.png"></image>
		          </button>
		        </view>
		      </view>
		    </view>
		  </block>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				video: [],
				defaultHead: '../../static/images/defaultHead.png',
			}
		},
		/**
		   * 生命周期函数--监听页面加载
		   */
		  onLoad: function (options) {
		    _this = this;
		    var data = {
				url:'media_select_all',
				unionId: getApp().globalData.unionId
		    }
		    _this.$api.request(data)
		    .then( res =>{
		      var array = [];
		      for(var i = res.length-1 ; i >= 0; i--){
		        array.push(res[i])
		      }
		     this.video = array
		    })
		  },
		methods: {
			videoClick:function(e){
				var data = this.video[e.currentTarget.id];
				var id = data.mediaAddress;
				var title = data.title;
				var img = data.mediaCover;
				var name = data.name;
				var head = data.head;
			    uni.navigateTo({
			      url: '../video/video?videoUrl=' + id + '&videoTitle=' + title + '&videoImg=' + img + '&userName=' + name + '&userHead=' + head,
			    })
			  },
			  deletevideos:function(...e){
				 var _this = this;
				 var id = e[0];
				  uni.showModal({
				      title: '提示',
				      content: `您是否要删除标题为${e[1]}的视频`,
				      success: function (res) {
				          if (res.confirm) {
							  const data = _this.video;
							  let index = 
							   [...data].some(function (item, index, array) {
									return item.mediaId == id?index:false;
								});
								_this.video.splice(index,1);
								console.log(_this.video);
				          } else if (res.cancel) {
				              console.log('用户点击取消');
				          }
				      }
				  });
			  },
		}
	}
</script>

<style>
	/* pages/myMake/myMake.wxss */
	page {
	  background: #eeeeee;
	  display: flex;
	  flex-direction: column;
	  justify-content: flex-start;
	}
	.myMakeView{
	  margin-top: 50rpx;
	  float: left;
	  width: 100%;
	  height: 20%;
	  text-align: center
	}
	.myMakeText{
	  float: left;
	  height: 50rpx;
	  width: 100%;
	  font-size: 33rpx;
	  overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
	  margin-left: 15rpx;
	  margin-top: 5rpx;
	  text-align: center;
	}
	.myMakeImg{
	  float: left;
	  width: 700rpx;
	  margin-left: 25rpx;
	  height: 390rpx;
	}
	.myMakeImgPause{
	  width: 120rpx;
	  height: 120rpx;
	  margin-top: 135rpx;
	  margin-left: 290rpx;
	}
	.main_body{
	  width: 750rpx;
	  height: 540rpx;
	  background-color:#FFFFFF; 
	  margin-top: 26rpx;
	}
	.body_content{
	  width:700rpx;
	  height: 95%;
	  margin-left: 25rpx;
	}
	.body_mp4{
		float: left;
		width:  700rpx;
		height: 393.75rpx;
		background-color: black;
		z-index: 1;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.body_pause{
	  width: 100rpx;
	  height: 100rpx;
	  z-index: 2;
	}
	.body_userinfo{
		width: 100%;
		height: 19%;
		margin-top: 10rpx;
		float: left;
		clear: both;
		display: flex;
		align-items: center;
	}
	.body_user{
		width: 37%;
		float: left;
	}
	.user_mediaType{
		width: 30%;
		float: left;
		font-size: 40rpx;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.user_delete{
		background-color: #c0392b;
		border-radius: 5%;
		width: 24%;
		display: flex;
		float: left;
		margin-top: 16rpx;
		font-size: 40rpx;
		color: white;
	}
	.user_head{
	  width: 64rpx;
	  height: 64rpx;
	  float: left;
	  border-radius: 36rpx;
	}
	.user_name{
	  color: #333333;
	  font-size: 24rpx;
	  margin-left: 9rpx;
	  margin-top: 4%;
	  float: left;
	  overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
	
	}
	.body_font{
	  width: 24rpx;
	  height: 9rpx;
	  margin-left: 9rpx;
	  float: left;
	  font-size: 24rpx;
	  
	
	}
	.body_button{
	  width: 16%;
	  float: left;
	  margin-top: 2%;
	  margin-left: 20rpx;
	}
	.body_share{
	  width: 106rpx;
	  height: 49rpx;
	  float: left;
	  margin-top: 10rpx;
	}
	.indexButton{
		background-color: white;
		outline: none;
		width: 20%;
		float: right;
	}

	button::after {
	  border: 0;
	}
</style>
