<template>
	<view>
		<!-- <van-tabs active="推荐"  @click="tabChange" animated swipeable sticky color="#F54B6A">
		  <van-tab title="推荐" name="推荐" @click.native="tabChange"></van-tab>
		  <van-tab title="英雄" name="英雄" @click.native="tabChange"></van-tab>
		  <van-tab title="教育" name="教育" @click.native="tabChange()"></van-tab>
		  <van-tab title="旅游" name="旅游" @click.native="tabChange()"></van-tab>
		  <van-tab title="人物" name="人物" @click.native="tabChange()"></van-tab>
		  <van-tab title="购物" name="购物" disabled></van-tab>
		</van-tabs> -->
		<view v-if="tabType"> 
			<image class="banner_left" src="../../static/images/refresh.png" @click="refreshs"> </image>
			<image class="banner_right" src="../../static/images/open.png" @click="test"> </image>
			<view  v-for="(item,index) in iwy" :key="index">
				 <view class="main_body">
					<view class="body_content">
						   <view class="body_mp4" :id="item.id" style="background-image:url()" @click="videoClick">
								<image :src = "item.cover" style="width: 100%;height: 100%;"></image>
								<image class="body_pause" src="../../static/images/pause.png"></image>
							</view>
							<view class="body_userinfo" style="margin-top: 3%;">
								<view class="body_user">
									 <image class="user_head" :src="item.avatar" ></image>
									  <view class="user_name">{{item.name}}</view>
								  </view>
								 <view class="body_button">
									  <image class="heart_icon" :id="'mediaLike_'+index" :src="item.good" @click="like" ></image>
									  <view class="body_font">{{item.like}}</view>
								 </view>
							    <view class="body_button"  @click="videoClick" :id="item.id">
								  <image class="comment_icon" src="../../static/images/comment.png"></image>
								  <view class="body_font">{{item.comments}}</view>
							    </view>
								<!-- open-type="share" -->
								<button class="indexButton" :data-description="item.description" :data-id="item.id" :data-img="item.cover" :data-title="item.title" id="index" @click="wxshare">
								  <image  class="body_share" src="../../static/images/share.png"></image>
								</button>
							</view>
					</view>
				 </view>
				 
			</view>
		</view>
	</view>
</template>

<script>
	import{
		mapState
	}from 'vuex';
	let _this;
	export default {
		computed: mapState(['hasLogin', 'userName']),
		data() {
			return {
				    noneheart: '../../static/images/noneheart.png',
				    blockheart: '../../static/images/3323.png',
				    avatarUrl: '../../static/user-unlogin.png',
				    userInfo: {},
				    logged: false,
				    takeSession: false,
				    requestResult: '',
				    msg: '17最强',
				    imgs: '/images/test.jpg',
				    arr: ['a', 'b', 'c', 'd'],
				    list: [{
				      name: 'yy',
				      sex: 'man',
				      age: 18
				    }, {
				      name: 'zws',
				      sex: 'woman',
				      age: 18
				    }, {
				      name: 'zyd',
				      sex: 'man',
				      age: 20
				    }],
				    login: true,
				    count: 0,
				    iwy: [],
				    tabType: true,
				    media:[],
				    active: '推荐'
			}
		},
		onLoad(){
			_this = this;
			this.indexInit()
		},
		onShow() {
			    //console.log("触发show", app.globalData);
			    // var date = globalData.opentype;
			    // date = globalData.opentype.split("&");
			    // if (date != "" && date[0] == "true") {
			    //   app.globalData.opentype = ""
			    //   uni.navigateTo({
			    //     url: `pages/video/video?id=${date[1]}`,
			    //   })
			    // }
		},
		  onReachBottom: function () {
		    var that = this;
		    uni.showLoading({
		      title: '加载中',
		    })
		    var tag = this.active;
		    this.getMediaData([], 1, tag, function (data) {
		      console.log(data);
		      uni.hideLoading();
		      var iwy = that.iwy;
		      iwy.push.apply(iwy, data);
		      that.iwy=iwy
		    })
		  },  
		methods: {
			test:function(){
				console.log(getApp().globalData);
				// getApp().globalData = "";
				uni.navigateTo({
					url:'../login/login'
				})
				getApp().globalData.unionId = res[0].unionId;
				getApp().globalData.name = res[0].name;
				getApp().globalData.head = res[0].head;
			},
			wxlogin:function(){
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
				           console.log(infoRes)
				              console.log('用户昵称为：' + infoRes.userInfo.nickName);
							  uni.showModal({
							      title: '提示',
							      content: `${infoRes.userInfo.nickName}`,
							      success: function (res) {
							          if (res.confirm) {
										  uni.showToast({
										      title: '标题',
										      duration: 2000,
											  image:`${infoRes.userInfo.avatarUrl}`
										  });
							              // console.log(infoRes.userInfo.avatarUrl);
							          } else if (res.cancel) {
							              console.log('用户点击取消');
							          }
							      }
							  });
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
			tabChange:function(e){
				uni.showLoading({
				  title: '加载中',
				})
				var tag = e.detail.name;
				
				this.getMediaData([], 1, tag, function (data) {
				  console.log(data);
				  uni.hideLoading();
				  _this.iwy = data;
				})
			},
			
			  //点赞函数
			  like: function (e) {
			    var that = this;
			    let data = this.iwy;
			    var num = e.currentTarget.id.split("_")[1];
			    // let filmid = data[num].id;
			    if (data[num].good == '../../static/images/noneheart.png') {//判断是否是未点赞状态
			      data[num].good = '../../static/images/3323.png'
			      data[num].heart++;//点赞数加一
			
			    } else {
			      data[num].good = '../../static/images/noneheart.png'
			      data[num].heart--;
			
			    }
			    that.iwy = data
			  },
				// 刷新
			    refreshs: function () {
			      var that = this;
			      uni.showLoading({
			        title: '加载中',
			      })
			      var tag = this.active;
			      this.getMediaData([], 1, tag, function (data) {
			        console.log(data);
			        uni.hideLoading();
			        _this.iwy =data
			      })
			    },
				indexTagsInit:function(cb){
				    // var data = {
				    //   url: 'request',
				    //   name: 'tags_init'
				    // }
				    // _this.$api.request(data)
				    // .then( res =>{
				    //   var bool;
				    //   if (res[0].tagsBool  == '0'){
				    //     bool = false
				    //   }else{
				    //     bool = true
				    //   }
				       typeof cb == 'function' && cb(false);
				    // })
				},
				indexInit: function (type) {
					uni.showLoading({
					  title: '加载中',
					})
				    var that = this;
				    this.getMediaData([],1,'推荐',function(data){
				      console.log(data);
				      uni.hideLoading();
					  _this.iwy = data;
					  if(!_this.hasLogin){
						  _this.loginshowModel();
					  }
					  
				    })
				  },
				  getMediaData: function (newarr,i,type,cb){
					 var _that = this;
					this.indexTagsInit(function(bool){
					  if(bool){
						var tabType =
						{
						  '推荐': '100',
						  '英雄': '101',
						  '教育': '102',
						  '旅游': '103',
						  '人物': '104',
						  '购物': 'shop'
						}
					  }else{
						var tabType =
						{
						  '推荐': '1',
						  '英雄': '48',
						  '教育': '54',
						  '旅游': '56',
						  '人物': '50',
						  '购物': 'shop'
						}
					  }
				    var data = {
				      url: 'index_categoryList',
				      type: 'recommend',
				      page: 1,
					  tags : tabType[type],
					  length : 5
				    }
				    var typeData;
				    
				   _this.$api.vrequest(data)
				      .then(res => {
				         let _data = res.data;
						  let _arr = [];
						  if (newarr.length < 1) {
							newarr = [];
						  }
						  if (!_data) {
							uni.hideLoading()
							uni.showToast({
							  title: '网络连接失败,请刷新一遍再试',
							  icon: 'none'
							})
						  } else {
							var length = _that.iwy.length + 3;
							for (var x = 0; x < _data.length; x++) {
							  _data[x].good = '../../static/images/noneheart.png'; //点赞图片
							  newarr.push(_data[x]);
							}
							for (var a = 0; a < newarr.length; a++) {
							  for (var b = a + 1; b < newarr.length; b++) {
								if (newarr[a].id == newarr[b].id) {
								  newarr.splice(b, 1);
								  b--;
								}
							  }
							}
							if (i > 10) {
							  console.log('error');
							  typeof cb == 'function' && cb(newarr);
							}
							  
							  else {
								console.log(_arr);
								typeof cb == 'function' && cb(newarr)
							  }
						  }
				      })
					  })
				  },
				openApp:function(){
				
					 if(getApp().globalData.dev){
					 	this.devLoading()
					 }else{
					 	console.log("openApp")
					 }
					
					
				},
				/*微信分享*/
				wxshare:function(e){
					// if(getApp().globalData.dev){
					// 	this.devLoading(function(){
							
					// 	})
					// }else{
						console.log(e);
						var data = e.currentTarget.dataset;
						uni.share({
						    provider: "weixin",
						    scene: "WXSenceTimeline",//"WXSceneSession",前朋友圈 后好友
						    type: 0,//前朋友圈 后好友
						    href: "https://sj.qq.com/myapp/detail.htm?apkName=com.xianghe.ivy",/*应用宝APP地址*/
						    title: data.title,
						    summary: data.description,
						    imageUrl: data.img,
						    success: function (res) {
						        console.log("success:" + JSON.stringify(res));
						    },
						    fail: function (err) {
						        console.log("fail:" + JSON.stringify(err));
						    }
						});
					// }
					
				},
				/*进入播放页*/
			  videoClick: function (e) {
				  var id = e.currentTarget.id;
					uni.navigateTo({
					  url: '../video/video?id=' + id,
					})
			  },
		},

	}
</script>

<style>
/**index.wxss**/

page {
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.userinfo, .uploader, .tunnel {
  margin-top: 40rpx;
  height: 140rpx;
  width: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 300ms ease;
}

.userinfo {
  padding-left: 120rpx;
}

.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
  background-size: cover;
  background-color: white;
}

.userinfo-avatar[size] {
  width: 100rpx;
}


.userinfo-avatar:after {
  border: none;
}

.userinfo-nickname {
  font-size: 32rpx;
  color: #007aff;
  background-color: white;
  background-size: cover;
  text-align: left;
  padding-left: 0;
  margin-left: 10px;
}

.userinfo-nickname::after {
  border: none;
}

.userinfo-nickname-wrapper {
  flex: 1;
}

.uploader, .tunnel {
  height: auto;
  padding: 0 0 0 40rpx;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.uploader-text, .tunnel-text {
  width: 100%;
  line-height: 52px;
  font-size: 34rpx;
  color: #007aff;
}

.uploader-container {
  width: 100%;
  height: 400rpx;
  padding: 20rpx 20rpx 20rpx 0;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.uploader-image {
  width: 100%;
  height: 360rpx;
}

.tunnel {
  padding: 0 0 0 40rpx;
}

.tunnel-text {
  position: relative;
  color: #222;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.tunnel-text:first-child {
  border-top: none;
}

.tunnel-switch {
  position: absolute;
  right: 20rpx;
  top: -2rpx;
}

.disable {
  color: #888;
}

.service {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: linear-gradient(#007aff, #0063ce);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-content: center;
  justify-content: center;
  transition: all 300ms ease;
}

.service-button {
  position: absolute;
  top: 40rpx;
}

.service:active {
  box-shadow: none;
}

.request-text {
  padding: 20rpx 0;
  font-size: 24rpx;
  line-height: 36rpx;
  word-break: break-all;
}
.box{
 width: 200rpx;
 height: 200rpx; 
 background: #96D142;
}
.child{
  width: 100rpx;
  height: 100rpx;
  background: black;
}
.banner_left{
  width:148rpx;
  height: 148rpx;
  position:fixed;
  top:0rpx;/*若有导航,改为80rpx*/
  left:0px;
  z-index: 99;
}
.banner_right{
  width:148rpx;
  height: 148rpx;
  position:fixed;
  top:0rpx; /*若有导航,改为80rpx*/
  right:0px;
  z-index: 99;
}
.main_body{
  width: 750rpx;
  height: 420rpx;
  background-color:#FFFFFF; 
  margin-top: 26rpx;
}
.body_content{
  margin-top:5%;
  width:90%;
  height: 95%;
  margin-left: 5%;
  
}
.body_mp4{
  width:  100%;
  height: 303rpx;
  background-color: black;
  z-index: 1;
  background-size: 100% 100%;

}
.body_pause{
  width: 100rpx;	
  height: 100rpx;
  z-index: 2;
  margin-left: 41%;
  margin-top: 97rpx;
  position: absolute;
  left: 0%;


}
.body_userinfo{
  width:100%;
  height: 85rpx;
  
}
.body_user{
  width: 40%;
  float: left;
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
  width: 50%;
  margin-left: 9rpx;
  margin-top: 4%;
  float: left;
  overflow: hidden;
    white-space: nowrap

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
.heart_icon{
  width: 41rpx;
  height: 36rpx;
  float: left;
}
.comment_icon{
  width: 37rpx;
  height: 38rpx;
  float: left;
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
  width:20%;
  margin-top: 5rpx;
}
button::after {
  border: 0;
}
.banner_image{
  float: left;
  width: 148rpx;
  height: 148rpx;
  margin-left: -10rpx;
  margin-top: -10rpx;
}
</style>
