/**
 * [DragDrop 拖拽函数 基于模块模式的单例对象]
 */
var DragDrop = function(){
	//待拖动元素对象
	// var dragdrop = new EventTarget(),
	// 	dragging = null,
	// 	diffX = 0,
	// 	diffY = 0;
	// 	
	var dragdrop = new EventTarget(),
		dragging = null,
		diffX = 0,
		diffY =0;

	function handleEvent(event){
		//获取事件和目标
		event = EventUtil.getEvent(event);
		target = EventUtil.getTarget(event);

		//确定事件类型
		switch(event.type){
			case "mousedown":
				//判断鼠标按下元素是不是确实要拖拽的元素
				if(target.className.indexOf("draggable") > -1){
					dragging = target;
					//修缮拖动
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;

					// //触发自定义事件,接收event对象
					dragdrop.fire({
						type: "dragstart", 
						target: dragging, 
						x: event.clientX, 
						y: event.clientY
					});
				}
				break;
			case "mousemove":
				if(dragging !== null){
					//放到指定位置
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
					// //触发自定义事件
					dragdrop.fire({
						type: "drag", 
						target: dragging, 
						x: event.clientX, 
						y: event.clientY
					});					
				}
				break;
			case "mouseup":
				//触发事件
				dragdrop.fire({
					type: "dragend", 
					target: dragging, 
					x: event.clientX, 
					y: event.clientY
				});							
				//鼠标抬起，待拖拽元素置null
				dragging = null;
				break;
		}
	};

	dragdrop.enable = function(){
			var dragdiv = document.getElementById("dragdrop");
			EventUtil.addHandler(dragdiv, "mousedown", handleEvent);
			EventUtil.addHandler(dragdiv, "mousemove", handleEvent);
			EventUtil.addHandler(dragdiv, "mouseup", handleEvent);			
	};	

	dragdrop.disable = function(){
			EventUtil.removeHandler(dragdiv, "mousedown", handleEvent);
			EventUtil.removeHandler(dragdiv, "mousemove", handleEvent);
			EventUtil.removeHandler(dragdiv, "mouseup", handleEvent);		
	}

	return dragdrop;
}();

//添加事件处理函数mouseup/mousedowm/mousemove
DragDrop.enable();

//添加自定义事件处理函数
DragDrop.addHandler("dragstart", function(event){
	var status = document.getElementById("status");
	status.innerHTML = "Started dragging " + event.target.id;
});

DragDrop.addHandler("drag", function(event){
	var status = document.getElementById("status");
	status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});

DragDrop.addHandler("dragend", function(event){
	var status = document.getElementById("status");
	status.innerHTML += "<br/>Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
});
