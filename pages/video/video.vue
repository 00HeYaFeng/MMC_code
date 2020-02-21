<template>
	<view id="page">
		<!-- bar 和标题 -->
		<block v-if="appBool">
			<view class="top">
				<!-- <view class="bar_top"></view> -->
				<view class="bar">
					<!-- 后退按钮 -->
					<view style="wdith:20%;display:flex;align-items:center;height:100%;position: absolute;" @click="changpage">
						<image src="../../static/images/left.png" class="bar_img"> </image>
					</view>
					<view style="display:flex;align-items:center;width:100%;justify-content:center">
						<view class="bar_text">{{videoTitle?videoTitle: frist.title}}</view>
					</view>
				</view>
			</view>
		</block>

		<!-- 播放区 -->
		<view :id="classid">
			<view :class="box">
				<view :class="content2">
					<view class="video" @touchstart="touchstartTest" @touchend="touchendTest">
						<video :src="videoUrl?videoUrl:frist.media"  :class="[open?'':video, videoCss]"
						id="video"
						 autoplay="true" controls loop="true" page-gesture="true" show-fullscreen-btn show-play-btn show-center-play-btn enable-progress-gesture vslide-gesture-in-fullscreen
						 ></video>
						<!-- 播放页的数据    -->
						<view v-if="open">
							<!-- 遮罩层 -->
							<view class="mask" v-if="end&&!fullscreen"></view>
							<image class="replay" src="../../static/images/replay.png" v-if="end&&!fullscreen" @click="repalyvieo" data-id="main_video"></image>
							<view v-if="end&&!fullscreen" class="replay_text">重播</view>
							<button class="shareButton" id="frist.id" data-img="frist.cover" data-title="frist.title">
								<image class="wx_share2" src="../../static/images/wx_share2.png" v-if="end"></image>
							</button>
							<view v-if="end" class="wxshare_text">发送好友</view>
							<!-- open-type失效 -->
						</view>

					</view>
					<!-- 下方的菜单 -->
					<view class="down" v-if="open" style="display: block;">
						<view class="menu">
							<!-- 我要制作 -->
							<view style="width:25%" @click="switchMake">
								<image lazy-load='true' src="../../static/images/mark.png" class="camera"></image>
							</view>

							<view class="menu_common" style="min-width: 20%;">
								<view v-if="lover" style="display:flex;align-items: center;">
									<image lazy-load='true' src="../../static/images/noneheart.png" class="lover" @click="lovers"></image>
									点赞
								</view>

								<view v-else style="display:flex;align-items: center;">
									<image lazy-load='true' src="../../static/images/3323.png" class="lover" @click="lovers" image>
										{{count}}
								</view>
							</view>
							<view class="menu_common" @click="opencom">
								<image lazy-load='true' :src="localComment" class="comment"></image>
								<text style="padding-left: 15rpx;">评论</text>
							</view>

							<!-- open-type="share" -->
							<button class="videoButtonShare" data-img="frist.cover" data-title="frist.title" id="frist.id" @click="menuShare">
								<image lazy-load='true' src="../../static/images/wx_share.png" class="wx_share"></image>
							</button>
						</view>
					</view>
					<view v-if="!open">
						<view class="userinfo">
							<view class="userimg">
								<image :src="frist?frist.avatar:(videoHead?videoHead:defaultHead)" style="width:80rpx;height:80rpx;"></image>
							</view>
							<view class="username">
								{{frist?frist.username:videoName}}
							</view>
							<view class="label">
								其他
							</view>
						</view>
						<view class="detail">
							<view style="display:flex;width:100%; justify-content: space-between;">
								<view class="detail_common">
									<image class="Play_img" src="../../static/images/video.png"></image>
									1000
								</view>
								<!-- 点赞数 -->
								<view class="detail_common" v-if="lover">
									<image class="lover_img" src="../../static/images/noneheart.png" @click="lovers"></image>
									{{count}}
								</view>
								<view class="detail_common" v-else>
									<image class="lover_img" src="../../static/images/3323.png" @click="lovers"></image>
									{{count}}
								</view>
								<!-- 评论 -->
								<view class="detail_common" @click="popinput">
									<image class="lover_img" src="../../static/images/comment.png"></image>
									评论
								</view>
								<view >
									<button id="frist.id" data-img="frist.cover" data-title="frist.title" class="buttonVideoShare" @click="buttonVideoShare">
										分享
									</button>
								</view>
							</view>
						</view>
						 <!-- v-if="!ex && frist?frist.comments_total:'0' !=0"-->
						<view class="comment" v-for="(item,index) in comment_count" :key="index">
							<view class="item" v-if="frist.comments.list[index]">
	<!-- 							<view class="comment_head">
									<image :src="" mode=""></image>
								</view> -->
								<view class="name">
									<!-- {{frist.comments.list[0].name}} :
									 --> 
									 {{frist.comments.list[index].name}} 
								</view>
								<view class="comment_content">
									<!-- {{frist.comments.list[0].content}} -->
									{{frist.comments.list[index].content}}
								</view>
							</view>
						</view>
<!-- 						<view class="item" v-if="!ex && frist?frist.comments_total:'0' >1">
							<view class="name">
								{{frist.comments.list[1].name}} :
							</view>
							<view class="comment_content">
								{{frist.comments.list[1].content}}
							</view>
						</view> -->
						<view v-if="!ex && frist.comments_total> 2" class="expansion" @click="exComment">
							<view style="width: 100%;height: 100%;display:flex">
								<text class="expansion_text">
									全部{{frist.comments_total}}条评论
								</text>
								<image class="img" src="../../static/images/upslip.png"></image>
							</view>
						</view>
					</view>
					<!-- 展开的评论 -->
					<view v-else class="excom">
						<!-- 				    <view class="excom_item" v-if="frist.comments_total!=0" v-for="(item,index) in frist.comments.list" >
								<view class="excom_up">
								  <view class="ex_com_img_box">
									  <image  class="ex_com_img" :src="item.avatar"></image>
									</view> -->
						<!-- 用户名
<! 									<view class="ex_com_name_box"> 
										{{item.name}}
									</view>
								</view>
							</view>-->
					</view>
				</view>
			</view>

			<view v-if="!open">
				<view class="input_comment" v-if="!isinput">
					<textarea  type="text" focus=ture :value="input_value" placeholder="请输入评论内容" 
					adjust-position="false"
					@input="invalue"/>
					<view @click="postcomment()">
							<text>确定</text>
					</view>
				</view>
				<view class="input_mask"></view>
				<view v-if="!ex||isinput" class="recommed">
					<view class="tittle">
						<text>-更多推荐视频-</text>
					</view>
					<view>
						<view class="down_content">
							<view class="more" v-for="(item,index) in (page*4)" :key="index">
								<image :src="vdlist[index].cover" mode="center" class="recom_img"></image>
								<view class="mask" :id="vdlist[index].id" @click="toplay"></view>
								<!-- 暂停图标 -->
								<image src="../../static/images/pause.png" class="pause_img" :id="vdlist[index].id" @click="toplay"></image>
								<!-- /*播放时长*/ -->
								<view style="position: absolute;color: white;top: 82%;left: 70%;">
									{{vdlist[index].video_length}}
								</view>
								<!-- 标题 -->
								<view style="position: absolute;top: 1%;color: white;font-size: 29rpx;left: 3%;padding-right: 1%;">
									{{vdlist[index].title}}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
	</view>
	</view>
	<!--  <action-sheet v-if="!actionSheetHidden" bindchange="actionSheetbindchange">
   <view class="actionView">
    <view class="actionLeft" bindtap="actionStar">
      <image class="actionImg" src="../../static/images/start.png"></image>
      <text class="actionText">收藏</text>
    </view>
    <view class="actionRight" bindtap="actionReport">
      <image class="actionImg" src="../../static/images/report.png"></image>
      <text class="actionText">举报</text>
    </view>
   </view>
   <button class="actionButton" bindtap="actionForm">提交</button>
</action-sheet> -->
</template>

<script>
	// import uniPopup from "@/components/uni-popup/uni-popup.vue"
	let touchDotX = 0 //X按下时坐标
	let touchDotY = 0; //y按下时坐标
	let interval; //计时器
	let time = 0; //从按下到松开共多少时间*100
	export default {
		// components: {uniPopup},
		data() {
			return {
				title: 'Hello',
				end: false,
				/*是否播放完 */
				frist: {},
				/*存放数据 */
				/*详情页变量 */
				open: true,
				/*是否打开详情页 */
				ex: false,
				/*是否打开全部评论*/
				lover: true,
				/*是否点赞 */
				content: "", //输入框输入的内容
				input_value: "", //输入框的内容
				count: 1000, //模拟点赞的数量
				vdlist: [], //推荐数据存放
				fstop: false, //是否是第一次打开
				fullscreen: false,
				controls: false,
				classid: "player", //  page active
				box: "kz1", //box " kz1"
				content2: "kz2", //content "kz2"
				videoCss: "videoCss",
				actionSheetHidden: true,
				actionSheetItems: [],
				menu: '',
				commend: {},
				page: 1,
				jumpdate: [], //存放跳转数据
				sliderValue: 0, //播放的百分比
				videoUrl: '',
				videoTitle: '',
				videoImg: '',
				appBool: true,
				head: '../../static/images/head.png',
				localComment: '../../static/images/commentS.png',
				videoName: '',
				videoHead: '',
				defaultHead: '../../static/images/defaultHead.png',
				starttouch:0,
				isinput:true,
				comment_count:2,
				
			}
		},
		onReachBottom: function() {
			const _page = this.page
			const _vdlist = this.vdlist
			uni.showLoading({
				title: '加载中',
			})
			if (!this.open) {
				if ((_page + 1) * 4 > _vdlist.length) {
					this.recommend()
				}
				this.page = this.page + 1
			}
			setTimeout(function() {
				uni.hideLoading()
			}, 600)
		},
		onLoad(options) {
			// #ifdef APP-PLUS
			this.appBool = false;
			// #endif
			// #ifdef MP-WEIXIN
			this.appBool = false;
			// #endif
			if (options.jumpdate) {
				var _jump = JSON.parse(options.jumpdate)
				this.jumpdate = _jump;
			}
			if (options.videoUrl) {
				var videoUrl = options.videoUrl;
				var videoTitle = options.videoTitle;
				var videoImg = options.videoImg;
				var videoName = options.userName;
				var videoHead = options.userHead;
				this.videoUrl = videoUrl;
				this.videoTitle = videoTitle;
				this.videoImg = videoImg;
				this.videoName = videoName;
				this.videoHead = videoHead;
				uni.setNavigationBarTitle({
					title:videoTitle
				})
			} else {
				var videoUrl = '';
				var videoTitle = '';
				var videoImg = '';
			}
			//   console.log(options)
			//   /*获取播放页数据*/
			var data = {
				url: 'media_mediaDetail',
				media_id: options.id,
				start_comment_id: 0,
				action_type: 1,
				pagesize: 15
			}
			
			this.$api.vrequest(data)
				.then(res => {
					this.frist = res.data;
					this.count = res.data ? res.data.like : 0;
					this.videoUrl = videoUrl;
					uni.setNavigationBarTitle({
						title:res.data.title
					})
					if (options.jump) {
						this.open = true
						this.opencom()
						this.videoContext = uni.createVideoContext("main_video")
						let vd = res.data.video_length.split(":")
						let time = parseInt(vd[0] * 60) + parseInt(vd[1])
						console.log(_jump[_jump.length - 1], "seek1")
						let seektime = (_jump[_jump.length - 1].seek / 100) * time
						console.log(seektime)
						console.log((_jump[_jump.length - 1].seek / 100) * time)
						this.videoContext.seek(seektime)
						/*如果已经到了最上一层子级则清空跳转数据 */
						if ((_jump.length - 1) == 0) {
							this.jumpdate = []
						}
					}
				})
			this.recommend()
		},

		methods: {
			touchEnd: function(e) {
				console.log("出没结束");
				if (this.open) {
					let touchMoveX = e.detail.x;
					let touchMoveY = e.detail.y;
					let tmX = touchMoveX - touchDotX;
					let tmY = touchMoveY - touchDotY;
					if (time < 20) {
						let absX = Math.abs(tmX);
						let absY = Math.abs(tmY);
						if (absX > 2 * absY) {
							if (tmX < 0) {
								console.log("左滑=====")
							} else {
								console.log("右滑=====")
							}
						}
						if (absY > absX * 2 && tmY < 0) {
							console.log("上滑动=====")
							this.opencom();
						}
					}
					clearInterval(interval); // 清除setInterval
					time = 0;
				}
			},
			touchstartTest:function(e){
				if(this.open)
					this.starttouch = parseInt(e.mp.changedTouches[0].clientX);
			},
			touchendTest:function(e){
				let endtouch = parseInt(e.mp.changedTouches[0].clientX);
				Math.abs(this.starttouch - endtouch)
				if(Math.abs(this.starttouch - endtouch)>5 &&this.open) {
					// console.log(this.vd)
					// 每次从推荐数据中拿出一个来播放
					if(this.vdlist.length!=0){
						this.frist = this.vdlist.shift();
						this.starttouch = 0;
						this.lover = 0;
						let tittle = this.frist.title;
						var data = {
							url: 'media_mediaDetail',
							media_id: this.frist.id,
							start_comment_id: 0,
							action_type: 1,
							pagesize: 15
						}
						
						this.$api.vrequest(data)
							.then(res => {
								this.frist = res;
							})
						// 更改视屏的标题
						uni.setNavigationBarTitle({
						    title: `${tittle}`
						});
						// 如果拿完了就从新抓
						if(!this.vdlist.length)
							this.recommend();
					}
					else{
						uni.showModal({
							title: '网络错误',
							content: '网络开小差了，请稍后',
							showCancel:false,
							confirmText:'好的',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						this.recommend();
					}
				}
			},
			postcomment:function(){
				console.log(this.input_value);
				let data ={
					"name":"大大",
					"avatar":"http://ivyoss.i-weiying.com/c37c/avatar/20191019/2019101958b55ae1490e12d08415407f03a2baab1571496591670.png?auth_key=1582015095-0-0-b863aeecb21e0febe73a5492f2a7288e",
					"content":this.input_value,
				}
				this.frist.comments.list.push(data);
				this.frist.comments_total +=1;
				this.input_value ="";
				this.comment_count = this.frist.comments_total;
			},
			invalue:function(e){
				this.input_value = e.target.value;
			},
			exComment:function(){
				this.ex = !this.ex;
				this.isinput = !this.isinput;
				this.comment_count = this.frist.comments_total;
			},
			popinput:function(){
				if(this.ex)
					this.comment_count = 2;
				this.isinput = !this.isinput;
				this.ex = !this.ex;
			},
			switchMake:function(){
				uni.switchTab({
					url:'../makeI/makeI'
				})
			},
			menuShare:function(){
				if(getApp().globalData.dev){
					this.devLoading()
				}
			},
			buttonVideoShare:function(e){
				// if(getApp().globalData.dev){
				// 	this.devLoading()
				// }
				console.log(e);
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSenceTimeline",
				//     type: 2,
				//     imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				//     success: function (res) {
				//         console.log("success:" + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
				
			},
			// 打开详情页
			opencom: function() {
				this.classid = "active";
				console.log("进入opencom")
				if (this.open) {
					this.open = false
					this.classid = "active"
					this.box = "box"
					this.content2 = "content"
					this.videoCss = "video"
				} else {
					this.open = true
					this.classid = "player"
					this.box = "kz1"
					this.content2 = "kz2"
					this.videoCss = "videoCss"
				}
			},
			/*获取推荐视频 */
			recommend: function() {
				var data = {
					url: 'index_categoryList',
					type: 'recommend'
				}
				this.$api.vrequest(data)
					.then(res => {
						if (res.data == null)
							this.recommend()
						else
							this.vdlist = this.vdlist.concat(res.data)
					})
			},
			videoend: function() {
				this.end = true
			},
			// 点赞
			lovers: function() {
				// 如果未点赞
				if (!this.lover) {
					this.lover = true,
						this.count = parseInt(this.count) - 1
				}
				/*添加点赞的处理 */
				else {
					this.lover = false;
					this.count = parseInt(this.count) + 1
				}
			},

			// 播放页重新播放
			repalyvieo: function(e) {
				this.videoContext = uni.createVideoContext("main_video")
				this.videoContext.play() //开始播放
				this.end = false
			},
			changpage: function(e) {
				// 判断是否在详情页
				if (!this.open) {
					console.log("changepage");
					if (this.ex == true && parseInt(this.frist.comments_total) != 0) {
						console.log("收起评论区")
						this.ex = false
					} else {
						console.log("详情");
						// 跳转到播放页
						this.opencom();
					}
				} else {
					//播放页跳到首页页面 
					this.videoContext = uni.createVideoContext("main_video");
					this.videoContext.stop()
					console.log("我跳了")
					var jump = this.jumpdate;
					//没有父代数据跳到首页
					if (jump.length == 0 || jump.length >= 5) {
						console.log("没有父代数据跳到首页")
						this.jumpdate = [],
							uni.switchTab({
								url: '/pages/index/index',
								fail(res) {
									console.log(res);
								}
							})
					} else {
						let id = jump[jump.length - 1].id
						/*判断是否下一层是最顶部的子级，如果是则不抛出数据，留着给下个页面处理 */
						if ((jump.length - 1) != 0) jump.pop()
						console.log("you", id, jump)
						uni.navigateTo({
							url: `/pages/video/video?id=${id}&&jumpdate=${JSON.stringify(this.jumpdate)}&&jump=true`,
						});
					}
				}
			},
			toplay: function(event) {
				var id = event.target.id + '';
				//停止播放视频
				var videoContext = uni.createVideoContext("video")
				videoContext.pause()
				let _jump = {};
				const date = this.jumpdate;
				/*判断打开的视频是否超过五个 */
				if (date.length < 5) {
					const _id = this.frist.id
					_jump.id = _id; 
					_jump.seek = this.sliderValue; //存放已播放时长的百分比
					date.push(_jump);
					console.log(date)
					this.jumpdate = date
					console.log(JSON.stringify(this.jumpdate))
					/*打开一个新的视频 */
					console.log("tiao")
					uni.navigateTo({
						url: `/pages/video/video?id=${event.target.id}&&jumpdate=${JSON.stringify(this.jumpdate)}`,
					});
				} else {
					/*跳转到首页并打开播放页 */
					globalData.opentype = "true&" + event.target.id;
					uni.switchTab({
						url: `/pages/index/index`,
					})
				}
			},
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */


		// onLoad:function(){
		/*获取播放页数据*/
		// var data = {
		//   url: 'media_mediaDetail',
		//   media_id: options.id,
		//   start_comment_id: 0,
		//   action_type: 1,
		//   pagesize: 15
		// }
		// uni.request({
		//     url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
		//     data: data,
		//     header: {
		//         'custom-header': 'hello' //自定义请求头信息
		//     },
		//     success: (res) => {
		//         console.log(res.data);
		//         this.text = 'request success';
		//     }
		// });

		// }
		actionSheetTap: function() {
			this.actionSheetHidden = !this.actionSheetHidden
		},
		actionSheetbindchange: function() {
			this.actionSheetHidden = !this.actionSheetHidden
		},
		actionStar: function() {
			uni.showToast({
				title: '收藏成功',
			})
			this.menu = 1,
				this.actionSheetHidden = !this.data.actionSheetHidden;
		},
		actionReport: function() {
			uni.showToast({
				title: '举报成功',
			})
			this.menu = 1;
		},
		actionForm: function() {
			uni.showToast({
				title: '提交成功',
			})
			this.menu = 1;
			this.actionSheetHidden = !this.data.actionSheetHidden
		},

	}
</script>

<style>
	#player .videoCss {
		width: 100%;
		height: 100%;
	}

	#page {
		height: 100vh;
	}

	#page .top {
		height: 8%;
		position: fixed;
		width: 100%;
		z-index: 999;
	}

	#page .bar_top {
		width: 100%;
		height: 40%;
		background-color: rgba(0, 0, 0, 0.9);
	}

	#page .bar_img {
		width: 32rpx;
		height: 58%;
		margin-left: 15rpx;
		margin-right: 100rpx;
	}

	#page .bar {
		width: 100%;
		height: 60%;
		background-color: black;
		color: white;
		display: flex;
		position: relative;
	}

	#page .bar_text {
		align-items: center;
		font-size: 30rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	#player .playImg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		height: 200rpx;
	}

	#player {
		height: 100%;
		overflow: hidden;
	}

	#player .video {
		height: 90%;
		position: relative;
	}

	#player .down {
		height: 10%;
		color: white;
		font-size: 30rpx;
	}

	#player .menu {
		background-color: #000000;
		width: 100%;
		height: 100%;
	}

	#player .replay {
		position: fixed;
		top: 38%;
		left: 25%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		height: 200rpx;
		z-index: 2;
	}

	#player .mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.4);
		color: white;
		top: 0;
	}

	#player .slider {
		/* position: absolute;
  top: 98%;
  width: 100%;
  left: -4%;
  margin: 0;
  margin-left: 4%; */
		position: absolute;
		width: 100%;
		margin: 0;
		top: 98%;
	}

	#player .loadmore {
		position: absolute;
		top: 82%;
		left: 49%;
	}

	#player .replay_text {
		position: fixed;
		transform: translate(-50%, -50%);
		top: 48%;
		left: 24%;
		color: white;
		z-index: 2;
	}

	#player .wxshare_text {
		position: fixed;
		transform: translate(-50%, -50%);
		top: 48%;
		left: 75%;
		color: white;
		z-index: 2;
	}

	#player .wx_share2 {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		height: 200rpx;
		z-index: 2;
	}

	#player .upslip {
		transform: translate(-50%, -50%);
		width: 100rpx;
		height: 100rpx;
		z-index: 2;
	}

	#player .upslip_text {
		color: white;
		transform: translate(-50%, -70%);
		z-index: 2;
	}

	#player .menu>cover-image {
		display: inline-block;
		overflow: hidden;
	}

	#player .menu {
		display: flex;
	}

	#player .menu_common {
		display: flex;
		align-items: center;
		margin: 0 2%;
		width: 25%;
	}

	#player .menu .camera {
		width: 120rpx;
		height: 120rpx;
		margin: 4px 0 0 10px;
	}

	#player .menu .lover {
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
		margin: 0 20rpx;
	}

	#player .menu .comment {
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
		margin-left: 20rpx;
	}

	#player .menu .wx_share {
		width: 120rpx;
		height: 120rpx;
	}


	/*动画*/
	#active {
		position: absolute;
		width: 100%;
		/* animation:elastic 1s; */
	}

	@keyframes elastic { 
    0%{top:100%}
    50%{top:25%}
    100%{top:8%}
}
	#active .box {
		margin: 25rpx 0 25rpx 0;
		background-color: white;
		padding-bottom: 30rpx;
	}

	/* #active{
  height:100vh;
  background:#F0F0F0
} */
	#active .content {
		width: 85%;
		margin: 0 auto;
		padding-top: 25rpx;
		height: 100%;
	}

	#active .video {
		margin: 0 auto;
		width: 100%;
		height: 310rpx
	}

	#active .playImg {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		display: inline-block;
		left: 44%;
		top: 40%;
		z-index: 2;
	}

	#active .mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.4);
		color: white;
		top: 0;
	}

	#active .userinfo {
		width: 100%;
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		transition: all 300ms ease;
		border: none;
		margin: 0;
		height: 110rpx;
	}

	#active .userimg {
		overflow: hidden;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		max-width: 13%;
	}

	#active .username {
		margin-left: 2%;
		font-size: 28rpx;
		width: 50%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#active .label {
		background-color: #F5F6F8;
		width: 105rpx;
		height: 44rpx;
		margin-left: 20%;
		color: #8F9090;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 31rpx;

	}

	#active .detail {
		display: flex;
	}

	#active .detail .Play_img {
		width: 50rpx;
		height: 50rpx;
		margin: 10rpx;
	}

	#active .detail .Play_text {
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: 25rpx;
	}

	#active .detail_common {
		display: flex;
		align-items: center;
		font-size: 22rpx;
	}

	#active .detail_common:nth-child(1) {
		margin-left: 0rpx;
	}

	#active .detail .lover_img {
		width: 50rpx;
		height: 50rpx;
		margin: 10rpx;
	}

	#active .detail .share {
		width: 100rpx;
		border: 1rpx solid #9FD6B5;
		color: #9FD6B5;
		border-radius: 23rpx;
		height: 47rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 33rpx;

	}

	#active .comment {
		width: 100%;
		background-color: #F5F6F8;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 15rpx;
	}

	#active .comment .item .name {
		display: inline-block;
	}

	#active .comment .comment_content {
		color: #939393;
		display: inline-block;
		text-indent: 30rpx;
	}

	#active .comment .item {
		display: flex;
		padding: 14rpx;
		font-size: 28rpx;
	}

	#active  .expansion {
		border-block-start: 1px solid #E4E5E7;
	}
	#active  .expansion>view:first-child {
		border-block-start: 1px solid #E4E5E7;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#active  .expansion>view:first-child>image{
		width: 80rpx;
		height: 80rpx;
	}
	#active .comment .expansion_text {
		display: inline-block;
		line-height: 85%;
		padding-left: 15rpx;
		color: #F4395C;
		font-size: 30rpx;
	}

	#active .comment .img {
		width: 50rpx;
		height: 50rpx;
		padding-top: 12rpx;
	}

	/*下面的样式*/
	#active .recommed {
		width: 100%;
		height: 870rpx;
		background-color: white;
		border-top: 20rpx solid #F0F0F0;
	}

	#active .recom_img {
		width: 100%;
		height: 100%;
	}

	#active .pause_img {
		position: absolute;
		top: 40%;
		left: 35%;
		width: 80rpx;
		height: 80rpx;
	}

	#active .recommed .tittle {
		text-align: center;
		padding: 20rpx;
		color: #989898;
		font-size: 25rpx;
	}

	#active .recommed_video {
		width: 100%;
		height: 375rpx;
	}

	#active .player {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		display: inline-block;
		left: 35%;
		top: 36%;
		z-index: 0;
	}

	#active .more {
		display: inline-block;
		width: 40%;
		position: relative;
		margin-left: 16px;
		height: 400rpx;
		margin-bottom: 25rpx;

	}

	#active .more:nth-child(odd) {
		margin-left: 0;
	}

	#active .down_content {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	#active .excom {
		background-color: #F5F6F8;
		width: 100%;
		border-radius: 15rpx;
		margin-top: 15rpx;
	}

	#active .excom_item {
		height: 150rpx;
		width: 100%;
		border-block-end: 1rpx solid #E4E5E7;
	}

	#active .excom_up {
		height: 66%;
		display: flex;
	}

	#active .ex_com_img_box {
		margin: 17rpx;
		display: flex;
		align-items: center;
	}

	#active .ex_com_img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	#active .ex_com_name_box {
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}

	#active .excom_down {
		height: 34%;
		width: 100%;
		font-size: 21rpx;
	}

	#active .excom_reply {
		display: inline-block;
		float: right;
		margin-right: 32rpx;
	}

	#active .reply_box {
		width: 88rpx;
		height: 42rpx;
		background-color: white;
		color: #FE2465;
		display: flex;
		justify-content: center;
		font-size: 27rpx;
	}

	#active .excom_input_box {
		position: fixed;
		width: 100%;
		height: 7%;
		background-color: white;
		top: 93%;
		z-index: 2;
	}

	#active .excom_input_contet {
		width: 73%;
		display: flex;
		align-items: center;
	}

	#active .excom_input {

		display: inline-block;
		width: 100%;
		background-color: #EDEDED;
		margin: 0 0 0 60rpx;
		border-radius: 10rpx;
		height: 67rpx;
		padding-left: 25rpx;
		font-size: 30rpx;
	}

	.excom_input_btn {
		display: inline-block;
		margin-bottom: 19rpx;
		width: 80rpx;
		height: 50rpx;
		background-color: red;
	}

	#active .fk {
		display: flex;
		width: 114rpx;
		height: 47rpx;
		background-color: #FF2164;
		margin-left: 34rpx;
		border-radius: 14rpx;
		color: white;
		align-items: center;
		justify-content: center;
		padding-bottom: 4%;
		font-size: 30rpx;
	}

	#active .excom_cnt {
		display: inline-block;
		font-size: 30rpx;
		color: #7C7C7C;
		margin-left: 2%;
	}

	#player .videoButtonShare {
		height: 150rpx;
		background-color: black;
		border-radius: 10px;
		border: none;
		outline: none;
		-webkit-appearance: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		width: 25%;
		margin-top: 5rpx;
		background: none;
	}

	#player .kz1 {
		height: 100%;
	}

	#player .kz2 {
		height: 100%;
	}
	#active .input_comment{
		position: fixed;
		background-color: #30336b;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100vw;
		bottom: 40px;
		height: 6vh;
	}
	#active .input_comment>textarea  {
		background-color: white;
		font-size: 40rpx;
		height: 70%;

	}
	#active .input_comment>view{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #c7ecee;
		height: 80%;
		width: 13%;
		border-radius: 12%;

	}


	.actionView {
		float: left;
		width: 100%;
		height: 300rpx;
	}

	.actionLeft {
		float: left;
		width: 100rpx;
		height: 100rpx;
		margin-left: 15%;
		margin-top: 50rpx;
	}

	.actionRight {
		float: right;
		width: 100rpx;
		height: 100rpx;
		margin-right: 15%;
		margin-top: 50rpx;
	}

	.actionImg {
		float: left;
		width: 100rpx;
		height: 100rpx;
	}

	.actionText {
		float: left;
		width: 100%;
		text-align: center;
		font-size: 25rpx;
	}

	.actionButton {
		float: left;
		width: 25%;
		height: 70rpx;
		margin-left: 40%;
		background: rgb(255, 33, 100);
		color: white;
		margin-bottom: 100rpx;
		line-height: 70rpx;
	}

	.buttonVideoShare {
		width: 100rpx;
		border: 1rpx solid #9FD6B5;
		color: #9FD6B5;
		border-radius: 23rpx;
		height: 47rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25rpx;
		padding: 0;
		margin-top: 15rpx;
		background-color: white;
		margin-right: 0;

	}

	.shareButton {
		position: fixed;
		top: 38%;
		left: 75%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		height: 200rpx;
		z-index: 2;
		border: none;
		outline: none;
		-webkit-appearance: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		background: none;
	}

	button::after {
		border: 0;
	}
</style>
