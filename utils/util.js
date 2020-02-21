const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
var login = function(cb){
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
			
			var userData = {
				unionId: res.unionId,
				name: res.nickName,
				head: res.avatarUrl,
				mpWXID: res.openId,
				appWXID: ''
			}
			console.log(userData);
			that.$api.yousi_user_select(userData)
			.then( userRes =>{
				getApp().globalData.userId = res.openId,
				getApp().globalData.unionId = res.unionId,
				getApp().globalData.userNickName = res.nickName;
				getApp().globalData.userHead = res.avatarUrl;
				getApp().globalData.login = true;
				console.log(userRes)
				typeof cb == 'function' && cb('success');
			})
			})
		  }
		 })
		})
	   } 
	   else{
		uni.getUserInfo({
		  provider: 'weixin',
		  success: function (infoRes) {
			  var userData = {
			  	unionId: infoRes.unionId,
			  	name: infoRes.nickName,
			  	head: infoRes.avatarUrl,
			  	mpWXID: '',
			  	appWXID: infoRes.openId
			  }
			  that.$api.yousi_user_select(userData)
			  .then( userRes =>{
			  	getApp().globalData.userId = infoRes.openId,
			  	getApp().globalData.unionId = infoRes.unionId,
			  	getApp().globalData.userNickName = infoRes.nickName;
			  	getApp().globalData.userHead = infoRes.avatarUrl;
			  	getApp().globalData.login = true;
				typeof cb == 'function' && cb('success');
			  })
		  }
		});
	   }

	  }
	 })
	}
module.exports = {
  formatTime: formatTime,
  guid:guid,
  login: login
}
