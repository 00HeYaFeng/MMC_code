<template>
	<view>
		<view class="addProjectName">
			<text class="addProjectNameView">项目名称:</text>
			<textarea class="addProjectNameText" :value="pname" placeholder="请输入名称" @input="addProjectNameText"/>
		</view>
		<view class="addProjectName">
			<text class="addProjectNameView">担任角色:</text>
			<textarea class="addProjectNameText" :value='prole' placeholder="请输入职位" @input="addProjectRoleText"/>
		</view>
		<view class="addProjectTime">
			<text class="addProjectTimeView">项目时间:</text>
			<textarea class="addProjectTimeTextFirst" :value="pfirst" placeholder="开始时间" disabled @click="onShowDatePicker('pfirst')"/>
			<textarea class="addProjectTimeTextEnd" :value="pend" placeholder="结束时间" disabled  @click="onShowDatePicker('pend')"/>
		</view>
		<view class="addProjectName">
			<text class="addProjectNameView">项目业绩:</text>
			<textarea class="addProjectNameText" :value="pachievement" placeholder="请输入项目成就" @input="addProjectAchievementText"/>
		</view>
		<view class="addProjectName">
			<text class="addProjectNameView">项目链接:</text>
			<textarea class="addProjectNameText" :value="paddress" placeholder="请输入项目链接" @input="addProjectAddressText"/>
		</view>
		<view class="addProjectDescribe">
			<text class="addProjectDescribeView">项目描述:</text>
			<textarea class="addProjectDescribeText" :value="pdescribe" placeholder="请输入个人经历简介...." @input="addProjectDescribeText" maxlength="300"/>
		</view>
		<block v-if="selectProject">
			<button class="fixedButtonSave" @click="fixedButtonUpdate">保存</button>
		</block>
		<block v-else>
			<button class="fixedButtonSave" @click="fixedButtonSave">添加</button>
		</block>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	let _this;
	var utils = require('../../utils/util.js');
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
		            MxDatePicker
		},
		data() {
			return {
				pid: '',
				pname:'',
				prole: '',
				pfirst: '',
				pend: '',
				pachievement: '',
				paddress: '',
				pdescribe: '',
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2019/01/01','2019/01/06'],
				rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				value: '',
				timeBool: true,
				selectProject:false
			}
		},
		onLoad(options) {
			_this = this;
			if(options.projectId){
				var data = {
					url:'userCardPersonProject_select',
					projectId: options.projectId,
					unionId: getApp().globalData.unionId
				}
				_this.$api.request(data).
				then( res =>{
					res = res[0];
					_this.pid = res.project_id;
					_this.pname = res.project_name;
					_this.prole = res.project_role;
					_this.pfirst = res.project_first;
					_this.pend = res.project_end;
					_this.pachievement = res.project_achievement;
					_this.paddress = res.project_address;
					_this.pdescribe = res.project_describe;
					_this.selectProject  = true;
				})
			}
		},
		methods: {
			onShowDatePicker(type){//显示
				if(type == 'pfirst'){
					_this.timeBool = true
				}else{
					_this.timeBool = false
				}
				this.type = 'date';
				this.showPicker = true;
				this.value = this['date']
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					//选择的值
					if(_this.timeBool){
						_this.pfirst = e.value;
					}else{
						_this.pend = e.value;
					}
					console.log('value => '+ e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			addProjectNameText:function(e){
				_this.pname = e.detail.value
			},
			addProjectRoleText:function(e){
				_this.prole = e.detail.value
			},
			addProjectTimeTextFirst:function(e){
				_this.pfirst = e.detail.value
			},
			addProjectTimeTextEnd:function(e){
				_this.pend = e.detail.value
			},
			addProjectAchievementText:function(e){
				_this.pachievement = e.detail.value
			},
			addProjectAddressText:function(e){
				_this.paddress = e.detail.value
			},
			addProjectDescribeText:function(e){
				_this.pdescribe = e.detail.value;
			},
			fixedButtonSave:function(){
				if(_this.pname == '' || _this.prole == '' || _this.pfirst == ''  || _this.pdescribe == '' ){
					uni.showToast({
						title:'请填写完整资料',
						icon:'none'
					})
				}else{
					uni.showModal({
						title:'温馨提示',
						content:'确定添加此项目吗',
						success:function(res){
							if(res.confirm){
								var data ={
									url:'userCardPersonProject_insert',
									pid: utils.guid(),
									uid: getApp().globalData.unionId,
									pname: _this.pname,
									prole: _this.prole,
									pfirst: _this.pfirst,
									pend: _this.pend,
									pachievement: _this.pachievement,
									paddress: _this.paddress,
									pdescribe: _this.pdescribe
								}
								_this.$api.request(data)
								.then( res =>{
									uni.showToast({
										title: '添加成功',
										icon: 'none',
										mask: true,
										duration: 1500,
										success:function(){
											setTimeout(function(){
												uni.navigateBack()
											},1500)
										}
									})
									
									
								})
							}
						}
					})
				}
				
			},
			fixedButtonUpdate:function(){
				if(_this.pname == '' || _this.prole == '' || _this.pfirst == ''  || _this.pdescribe == '' ){
					uni.showToast({
						title:'请填写完整资料',
						icon:'none'
					})
				}else{
					uni.showModal({
						title:'温馨提示',
						content:'确定修改此项目吗',
						success:function(res){
							if(res.confirm){
								var data ={
									url:'userCardPersonProject_update',
									pid: _this.pid,
									uid: getApp().globalData.unionId,
									pname: _this.pname,
									prole: _this.prole,
									pfirst: _this.pfirst,
									pend: _this.pend,
									pachievement: _this.pachievement,
									paddress: _this.paddress,
									pdescribe: _this.pdescribe
								}
								_this.$api.request(data)
								.then( res =>{
									uni.showToast({
										title: '保存成功',
										icon: 'none',
										mask: true,
										duration: 1500,
										success:function(){
											setTimeout(function(){
												uni.navigateBack()
											},1500)
										}
									})
									
									
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: rgb(2,2,2);
	}
	.addProjectName{
		float: left;
		width: 92%;
		margin-left: 4%;
		height: 70rpx;
		color: #FFFFFF;
		margin-top: 40rpx;
		border-bottom: 1px solid rgb(115,115,115);
	}
	.addProjectNameView{
		float: left;
		font-size: 35rpx;
		width: 30%;
	}
	.addProjectNameText{
		float: left;
		width: 70%;
		margin-top: 10rpx;
		text-align: right;
		margin-left: -2%;
		height: 60rpx;
		color: #FFFFFF;
	}
	.addProjectTime{
		float: left;
		width: 92%;
		margin-left: 4%;
		color: #FFFFFF;
		height: 140rpx;
		margin-top: 40rpx;
		border-bottom: 1px solid rgb(115,115,115);
	}
	.addProjectTimeView{
		float: left;
		font-size: 35rpx;
		width: 100%;
	}
	.addProjectTimeTextFirst{
		float: left;
		width: 40%;
		margin-top: 30rpx;
		height: 50rpx;
	}
	.addProjectTimeTextEnd{
		float: left;
		width: 40%;
		margin-top: 30rpx;
		height: 50rpx;
	}
	.addProjectDescribe{
		float: left;
		width: 92%;
		margin-left: 4%;
		color: #FFFFFF;
		height: 600rpx;
		margin-top: 40rpx;
	}
	.addProjectDescribeView{
		float: left;
		font-size: 35rpx;
		width: 100%;
	}
	.addProjectDescribeText{
		float: left;
		width: 100%;
		height: 520rpx;
		border: 1px solid rgb(115,115,115);
		margin-top: 20rpx;
	}
	.fixedButtonSave{
		position: fixed;
		bottom: 0;
		width: 250rpx;
		margin-left: 250rpx;
		margin-bottom: 50rpx;
		background-color: rgb(254,33,100);
		color: #FFFFFF;
		border-radius: 15rpx;
	}
</style>
