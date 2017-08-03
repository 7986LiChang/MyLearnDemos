/**
 * [EventUtil 跨浏览器的事件处理程序对象，能统一DOM0级、DOM2级、以及旧版IE为对象添加事件的方法]
 * @type {Object}
 */

var EventUtil = {
 	/**
 	 * [addHandler 添加事件]
 	 * @param {[type]} element [要添加事件的DOM元素]
 	 * @param {[type]} type    [事件处理程序名称，指定的事件类型]
 	 * @param {[type]} handler [事件处理函数]
 	 */
 	addHandler: function(element, type, handler){ //添加事件
 		if(element.addEventListener){      //使用DOM2级方法添加事件
 			element.addEventListener(type, handler, false);
 		}else if(element.attachEvent){     //使用IE方法
 			element.attachEvent("on" + type, handler);    
 		}else{
 			element["on" + type] = handler;   //DOM0级
 		}
 	},

 	/**
 	 * [removeHandler 取消事件]
 	 * @param  {[type]} element [description]
 	 * @param  {[type]} type    [description]
 	 * @param  {[type]} handler [description]
 	 * @return {[type]}         [description]
 	 */
 	removeHandler: function(element, type, handler){
 		if(element.removeEventListener){    //DOM2级
 			element.removeEventListener(type, handler, false);
 		}else if(element.detachEvent){    //IE级
 			element.detachEvent("on" + type, handler); 
 		}else{
 			element["on" + type] = null;  //DOM0级
 		}
 	},

 	/**
 	 * [getEvent 跨浏览器取得event对象]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getEvent: function(event){
 		return event ? event : window.event;  
 	},

 	/**
 	 * [getTarget 返回事件的实际目标]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getTarget: function(event){
 		return event.target || event.srcElement;  
 	},

 	/**
 	 * [preventDefault 阻止事件的默认行为]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	preventDefault: function(event){
 		if(event.preventDefault){   //DOM中
 			event.preventDefault();
 		}else{
 			event.returnValue = false;   //IE中
 		}
 	},

 	/*
 	 * [stopPropagation 停止事件在DOM上继续冒泡或捕获]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	stopPropagation: function(event){
 		if(event.stopPropagation){    //DOM中
 			event.stopPropagation();
 		}else{
 			event.cancleBubble = true;    //IE中
 		}
 	},

 	/**
 	 * [getRelatedTarget 获取mouseover、mouseout事件的相关元素]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getRelatedTarget : function(event){
 		if(event.relatedTarget){     //DOM中
 			return relatedTarget;
 		}else if(event.toElement){   //IE8，mouseout事件
 			return event.toElement;
 		}else if(event.fromElement){    //mouseover
 			return event.fromElement;
 		}else{
 			return null;
 		}
 	},

 	/**
 	 * [getButton 获取mousedown/mouseup按下或释放的是鼠标的那个键]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getButton : function(event){
 		if(document.implementation.hasFeature("MouseEvents", "2.0")){
 			return event.button;
 		}else{
 			switch(event.button){
 				case 0:
 				case 1:
 				case 3:
 				case 5:
 				case 7:
 					return 0;   //按下左键，即主鼠标按钮
 				case 2:
 				case 6:
 					return 2;   //按下右键，即次鼠标按钮
 				case 4:   
 					return 1;   //按下中间的鼠标按钮
 			}
 		}
 	},

 	/**
 	 * [getWheelDelda 获取表示鼠标滚轮滚动方向的数值]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getWheelDelda: function(event){
 		if(event.wheelDelta){
 			return client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta;
 		}else{
 			return -event.detail * 40;
 		}
 	},

 	/**
 	 * [getCharCode 跨浏览器取得字符编码，只能在keypress事件中使用]
 	 * @param  {[type]} event [description]
 	 * @return {[type]}       [description]
 	 */
 	getCharCode: function(event){
 		if(typeof event.charCode == "number"){
 			return event.charCode;
 		}else{
 			return event.keyCode;
 		}
 	}
 };