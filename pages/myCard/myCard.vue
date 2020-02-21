<template>
	<view>
		<view class="CardTop">
			<view class="CardPerson" :style="personStyle" @click="personClick">
				个人
			</view>
			<view class="CardCompany" :style="companyStyle" @click="companyClick">
				企业
			</view>
		</view>
		<block v-if="hiddenSwitch">
			<view class="personMedia">
				<image v-show="!personUpdate&&mediaData.mediaAddress != ''" src="../../static/images/error.png" mode="" @click="updatevideo('person')"></image>
				<text class="personMediaText">个人视频展示</text>
				<!-- <text class="personMediaText">重新拍摄</text> -->
				<block v-if="mediaData.mediaAddress == ''">
					<view class="mediaView" @click="makeVideo">
						<image :src="mediaFilmImage" mode="" class="mediaImage"></image>
						<text class="mediaViewText">拍摄个人视频简介</text>
					</view>
				</block>
				<block v-else>
					<video class="personMediaVideo" :src="mediaData.mediaAddress"  controls autoplay page-gesture="true" show-fullscreen-btn show-play-btn show-center-play-btn enable-progress-gesture vslide-gesture-in-fullscreen></video>
				</block>
			</view>
			<view class="personData">
				<text class="personDataText">个人资料</text>
				<block v-if="personUpdate">
					<text class="personDataSave" @click="personUpdateBool">修改资料</text>
				</block>
				<block v-else>
					<text class="personDataSave" @click="personDataSave">保存资料</text>	
				</block>
				<view class="personDataView">
					<view class="personDataName">
						<text class="personDataNameText">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</text>
						<textarea class="personDataTextarea" :disabled="personUpdate" type="text" placeholder="请输入姓名" :value="personData.personName" @input="personDataNameChange"></textarea>
					</view>
					<view class="personDataName">
						<text class="personDataNameText">电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话:</text>
						<textarea class="personDataTextarea" :disabled="personUpdate" type="text" placeholder="请输入电话" :value="personData.personCall" @input="personDataCallChange"></textarea>
					</view>
					<view class="personDataName">
						<text class="personDataNameText">邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱:</text>
						<textarea class="personDataTextarea" :disabled="personUpdate" type="text" placeholder="请输入邮箱" :value="personData.personEmail" @input="personDataEmailChange"></textarea>
					</view>
					<view class="personDataAddress">
						<text class="personDataNameText">地&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp址:</text>
						<textarea class="personDataTextareaExperience" :disabled="personUpdate" type="text" placeholder="请输入详细地址...." :value="personData.personAddress" @input="personDataAddressChange"></textarea>
					</view>
					<view class="personDataExperience">
						<text class="personDataNameText">个人简历</text>
						<textarea class="personDataTextareaExperience" :disabled="personUpdate" type="text" placeholder="请输入个人经历简介...." :value="personData.personExperience" @input="personDataExperienceChange"></textarea>
					</view>
				</view>
			</view>
			<view class="personProject">
				<text class="personProjectTitle">项目资料</text>
				<text style="float: left; margin-left: 85rpx;" @click="personProjectAdd" >长按删除</text>
				<text class="personProjectAdd" @click="personProjectAdd" >添加项目</text>
				<block v-if="projectData != ''">
					<block v-for="(item, index) in projectData" :key="index">
						<view class="personProjectView" :id="item.project_id" @click="switchAddProject" @longtap="longtaped(item.project_id,item.project_name)">
							<view class="personProjectHead">
								<view class="personProjectHeadView">
									<text class="personProjectName">{{item.project_name}}</text>
									<text class="personProjectTime">{{item.project_first}}——{{item.project_end != ""?item.project_end:'暂无'}}</text>
								</view>
								<text class="personProjectWork">担任职位:{{item.project_role}}</text>
							</view>
							<view class="personProjectDescribe">
								<text class="personProjectDescribeText" >{{item.project_describe}}</text>
							</view>
						</view>
					</block>
				</block>
				<block v-else>
					<view class="personProjectView">
						<view class="personProjectHead">
							<view class="personProjectHeadView">
								<text class="personProjectName">暂无项目</text>
								<text class="personProjectTime"></text>
							</view>
							<text class="personProjectWork"></text>
						</view>
						
					</view>
				</block>
			</view>
		</block>
		<block v-else> 
			<block v-if="companyData.address">
				<view  class="" style="display: flex;float: left;width: 100%;align-content: center">
					<text class="companyMediaText">企业视频展示</text>
					<image @click="updatevideo('company')" src="../../static/images/error.png" mode=""></image>
				</view>
				<video class="companyMediaVideo" :src="companyData.address"  controls autoplay page-gesture="true" show-fullscreen-btn show-play-btn show-center-play-btn enable-progress-gesture vslide-gesture-in-fullscreen></video>
			</block>
			<block v-else>
				<view class="companyMediaView"  @click="makeCompanyVideo">
					<image class="companyMediaViewImageLeft" :src="mediaFilmImage" mode=""></image>
					<text class="companyMediaViewText" >拍摄企业简介</text>
					<image class="companyMediaViewImageRight" :src="backRight" mode=""></image>
				</view>
			</block>
			<view class="companyNameView">
				<text class="companyNameViewName">企业名称</text>
				<textarea class="companyNameViewText" :disabled="companyUpdate" placeholder="请输入贵公司的企业名字" :value="companyData.companyName" @input="companyNameViewText"/>
			</view>
			<view class="companyNameView">
				<text class="companyNameViewName">业务范围</text>
				<textarea class="companyNameViewText" :disabled="companyUpdate" placeholder="请输入贵公司的业务范围" :value="companyData.companyRange" @input="companyAchievementViewText"/>
			</view>
			<view class="companyNameView">
				<text class="companyNameViewName">办公地址</text>
				<textarea class="companyNameViewText" :disabled="companyUpdate" placeholder="请输入贵公司的办公地址" :value="companyData.companyAddress" @input="companyAddressViewText"/>
			</view>
			<view class="companyNameView">
				<text class="companyNameViewName">企业联系电话</text>
				<textarea class="companyNameViewText" :disabled="companyUpdate" placeholder="请输入贵公司的联系电话" :value="companyData.companyCall" @input="companyCallViewText"/>
			</view>
			<view class="companyNameView">
				<text class="companyNameViewName">企业邮箱</text>
				<textarea class="companyNameViewText" :disabled="companyUpdate" placeholder="请输入贵公司的邮箱账号" :value="companyData.companyEmail" @input="companyEmailViewText"/>
			</view>
			<view class="companyDevelopView">
				<text class="companyNameViewName">发展历程</text>
				<textarea class="companyDevelopViewText" :disabled="companyUpdate" placeholder="请输入贵公司的发展历程" maxlength="300" :value="companyData.companyDevelop" @input="companyDevelopViewText"/>
			</view>
			<block v-if="companyUpdate">
				<button class="companyButtonSave" @click="companyUpdateClick">修改</button>
			</block>
			<block v-else>
				<button class="companyButtonSave" @click="companySaveClick">保存</button>
			</block>
			<button class="companyButtonPreview" @click="companyPreviewClick">生成预览页面</button>
			
		</block>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				personStyle: 'background-color: rgb(245,57,92)',
				companyStyle: '',
				hiddenSwitch: true,
				mediaFilmImage: '../../static/images/film.png',
				backRight: '../../static/images/backRight.png',
				ivyLogo: '../../static/images/ivy.png',
				mediaData: {
					mediaAddress: ''
				},
				personData: {
					personName: '',
					personAddress: '',
					personCall: '',
					personEmail: '',
					personExperience: ''
				},
				projectData: null,
				companyData:{
					address: ''
				},
				personUpdate: true,
				companyUpdate: true,
				backUrl:''
			}
		},
		onLoad(options) {
			_this = this;
			if(options.url){
				_this.backUrl = '../set/set';
			}
		},
		onBackPress(options) {
			if(_this.backUrl.length > 0){
				uni.switchTab({
					url:_this.backUrl
				})
				return true
			}
			
		},
		onShow() {
			var data = {
				url: 'media_select',
				unionId: getApp().globalData.unionId,
				mediaType: 'person'
			}
			_this.$api.request(data)
			.then( res =>{
				if(res.length != 0){
					var mediadata = {
						mediaId: res[0].mediaId,
						mediaAddress: res[0].mediaAddress
					}
				}else{
					var mediadata = {
						mediaId : '',
						mediaAddress: ''
					}
				}
				_this.mediaData = mediadata
				var data = {
					url: 'userPerson_select',
					uid: getApp().globalData.unionId
				}
				_this.$api.request(data)
				.then( resPerson =>{
					if(resPerson.length != 0){
						var resData = {
							personName: resPerson[0].personName,
							personAddress: resPerson[0].personAddress,
							personCall: resPerson[0].personCall,
							personEmail: resPerson[0].personEmail,
							personExperience: resPerson[0].personExperience
						}
					}else{
						var resData = {};
					}
					_this.personData = resData;
					var data = {
						url: 'userCardPersonProject_select_all',
						uid: getApp().globalData.unionId
					}
					_this.$api.request(data)
					.then( resProject =>{
						var proData = [];
						for(var i = 0; i < resProject.length; i++){
							proData.push(resProject[i])
						}
						_this.projectData = proData;
					})
				})
			})
			
		},
		methods: {
			updatevideo:function(e){
				let _this = this;
				let data = e;
				uni.showModal({
					title: '提示',
					content: `确认要更换当前视屏吗?`,
					success: function (res) {
						if (res.confirm) {
							if(data == "person")
								_this.mediaData.mediaAddress = "";
							else
								_this.companyData.address = "";
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			personClick:function(){
				this.personStyle = 'background-color: rgb(245,57,92)';
				this.companyStyle = '';
				this.hiddenSwitch = true
				//this.cardInit()
			},
			longtaped:function(...e){
				// console.log(e.currentTarget.id;);
				// console.log("长按结束");
				// let id =  
				console.table(...e);
				// uni.showModal({
				// 	title: '提示',
				// 	content: `确认要删除该项目吗`,
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
					 var _this = this;
					 var id = e[0];
					  uni.showModal({
						  title: '提示',
						  content: `您是否要删除标题为${e[1]}的项目`,
						  success: function (res) {
							  if (res.confirm) {
								  const data = _this.projectData;

								  // let index  = 0; 
								  // [...data].forEach((item, index, array) => {
								  //    index =  item.project_id == id?index:false;
								  // });
								  let index = 0;
								   for (const key in data) {
									   if(data[key].project_id == id){
										   index =key;
										   break;
									   }
								  }
								  const post = {
									  url: 'userCardPersonProject_delete',
									  uid: getApp().globalData.unionId,
									  pid: data[index].project_id
								  }
								  _this.$api.request(post)
								  .then(res	=>{
									  _this.projectData.splice(index,1);
									  console.log(_this.projectData);
									  uni.showToast({
									  	title:"删除成功"
									  })
								  }) 
								 //   [...data].some(function (item, index, array) {
									// 	return item.project_id == id?index:false;
									// });

							  } else if (res.cancel) {
								  console.log('用户点击取消');
							  }
						  }
					  });
			},
			companyClick: function(){
				this.personStyle = '';
				this.companyStyle = 'background-color: rgb(245,57,92)';
				this.hiddenSwitch = false;
				var data = {
					url: 'userCardCompany_select',
					unionId: getApp().globalData.unionId
				}
				_this.$api.request(data)
				.then( res =>{
					if(res.length != 0){
						var resData = {
							companyName: res[0].company_name,
							companyRange: res[0].company_range,
							companyAddress: res[0].company_address,
							companyCall: res[0].company_call,
							companyEmail: res[0].company_email,
							companyDevelop: res[0].company_develop
						}
					}else{
						var resData = {};
					}
					var mediaData = {
						url: 'media_select',
						unionId: getApp().globalData.unionId,
						mediaType: 'company'
					}
					_this.$api.request(mediaData).
					then( res =>{
						if(res.length != 0){
							resData.address = res[0].mediaAddress;
						}else{
							resData.address = '';
						}
						_this.companyData = resData;
					})
					
				})
			},
			personDataNameChange:function(e){
				_this.personData.personName = e.detail.value;
			},
			personDataCallChange:function(e){
				_this.personData.personCall = e.detail.value;
			},
			personDataEmailChange:function(e){
				_this.personData.personEmail = e.detail.value;
			},
			personDataAddressChange:function(e){
				_this.personData.personAddress = e.detail.value;
			},
			personDataExperienceChange:function(e){
				_this.personData.personExperience = e.detail.value;
			},
			companyNameViewText:function(e){
				_this.companyData.companyName = e.detail.value;
			},
			companyAchievementViewText:function(e){
				_this.companyData.companyRange = e.detail.value;
			},
			companyAddressViewText:function(e){
				_this.companyData.companyAddress = e.detail.value;
			},
			companyCallViewText:function(e){
				_this.companyData.companyCall = e.detail.value;
			},
			companyEmailViewText:function(e){
				_this.companyData.companyEmail = e.detail.value;
			},
			companyDevelopViewText:function(e){
				_this.companyData.companyDevelop = e.detail.value;
			},
			cardInit: function(){
				
			},
			companyUpdateClick:function(){
				_this.companyUpdate = false;
				uni.showToast({
					title:'请填写上方资料',
					icon:'none'
				})
			},
			switchAddProject:function(e){
				var id = e.currentTarget.id;
				uni.navigateTo({
					url:'../addProject/addProject?projectId='+ id
				})
			},
			companyPreviewClick:function(){
				var isbool = true;
				var object = Object.keys(_this.companyData)
				for(var i = 0; i < object.length; i++){
					if(_this.companyData[object[i]] == ''){
						isbool = false
					}
				}
				if(!isbool){
					uni.showToast({
						title:'请填写完整资料并保存',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'../companyPreview/companyPreview'
					})
				}
			},
			companySaveClick: function(){
				uni.showModal({
					title:'温馨提示',
					content: '您确定保存吗',
					success:function(res){
						if(res.confirm){
							var data = {
								url: 'userCardCompany_make',
								uid: getApp().globalData.unionId,
								cname: _this.companyData.companyName,
								crange: _this.companyData.companyRange,
								caddress: _this.companyData.companyAddress,
								ccall: _this.companyData.companyCall,
								cemail: _this.companyData.companyEmail,
								cdevelop: _this.companyData.companyDevelop
							}
							_this.$api.request(data).
							then( res =>{
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								})
								_this.companyUpdate = true;
							})
						}
					}
					
				})
			},
			personProjectAdd:function(){
				uni.navigateTo({
					url:"../addProject/addProject"
				})
			},
			personUpdateBool:function(){
				_this.personUpdate = false;
				uni.showToast({
					title:'请填写下方资料',
					icon:'none'
				})
			},
			personDataSave:function(){
				uni.showModal({
					title:'温馨提示',
					content:'确定保存修改吗',
					success:function(res){
						if(res.confirm){
							var data = {
								url: 'userCardPerson_make',
								uid: getApp().globalData.unionId,
								pname: _this.personData.personName,
								paddress: _this.personData.personAddress,
								pcall: _this.personData.personCall,
								pexperience: _this.personData.personExperience,
								pemail: _this.personData.personEmail
							}
							_this.$api.request(data).
							then( res =>{
								uni.showToast({
									title:'保存成功',
									icon:'none',
									mask:true
								})
								_this.personUpdate = true;
							})
						}
					}
				})
			},
			
			makeVideo: function () {
				this.chooseVideo(0)
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
						console.log(res)
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
			  makeCompanyVideo:function(){
				  uni.chooseVideo({
				    sourceType: ['album','camera'],
				    compressed: true,
				    maxDuration: 25,
				    camera: 'back',
				    success: function (res) {
				  						console.log(res)
				      if (res.duration < 26){
				        var type = 'false';
				  						var ceshi = [];
				  						ceshi.push(res.tempFilePath);
				        uni.navigateTo({
				          url: '../make/make?url=' + JSON.stringify(ceshi) + '&img=' + res.thumbTempFilePath + '&type=' + type + '&switch=company',
				        })
				      }else{
				        uni.showToast({
				          title: '最多上传25秒的视频',
				          icon: 'none'
				        })
				      }
				     
				    },
				  })
			  }
		}
	}
</script>

<style>
	page{
		background-color: rgb(2,2,2);
	}
	.CardTop{
		float: left;
		width: 100%;
		height: 65rpx;
		margin-top: 10rpx;
	}
	.CardPerson{
		float: left;
		width: 25%;
		margin-left: 25%;
		/* background-color: rgb(245,57,92); */
		color: #ffffff;
		background-color: rgb(75,75,75);
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		height: 65rpx;
		text-align: center;
		line-height: 65rpx;
		font-size: 33rpx;
	}
	.CardCompany{
		float: left;
		width: 25%;
		/* background-color: rgb(245,57,92); */
		color: #ffffff;
		background-color: rgb(75,75,75);
		border-top-right-radius: 50rpx;
		border-bottom-right-radius: 50rpx;
		height: 65rpx;
		text-align: center;
		line-height: 65rpx;
		font-size: 33rpx;
	}
	.personMedia{
		float: left;
		margin-top: 30rpx;
		width: 100%;
		height: 460rpx;
	}
	.personMedia>image{
		width: 50px;
		height: 50px;
		position: absolute;
		right: 10%;
		top: 5%;
		z-index: 1;
	}
	.personMediaText{
		float: left;
		color: #FFFFFF;
		width: 90%;
		height: 40rpx;
		margin-left: 35rpx;
		margin-bottom: 10rpx;
	}
	.companyMediaText{
		float: left;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		height: 40px;
	}
	.companyMediaText+image{
		width: 40px;
		height: 40px; 
		margin-left: 75px;
	}
	.mediaView{
		float: left;
		width: 96%;
		height: 405rpx;
		margin-top: 10rpx; 
		background-color: #FFFFFF;
		margin-left: 2%;
		border-radius: 15rpx;
	}
	.mediaImage{
		float: left;
		width: 100rpx;
		height: 80rpx;
		margin-left: 310rpx;
		margin-top: 115rpx;
	}
	.mediaViewText{
		float: left;
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
	}
	.personMediaVideo{
		float: left;
		width: 96%;
		height: 405rpx;
		margin-top: 10rpx; 
		border-radius: 15rpx;
		margin-left: 2%;
	}
	.companyMediaVideo{
		float: left;
		width: 96%;
		height: 405rpx;
		margin-top: 10rpx; 
		border-radius: 15rpx;
		margin-left: 2%;
		z-index: -1;
	}
	.personData{
		float: left;
		width: 100%;
		margin-top: 35rpx;
	}
	.personDataText{
		float: left;
		color: #FFFFFF;
		margin-left: 35rpx;
	}
	.personDataSave{
		float: right;
		margin-right: 40rpx;
		color: rgb(254,33,100);
	}
	.personDataView{
		float: left;
		width: 96%;
		margin-left: 2%;
		border-radius: 15rpx;
		background-color: #ffffff;
		margin-top: 15rpx;
	}
	.personDataName{
		float: left;
		width: 96%;
		margin-left: 2%;
		height: 75rpx;
		border-bottom: 1px solid rgb(237,237,237);
	}
	.personDataNameText{
		float: left;
		width: 25%;
		margin-left: 20rpx;
		height: 75rpx;
		line-height: 75rpx;
	}
	.personDataTextarea{
		float: left;
		width: 65%;
		height: 50rpx;
		margin-top: 15rpx;
		text-align: right;
		margin-left: 5%;
	}
	.personDataAddress{
		float: left;
		width: 96%;
		height: 270rpx;
		margin-left: 2%;
	}
	.personDataExperience{
		float: left;
		width: 96%;
		height: 300rpx;
		margin-left: 2%;
	}
	.personDataTextareaExperience{
		float: left;
		margin-left: 2%;
		width: 96%;
		height: 175rpx;
		background-color: rgb(246,248,248);
		text-indent: 20rpx;
		padding: 20rpx 0 0 0;
	}
	.personProject{
		float: left;
		width: 100%;
		margin-top: 35rpx;
		margin-bottom: 35rpx;
	}
	.personProjectTitle{
		float: left;
		color: #FFFFFF;
		margin-left: 35rpx;
	}
	.personProjectAdd{
		float: right;
		color: rgb(254,33,100);
		margin-right: 40rpx;
	}
	.personProjectView{
		float: left;
		background-color: #FFFFFF;
		width: 96%;
		margin-left: 2%;
		border-radius: 15rpx;
		margin-top: 15rpx;
	}
	.personProjectHead{
		float: left;
		width: 96%;
		margin-left: 2%;
		height: 120rpx;
		border-bottom: 1px solid rgb(237,237,237);
	}
	.personProjectHeadView{
		float: left;
		width: 100%;
		height: 50%;
	}
	.personProjectName{
		float: left;
		font-size: 35rpx;
		margin-top: 15rpx;
	}
	.personProjectTime{
		float: left;
		margin-top: 22rpx;
		margin-left: 40rpx;
		font-size: 25rpx;
		opacity: 0.6;
	}
	.personProjectWork{
		float: left;
		margin-top: 15rpx;
		font-size: 25rpx;
		opacity: 0.6;
	}
	.personProjectScore{
		float: left;
	}
	.personProjectScoreName{
		float: left;
	}
	.personProjectScoreText{
		float: left;
	}
	.personProjectUrl{
		float: left;
	}
	.personProjectUrlName{
		float: left;
	}
	.personProjectUrlText{
		float: left;
	}
	.personProjectDescribe{
		float: left;
		width: 96%;
		margin-left: 2%;
	}
	.personProjectDescribeText{
		float: left;
		text-indent: 2em;
		margin-top: 15rpx;
		margin-bottom: 15rpx;
	}
	.companyMediaVideoView{
		float: left;
	}
	.ivyLogo{
		float: left;
	}
	.companyMediaVideoViewText{
		float: left;
	}
	.companyMediaVideo{
		float: left;
	}
	.companyMediaView{
		float: left;
		width: 92%;
		height: 200rpx;
		border-bottom: 1px solid rgb(86,86,86);
		margin-left: 4%;
		margin-top: 20rpx;
	}
	.companyMediaViewImageLeft{
		float: left;
		width: 60rpx;
		height: 50rpx;
		margin-left: 20rpx;
		margin-top: 75rpx;
	}
	.companyMediaViewText{
		float: left;
		color: #FFFFFF;
		margin-left: 30rpx;
		margin-top: 75rpx;
		font-size: 35rpx;
	}
	.companyMediaViewImageRight{
		float: right;
		width: 40rpx;
		height: 50rpx;
		margin-top: 75rpx;
	}
	.companyNameView{
		float: left;
		width: 92%;
		color: #FFFFFF;
		margin-top: 50rpx;
		margin-left: 4%;
		border-bottom: 1px solid rgb(86,86,86);
		height: 120rpx;
	}
	.companyNameViewName{
		float: left;
		width: 100%;
		font-size: 35rpx;
	}
	.companyNameViewText{
		float: left;
		width: 100%;
		margin-top: 20rpx;
	}
	.companyDevelopView{
		float: left;
		color: #FFFFFF;
		width: 92%;
		margin-left: 4%;
		margin-top: 50rpx;
		height: 500rpx;
	}
	.companyDevelopViewText{
		float: left;
		width: 92%;
		margin-top: 20rpx;
		border: 1px solid rgb(86,86,86);
	}
	.companyButtonSave{
				position: fixed;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				background-color: rgb(254,33,100);
				height: 80rpx;
				color: #FFFFFF;
				z-index: 999;
				right: 0;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				justify-content: center;

	}
	.companyButtonPreview{
		position: fixed;
		bottom: 0;
		width: 40%;
		left: 50%;
		background-color: rgb(254,33,100);
		height: 80rpx;
		color: #FFFFFF;
		z-index: 999;
		transform: translate(-50%, -50%);
	}
</style>
