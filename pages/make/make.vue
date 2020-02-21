<template>
	<view class="upload_mainbody">
	    <view class="upload_head">
	        <view class="upload_title">标题</view>
	        <view class="upload_fontsize">{{content.length}}/15</view>
	    </view>
	    <textarea  type="text" class="upload_content" placeholder="请填写标题内容"  id="upload_content" @input="updateContent"></textarea>
	    <view class="upload_bottombody">
	            <!-- <block v-if="!addFiles">
	              <view @longtap="imageDelete" id="index" @click="handleImagePreview" class="upload_file_body" style="background-repeat:no-repeat;background-size:100% 100%;-moz-background-size:100% 100%;background-image:url(uploadlist[0].url)">
	                  <view class="upload_file_page"></view>
	              </view>
	            </block> -->
	            <block >
	              <view class="makeVideo" @longtap="imageDelete" id="index">
	                <video  id='myvideo' class="makeVideoS" :src='videoUrl' autoplay="true" controls loop="true" page-gesture="true" show-fullscreen-btn show-play-btn show-center-play-btn enable-progress-gesture vslide-gesture-in-fullscreen>
	                  
	                </video>
	              </view>
	              
	            </block>
	

	        <view v-if="addFiles" class="upload_file_body" @click="makeVideo" style="background-color:white">
	            <view class="upload_file_plus">添加视频</view>
	            <image class="upload_file_image" src="/static/images/plus.png"></image>
	            <view class="upload_file_count">{{uploadlist.length}}/1</view>
	        </view>
	    </view>
	    <view class="under_make" @click="filesUpload">提交制作</view>
	</view>

</template>

<script>
	var utils = require('../../utils/util.js');
	let _this;
	export default {
		data() {
			return {
				menu: '',
				under: false,
				uploadlist: [],
				video: {},
				fullScreen: true,
				requestImg: [],
				content: '',
				addFiles: true,
				type: false,
				videoUrl: '',
				company: ''
			}
		},
		onLoad: function (options) {
		    //wx.hideTabBar();
		    _this = this;
		    var arr = [];
		    var url = JSON.parse(options.url);
		    var img = options.img;
			if(options.switch){
				_this.company = options.switch;
			}
			 for (var i = 0; i < url.length; i++) {
			   var ceshi = {};
			   ceshi.url = url[i];
			   ceshi.img = img;
			   ceshi.type = options.type;
			   arr.push(ceshi);
			 }
		    if (url[0].substr(url[0].length - 3, 3) == 'mp4') {
			  this.addFiles = false;
		    }
			console.log(arr[0])
			this.uploadlist = arr;
			this.videoUrl = url[0];
			//_this.poster = options.img
		  },
		methods: {
			  filesUpload: function () {
			    var test = false;
			    if (test) {
			      uni.showToast({
			        title: '正在开发中',
			        icon: 'none'
			      })
			    } else {
			
			
			      var that = this;
			      if (that.content.length == 0) {
			        uni.showToast({
			          title: '请填写标题内容',
			          icon: 'none'
			        })
			      }else if(that.content.length >15){
			        uni.showToast({
			          title: '标题最多15个字哦',
			          icon: 'none'
			        })
			      }
			       else {
					   // #ifdef MP-WEIXIN
					   
			//         uni.requestSubscribeMessage({
			//           tmplIds: ['sQVG9zv8C4VKoHViXAn8QgDRCG8XHV0YVumXdS3Xukg'],
			//           success(res) {
			//             if (res.errMsg = 'requestSubscribeMessage:ok') {
			//               if (res.sQVG9zv8C4VKoHViXAn8QgDRCG8XHV0YVumXdS3Xukg == "accept") {
			
			//                 uni.showLoading({
			//                   title: '制作中,请稍后',
			// 				  mask: true
			//                 })
			//                 var arr = that.uploadlist;
			//                 var guid = utils.guid();
			//                 that.uploadDIY(arr, 0, 0, 0, arr.length, guid)
			//               } else {
			//                 uni.showToast({
			//                   title: '请订阅此消息',
			//                   icon: 'none'
			//                 })
			//               }
			
			//             }
			//           },
			// 		  fail(err){
			// 			  console.error(err);
			// 		  }
			//         })
					//#endif
			
					uni.showLoading({
					  title: '制作中,请稍后',
					  mask: true
					})
					var arr = that.uploadlist;
					var guid = utils.guid();
					that.uploadDIY(arr, 0, 0, 0, arr.length, guid)
			
			      }
			    }
			  },
			  /**
			     * 文件上传接口
			     * 郭润棋
			     * 2019-12-5
			     */
			    uploadDIY(filePaths, successUp, failUp, i, length, guid) {
			      var imageFiles;
			      var that = this;
			      var url = '';
			      if (filePaths[i].url) {
			        url = filePaths[i].url;
			      } else {
			        url = filePaths[i].img;
			      }
			      uni.uploadFile({
			        url: 'https://youfu.iaun.co/ivy/upload.php',
			        filePath: url,
			        name: 'fileData',
			        formData: {
			          'guid': guid,
			        },
			        success: (resp) => {
			          successUp++;
			          var img = that.requestImg;
			          img.push(resp.data)
					  this.requestImg = img;
			          console.log(resp)
			        },
			        fail: (res) => {
			          failUp++;
			        },
			        complete: () => {
			          i++;
			          if (i == length) {
			            var guid = utils.guid();
			                    var headGuid = utils.guid();
			                    var imageUrl = 'https://test.i-weiying.com/files/image/faceimg/' + headGuid + '.png';
			                    var makeData = {
			                      url: 'test',
			                      imgUrl: that.requestImg,
			                      guid: guid,
			                      head: headGuid,
			                      title: that.content,
			                    }
			                    _this.$api.yrequest(makeData)
			                      .then(res => {
			                        console.log(res);
									
			                        var data = {
										url: 'media_make',
										unionId: getApp().globalData.unionId,
										title: that.content,
										mediaId: utils.guid(),
										mediaAddress: 'https://test.i-weiying.com/files/video/deal/' + guid + '.mp4',
										mediaCover: imageUrl
			                        }
									if(!_this.company){
										data.mediaType = 'person';
									}else{
										data.mediaType = 'company';
									}
			                        _this.$api.request(data)
			                          .then(res => {
			                            console.log(res);
			                            uni.hideLoading();
			                            uni.showToast({
			                              title: '制作完成',
			                              icon: 'none',
			                              duration: 1500,
			                              success:function(){
			                                setTimeout(function(){
			                                  uni.redirectTo({
			                                    url: '../myCard/myCard',
			                                  })
			                                },1500)
			                              }
			                            })
			                      })
			                  })
			          }
			          else {  //递归调用uploadDIY函数
			            that.uploadDIY(filePaths, successUp, failUp, i, length, guid);
			          }
			        },
			      });
			    },
				 updateContent: function (e) {
					this.content = e.detail.value;
				  },
				makeVideo: function () {
					uni.showActionSheet({
						title: '选择上传类型',
						itemList: ['拍摄','从相册中选择'],
						success: (res) => {
							this.chooseVideo(res.tapIndex)
						}
					})
				     
				    
				 },
			    chooseVideo: function (type) {
			      if (this.uploadlist.length != 0) {
			        uni.showToast({
			          title: '最多上传一个视频',
			          icon: 'none'
			        })
			      } else {
			        if(type != 0){
			        	var photo = ['album'];
			        }else{
			        	var photo = ['camera'];
			        }
			        uni.chooseVideo({
			          sourceType: ['album','camera'],
			          compressed: true,
			          maxDuration: 15,
			          camera: 'back',
			          success: function (res) {
			            var ceshi = {};
			            ceshi.url = res.tempFilePath;
			            ceshi.img = res.thumbTempFilePath;
			            ceshi.type = 'false';
			            files.push(ceshi);
						this.uploadlist = files;
						this.addFiles = false;
			          }
			        })
			      }
			    },
			    handleImagePreview: function (e) {
			      var that = this;
			      var files = that.uploadlist;
			      var arr = [];
			      for (var i = 0; i < files.length; i++) {
			        if (files[i].url.substr(files[i].url.length - 3, 3) != 'mp4') {
			          arr.push(files[i].url);
			        }
			      }
			      uni.previewImage({
			        current: files[e.target.id].url,
			        urls: arr,
			      })
			    },
			    imageDelete: function (e) {
			      var that = this;
			      var files = that.uploadlist;
			      uni.showModal({
			        content: '确定要删除吗',
			        success: function (res) {
			          if (res.confirm) {
			            files.splice(e.target.id, 1);
			            if (files.length == 0) {
			              var addFiles = true;
			            } else {
			              var addFiles = false
			            }
						this.uploadlist = files;
						this.addFiles = addFiles;
			          } else {
			            console.log('点击取消')
			          }
			        }
			      })
			  
			    },
		}
	}
</script>

<style>
	page {
	  background: #F3F3F3;/*上传后的页面背景颜色*/
	  /*background: #656565;上传前的页面背景颜色*/
	 }
	 textarea{
	   color: #9A9A9A;
	 }
	 /*上传前的页面样式*/
	 .under_button{
	   bottom: 0rpx;
	  position: fixed;
	  width:100%;
	  height: 500rpx;
	  border-radius:20rpx 20rpx 0rpx 0rpx;  
	  background: #FFFFFF;
	  display: block;
	 }
	 .under_upload{
	   width: 100%;
	   height: 60%;
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
	 }
	  .upload_smallfont{
	   width: 80%;
	    height: 30%;
	    font-size: 27rpx;
	    color: #E9E9E9;
	    float: left;
	 }
	 .under_cancelandmake{
	   width: 100%;
	   height: 40%;
	   background-color: #F7F7F7;
	 }
	 .under_cancel{
	    width: 100%;
	    height: 76rpx;
	    text-align: center;
	    line-height: 76rpx;
	    font-size: 32rpx;
	 }
	/*上传后的页面样式*/
	 .upload_mainbody{
	   margin: 50rpx;
	   display: block;
	   float: left;
	 }
	 .upload_head{
	  width: 94%;
	  height: 100rpx;
	line-height: 100rpx;
	margin-left: 3%;
	
	
	 }
	 .upload_title{
	   float: left;
	  width: 20%;
	  height: 100%;
	  font-size: 50rpx;
	
	 }
	 .upload_fontsize{
	   height: 80%;
	  margin-top: 2%;
	  font-size: 30rpx;
	  color: #9A9A9A;
	  width: 20%;
	  float: left;
	
	 }
	 .upload_content{
	  width: 628rpx;
	height: 300rpx;
	background-color: white;
	resize: none;
	margin-left: 3%;
	
	 }
	 .upload_bottombody{
	   width: 100%;
	   height: 80%;
	 }
	 .upload_file_body{
	  width: 200rpx;
	  height: 200rpx;
	  margin-left: 17rpx;
	  background-color: #E0E0E0;
	  margin-top: 20rpx;
	  margin-bottom: 14rpx;
	  border-radius: 10rpx;
	  float: left;  
	 }
	  .upload_file_body_img{
	  width: 200rpx;
	  height: 200rpx;
	  background-color: #E0E0E0;
	  border-radius: 10rpx;
	  float: left;  
	 }
	 .upload_file_delete{
	  width: 57rpx;
	  height: 62rpx;
	  z-index: 2;
	  margin-top: 125rpx;
	  margin-left: 134rpx;
	 }
	 .upload_file_plus{
	  width: 100%;
	  height: 80rpx;
	  text-align: center;
	  line-height: 80rpx;
	  color: #A9A9A9;
	  font-size: 25rpx;
	
	 }
	 .upload_file_image{
	   width: 50rpx;
	  height: 50rpx;
	  margin-left: 75rpx;
	 }
	 .upload_file_count{
	   width: 100%;
	  height: 60rpx;
	  font-size: 30rpx;
	  color: #9A9A9A;
	  text-align: center;
	  line-height: 60rpx;
	 }
	  .make_body{
	  width: 100%;
	  height: 65rpx;
	  float: left;
	  margin-top: 50rpx;
	 }
	 .under_make{
	   width: 36%;
	   height: 65rpx;
	   margin-left: 32%;
	   text-align: center;
	   line-height: 65rpx;
	   color: white;
	   border-radius: 40rpx;
	   background-color: #FF2162;
	   float: left;
	   margin-top: 50rpx;
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
	.actionButton{
	  float: left;
	  width: 100rpx;
	  height: 30rpx;
	  color: white;
	  background: rgb(255,33,100);
	}
	.makeBottom{
	  float: left;
	  width: 100%;
	  height:130rpx;
	  background: rgb(247,247,247);
	  text-align: center;
	  line-height: 130rpx;
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
	.makeCencel{
	  color: rgb(97,97,97);
	  font-size: 40rpx;
	}
	.makeVideo{
	  width: 200rpx;
	  margin-left: 17rpx;
	  background-color: #E0E0E0;
	  margin-top: 20rpx;
	  margin-bottom: 14rpx;
	  border-radius: 10rpx;
	  float: left;  
	}
	.makeVideoS{
	  width: 628rpx;
	  border-radius: 10rpx;
	  float: left;  
	}
	.pause_img{
	  position: absolute;
	  top: 43%;
	  left: 17%;
	  width: 80rpx;
	  height: 80rpx;
	}
	.show{
	   display:show;
	}
	.hide{
	   display:none;
	}
</style>
