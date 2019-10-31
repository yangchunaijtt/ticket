var basepath = "../../../MobileWeb/";
var pagepath = "https://m.czgdly.com/bus/";
//var basepath = "http://www.busge.com/busgebus/";
//var pagepath = "http://www.busge.com/";
function timerCode(vMsg,obj,input) {
	// 获取验证码
	var isSend = true;
	vMsg.countdown = 60;
	vMsg.valShowValue = "获取验证码";
	vMsg.getValCode = function(){
		if (vMsg.countdown == 0) {
			// 重新获取设置为true
			isSend = true;
			//vMsg.$apply(function () {
				vMsg.valShowValue = "获取验证码";
				obj.find("span").html(vMsg.valShowValue);
				vMsg.countdown = 60;
			//});
		} else { 
			// 验证手机号码是否通过，如果通过则访问后端
			if(validateUserPhone(vMsg.phone)) {
				// 设定定时器
				setTimeout(vMsg.getValCode,1000);
				// 如果为true则访问后台
				if(isSend) {
					// 参数
					//var changeParam = {"loginName":vMsg.phone};
					// 地址
					//var changeUrl = basepath + "login/getWeixinVerification";
					// 访问后端
					//$.post(changeUrl,changeParam,function(data, status){
					//	if (!((typeof (data) == 'vMsgect') && data.constructor == vMsgect)) {
					//	}
					//});
					// 设定获取为false
					isSend = false;
				}
				//vMsg.$apply(function () {
					vMsg.valShowValue="重新发送(" + vMsg.countdown + ")"; 
					obj.find("span").html(vMsg.valShowValue);
					vMsg.countdown--; 
				//});
			}
		}
	};
	
	obj.find("span").html(vMsg.valShowValue);
	obj.unbind("click").bind("click",function(){
		vMsg.phone = input.val();
		if (vMsg.valShowValue == "获取验证码"){
			vMsg.getValCode($(this).find("span"));
		}
	})
}

/**
 * 验证天数
 */
function validateDayNumber(days) {
	var reg = /^\d+(\.\d{1,5})?$/;
	// 验证手机号不为空
	if(null== days || "" == days) {
		showMessage1btn("天数不能为空！","");
		return false;
	}
	// 验证手机号码输入是否正确
	if(!reg.test(days)) {
		showMessage1btn("天数格式不正确！","");
		return false;
	}
	return true;
}

/**
 * 验证手机号码
 */
function validateUserPhone(phone) {
	var reg = /^1\d{10}$/;
	// 验证手机号不为空
	if(null== phone || "" == phone) {
		showMessage1btn("手机号码不能为空！","");
		return false;
	}
	// 验证手机号码输入是否正确
	if(!reg.test(phone)) {
		showMessage1btn("手机号码格式不正确！","");
		return false;
	}
	return true;
}
/**
 * 验证验证码
 */
function validateUserCode(code) {
	// 验证码不为空
	if(null== code || "" == code) {
		showMessage1btn("验证码不能为空！","");
		return false;
	}
	return true;
}
/**
 * 获得uid
 */
function getuid(callback,url,isChange) {
	
	url = url.substring(1,url.length);
	var info = {
		uid:null,
		mobile:null,
		openid:null
	};
	var code = "";
	if(null != url && "" != url && url.indexOf("code=")>=0){
	    code = request("code");
	}	
	// 获得uid
	info.openid = getck("openid");
	info.mobile = getck("mobile");
	info.uid = getck("uid");
	var param = {"code":code};
	var url = basepath + "user/getInfo.asp";
	if(typeof(info.uid) == "undefined" || null == info.uid || "" == info.uid || "undefined" == info.uid || "null" == info.uid){
		// 如果没有取出uid
		$.post(url,param,function(data, status){
			if (!((typeof (data) == 'object') && data.constructor == Object)) {
				data = eval("(" + data + ")");
			}
			info.uid = data.obj.uid;
			info.mobile = data.obj.mobile;
			info.openid = data.obj.openid;
			var exp = new Date();  
			exp.setTime(exp.getTime() + 60 * 2000);//过期时间 2分钟  
			document.cookie="uid=" + info.uid + ";expires=" + exp.toGMTString();
			document.cookie="openid=" + info.openid + ";expires=" + exp.toGMTString();
			document.cookie="mobile=" + info.mobile + ";expires=" + exp.toGMTString();
			// 调用回传
			callback(info);
		});
	} else {
		// 调用回传
		callback(info);
	}
}
/**
 * 获得cookie值
 * @param cookiename
 * @returns
 */
function getck(cookiename) {	
	var allcookie = document.cookie.split(";");
	for (var i = 0; i < allcookie.length; i++) {
		var acookie = allcookie[i].replace(/(^\s*)|(\s*$)/g, "").split("="); //取消首位两端空格在分割
		if (cookiename == acookie[0]) {
			return unescape(acookie[1]);
		}
	}
}

/**
 * 设置cookie
 * @param name
 * @param value
 */
function setCookies(name, value) {
	document.cookie = name + "=" + escape(value);
}
var param = function(obj) {
  var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
  for(name in obj) {
	value = obj[name];
	   
	if(value instanceof Array) {
	  for(i=0; i<value.length; ++i) {
		subValue = value[i];
		fullSubName = name + '[' + i + ']';
		innerObj = {};
		innerObj[fullSubName] = subValue;
		query += param(innerObj) + '&';
	  }
	}
	else if(value instanceof Object) {
	  for(subName in value) {
		subValue = value[subName];
		fullSubName = name + '[' + subName + ']';
		innerObj = {};
		innerObj[fullSubName] = subValue;
		query += param(innerObj) + '&';
	  }
	}
	else if(value !== undefined && value !== null)
	  query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }
	 
  return query.length ? query.substr(0, query.length - 1) : query;
};


/**
 * 获取url传值
 * @param paras
 */	
function request(paras) { 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++) { 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if (typeof(returnValue)=="undefined") { 
		return ""; 
	} else { 
		return returnValue; 
	} 
}

 
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt)   
{ //author: meizz   
 var o = {   
   "M+" : this.getMonth()+1,                 //月份   
   "d+" : this.getDate(),                    //日   
   "h+" : this.getHours(),                   //小时   
   "m+" : this.getMinutes(),                 //分   
   "s+" : this.getSeconds(),                 //秒   
   "q+" : Math.floor((this.getMonth()+3)/3), //季度   
   "S"  : this.getMilliseconds()             //毫秒   
 };   
 if(/(y+)/.test(fmt))   
   fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
 for(var k in o)   
   if(new RegExp("("+ k +")").test(fmt))   
 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
 return fmt;   
};
/**
 * 获得当前时间减去分钟数
 * 
 * @returns
 */
function getCurrentDateByMinute(changeFormat,inputMinute,minute) {
	 var now = new Date(inputMinute);
     now.setMinutes (now.getMinutes () - minute);
     return now.format(changeFormat);
}
/**
 * 比较时间
 * 
 * @param startdate
 * @param enddate
 * @returns
 */
function dateCompare(startdate,enddate)  { 
	startdate = startdate.replace(/-/g,"/");
	enddate = enddate.replace(/-/g,"/")
	var starttime = new Date(startdate);  
	var starttimes = starttime.getTime(); 
	   
	var lktime = new Date(enddate);    
	var lktimes = lktime.getTime();   
	
	if(starttimes > lktimes) {   
		return false;   
	}   else {
		return true;   
	
	}
}
/**
 * 和当前比较日期时间
 * 
 * @param startdate
 * @returns
 */
function dateCompare(startdate)  { 
	startdate = startdate.replace(/-/g,"/");
	var starttime = new Date(startdate);  
	var starttimes = starttime.getTime(); 
	   
	var lktime = new Date();    
	var lktimes = lktime.getTime();   
	
	if (starttime < lktime) {
		return false
	}else if (starttime = lktime){		
		if(starttimes > lktimes) {   
			return true;   
		}   else {
			return false;
		}
	}else{
		return true
	}
}
/**
 * 展示大的二维码
 */
function showBarCode(htmlValue){
	var bg = document.createElement('div');
	bg.width = document.body.clientWidth;
	bg.height = document.body.clientHeight;
	bg.id = "codeBigImage";
	bg.className = "bg";
	bg.onclick = clearBarCode;
	document.body.appendChild(bg);
	
	var dialog = document.createElement('div');
	dialog.width = document.body.clientWidth*0.70;
	dialog.style.minHeight = "120px";
	dialog.id = "codePopDiv";
	dialog.className = "barmydiv";
	dialog.innerHTML = htmlValue;
	document.body.appendChild(dialog);
}
/**
 * 点击的时候关闭
 */
function clearBarCode() {
	var bg = document.getElementById("codeBigImage");
	if(null != bg){
		document.body.removeChild(bg);
	}
	var popDiv = document.getElementById("codePopDiv");
	if(null != popDiv){
		document.body.removeChild(popDiv);
	}
}
function showMessage(msg,url){
	var bg = document.createElement('div');
	bg.width = document.body.clientWidth;
	bg.height = document.body.clientHeight;
	bg.id = "bg";
	bg.className = "bg";
	document.body.appendChild(bg);
	
	var dialog = document.createElement('div');
	dialog.width = document.body.clientWidth*0.70;
	dialog.style.minHeight = "120px";
	dialog.id = "popDiv";
	dialog.className = "mydiv";
	dialog.innerHTML = "<div id='message'>"+msg+"</div><button onclick='clearDialog();' class='btn btn-default'>取消</button><button onclick=\"goFirstPage(\'"+url+"\')\" style='margin-left:15px' class='btn btn-danger'>确定</button>";
	document.body.appendChild(dialog);
}

function showMessage1btn(msg,url){
	var bg = document.createElement('div');
	bg.width = document.body.clientWidth;
	bg.height = document.body.clientHeight;
	bg.id = "bg";
	bg.className = "bg";
	document.body.appendChild(bg);
	
	var dialog = document.createElement('div');
	dialog.width = document.body.clientWidth*0.70;
	dialog.style.minHeight = "120px";
	dialog.id = "popDiv";
	dialog.className = "mydiv";
	if (url != ""){
		dialog.innerHTML = "<img width='50px' height='50px' src='../tpl/skin/default/img/info.png' /><br/><div id='message'>"+msg+"</div><button  onclick=\"goFirstPage(\'"+url+"\')\"  class='btn btn-danger'>确定</button>";
	}else{
		dialog.innerHTML = "<img width='50px' height='50px' src='../tpl/skin/default/img/info.png' /><br/><div id='message'>"+msg+"</div><button  onclick='clearDialog();' class='btn btn-danger'>确定</button>";
	}
	document.body.appendChild(dialog);
}

function showMessage2btn(msg){
	var bg = document.createElement('div');
	bg.width = document.body.clientWidth;
	bg.height = document.body.clientHeight;
	bg.id = "bg";
	bg.className = "bg";
	document.body.appendChild(bg);
	
	var dialog = document.createElement('div');
	dialog.width = document.body.clientWidth*0.70;
	dialog.style.minHeight = "120px";
	dialog.id = "popDiv";
	dialog.className = "mydiv";
	dialog.innerHTML = "<img width='50px' height='50px' src='../tpl/skin/default/img/info.png' /><br/><div id='message'>"+msg+"</div><button onclick='clearDialog()' class='btn btn-default'>取消</button><button style='margin-left:15px' class='btn btn-danger'>确定</button>";
	document.body.appendChild(dialog);
}

function showLodding(msg){
	if(null == msg || "" == msg) {
		msg = "加载中...";
	}
	var bg = document.createElement('div');
	bg.width = document.body.clientWidth;
	bg.height = document.body.clientHeight;
	bg.id = "bg";
	bg.className = "bg";
	document.body.appendChild(bg);
	
	var dialog = document.createElement('div');
	dialog.width = document.body.clientWidth*0.70;
	dialog.style.minHeight = "120px";
	dialog.id = "popDiv";
	dialog.className = "mydiv";
	dialog.innerHTML = "<img width='50px' height='50px' src='../tpl/skin/default/img/logo.png' /><br/><div id='message'>"+msg+"</div>";
	document.body.appendChild(dialog);
}


function clearDialog(){
	var bg = document.getElementById("bg");
	if(null != bg){
		document.body.removeChild(bg);
	}
	var popDiv = document.getElementById("popDiv");
	if(null != popDiv){
		document.body.removeChild(popDiv);
	}
}

function goFirstPage(url){
	window.location.href = url;
}
/**
 * 处理shiftId
 * @param shiftId
 */
function doShiftId(shiftIdNumber) {
	var shiftId = shiftIdNumber + "";
	// 如果shiftid大于等于3位，截取后两位
	if(shiftId.length >= 3) {
		// 截取后两位
		shiftId = shiftId.substring(shiftId.length-2,shiftId.length);
//		shiftId = (shiftIdNumber/10%10 + "") + (shiftIdNumber%10+ "");
	} else if(shiftId.length == 2) {
		// 如果2位，取最后一位加零
		shiftId = shiftId.substring(shiftId.length-1,shiftId.length);
//		shiftId = (shiftIdNumber%10) + "0";
	} else if(shiftId.length == 1) {
		// 如果2位，取最后一位加零
		shiftId = shiftId + "0";
	}
	return shiftId;
}

