/**
 * name: agriknow.js
 * description: 
 * author: 
 * date: 
 */
import request from './request.js'//调用本目录下文件
var utils = require('./util.js');
class agriknow {//定义类
  constructor() {//??
    this._rootUrl = 'https://youfu.iaun.co/ivyCard/php/'//有思线上环境
	this._ivyUrl = 'https://ivy.i-weiying.com/api/'//ivy线上环境
    this._devUrl = 'https://youfu.iaun.co/ivyTest/'//有思测试环境
	this.videoUrl = 'https://youfu.iaun.co/ivyCard/ffmpegphp/'
    this._defaultHeader = { 'Content-Type': 'application/json' }//http格式设置
    this._request = new request//??
    this._request.setErrorHandler(this.errorHander)//
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }


/*--------------------------------------------------------------------------------所有调后台程序---------------------------------------------------------*/
/*
要调用本页面函数，需要在js头部添加：
const app = getApp();
调用本文件函数，语法为：
app.agriknow.xxxxx（参数）

	/*
		通用接口
	*/
   vrequest(data) {
     var url = data.url;
     var ary = this.urlBase(data,'ivy');
     return this._request.postRequest(this._ivyUrl + url, ary).then(res => res.data)
   }
   yrequest(data){
	  var url = this.videoUrl + data.url + '.php';
	  var ary = this.urlBase(data, 'yousi');
	  return this._request.postRequest(url, ary).then(res => res.data) 
   }
	request(data) {
		var url = this._rootUrl + data.url + '.php';
		var ary = this.urlBase(data, 'yousi');
		return this._request.postRequest(url, ary).then(res => res.data)
	  }
  
  /**
   * 接口通用函数
   */

  urlBase(data,type){
    delete data['url'];
    var ary = {};
    for (var p in data) {
      ary[p] = data[p]
    }
    switch(type){
      case 'ivy':
        ary['mobile_unique_code'] = '8531AFAA-C842-49BC-9F4A-B6772DD4228F';
        ary['ClientSource'] = 2;
        ary['sign'] = 'TY-8da23798c69b7bf706604f25c2c9549ae21593b6bdf4be64';
        break;
      case 'yousi':
        
        break;
    }
    return ary;
  }
}
export default agriknow